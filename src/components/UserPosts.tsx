'use client';

import { ProfileUser } from '@/model/user';
import { useState } from 'react';
import PostIcon from './ui/icons/PostIcon';
import BookmarkIcon from './ui/icons/BookmarkIcon';
import HeartIcon from './ui/icons/HeartIcon';
import PostGrid from './ui/PostGrid';

type Props = {
  user: ProfileUser;
};

const tabs = [
  { type: 'posts', title: '게시물', icon: <PostIcon size={16} /> },
  { type: 'saved', title: '북마크', icon: <BookmarkIcon size={16} /> },
  { type: 'liked', title: '좋아요', icon: <HeartIcon size={16} /> },
];

export default function UserPosts({ user: { username } }: Props) {
  const [query, setQuery] = useState(tabs[0]?.type);
  return (
    <section>
      <div className='flex justify-center gap-10'>
        {tabs.map(({ type, title, icon }, index) => (
          <button
            className={`flex items-center text-sm py-4 cursor-pointer ${
              type === query && 'font-bold border-t'
            }`}
            key={`${type}-${index}`}
            onClick={() => {
              setQuery(type);
            }}
          >
            <span className='tablet:scale-150'>{icon}</span>
            <span className='ml-1.5 tablet:hidden'>{title}</span>
          </button>
        ))}
      </div>
      <PostGrid username={username} query={query} />
    </section>
  );
}
