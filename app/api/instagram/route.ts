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
    'children',
  ];
  const entries_limit = 1000000;
  const global_request_url = `${
    process.env.INSTAGRAM_URL
  }/me/media?fields=${fields.join()}&access_token=${
    process.env.INSTAGRAM_TOKEN
  }&limit=${entries_limit}`;

  const res = await fetch(global_request_url);
  const raw_data = await res.json();

  // const carousel_request_url = (media_id: string) =>
  //   `${
  //     process.env.INSTAGRAM_URL
  //   }/${media_id}?fields=${fields.join()}&access_token=${
  //     process.env.INSTAGRAM_TOKEN
  //   }&limit=${entries_limit}`;

  return NextResponse.json(raw_data);
}
