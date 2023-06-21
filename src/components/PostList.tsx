'use client';

import useSWR from 'swr';
import { SimplePost } from '../../sanity-studio/model/posts';
import PostListCard from './PostListCard';
import GridSpinner from './ui/GridSpinner';

export default function PostList() {
  const { data: posts, isLoading: loading } =
    useSWR<SimplePost[]>('/api/posts');

  return (
    <section>
      {loading && (
        <div className='flex justify-center mt-[50%]'>
          <GridSpinner />
        </div>
      )}
      {posts && (
        <ul>
          {posts.map((post) => (
            <li key={post?.id}>
              <PostListCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
