'use client';

import styles from './carrousel.module.css';

import { CarrouselPropsI } from '@/app/portfolio/page';
import { InstagramMediaI } from '@/context/instagram';
import { Dispatch, useEffect, useState } from 'react';
import Image from 'next/image';

export default function Carrousel(props: CarrouselPropsI) {
  const [images, setImages] = useState(undefined) as [
    undefined | InstagramMediaI[],
    Dispatch<InstagramMediaI[] | undefined>
  ];

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
      images.map((image) => (
        <div className={styles.image_ctn} key={image.id}>
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

  return <div className={styles.carrousel}>{computed_images}</div>;
}
