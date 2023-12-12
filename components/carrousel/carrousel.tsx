'use client';

import styles from './carrousel.module.css';

import { CarrouselPropsI } from '@/app/portfolio/page';
import { InstagramMediaI } from '@/context/instagram';
import { Dispatch, useEffect, useState } from 'react';
import cN from 'classnames';
import Image from 'next/image';

export default function Carrousel(props: CarrouselPropsI) {
  const [images, setImages] = useState(undefined) as [
    undefined | InstagramMediaI[],
    Dispatch<InstagramMediaI[] | undefined>
  ];

  const [activeId, setActiveId] = useState(0);

  const getCarouselDatas = async (props: CarrouselPropsI) => {
    const server_url = process.env.NODE_ENV ? '' : 'http://localhost:3000';
    const res = await fetch(`${server_url}/api/instagram?id=${props.id}`);
    const raw_data = await res.json();

    return raw_data.data;
  };

  useEffect(() => {
    if (props.is_album) {
      getCarouselDatas(props)
        .then((res) => setImages(res))
        .catch((err) => console.log(err));
    }

    const carrousel = document.querySelector('#carrousel');
    carrousel?.addEventListener('scrollend', (e: any) => {
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
      images.map((image, index) => (
        <div className={styles.image_ctn} key={image.id} id={`${index}`}>
          <Image
            src={image.media_url}
            alt={"Image d'album @blandinemakeup34."}
            className={styles.image}
            fill
          />
        </div>
      ))
    ) : (
      <div className={styles.image_ctn}>
        {props.url ? (
          <Image
            src={props.url}
            alt={props.caption ? props.caption : 'Image de @blandinemakeup34.'}
            className={styles.image}
            fill
          />
        ) : (
          <></>
        )}
      </div>
    );

  const handleScrollIntoView = (e: any) => {
    const container = document.querySelector('#carrousel');
    if (e.target.dataset.action === 'left' && !e.target.disabled) {
      container?.scrollBy({
        top: 0,
        left: 0 - container.clientWidth,
        behavior: 'smooth',
      });
    }
    if (e.target.dataset.action === 'right' && !e.target.disabled) {
      container?.scrollBy({
        top: 0,
        left: container.clientWidth,
        behavior: 'smooth',
      });
    }
  };

  let link_dots;
  if (Array.isArray(computed_images) && images) {
    link_dots = images.map((image, index) => (
      <button
        className={styles.linked_dot}
        key={`${index}`}
        data-id={`${index}`}
        data-activeid={activeId ? activeId : 0}
        data-isactive={activeId === index}
      ></button>
    ));
  }

  return (
    <div className={styles.carrousel} id="carrousel">
      {computed_images}
      {Array.isArray(computed_images) && images && (
        <>
          <div className={cN(styles.linked_dot_ctn, 'glassmorphism')}>
            {link_dots}
          </div>
          <>
            <button
              className={cN(
                styles.controller,
                styles.controller__left,
                'controller',
                'glassmorphism'
              )}
              disabled={activeId === 0}
              data-action="left"
              onClick={handleScrollIntoView}
            ></button>
            <button
              className={cN(
                styles.controller,
                styles.controller__right,
                'controller',
                'glassmorphism'
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
