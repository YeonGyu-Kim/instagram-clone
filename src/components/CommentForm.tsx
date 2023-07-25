'use client';
import { useRef, useState } from 'react';
import SmileIcon from './ui/icons/SmileIcon';

type Props = {
  onPostComment: (comment: string) => void;
};

export default function CommentForm({ onPostComment }: Props) {
  const [comment, setComment] = useState('');
  const buttonDisabled = comment.length === 0;
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [rows, setRows] = useState<number | undefined>(1);
  const handleResizeHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value.trim());
    textRef?.current?.scrollHeight &&
      setRows(Math.floor(textRef?.current?.scrollHeight / 20));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPostComment(comment);
    setComment('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex items-center border-t border-border-gray p-2 text-sm'
    >
      <SmileIcon size={24} />
      <textarea
        ref={textRef}
        rows={rows}
        value={comment}
        onChange={handleResizeHeight}
        className='w-[90%] ml-2 bg-bg-gray focus:outline-none p-1 resize-none overflow-hidden'
        placeholder='댓글 달기...'
        autoComplete='off'
        autoCorrect='off'
        required
      />
      <button
        disabled={buttonDisabled}
        className='text-btn-blue font-semibold w-[40px]'
      >
        {!buttonDisabled && '게시'}
      </button>
    </form>
  );
}
