'use client';
import { useRef, useState } from 'react';
import SmileIcon from './ui/icons/SmileIcon';

export default function CommentForm() {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [rows, setRows] = useState<number | undefined>(1);
  const handleResizeHeight = () => {
    textRef?.current?.scrollHeight &&
      setRows(Math.floor(textRef?.current?.scrollHeight / 20));
  };

  return (
    <form className='flex items-center border-t border-border-gray p-2 text-sm'>
      <SmileIcon size={24} />
      <textarea
        ref={textRef}
        rows={rows}
        onInput={handleResizeHeight}
        className='w-[90%] ml-2 bg-bg-gray focus:outline-none p-1 resize-none overflow-hidden'
        placeholder='댓글 달기...'
        autoComplete='off'
        autoCorrect='off'
      />
      <button className='text-btn-post font-semibold w-[40px]'>게시</button>
    </form>
  );
}
