"use client";

import styles from "./portfolio.module.css";
import {
  InstagramContext,
  InstagramI,
  InstagramMediaI,
} from "@/context/instagram";
import Image from "next/image";
import {
  Context,
  useContext,
  useEffect,
  useState,
  useRef,
  BaseSyntheticEvent,
} from "react";
import cN from "classnames";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import Carrousel from "@/components/carrousel/carrousel";
import React from "react";
import { patrick_hand_sc } from "../font";
import Social from "@/components/social/social";

const categories = [
  "tout",
  "beauty",
  "artistic",
  "tournage",
  "shooting",
  "backstage",
  "event",
  "fx",
];

export interface CarrouselPropsI {
  is_album: boolean;
  id: string | undefined;
  url: string | undefined;
  caption?: string;
}

export default function Portfolio() {
  const instagram = useContext(InstagramContext as Context<InstagramI>);
  const wDimensions = useWindowDimensions();
  const imageDimensions = wDimensions.width / 3.16;
  const [modalOpen, setModalOpen] = useState(false);

  const modalRef = useRef<HTMLDialogElement>(null);
  const filtersContainerRef = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = useState("tout");

  const [carrousel_props, setCarrouselProps] = useState({
    is_album: false,
    id: undefined,
    url: undefined,
    caption: undefined,
  } as CarrouselPropsI);

  const handleClick = (media: InstagramMediaI) => {
    modalRef.current?.showModal();
    setModalOpen(true);
    if (media.media_type === "CAROUSEL_ALBUM") {
      setCarrouselProps({
        is_album: true,
        id: media.id,
        url: undefined,
        caption: undefined,
      });
    } else {
      setCarrouselProps({
        is_album: true,
        id: undefined,
        url: media.media_url,
        caption: media.caption,
      });
    }
  };

  const handleClose = () => {
    setCarrouselProps({
      is_album: false,
      id: undefined,
      url: undefined,
      caption: undefined,
    });
    modalRef.current?.close();
    setModalOpen(false);
  };

  const gallery = instagram
    ? instagram.data
        .filter((media) => media.media_type !== "VIDEO")
        .filter((media) =>
          activeCategory === "tout"
            ? media
            : media.caption?.includes(`#${activeCategory.toLowerCase()}`)
        )
        .map((media) => (
          <div
            className={cN(styles.image_ctn, "p-relative", "flex")}
            key={media.id}
          >
            <Image
              src={media.media_url}
              alt={
                media.caption
                  ? media.caption
                  : "Image aléatoire de @blandinemakeup34."
              }
              width={imageDimensions}
              height={imageDimensions}
              className={cN(styles.image)}
              onClick={() => handleClick(media)}
            />
            {media.media_type === "CAROUSEL_ALBUM" && (
              <div
                onClick={() => handleClick(media)}
                className={cN("p-absolute", styles.albumHint)}
              ></div>
            )}
          </div>
        ))
    : [];

  const handleScrollBy = (e: BaseSyntheticEvent) => {
    const container = filtersContainerRef.current;
    if (e.target.dataset.action === "left") {
      container?.scrollBy({
        top: 0,
        left: 0 - container.clientWidth / 1.5,
        behavior: "smooth",
      });
    }
    if (e.target.dataset.action === "right") {
      container?.scrollBy({
        top: 0,
        left: container.clientWidth / 1.5,
        behavior: "smooth",
      });
    }
  };

  const handleFilter = (e: BaseSyntheticEvent) => {
    setActiveCategory(e.target.dataset.category);
  };

  return (
    <div
      className={cN(styles.root, "page", "flex", "flex-column", "h-100dvh")}
      data-modalopen={modalOpen}
    >
      <h1 className={cN("title", patrick_hand_sc.className)}>PORTFOLIO</h1>
      <div className={cN(styles.filters_ctn, "p-relative", "flex")}>
        <button
          className={cN(styles.controller, styles.controller__left)}
          data-action="left"
          onClick={handleScrollBy}
        ></button>
        <button
          className={cN(styles.controller, styles.controller__right)}
          data-action="right"
          onClick={handleScrollBy}
        ></button>
        <div className={styles.filters_hint}>
          <div
            className={cN(styles.filters_overflow, "flex", "flex-row")}
            ref={filtersContainerRef}
          >
            {categories.map((category, index) => (
              <React.Fragment key={category + index}>
                <a
                  className={cN(styles.filter, "rounded", "white-border")}
                  data-category={category}
                  data-active={activeCategory === category}
                  onClick={handleFilter}
                >
                  {category.toUpperCase()}
                </a>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <section className={cN(styles.gallery, "flex")}>
        {gallery}
        <div className={cN(styles.contacts, "flex", "flex-center")}>
          <Social />
        </div>
      </section>
      <dialog
        className={cN(styles.dialog, "rounded", "white-border")}
        ref={modalRef}
      >
        <button
          className={cN(
            styles.close_button,
            "button",
            "flex",
            "flex-center",
            "rounded",
            "white-border"
          )}
          onClick={handleClose}
        >
          <Image src="/icons/close.svg" alt="Fermer" width={20} height={20} />
        </button>
        <Carrousel
          is_album={carrousel_props.is_album}
          id={carrousel_props.id}
          url={carrousel_props.url}
          caption={carrousel_props.caption}
        />
      </dialog>
    </div>
  );
}
