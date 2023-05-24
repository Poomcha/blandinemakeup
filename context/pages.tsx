import { createContext, Dispatch, SetStateAction, useState } from 'react';

export interface PagesI {
  names: string[];
  current: number;
}

export interface PagesContextI<T> {
  pages: T;
  setCurrentPage: Dispatch<SetStateAction<T>>;
}
interface PagesProviderI {
  children: React.ReactNode;
}

export const PagesContext = createContext<PagesContextI<PagesI> | null>(null);

const pagesNames = ['home', 'showcase', 'prestations', 'contact'];

export default function PageProvider({ children }: PagesProviderI) {
  const [pages, setCurrentPage] = useState<PagesI>({
    names: pagesNames,
    current: 0,
  });

  return (
    <PagesContext.Provider
      value={{ pages: pages, setCurrentPage: setCurrentPage }}
    >
      {children}
    </PagesContext.Provider>
  );
}
