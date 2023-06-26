import { parseDate } from '@/util/date';
import CommentIcon from './ui/icons/CommentIcon';
import HeartIcon from './ui/icons/HeartIcon';
import BookmarkIcon from './ui/icons/BookmarkIcon';

type Props = {
  username?: string;
  text?: string;
  createdAt: string;
  likes: string[];
};

export default function ActionBar({ username, text, createdAt, likes }: Props) {
  return (
    <div className='p-3 text-sm'>
      <div className='flex justify-between pb-1'>
        <div className='flex gap-3'>
          <HeartIcon />
          <CommentIcon />
        </div>
        <div>
          <BookmarkIcon />
        </div>
      </div>
      <p>{`좋아요 ${likes?.length ?? 0}개`}</p>
      {text && (
        <p className='py-1'>
          <span>{username}</span>
          <span className='ml-1 font-light'>{text}</span>
        </p>
      )}
      <p>{parseDate(createdAt)}</p>
    </div>
  );
}
