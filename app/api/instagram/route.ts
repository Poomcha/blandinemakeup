import { NextResponse } from 'next/server';

export async function GET(req: Request) {
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
  const entries_limit = 100000;
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (id) {
    const url = `${process.env.INSTAGRAM_URL}/${id}/children?fields=id,media_url&access_token=${process.env.INSTAGRAM_TOKEN}`;
    const res = await fetch(url);
    const raw_data = await res.json();

    return NextResponse.json(raw_data);
  } else {
    const url = `${
      process.env.INSTAGRAM_URL
    }/me/media?fields=${fields.join()}&access_token=${
      process.env.INSTAGRAM_TOKEN
    }&limit=${entries_limit}`;

    const res = await fetch(url);
    const raw_data = await res.json();

    return NextResponse.json(raw_data);
  }
}
