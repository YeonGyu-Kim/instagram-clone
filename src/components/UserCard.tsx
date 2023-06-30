import { ProfileUser } from '@/model/user';
import Link from 'next/link';
import Avatar from './Avatar';

type Props = {
  user: ProfileUser;
};

export default function UserCard({ user }: Props) {
  const { name, username, image, following, followers } = user;
  return (
    <Link className='flex items-center my-2' href={`/user/${username}`}>
      <Avatar image={image} highlight={false} size='medium' />
      <div className='text-sm ml-1.5'>
        <p>{username}</p>
        <p className='text-font-gray'>
          <span>{name}</span>
          <span>&#183;</span>
          <span>{`팔로워 ${followers}명`}</span>
        </p>
      </div>
    </Link>
  );
}
