"use client";

import styles from "./link.module.css";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import cN from "classnames";

interface PropsI {
  action?: () => void;
  href: string;
  name: string;
  openNew?: boolean;
  classnames?: string[];
}

export default function LinkComponent({
  action,
  href,
  name,
  openNew,
  classnames,
}: PropsI) {
  const pathName = usePathname();
  const isActive =
    name === pathName.slice(1)
      ? true
      : name === "accueil" && pathName === "/"
      ? true
      : false;

  return (
    <Link
      onClick={action}
      href={href}
      id={name}
      target={openNew ? "_blank" : "_self"}
      className={cN("flex", "flex-center", classnames?.join(" "))}
    >
      <span
        className={cN(
          styles.link__text,
          "gradient-underline",
          "purple-box-shadow-y"
        )}
      >
        {name === "realisations"
          ? "réalisations".toUpperCase()
          : name.toUpperCase()}
      </span>
      {isActive && (
        <div className={cN("flex")}>
          <Image
            src={"/icons/hint.svg"}
            alt="Lien actif."
            width={40}
            height={40}
            className={cN("margin-auto")}
          ></Image>
        </div>
      )}
    </Link>
  );
}
