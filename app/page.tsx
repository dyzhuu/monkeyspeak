import Main from './components/main'

export default function Home() {
    return (
        <div className='min-h-screen flex flex-col items-center bg-zinc-600 p-10'>
            <h1 className='m-5 font-bold text-5xl text-gray-300'>Monkey Speak 🐒</h1>
            
            <Main />
        </div>
    )
}