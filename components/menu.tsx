import styles from './menu.module.css';
import { BaseSyntheticEvent, useContext, useState } from 'react';
import { PagesContext, PagesContextI, PagesI } from '@/context/pages';
import Link from 'next/link';
import Image from 'next/image';
import cN from 'classnames';

export default function Menu() {
  const { pages, setCurrentPage } = useContext(
    PagesContext
  ) as PagesContextI<PagesI>;

  const [showMenu, setShowMenu] = useState(false);

  const closeMenu = () => {
    setShowMenu(false);
  };
  const handleNav = (e: BaseSyntheticEvent) => {
    setCurrentPage((prev) => ({
      ...prev,
      current: prev.names.findIndex((name) => name === e.target.id),
    }));
    closeMenu();
  };

  const links = pages.names.map((name) => (
    <li key={name} className={styles.menu__links__link}>
      <Link
        href={
          ['portfolio', 'contact', 'prestations'].includes(name)
            ? `/${name}`
            : '/'
        }
        onClick={handleNav}
        id={name}
      >
        {name.toUpperCase()}
      </Link>
    </li>
  ));

  const handleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <>
      <button className={styles.menu__button} onClick={handleMenu}>
        {showMenu ? (
          <Image src="/icons/close.svg" alt="close" width={40} height={40} />
        ) : (
          <Image src="/icons/menu.svg" alt="menu" width={40} height={40} />
        )}
      </button>
      <nav
        className={cN(styles.menu, {
          [styles.showMenu]: showMenu,
          [styles.hideMenu]: !showMenu,
        })}
      >
        <ul className={styles.menu__links}>{links}</ul>
      </nav>
    </>
  );
}
