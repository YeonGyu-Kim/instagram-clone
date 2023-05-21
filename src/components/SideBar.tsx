import { useSession } from 'next-auth/react';
import { User } from '../../sanity-studio/model/user';

type Props = {
  user: User;
};

export default function SideBar({ user: { name, email, image } }: Props) {
  return (
    <section className='flex flex-col w-full max-w-[319px]'>
      <div className='flex items-center pb-4'>
        {image && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className='rounded-full'
              width={56}
              height={56}
              src={image}
              alt='userImage'
            />
          </>
        )}
        <div className='flex flex-col px-5'>
          <span>{email?.split('@')[0]}</span>
          <span>{name}</span>
        </div>
      </div>
      <div>@2023 STARTGRAM FROM META</div>
    </section>
  );
}
