import { NextRequest, NextResponse } from 'next/server';
import { follow, unfollow } from '@/service/user';
import { withSessionUser } from '@/util/session';

export async function PUT(req: NextRequest) {
  return withSessionUser(async (sub) => {
    const { id: targetId, follow: isFollow } = await req.json();

    if (!targetId || isFollow === undefined) {
      return new Response('Bad Request', { status: 400 });
    }
    const request = isFollow ? follow : unfollow;
    return request(targetId, sub)
      .then((data) => NextResponse.json(data))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  }, req);
}
