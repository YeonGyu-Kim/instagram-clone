import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { getProviders } from 'next-auth/react';
import Signin from '@/components/Signin';
import { authOptions } from '../../api/auth/[...nextauth]/route';

type Props = {
  searchParams: { callbackUrl: string };
};

export default async function SigninPage({
  searchParams: { callbackUrl },
}: Props) {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/');
  }
  const providers = (await getProviders()) ?? {};
  return (
    <>
      <Signin providers={providers} callbackUrl={callbackUrl} />
    </>
  );
}
