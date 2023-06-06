import PostList from '@/components/PostList';
import SideBar from '@/components/SideBar';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import FollowingBox from '@/components/FollowingBax';

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <section className='flex justify-center py-4'>
      <div className='w-full max-w-[470px]'>
        <FollowingBox />
        <PostList />
      </div>
      <SideBar user={user} />
    </section>
  );
}
