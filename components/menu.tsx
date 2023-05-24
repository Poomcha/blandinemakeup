import { BaseSyntheticEvent, useContext } from 'react';
import { PagesContext, PagesContextI, PagesI } from '@/context/pages';
import Link from 'next/link';

export default function Menu() {
  const { pages, setCurrentPage } = useContext(
    PagesContext
  ) as PagesContextI<PagesI>;

  const handleNav = (e: BaseSyntheticEvent) => {
    setCurrentPage((prev) => ({
      ...prev,
      current: prev.names.findIndex((name) => name === e.target.id),
    }));
  };

  const links = pages.names.map((name) => (
    <li key={name}>
      <Link
        href={name === 'home' ? '/' : `/${name}`}
        onClick={handleNav}
        id={name}
      >
        {name}
      </Link>
    </li>
  ));

  return (
    <nav>
      <ul>{links}</ul>
    </nav>
  );
}
