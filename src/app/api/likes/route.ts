import { NextRequest, NextResponse } from 'next/server';
import { dislikePost, likePost } from '@/service/posts';
import { withSessionUser } from '@/util/session';

export async function PUT(req: NextRequest) {
  return withSessionUser(async (sub) => {
    const { id, like } = await req.json();

    if (!id || like === undefined) {
      return new Response('Bad Request', { status: 400 });
    }
    const request = like ? likePost : dislikePost;
    return request(id, sub)
      .then((data) => NextResponse.json(data))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  }, req);
}
