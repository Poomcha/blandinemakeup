'use client';

import styles from './menu.module.css';
import { useContext, useState } from 'react';
import { PagesContext, PagesContextI, PagesI } from '@/context/pages';
import LinkComponent from './link';
import Image from 'next/image';
import cN from 'classnames';

export default function Menu() {
  const { pages } = useContext(
    PagesContext
  ) as PagesContextI<PagesI>;

  const [showMenu, setShowMenu] = useState(false);

  const closeMenu = () => {
    setShowMenu(false);
  };

  const links = pages.names.map((name) => (
    <li key={name} className={styles.menu__links__link}>
      <LinkComponent
        action={closeMenu}
        href={
          ['portfolio', 'contact', 'prestations'].includes(name)
            ? `/${name}`
            : '/'
        }
        name={name}
      ></LinkComponent>
    </li>
  ));

  const handleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <>
      <button className={styles.menu__button} onClick={handleMenu}>
        {showMenu ? (
          <Image
            src="/icons/close.svg"
            alt="close"
            width={40}
            height={40}
            className={styles.menu__button__icon}
          />
        ) : (
          <Image
            src="/icons/menu.svg"
            alt="menu"
            width={40}
            height={40}
            className={styles.menu__button__icon}
          />
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
