import Image from 'next/image';
import { SimplePost } from '../../sanity-studio/model/posts';
import Avatar from './Avatar';
import { parseDate } from '@/util/date';
import HeartIcon from './ui/icons/HeartIcon';
import CommentIcon from './ui/icons/CommentIcon';

type Props = {
  post: SimplePost;
};

export default function PostListCard({ post }: Props) {
  const { username, userImage, image, likes, text, comments, createdAt } = post;
  return (
    <article className='rounded-lg border border-border-gray'>
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
      />
      <div className='p-2 text-sm'>
        <p className='flex gap-2'>
          <HeartIcon />
          <CommentIcon />
        </p>
        <p>{`좋아요 ${likes?.length ?? 0}개`}</p>
        <p className='py-1'>
          <span>{username}</span>
          <span className='ml-1 font-light'>{text}</span>
        </p>
        <p>{parseDate(createdAt)}</p>
        <div className='border-t border-border-gray'></div>
        <form className='flex justify-between '>
          <input
            className='bg-bg-gray focus:outline-none p-1'
            type='text'
            placeholder='댓글 달기...'
          />
          <button className='text-btn-post font-semibold'>게시</button>
        </form>
      </div>
    </article>
  );
}
