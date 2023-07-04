import { ProfileUser } from '@/model/user';
import Avatar from './Avatar';
import FollowButton from './FollowButton';

type Props = {
  user: ProfileUser;
};

export default function UserProfile({ user }: Props) {
  const { image, username, name, followers, following, posts } = user;

  const info = [
    { title: '게시물', data: posts },
    { title: '팔로워', data: followers },
    { title: '팔로우', data: following },
  ];

  return (
    <section className='w-full max-w-3xl m-auto flex justify-center items-center tablet:flex-col py-6 border-b border-border-gray'>
      <div className='flex justify-center grow'>
        <Avatar image={image} highlight={false} size='2xl' />
      </div>
      <div className='grow-[2]'>
        <div>
          <span className='mr-4'>{username}</span>
          <FollowButton user={user} />
        </div>
        <ul className='flex gap-8 my-4'>
          {info.map(({ title, data }, index) => (
            <li key={`${title}-${index}`}>
              <span>{title}</span>
              <span className='ml-1 font-bold'>{data}</span>
            </li>
          ))}
        </ul>
        <span>{user?.name}</span>
      </div>
    </section>
  );
}
