import Image from 'next/image';
import { SimplePost } from '../../sanity-studio/model/posts';
import Avatar from './Avatar';
import CommentForm from './CommentForm';
import ActionBar from './ActionBar';

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostListCard({ post, priority = false }: Props) {
  const { username, userImage, image, likes, text, createdAt } = post;
  return (
    <article className='rounded-lg border border-border-gray mb-4'>
      <div className='flex items-center p-2'>
        <Avatar image={userImage} size='small' highlight={false} />
        <span className='text-sm ml-1'>{username}</span>
      </div>
      <Image
        className='w-full object-cover aspect-square'
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
        priority={priority}
      />
      <ActionBar
        username={username}
        text={text}
        createdAt={createdAt}
        likes={likes}
      />
      <CommentForm />
    </article>
  );
}
