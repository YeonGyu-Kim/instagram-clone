'use client';

import useSWR from 'swr';
import { MoonLoader } from 'react-spinners';
import { SimplePost } from '../../sanity-studio/model/posts';
import PostListCard from './PostListCard';

export default function PostList() {
  const { data: posts, isLoading: loading } =
    useSWR<SimplePost[]>('/api/posts');

  return (
    <section>
      {loading && (
        <div>
          <MoonLoader size={32} color='#F60485' />
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
