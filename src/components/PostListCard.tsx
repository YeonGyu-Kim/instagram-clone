import Image from 'next/image';
import { SimplePost } from '../../sanity-studio/model/posts';
import Avatar from './Avatar';
import { parseDate } from '@/util/date';

type Props = {
  post: SimplePost;
};

export default function PostListCard({ post }: Props) {
  const { username, userImage, image, likes, text, comments, createdAt } = post;
  return (
    <article className='rounded-lg border border-border-gray'>
      <div className='flex items-center'>
        <Avatar image={userImage} size='small' highlight={false} />
        <span>{username}</span>
      </div>
      <Image
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
      />
      <div>
        <p>{`좋아요 ${likes?.length ?? 0}개`}</p>
        <p>
          <span>{username}</span>
          <span>{text}</span>
        </p>
        <p>{parseDate(createdAt)}</p>
        <form>
          <input type='text' placeholder='댓글 달기...' />
          <button>게시</button>
        </form>
      </div>
    </article>
  );
}
