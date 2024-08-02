const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const output = document.getElementById('output');

let webSocket;
let audioContext;
let processor;
let audioQueue = [];
let sendInterval;

startButton.addEventListener('click', startStreaming);
stopButton.addEventListener('click', stopStreaming);

async function startStreaming() {
  try {
    // Get microphone access with desired constraints
    const stream = await navigator.mediaDevices.getUserMedia({ 
      audio: {
        sampleRate: 16000,
        channelCount: 1
      }
    });
    
    // Initialize WebSocket
    webSocket = new WebSocket('ws://vigilant-yaksha-production.up.railway.app/v1/audio/transcriptions?language=en');
    webSocket.binaryType = 'arraybuffer';
    
    webSocket.onmessage = (event) => {
      // Log the received WebSocket message
      const message = JSON.parse(event.data).text;
      console.log("WebSocket response:", message);
      output.textContent = `${message}`;
    };
    
    // Create AudioContext with 16000 sample rate
    audioContext = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
    processor = audioContext.createScriptProcessor(4096, 1, 1);
    
    // Connect the audio stream to the processor node
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(processor);
    processor.connect(audioContext.destination);

    processor.onaudioprocess = (event) => {
      const inputData = event.inputBuffer.getChannelData(0);
      const outputData = new Int16Array(inputData.length);

      // Convert float audio data to 16-bit PCM
      for (let i = 0; i < inputData.length; i++) {
        outputData[i] = Math.max(-1, Math.min(1, inputData[i])) * 0x7FFF;
      }

      // Add audio data to queue
      audioQueue.push(outputData.buffer);
    };
    
    // Set interval to send data at a faster rate
    sendInterval = setInterval(() => {
      if (audioQueue.length > 0 && webSocket.readyState === WebSocket.OPEN) {
        const data = audioQueue.shift();
        webSocket.send(data);
        console.log("Sent data:", data);
      }
    }, 50);

    startButton.disabled = true;
    stopButton.disabled = false;
  } catch (error) {
    console.error('Error accessing microphone', error);
  }
}

function stopStreaming() {
  if (processor) {
    processor.disconnect();
    processor.onaudioprocess = null;
  }
  if (audioContext) {
    audioContext.close();
  }
  if (webSocket) {
    webSocket.close();
  }
  if (sendInterval) {
    clearInterval(sendInterval);
  }
  
  startButton.disabled = false;
  stopButton.disabled = true;
}
