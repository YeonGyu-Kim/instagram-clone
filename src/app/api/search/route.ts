import { searchUser } from '@/service/user';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return searchUser().then((data) => NextResponse.json(data));
}
