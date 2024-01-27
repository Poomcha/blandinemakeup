"use client";

import styles from "./realisations.module.css";

import cN from "classnames";
import { patrick_hand_sc } from "../font";
import useWindowDimensions from "@/hooks/useWindowDimensions";

const globalSidePadding = 24;

export default function Realisations() {
  const clientWidth = useWindowDimensions().width;
  let ytWidth: number;
  if (clientWidth > 1200) {
    ytWidth = Math.round(clientWidth / 2) - 24;
  } else ytWidth = clientWidth;
  const projects = [
    {
      src: "https://www.youtube-nocookie.com/embed/ITGltFG3Xkg?si=-shZRWfwQxCEmGIp",
      title: "Maquillage pour le clip de Rozz: Flou",
      description: "",
    },
    {
      src: "https://www.youtube-nocookie.com/embed/CJD6AFFFBcI?si=1x9Ts1Pt3VAKEFeX",
      title: "Maquillage pour le clip de MaxxBud: Miroir Cassé",
      description: "",
    },
    {
      src: "https://www.youtube-nocookie.com/embed/e50xhBVSEGQ?si=Qj3-88wHhbkGrdz8",
      title:
        "Maquillage pour le court métrage du réalisateur Henry Ballester-Colonna: Douche Froide",
      description: "",
    },
    {
      src: "https://www.youtube-nocookie.com/embed/AsCQvYDXTMU?si=8JqglD-2qTZCBBt4",
      title: "Maquillage pour le clip de Da Torga Stora, par Daniel Lutz",
      description: "",
    },
    {
      src: "https://www.youtube-nocookie.com/embed/Fedr2oMSxkM?si=3toYiCjW9ok8aiBy",
      title:
        "Maquillage pour le film Chicane par Do The Film Prod. pour le festival Nikon cinéma 2022",
      description: "",
    },
  ];
  const YTIframe = (
    width = "560",
    height = "315",
    src: string,
    title = "Vidéo Youtube"
  ) => (
    <iframe
      width={width}
      height={height}
      src={src}
      title={title}
      frameBorder="0"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      loading="lazy"
      className={cN(styles.ytEmbed)}
    ></iframe>
  );
  const display = (
    width = `${Math.round(ytWidth)}`,
    height = `${Math.round(parseInt(width) / 1.77)}`,
    src: string,
    title = "Vidéo Youtube",
    description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.",
    key: number
  ) => (
    <figure className={cN(styles.display, "flex")} key={key}>
      <div
        className={cN(styles.display__group, "flex", "flex-column")}
        style={key % 2 === 0 ? { order: "0" } : { order: "1" }}
      >
        <h2
          className={cN(styles.display__title, patrick_hand_sc.className)}
          style={{ maxWidth: `${width}px` }}
        >
          {title}
        </h2>
        {YTIframe(width, height, src, title)}
      </div>
      <figcaption
        className={cN(styles.display__description, "flex", "flex-center")}
      >
        <p>{description}</p>
      </figcaption>
    </figure>
  );
  const gallery = projects.map((project, index) =>
    display(undefined, undefined, project.src, project.title, undefined, index)
  );
  return (
    <div
      className={cN(
        styles.root,
        "page",
        "flex",
        "flex-column",
        "h-100dvh",
        "w-100pr"
      )}
    >
      <h1 className={cN("title", patrick_hand_sc.className)}>RÉALISATIONS</h1>
      <section className={cN(styles.section, "flex", "flex-column", "w-100pr")}>
        {gallery}
      </section>
    </div>
  );
}
