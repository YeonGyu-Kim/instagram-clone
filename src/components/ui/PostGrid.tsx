import GridSpinner from './GridSpinner';
import PostGridCard from '../PostGridCard';
import usePosts from '@/hooks/posts';

export default function PostGrid() {
  const { posts, isLoading } = usePosts();
  return (
    <div>
      <div className='flex justify-center'>{isLoading && <GridSpinner />}</div>
      <ul className='grid grid-cols-3 gap-8'>
        {posts &&
          posts.map((post, index) => (
            <li key={post?.id}>
              <PostGridCard post={post} priority={index < 6} />
            </li>
          ))}
      </ul>
    </div>
  );
}
