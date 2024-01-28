"use client";

import styles from "./home.module.css";
import cN from "classnames";
import LinkComponent from "@/components/link/link";
import { Context, useContext } from "react";
import { InstagramContext, InstagramI } from "@/context/instagram";
import { get_media_by_hashtag } from "./utils/instagram";
import Image from "next/image";
import Social from "@/components/social/social";
import { patrick_hand_sc } from "./font";
import { MenuStateContext } from "@/context/menu_state";

export default function Home() {
  const instagram = useContext(InstagramContext as Context<InstagramI>);
  const media_url = get_media_by_hashtag(instagram, "cover");
  const { open } = useContext(MenuStateContext);

  return (
    <div
      className={cN(
        [open ? "block-scroll" : "active-scroll"],
        styles.root,
        "page",
        "flex",
        "flex-column"
      )}
    >
      <div className={cN(styles.imgctn, "w-100pr", "p-relative")}>
        {media_url && (
          <Image
            src={media_url}
            alt="Photo de Couverture"
            fill
            priority
            className={cN("image", "margin-auto")}
          ></Image>
        )}
      </div>
      <section
        className={cN(
          [open ? "block-scroll" : "active-scroll"],
          styles.section,
          "w-100pr",
          "flex",
          "flex-column"
        )}
      >
        <h1 className={cN(styles.title, "w-100pr", patrick_hand_sc.className)}>
          Blandine Degenève <br />
          Makeup Artist
        </h1>
        <article
          className={cN("w-100pr", "flex", "flex-column ", styles.article)}
        >
          <p>
            {`Passionnée par le maquillage et le monde de la beauté depuis mon plus
jeune âge, j'ai fait de ma passion mon métier.`}
          </p>
          <p>
            {`J'ai commencé par une formation d'esthétique, basée principalement sur la beauté :
maquillage jour, soirée, mariage. Intégré une école de maquillage pour
élargir mes compétences, découvert le milieu de la scène comme le
théâtre ou l'opéra, l'artistique avec les body et face
painting, le cinéma avec les tournages et la photographie.`}
          </p>
          <p>
            {`Je travaille depuis pour des tournages, courts, moyens et longs métrages,
clips, shootings photos, spectacles et événements variés.`}
          </p>
          <p>
            Décrouvrez mes <a href="/realisations">RÉALISATIONS</a> !
          </p>
        </article>
        <div className={cN("flex", "w-100pr", styles.links)}>
          <LinkComponent
            action={() => {}}
            href={"/portfolio"}
            name={"portfolio"}
          ></LinkComponent>
          <LinkComponent
            action={() => {}}
            href={"/prestations"}
            name={"prestations"}
          ></LinkComponent>
        </div>
        <div className={cN(styles.contacts, "flex", "flex-center")}>
          <Social />
        </div>
      </section>
    </div>
  );
}
