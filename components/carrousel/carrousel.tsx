"use client";

import styles from "./carrousel.module.css";

import { CarrouselPropsI } from "@/app/portfolio/page";
import { InstagramMediaI } from "@/context/instagram";
import {
  Dispatch,
  useEffect,
  useState,
  useRef,
  BaseSyntheticEvent,
} from "react";
import cN from "classnames";
import Image from "next/image";

export default function Carrousel(props: CarrouselPropsI) {
  const [images, setImages] = useState(undefined) as [
    undefined | InstagramMediaI[],
    Dispatch<InstagramMediaI[] | undefined>
  ];

  const [activeId, setActiveId] = useState(0);

  const getCarouselDatas = async (props: CarrouselPropsI) => {
    const server_url = process.env.NODE_ENV ? "" : "http://localhost:3000";
    const res = await fetch(`${server_url}/api/instagram?id=${props.id}`);
    const raw_data = await res.json();

    return raw_data.data;
  };

  const carrouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (props.is_album) {
      getCarouselDatas(props)
        .then((res) => setImages(res))
        .catch((err) => console.log(err));
    }

    carrouselRef.current?.addEventListener("scrollend", (e: any) => {
      const carrousel_width = e.target.clientWidth;
      const carrousel_offset = e.target.scrollLeft;
      const new_index = Math.round(carrousel_offset / carrousel_width);
      setActiveId(new_index);
    });

    return () => {
      setImages(undefined);
      setActiveId(0);
    };
  }, [props]);

  const computed_images =
    props.is_album && images ? (
      images.map((image, index) => {
        if (image.media_type === "IMAGE") {
          return (
            <div
              className={cN(styles.image_ctn, "p-relative", "w-100pr")}
              key={image.id}
              id={`${index}`}
            >
              <Image
                src={image.media_url}
                alt={"Image d'album @blandinemakeup34."}
                className={cN(styles.image, "image")}
                fill
              />
            </div>
          );
        }
        if (image.media_type === "VIDEO") {
          return (
            <div
              className={cN(styles.image_ctn, "p-relative", "w-100pr")}
              key={image.id}
              id={`${index}`}
            >
              <video
                src={image.media_url}
                autoPlay
                muted
                loop
                playsInline
              ></video>
            </div>
          );
        }
      })
    ) : (
      <div className={cN(styles.image_ctn, "p-relative", "image")}>
        {props.url ? (
          <Image
            src={props.url}
            alt={props.caption ? props.caption : "Image de @blandinemakeup34."}
            className={cN(styles.image, "w-100pr")}
            fill
          />
        ) : (
          <div className={cN("flex", "flex-center", "h-100pr")}>
            <div>Chargement</div>
          </div>
        )}
      </div>
    );

  const handleScrollIntoView = (e: BaseSyntheticEvent) => {
    if (e.target.dataset.action === "left" && !e.target.disabled) {
      carrouselRef.current?.scrollBy({
        top: 0,
        left: 0 - carrouselRef.current?.clientWidth,
        behavior: "smooth",
      });
    }
    if (e.target.dataset.action === "right" && !e.target.disabled) {
      carrouselRef.current?.scrollBy({
        top: 0,
        left: carrouselRef.current?.clientWidth,
        behavior: "smooth",
      });
    }
  };

  let link_dots;
  if (Array.isArray(computed_images) && images) {
    link_dots = images.map((image, index) => (
      <div
        className={cN(styles.linked_dot, "p-relative")}
        key={`${index}`}
        data-id={`${index}`}
        data-activeid={activeId ? activeId : 0}
        data-isactive={activeId === index}
      ></div>
    ));
  }

  return (
    <div className={cN(styles.root, "p-relative", "flex")} ref={carrouselRef}>
      {computed_images}
      {Array.isArray(computed_images) && images && (
        <>
          <div
            className={cN(
              styles.linked_dot_ctn,
              "bg-black",
              "white-border",
              "rounded",
              "flex"
            )}
          >
            {link_dots}
          </div>
          <>
            <button
              className={cN(
                styles.controller,
                styles.controller__left,
                "bg-black",
                "rounded",
                "white-border"
              )}
              disabled={activeId === 0}
              data-action="left"
              onClick={handleScrollIntoView}
            ></button>
            <button
              className={cN(
                styles.controller,
                styles.controller__right,
                "rounded",
                "white-border"
              )}
              disabled={activeId === images.length - 1}
              data-action="right"
              onClick={handleScrollIntoView}
            ></button>
          </>
        </>
      )}
    </div>
  );
}
