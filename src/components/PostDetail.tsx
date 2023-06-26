import useSWR from 'swr';
import { FullPost, SimplePost } from '../../sanity-studio/model/posts';

type Props = {
  post: SimplePost;
};

export default function PostDetail({ post }: Props) {
  const { id, username, userImage, image, likes, text, createdAt } = post;
  const { data } = useSWR<FullPost>(`/api/posts/${id}`);
  console.log(data);
  return <></>;
}
