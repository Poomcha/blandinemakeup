'use client';

import { createContext, useEffect, useState } from 'react';

export interface InstagramMediaI {
  id: string;
  media_url: string;
  caption: string;
  is_share_to_feed?: boolean;
  media_type?: ['IMAGE', 'VIDEO', 'CAROUSEL_ALBUM'];
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
  const api_url = process.env.NODE_ENV ? '' : 'http://localhost:3000';
  const res = await fetch(`${api_url}/api/instagram`);
  const data = await res.json();
  return data;
};

export default function InstagramProvider({ children }: InstagramProviderI) {
  const [data, setData] = useState(undefined);
  useEffect(() => {
    getData().then((data) => setData(data));
  }, []);
  return (
    <InstagramContext.Provider value={data}>
      {children}
    </InstagramContext.Provider>
  );
}
