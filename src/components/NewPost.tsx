'use client';

import { AuthUser } from '@/model/user';
import PostUserAvatar from './PostUserAvatar';
import FilesIcon from './ui/icons/FilesIcon';
import Button from './ui/Button';
import { useState } from 'react';
import Image from 'next/image';

type Props = {
  user: AuthUser;
};

export default function NewPost({ user: { name, image } }: Props) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };
  const handleDrag = (e: React.DragEvent) => {
    if (e.type === 'dragenter') {
      setDragging(true);
    } else if (e.type === 'dragleave') {
      setDragging(false);
    }
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };
  return (
    <section className='w-full flex flex-col items-center mt-6'>
      <PostUserAvatar username={name} image={image ?? ''} />
      <form className='w-full flex flex-col px-6'>
        <input
          className='hidden'
          name='input'
          id='input-upload'
          type='file'
          accept='image/*'
          onChange={handleChange}
        ></input>
        <label
          className={`h-60 flex flex-col items-center justify-center ${
            !file && 'border-2 border-btn-blue border-dashed'
          }`}
          htmlFor='input-upload'
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {dragging && (
            <div className='absolute inset-0 z-10 bg-sky-500/20 pointer-events-none'></div>
          )}
          {!file ? (
            <div className='flex flex-col items-center pointer-events-none'>
              <FilesIcon size={70} />
              <p className='mt-4'>이미지 클릭 또는 드래그&드랍</p>
            </div>
          ) : (
            <div className='relative w-full aspect-square'>
              <Image
                className='object-cover'
                src={URL.createObjectURL(file)}
                alt='local file'
                fill
                sizes='650px'
              />
            </div>
          )}
        </label>
        <textarea
          className='my-2 p-2 resize-none block bg-inherit outline-none border border-border-gray rounded-lg'
          name='text'
          id='input-text'
          required
          rows={10}
          placeholder='내용을 작성하세요...'
        />
        <Button text='등록' onClick={() => {}} />
      </form>
    </section>
  );
}
