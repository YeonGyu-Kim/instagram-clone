import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function withSessionUser(
  handler: (sub?: string) => Promise<Response>,
  req: NextRequest
): Promise<Response> {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req, secret });

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  return handler(token?.sub);
}
