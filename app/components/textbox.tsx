'use client'

import { useState } from 'react';

export default function TextBox() {
    const [text, setText] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');

    return (
        <div className='flex flex-col justify-center items-center'>
            <textarea className='overflow-y-hidden resize-none w-full grow bg-transparent text-justify text-2xl text-[#394760] p-2' readOnly={true} value={text}/>
        </div>
    )
}