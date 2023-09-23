'use client';

import { useState, useRef, useCallback, useMemo } from 'react';
import useSWR from 'swr';
import GridSpinner from './ui/GridSpinner';
import { SearchUser } from '@/model/user';
import UserCard from './UserCard';
import useDebounce from '@/hooks/debounce';
import useThrottle from '@/hooks/throttle';
import { debounce } from 'lodash';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormData = {
  user: string;
};

export default function UserSearch() {
  const [keyword, setKeyword] = useState('');
  const [debouncedValue, setDebouncedValue] = useState(keyword);
  const [throttledValue, setThrottledValue] = useState(keyword);
  //const debouncedKeyword = useDebounce(keyword);
  //const throttleKeyword = useThrottle(keyword);
  const { handleDebounced } = useDebounce(setDebouncedValue);
  //const { handleThrottle } = useThrottle(setThrottledValue);

  const { register, handleSubmit } = useForm<FormData>();

  const {
    data: users,
    isLoading,
    error,
  } = useSWR<SearchUser[]>(`/api/search/${debouncedValue}`);

  /* const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  }; */

  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);
  return (
    <section className='w-full max-w-md flex flex-col items-center p-6'>
      {/*  <form onSubmit={onSubmit}>
        <input
          className='bg-border-gray outline-none px-4 py-2 mb-4 rounded-lg'
          type='text'
          autoFocus
          placeholder='검색'
          value={keyword}
          onChange={(e) => {
            setKeyword(e?.target.value);
            handleDebounced(e?.target.value);
            //handleThrottle(e?.target.value);
          }}
        ></input>
      </form> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className='bg-border-gray outline-none px-4 py-2 mb-4 rounded-lg'
          type='text'
          autoFocus
          placeholder='검색'
          value={keyword}
          {...register('user', {
            required: true,
            onChange: (e) => {
              setKeyword(e?.target.value);
              handleDebounced(e?.target.value);
              //handleThrottle(e?.target.value);
            },
          })}
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
