'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { BiSearch } from 'react-icons/bi';
import { Caveat } from 'next/font/google';
import Avatar from './Avatar';
import Link from 'next/link';
import NavbarButton from './NavbarButton';

const caveat = Caveat({ subsets: ['latin'] });

export default function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <section className='flex flex-col w-full laptop:w-[200px] max-w-[240px] h-screen p-6 bg-bg-black items-between justify-between'>
      <div>
        <Link href='/' className={`text-[36px] ${caveat.className}`}>
          stargram
        </Link>
        <div>
          {/*  <input className='bg-btn-gray outline-none px-4 py-[6px] rounded-md w-[40vw] max-w-[300px]'></input>
        <BiSearch
          size={18}
          className='absolute top-[10px] left-[14px] opacity-50'
        />  */}
          <NavbarButton />
        </div>
      </div>
      <div className='flex items-center'>
        {user && <Avatar image={user?.image} highlight={false} />}
        {session ? (
          <div className='text-btn-blue' onClick={() => signOut()}>
            로그아웃
          </div>
        ) : (
          <div className='text-btn-blue' onClick={() => signIn()}>
            로그인
          </div>
        )}
      </div>
    </section>
  );
}
