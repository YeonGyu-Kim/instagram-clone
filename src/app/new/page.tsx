import NewPost from '@/components/NewPost';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

export const metaData: Metadata = {
  title: 'New Post',
  description: 'Create a new post',
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/auth/signin');
  }
  return <NewPost user={session?.user}></NewPost>;
}
