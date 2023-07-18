'use client';
import { DotLoader } from 'react-spinners';
import Link from 'next/link';
import Avatar from './Avatar';
import useMe from '@/hooks/me';

export default function FollowingBox() {
  const { user, isLoading: loading } = useMe();
  const followingUsers = user?.following;

  return (
    <section className='mb-4 flex justify-center items-center w-full rounded-lg shadow-sm p-4 border border-border-gray overflow-x-auto scrollbar-thin scrollbar-thumb-fuchsia scrollbar-track-bg-gray'>
      {loading ? (
        <DotLoader size={32} color='#F60485' />
      ) : (
        (!followingUsers || followingUsers.length === 0) && (
          <p>팔로워가 없습니다.</p>
        )
      )}
      {followingUsers && followingUsers.length > 0 && (
        <ul className='flex w-full gap-2'>
          {followingUsers.map(({ username, image }, index) => (
            <li key={`${username}-${index}`} className='text-center last:pr-4'>
              <Link href={`/user/${username}`}>
                <Avatar image={image} size='large' highlight />
                <span>{username}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
