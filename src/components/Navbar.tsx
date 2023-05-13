'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <section>
      <div>
        {session ? (
          <div onClick={() => signOut()}>로그아웃</div>
        ) : (
          <div onClick={() => signIn()}>로그인</div>
        )}
      </div>
    </section>
  );
}
