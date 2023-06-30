import { searchUser } from '@/service/user';
import { NextResponse } from 'next/server';

export async function GET() {
  return searchUser().then((data) => NextResponse.json(data));
}
