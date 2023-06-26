import Avatar from './Avatar';

type Props = {
  image: string;
  username: string;
};

export default function PostUserAvatar({ image, username }: Props) {
  return (
    <div className='flex items-center p-4'>
      <Avatar image={image} size='small' highlight={false} />
      <span className='text-sm ml-1'>{username}</span>
    </div>
  );
}
