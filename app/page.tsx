import TextBox from './components/textbox'

export default function Home() {
    return (
        <div className='min-h-screen flex flex-col items-center bg-zinc-600 p-10'>
            <h1 className='m-5 font-bold text-5xl text-gray-300'>Monkey Speak 🐒</h1>
            
            <div className='w-3/4 flex flex-col justify-center items-center rounded-lg bg-gray-200 m-5 p-5'>
                <TextBox />
                
                <div className='w-full flex mt-5 bg-gray-200'>
                    <button className='rounded-md font-bold text-white bg-gray-400 p-2'>Start</button>
                </div>
            </div>
        </div>
    )
}