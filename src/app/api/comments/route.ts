import { NextRequest, NextResponse } from 'next/server';
import { addComment } from '@/service/posts';
import { withSessionUser } from '@/util/session';

export async function POST(req: NextRequest) {
  return withSessionUser(async (sub) => {
    const { id, comment } = await req.json();

    if (!id || comment === undefined) {
      return new Response('Bad Request', { status: 400 });
    }
    return addComment(id, comment, sub)
      .then((data) => NextResponse.json(data))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  }, req);
}
