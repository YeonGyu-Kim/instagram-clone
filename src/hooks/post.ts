import { Comment, FullPost } from '@/model/posts';
import { useCallback } from 'react';
import useSWR, { useSWRConfig } from 'swr';

async function addComment(id: string, comment: string) {
  return fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify({ id, comment }),
  }).then((res) => res.json());
}

export default function useFullPost(postId: string) {
  const {
    data: post,
    isLoading,
    error,
    mutate,
  } = useSWR<FullPost>(`/api/posts/${postId}`);

  const { mutate: globalMutate } = useSWRConfig();

  const postComment = useCallback(
    (comment: Comment) => {
      if (!post) return;
      const newPost = {
        ...post,
        comments: [...post?.comments, comment],
      };

      return mutate(addComment(post?.id, comment?.comment), {
        optimisticData: newPost,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      }).then(() => globalMutate('/api/posts'));

      /* fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ id: post?.id, comment }),
    }).then(() => mutate('/api/posts')); */
    },
    [post, mutate, globalMutate]
  );

  return { post, isLoading, error, postComment };
}
