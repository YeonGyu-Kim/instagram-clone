import { NextRequest, NextResponse } from 'next/server';
import { addBookmark, removeBookmark } from '@/service/user';
import { withSessionUser } from '@/util/session';

export async function PUT(req: NextRequest) {
  return withSessionUser(async (sub) => {
    const { id, bookmark } = await req.json();

    if (!id || bookmark === undefined) {
      return new Response('Bad Request', { status: 400 });
    }
    const request = bookmark ? addBookmark : removeBookmark;
    return request(id, sub)
      .then((data) => NextResponse.json(data))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  }, req);
}
