import { Comment, SimplePost } from '@/model/posts';
import useSWR, { mutate } from 'swr';
import { useCallback } from 'react';
import { useCacheKeys } from '@/context/CacheKeysContext';

async function updateLike(id: string, like: boolean) {
  return fetch('/api/likes', {
    method: 'PUT',
    body: JSON.stringify({ id, like }),
  }).then((res) => res.json());
}

async function addComment(id: string, comment: string) {
  return fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify({ id, comment }),
  }).then((res) => res.json());
}

export default function usePosts() {
  const cacheKeys = useCacheKeys();
  const {
    data: posts,
    isLoading,
    error,
  } = useSWR<SimplePost[]>(cacheKeys.postsKey);
  const setLike = useCallback(
    (post: SimplePost, username: string, like: boolean) => {
      /*    const newPost = {
      ...post,
      likes: like
        ? [...post?.likes, username]
        : post?.likes.filter((item) => item !== username),
    };
    const newPosts = posts?.map((item) =>
      item?.id === post?.id ? newPost : item
    );

    return mutate(updateLike(post?.id, like), {
      optimisticData: newPosts,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    }); */

      fetch('/api/likes', {
        method: 'PUT',
        body: JSON.stringify({ id: post?.id, like }),
      }).then(() => mutate('/api/posts'));
    },
    []
  );

  const postComment = useCallback((post: SimplePost, comment: Comment) => {
    /* const newPost = {
      ...post,
      comments: post.comments + 1,
    };
    const newPosts = posts?.map((item) =>
      item?.id === post?.id ? newPost : item
    );

    return mutate(addComment(post?.id, comment?.comment), {
      optimisticData: newPosts,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    }); */

    fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ id: post?.id, comment: comment?.comment }),
    }).then(() => mutate('/api/posts'));
  }, []);

  return { posts, isLoading, error, setLike, postComment };
}
