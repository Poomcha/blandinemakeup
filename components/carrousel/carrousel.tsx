'use client';

import styles from './carrousel.module.css';

import { CarrouselPropsI } from '@/app/portfolio/page';
import { InstagramMediaI } from '@/context/instagram';
import { Dispatch, MouseEvent, useEffect, useState } from 'react';
import Image from 'next/image';

export default function Carrousel(props: CarrouselPropsI) {
  const [images, setImages] = useState(undefined) as [
    undefined | InstagramMediaI[],
    Dispatch<InstagramMediaI[] | undefined>
  ];

  const [activeId, setActiveId] = useState('');

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
  }, [props]);

  const computed_images =
    props.is_album && images ? (
      images.map((image, index) => (
        <div
          className={styles.image_ctn}
          key={image.id}
          id={`${image.id}-${index}`}
        >
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

  const handleScrollIntoView = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const target = document.getElementById(e.target.dataset.id);
    target?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'start',
    });
    setActiveId(e.target.dataset.id);
  };

  let link_dots;
  if (Array.isArray(computed_images) && images) {
    link_dots = images.map((image, index, array) => (
      <button
        className={styles.linked_dot}
        key={`${image.id}-${index}`}
        data-id={`${image.id}-${index}`}
        data-activeid={activeId ? activeId : `${array[0].id}-${0}`}
        data-isactive={
          activeId &&
          images.find((image) => `${image.id}` === activeId.split('-')[0])
            ? `${image.id}-${index}` === activeId
            : `${array[0].id}-${0}` === `${image.id}-${index}`
        }
        onClick={handleScrollIntoView}
      ></button>
    ));
  }

  return (
    <div className={styles.carrousel}>
      {computed_images}
      {Array.isArray(computed_images) && images && (
        <div className={styles.linked_dot_ctn}>{link_dots}</div>
      )}
    </div>
  );
}
