'use client';
import Image from 'next/image';
import ActionBar from './ActionBar';
import { useState } from 'react';
import ModalPortal from './ui/ModalPortal';
import PostModal from './PostModal';
import PostUserAvatar from './PostUserAvatar';
import PostDetail from './PostDetail';
import { Comment, SimplePost } from '../model/posts';
import usePosts from '@/hooks/posts';

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostListCard({ post, priority = false }: Props) {
  const { username, userImage, image, text, comments } = post;
  const [openModal, setOpenModal] = useState(false);
  const { postComment } = usePosts();
  const handlePostComment = (comment: Comment) => {
    postComment(post, comment);
  };
  return (
    <article className='rounded-lg border border-border-gray mb-4'>
      <PostUserAvatar image={userImage} username={username} />
      <Image
        className='w-full object-cover aspect-square'
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
        priority={priority}
        onClick={() => setOpenModal(true)}
      />
      <ActionBar post={post} onComment={handlePostComment}>
        {text && (
          <p className='py-1'>
            <span>{username}</span>
            <span className='ml-1 font-light'>{text}</span>
          </p>
        )}
        {comments > 1 && (
          <button
            onClick={() => setOpenModal(true)}
          >{`댓글 ${comments}개 모두 보기`}</button>
        )}
      </ActionBar>
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </article>
  );
}
