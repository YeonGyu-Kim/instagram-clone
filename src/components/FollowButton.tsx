'use client';

type Props = {
  user: ProfileUser;
};

import { ProfileUser } from '@/model/user';
import Button from './ui/Button';
import useMe from '@/hooks/me';

export default function FollowButton({ user }: Props) {
  const { user: loggedInUser, toggleFollow } = useMe();

  const showButton = loggedInUser && loggedInUser?.username !== user?.username;
  const isFollowing =
    loggedInUser &&
    loggedInUser?.following.find((item) => item?.username === user?.username);

  const text = isFollowing ? '팔로잉' : '팔로우';

  const handleFollow = () => {
    toggleFollow(user?.id, !isFollowing);
  };

  return (
    <>
      {showButton && (
        <Button text={text} onClick={handleFollow} blue={text === '팔로우'} />
      )}
    </>
  );
}
