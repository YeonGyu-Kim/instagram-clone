import useSWR from 'swr';
import { FullPost, SimplePost } from '../model/posts';
import Image from 'next/image';
import PostUserAvatar from './PostUserAvatar';
import ActionBar from './ActionBar';
import CommentForm from './CommentForm';
import Avatar from './Avatar';

type Props = {
  post: SimplePost;
};

export default function PostDetail({ post }: Props) {
  const { id, username, userImage, image, likes, createdAt } = post;
  const { data } = useSWR<FullPost>(`/api/posts/${id}`);
  const comments = data?.comments;
  console.log(comments);

  return (
    <section className='flex w-full h-full'>
      <div className='relative basis-3/5'>
        <Image
          className='object-fill'
          src={image}
          alt={`photo by ${username}`}
          priority
          fill
          sizes='650px'
        />
      </div>
      <div className='w-full basis-2/5 flex flex-col'>
        <PostUserAvatar image={userImage} username={username} />
        <ul className='border-t border-border-gray h-full overflow-y-auto p-4 mb-1'>
          {comments &&
            comments.map(
              ({ username: commentUsername, image, comment }, index) => (
                <li key={index} className='flex items-center mb-1'>
                  <Avatar
                    image={image ? image : userImage}
                    size='small'
                    highlight={commentUsername === username}
                  />
                  <div className='text-sm ml-2'>
                    <span className='font-bold mr-1'>
                      {commentUsername ? commentUsername : username}
                    </span>
                    <span>{comment}</span>
                  </div>
                </li>
              )
            )}
        </ul>
        <ActionBar username={username} createdAt={createdAt} likes={likes} />
        <CommentForm />
      </div>
    </section>
  );
}
