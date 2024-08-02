import TextBox from './components/textbox'

export default function Home() {
    return (
        <div className='min-h-screen flex flex-col bg-[#0B0E13] p-10'>

            <div className='flex flex-col self-center justify-center m-5 bg-opacity-0'>
            <h1 className='font-bold text-5xl text-[#9FADC6] pb-[2rem]'>monkeyspeak</h1>
                <TextBox />
                
                <div className='w-full justify-center flex mt-5'>
                    <button className='rounded-[5rem] w-64 h-24 font-bold text-[#394760] text-[2rem] bg-[#9FADC6] item-center'>Start</button>
                </div>
            </div>
        </div>
    )
}