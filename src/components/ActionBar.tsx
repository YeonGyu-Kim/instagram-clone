import { parseDate } from '@/util/date';
import CommentIcon from './ui/icons/CommentIcon';
import HeartIcon from './ui/icons/HeartIcon';
import BookmarkIcon from './ui/icons/BookmarkIcon';
import ToggleButton from './ui/ToggleButton';
import HeartFillIcon from './ui/icons/HeartFillIcon';
import BookmarkFillIcon from './ui/icons/BookmarkFillIcon';
import { Comment, SimplePost } from '@/model/posts';
import usePosts from '@/hooks/posts';
import useMe from '@/hooks/me';
import CommentForm from './CommentForm';

type Props = {
  post: SimplePost;
  children?: React.ReactNode;
  onComment: (comment: Comment) => void;
};

export default function ActionBar({ post, children, onComment }: Props) {
  const { id, username, text, createdAt, likes } = post;
  const { user, setBookmark } = useMe();
  const { setLike } = usePosts();

  const isLiked = user ? likes.includes(user?.username) : false;
  const isBookmarked = user?.bookmarks?.includes(id) ?? false;

  const handleLike = (like: boolean) => {
    user && setLike(post, username, like);
  };

  const handleBookmark = (bookmark: boolean) => {
    user && setBookmark(id, bookmark);
  };

  const handleComment = (comment: string) => {
    user &&
      onComment({ comment, username: user?.username, image: user?.image });
  };

  return (
    <div className='p-3 text-sm'>
      <div className='flex items-center justify-between'>
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
          onToggle={handleBookmark}
          onIcon={<BookmarkFillIcon size={24} />}
          offIcon={<BookmarkIcon size={24} />}
        />
      </div>
      <div className='mt-1 mb-2'>
        <p>{`좋아요 ${likes?.length ?? 0}개`}</p>
        {children}
        <p>{parseDate(createdAt)}</p>
      </div>
      <CommentForm onPostComment={handleComment} />
    </div>
  );
}
