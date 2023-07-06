import useSWR from 'swr';
import GridSpinner from './GridSpinner';
import { SimplePost } from '@/model/posts';
import PostGridCard from '../PostGridCard';

type Props = {
  username: string;
  query: string;
};

export default function PostGrid({ username, query }: Props) {
  const {
    data: posts,
    isLoading,
    error,
  } = useSWR<SimplePost[]>(`/api/users/${username}/${query}`);
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
