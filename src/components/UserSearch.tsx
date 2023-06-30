'use client';

import { useState } from 'react';
import useSWR from 'swr';
import GridSpinner from './ui/GridSpinner';
import { ProfileUser } from '@/model/user';
import UserCard from './UserCard';
import useDebounce from '@/hooks/debounce';

export default function UserSearch() {
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword);
  const {
    data: users,
    isLoading,
    error,
  } = useSWR<ProfileUser[]>(`/api/search/${debouncedKeyword}`);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <section className='w-full max-w-md flex flex-col items-center p-6'>
      <form onSubmit={onSubmit}>
        <input
          className='bg-border-gray outline-none px-4 py-2 mb-4 rounded-lg'
          type='text'
          autoFocus
          placeholder='검색'
          value={keyword}
          onChange={(e) => setKeyword(e?.target?.value)}
        ></input>
      </form>
      {isLoading && <GridSpinner />}
      {!isLoading && !error && users?.length === 0 && <>검색 결과 없음</>}
      <ul>
        {users &&
          users.map((user) => (
            <li key={user?.username}>
              <UserCard user={user} />
            </li>
          ))}
      </ul>
    </section>
  );
}
