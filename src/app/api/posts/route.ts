import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { createPost, getFollowingPostOf } from '@/service/posts';
import { getToken } from 'next-auth/jwt';

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const username = user?.email.split('@')[0] || '';

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  return getFollowingPostOf(username).then((data) => NextResponse.json(data));
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req, secret });

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  const form = await req.formData();
  const text = form.get('text')?.toString();
  const file = form.get('file') as Blob;

  if (!text || !file) {
    return new Response('Bad Request', { status: 400 });
  }

  return createPost(text, file, token?.sub).then((data) =>
    NextResponse.json(data)
  );
}
