import { parseDate } from '@/util/date';
import CommentIcon from './ui/icons/CommentIcon';
import HeartIcon from './ui/icons/HeartIcon';
import BookmarkIcon from './ui/icons/BookmarkIcon';
import ToggleButton from './ui/ToggleButton';
import { useState } from 'react';
import HeartFillIcon from './ui/icons/HeartFillIcon';
import BookmarkFillIcon from './ui/icons/BookmarkFillIcon';
import { SimplePost } from '@/model/posts';
import { useSession } from 'next-auth/react';
import usePosts from '@/hooks/posts';

type Props = {
  post: SimplePost;
};

export default function ActionBar({ post }: Props) {
  const { data: session } = useSession();
  const { username, text, createdAt, likes } = post;
  const user = session?.user;
  const isLiked = user ? likes.includes(user?.username) : false;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { setLike } = usePosts();
  const handleLike = (like: boolean) => {
    if (user) {
      setLike(post, username, like);
    }
  };
  return (
    <div className='p-3 text-sm'>
      <div className='flex items-center justify-between pb-1'>
        <div className='flex gap-3'>
          <ToggleButton
            isToggled={isLiked}
            onToggle={handleLike}
            onIcon={<HeartFillIcon size={24} />}
            offIcon={<HeartIcon size={24} />}
          />
          <CommentIcon size={24} />
        </div>
        <ToggleButton
          isToggled={isBookmarked}
          onToggle={setIsBookmarked}
          onIcon={<BookmarkFillIcon size={24} />}
          offIcon={<BookmarkIcon size={24} />}
        />
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
