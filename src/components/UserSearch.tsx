'use client';

import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import useSWR from 'swr';
import GridSpinner from './ui/GridSpinner';
import { SearchUser } from '@/model/user';
import UserCard from './UserCard';
import useDebounce from '@/hooks/debounce';
import useThrottle from '@/hooks/throttle';
import { debounce } from 'lodash';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';

type FormData = {
  user: string;
  users: SearchUser | undefined;
};

export default function UserSearch() {
  const router = useRouter();
  const [isEntered, setIsEntered] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [debouncedValue, setDebouncedValue] = useState(keyword);
  const [throttledValue, setThrottledValue] = useState(keyword);
  //const debouncedKeyword = useDebounce(keyword);
  //const throttleKeyword = useThrottle(keyword);
  const { handleDebounced } = useDebounce(setDebouncedValue);
  //const { handleThrottle } = useThrottle(setThrottledValue);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const {
    data: users,
    isLoading,
    error,
  } = useSWR<SearchUser[]>(`/api/search/${debouncedValue}`);

  /* const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  }; */
  const trimKeyword = (text: string) => {
    return text.replace(/\s+/g, '');
  };
  const onSubmit: SubmitHandler<FormData> = () => {
    setIsEntered(true);
  };

  useEffect(() => {
    if (isEntered) {
      if (users) {
        users?.length > 0 && router.push(`/user/${users[0]?.username}`);
      }
      setIsEntered(false);
    }
  }, [isEntered, users, router]);
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
          //value={keyword}
          {...register('user', {
            required: true,
            /*  pattern: {
              value: /^[0-9]+$/,
              message: '숫자만가능',
            }, */
            onChange: (e) => {
              setKeyword(trimKeyword(e?.target.value));
              handleDebounced(trimKeyword(e?.target.value));
              //handleThrottle(e?.target.value);
            },
          })}
        />
        {/* <p>{errors.user?.message}</p> */}
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
