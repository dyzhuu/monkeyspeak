import { done, not_done } from './test'

export default function TextBox() {
    return (
        <div className='w-full pb-8'>
            <p className='text-justify max-w-[75rem] w-full h-60 text-[2rem] text-[#394760] overflow-y-hidden'><em className='text-justify max-w-[75rem] w-full h-60 text-[2rem] text-[#F94760] overflow-y-hidden'>{done}</em>{not_done}</p>
        </div>
    )
}