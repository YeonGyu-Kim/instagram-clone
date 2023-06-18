import Image from 'next/image';
import { SimplePost } from '../../sanity-studio/model/posts';
import Avatar from './Avatar';

type Props = {
  post: SimplePost;
};

export default function PostListCard({ post }: Props) {
  const { username, userImage, image, likes, text, comments, createdAt } = post;
  return (
    <>
      <div>
        <Avatar image={userImage} highlight />
        <span>{username}</span>
      </div>
      <Image
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
      />
    </>
  );
}
