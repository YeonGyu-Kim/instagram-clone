'use client';

type Props = {
  user: ProfileUser;
};

import { HomeUser, ProfileUser } from '@/model/user';
import useSWR from 'swr';
import Button from './ui/Button';

export default function FollowButton({ user }: Props) {
  const { data: loggedInUser } = useSWR<HomeUser>('/api/me');

  const showButton = loggedInUser && loggedInUser?.username !== user?.username;
  const isFollowing =
    loggedInUser &&
    loggedInUser?.following.find((item) => item?.username === user?.username);

  const text = isFollowing ? '팔로잉' : '팔로우';

  return (
    <>
      {showButton && (
        <Button text={text} onClick={() => {}} blue={text === '팔로우'} />
      )}
    </>
  );
}
