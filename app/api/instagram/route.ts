import { InstagramMediaI } from '@/context/instagram';
import { NextResponse } from 'next/server';

export async function GET() {
  const fields = [
    'id',
    'caption',
    'is_shared_to_feed',
    'media_type',
    'media_url',
    'permalink',
    'thumbnail_url',
    'timestamp',
    'username',
  ];
  const entries_limit = 1000000;
  const request_url = `${
    process.env.INSTAGRAM_URL
  }/me/media?fields=${fields.join()}&access_token=${
    process.env.INSTAGRAM_TOKEN
  }&limit=${entries_limit}`;

  const res = await fetch(request_url);
  const raw_data = await res.json();

  return NextResponse.json(raw_data);
}
