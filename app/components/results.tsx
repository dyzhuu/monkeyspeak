import TextBox from './textbox';

export default function Results() {
    return (
        <div className='flex flex-col justify-center items-center p-3 gap-3 bg-gray-400'>
            <h1 className='font-bold text-white text-3xl'>Results</h1>

            <div className='w-full grow grid px-5'>
                <div className='w-full grow flex flex-col justify-center items-center mb-5 rounded-lg bg-gray-500'>
                    <p className='font-["Comic_Sans"] text-white'>Me and my monkey 🙈 🙉 🙊</p>
                </div>
            </div>
        </div>
    )
}