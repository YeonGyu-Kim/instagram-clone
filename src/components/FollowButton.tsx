'use client';

type Props = {
  user: ProfileUser;
};

import { ProfileUser } from '@/model/user';
import Button from './ui/Button';
import useMe from '@/hooks/me';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { PulseLoader } from 'react-spinners';

export default function FollowButton({ user }: Props) {
  const { user: loggedInUser, toggleFollow } = useMe();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  const isUpdating = isPending || isFetching;

  const showButton = loggedInUser && loggedInUser?.username !== user?.username;
  const isFollowing =
    loggedInUser &&
    loggedInUser?.following.find((item) => item?.username === user?.username);

  const text = isFollowing ? '팔로잉' : '팔로우';

  const handleFollow = async () => {
    setIsFetching(true);
    await toggleFollow(user?.id, !isFollowing);
    setIsFetching(false);
    startTransition(() => {
      router.refresh();
    });
  };
  return (
    <>
      {showButton && (
        <Button
          text={text}
          onClick={handleFollow}
          blue={text === '팔로우'}
          isUpdating={isUpdating}
        />
      )}
    </>
  );
}
