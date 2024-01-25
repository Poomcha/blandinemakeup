"use client";

import styles from "./menu.module.css";
import { useState } from "react";
import LinkComponent from "../link/link";
import Image from "next/image";
import cN from "classnames";

export default function Menu() {
  const [showMenu, setShowMenu] = useState(false);

  const closeMenu = () => {
    setShowMenu(false);
  };

  const navigationLinks = [
    "accueil",
    "portfolio",
    "realisations",
    "prestations",
    "contact",
  ];

  const links = navigationLinks.map((name) => (
    <li key={name} className={styles.menu__links__link}>
      <LinkComponent
        action={closeMenu}
        href={
          ["portfolio", "contact", "prestations", "realisations"].includes(name)
            ? `/${name}`
            : "/"
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
      <button
        className={cN(styles.menu__button, "rounded")}
        onClick={handleMenu}
      >
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
