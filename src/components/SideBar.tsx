import { AuthUser } from '../model/user';
import Avatar from './Avatar';

type Props = {
  user: AuthUser;
};

export default function SideBar({ user: { name, email, image } }: Props) {
  return (
    <section className='flex flex-col w-full max-w-[319px] ml-6'>
      <div className='flex items-center pb-4'>
        {image && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Avatar image={image} size='medium' highlight={false} />
          </>
        )}
        <div className='flex flex-col px-4'>
          <span>{email?.split('@')[0]}</span>
          <span>{name}</span>
        </div>
      </div>
      <div>@2023 STARTGRAM FROM META</div>
    </section>
  );
}
