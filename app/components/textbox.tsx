'use client';

import { useState } from 'react';

interface TextBoxProps {
  text: string;
  index: number;
}

export default function TextBox({ text, index }: TextBoxProps) {
  return (
    <div className="overflow-y-hidden resize-none max-h-[130px] grow bg-transparent text-justify text-2xl text-[#394760] select-none">
      <span>{text}</span>
      {text}
    </div>
  );
}
