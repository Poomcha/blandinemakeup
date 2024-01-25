"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

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
      className={"link"}
    >
      <span className={"text"}>{name.toUpperCase()}</span>
      {isActive && (
        <Image
          src={"/icons/hint.svg"}
          alt="Lien actif."
          width={20}
          height={20}
        ></Image>
      )}
    </Link>
  );
}
