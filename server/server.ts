import { createClient, LiveTranscriptionEvents } from '@deepgram/sdk';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const wss = new Server(server);

const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

wss.on('connection', (ws) => {
  console.log('Client connected');
  const connection = deepgram.listen.live({
    model: 'nova-2',
    language: 'en-US',
    smart_format: true
  });

  connection.on(LiveTranscriptionEvents.Open, () => {
    console.log('Deepgram Connection opened.');
    setInterval(() => {
      const keepAliveMsg = JSON.stringify({ type: "KeepAlive" });
      connection.send(keepAliveMsg);
      console.log("Sent KeepAlive message");
  }, 3000); // Sending KeepAlive messages every 3 seconds
  });

  connection.on(LiveTranscriptionEvents.Transcript, (data) => {
    console.log(data.channel.alternatives[0].transcript);
    ws.send(data.channel.alternatives[0].transcript);
  });

  connection.on(LiveTranscriptionEvents.Close, (data) => {
    console.log('Connection closed.');
  });

  connection.on(LiveTranscriptionEvents.Error, (err) => {
    console.error(err);
  });

  ws.on('open', () => {
    console.log('Socket connection opened');
  });

  ws.on('close', () => {
    console.log('Socket connection closed');
  });

  ws.on('error', (error) => {
    console.error('Socket error:', error);
  });

  ws.on('message', (message) => {
    // Assume message is a binary audio stream
    connection.send(message);
  });

  ws.on('disconnect', () => {
    console.log('Client disconnected');
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

server.listen(8080, () => {
  console.log('WebSocket server listening on ws://localhost:8080');
});
