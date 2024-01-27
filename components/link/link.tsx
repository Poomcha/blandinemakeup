"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import cN from "classnames";

interface PropsI {
  action?: () => void;
  href: string;
  name: string;
  openNew?: boolean;
}

export default function LinkComponent({ action, href, name, openNew }: PropsI) {
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
      className={cN("flex", "flex-center")}
    >
      <span>
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
