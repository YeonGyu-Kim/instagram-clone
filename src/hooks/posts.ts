import { SimplePost } from '@/model/posts';
import useSWR, { mutate } from 'swr';

async function updateLike(id: string, like: boolean) {
  return fetch('/api/likes', {
    method: 'PUT',
    body: JSON.stringify({ id, like }),
  }).then((res) => res.json());
}

export default function usePosts() {
  const { data: posts, isLoading, error } = useSWR<SimplePost[]>('/api/posts');

  const setLike = (post: SimplePost, username: string, like: boolean) => {
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
  };

  return { posts, isLoading, error, setLike };
}
