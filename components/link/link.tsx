import { PagesContextI, PagesContext, PagesI } from '@/context/pages';
import Link from 'next/link';
import { BaseSyntheticEvent, useContext } from 'react';

interface PropsI {
  action: () => void;
  href: string;
  name: string;
  openNew?: boolean;
}

export default function LinkComponent({ action, href, name, openNew }: PropsI) {
  const { pages, setCurrentPage } = useContext(
    PagesContext
  ) as PagesContextI<PagesI>;

  const handleNav = (e: BaseSyntheticEvent) => {
    setCurrentPage((prev) => ({
      ...prev,
      current: prev.names.findIndex((name) => name === e.target.id),
    }));
    action();
  };

  return (
    <Link
      href={href}
      onClick={handleNav}
      id={name}
      target={openNew ? '_blank' : '_self'}
    >
      {name}
    </Link>
  );
}
