'use client';

import styles from './portfolio.module.css';
import {
  InstagramContext,
  InstagramI,
  InstagramMediaI,
} from '@/context/instagram';
import Image from 'next/image';
import { Context, useContext, useEffect, useState } from 'react';
import cN from 'classnames';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import Carrousel from '@/components/carrousel/carrousel';

const categories = [
  'beauté',
  'artistique',
  'tournage',
  'shooting',
  'backstage',
  'évênements',
  'FX',
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
  const imageDimensions = wDimensions.width / 3.1;

  let modal: HTMLDialogElement | null;

  useEffect(() => {
    modal = document.querySelector('dialog');
  });

  const [carrousel_props, setCarrouselProps] = useState({
    is_album: false,
    id: undefined,
    url: undefined,
    caption: undefined,
  } as CarrouselPropsI);

  const handleClick = (media: InstagramMediaI) => {
    modal?.showModal();
    if (media.media_type === 'CAROUSEL_ALBUM') {
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
    modal?.close();
  };

  const gallery = instagram
    ? instagram.data
        .filter((media) => media.media_type !== 'VIDEO')
        .map((media) => (
          <div className={styles.image_ctn} key={media.id}>
            <Image
              src={media.media_url}
              alt={
                media.caption
                  ? media.caption
                  : 'Image aléatoire de @blandinemakeup34.'
              }
              width={imageDimensions}
              height={imageDimensions}
              className={styles.image}
              onClick={() => handleClick(media)}
            />
          </div>
        ))
    : [];

  return (
    <div className={cN(styles.portfolio, 'page')}>
      <h1 className={styles.title}>PORTFOLIO</h1>
      <section className={styles.gallery}>{gallery}</section>
      <dialog className={styles.dialog}>
        <button className={styles.close_button} onClick={handleClose}>
          <Image src="/icons/close.svg" alt="Fermer" width={15} height={15} />
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
