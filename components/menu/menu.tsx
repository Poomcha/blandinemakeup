"use client";

import styles from "./menu.module.css";
import { useContext, useState } from "react";
import LinkComponent from "../link/link";
import Image from "next/image";
import cN from "classnames";
import { patrick_hand_sc } from "@/app/font";
import { MenuStateContext } from "@/context/menu_state";

export default function Menu() {
  const [showMenu, setShowMenu] = useState(false);
  const menuState = useContext(MenuStateContext);

  const closeMenu = () => {
    setShowMenu(false);
    menuState.setOpen(false);
  };

  const navigationLinks = [
    "accueil",
    "portfolio",
    "realisations",
    "prestations",
    "contact",
  ];

  const links = navigationLinks.map((name) => (
    <li key={name}>
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
    menuState.setOpen((prev) => !prev);
  };

  return (
    <>
      <button
        className={cN(
          styles.button,
          "button",
          "bg-black",
          "rounded",
          "p-absolute",
          "flex",
          "flex-center"
        )}
        onClick={handleMenu}
      >
        {showMenu ? (
          <Image
            src="/icons/close.svg"
            alt="close"
            width={40}
            height={40}
            className={styles.button__icon}
          />
        ) : (
          <Image
            src="/icons/menu.svg"
            alt="menu"
            width={40}
            height={40}
            className={styles.button__icon}
          />
        )}
      </button>
      <nav
        className={cN(
          styles.root,
          patrick_hand_sc.className,
          "bg-black",
          "fullscreen",
          {
            [styles.showMenu]: showMenu,
            [styles.hideMenu]: !showMenu,
          }
        )}
      >
        <ul
          className={cN(
            styles.links,
            "flex",
            "flex-column",
            "flex-center",
            "fullscreen"
          )}
        >
          {links}
        </ul>
      </nav>
    </>
  );
}
