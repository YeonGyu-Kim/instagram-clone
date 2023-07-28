import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { getToken } from 'next-auth/jwt';
import { follow, unfollow } from '@/service/user';

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req, secret });
  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  const { id: targetId, follow: isFollow } = await req.json();

  if (!targetId || isFollow === undefined) {
    return new Response('Bad Request', { status: 400 });
  }
  const request = isFollow ? follow : unfollow;
  return request(targetId, token?.sub)
    .then((data) => NextResponse.json(data))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
