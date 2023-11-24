'use client';

import { filter_medias } from '@/app/utils/instagram';
import { Dispatch, createContext, useEffect, useState } from 'react';

export interface InstagramMediaI {
  id: string;
  media_url: string;
  caption: string | undefined;
  is_share_to_feed?: boolean;
  media_type?: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  children?: {
    data: { id: string }[];
  };
  permalink?: string;
  thumbnail_url?: string;
  timestamp?: number;
  username?: string;
}

export interface InstagramI {
  data: InstagramMediaI[];
  paging: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
  };
}

interface InstagramProviderI {
  children: React.ReactNode;
}

export const InstagramContext = createContext<
  InstagramI | undefined | Promise<any>
>(undefined);

const getData = async () => {
  const server_url = process.env.NODE_ENV ? '' : 'http://localhost:3000';
  const res = await fetch(`${server_url}/api/instagram`);
  const data = await res.json();

  return data;
};

export default function InstagramProvider({ children }: InstagramProviderI) {
  const [data, setData] = useState(undefined) as [
    undefined | InstagramI,
    Dispatch<InstagramI | undefined>
  ];
  useEffect(() => {
    getData().then((data) => setData(filter_medias(data)));
  }, []);
  return (
    <InstagramContext.Provider value={data}>
      {children}
    </InstagramContext.Provider>
  );
}
