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
import React from 'react';

const categories = [
  'tout',
  'beauty',
  'artistic',
  'tournage',
  'shooting',
  'backstage',
  'event',
  'fx',
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
  const [modalOpen, setModalOpen] = useState(false);

  let modal: HTMLDialogElement | null;

  const [activeCategory, setActiveCategory] = useState('tout');

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
    setModalOpen(true);
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
    setModalOpen(false);
  };

  const gallery = instagram
    ? instagram.data
        .filter((media) => media.media_type !== 'VIDEO')
        .filter((media) =>
          activeCategory === 'tout'
            ? media
            : media.caption?.includes(activeCategory)
        )
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

  const handleScrollBy = (e: any) => {
    const container = document.querySelector('#filters_scroll');
    if (e.target.dataset.action === 'left') {
      container?.scrollBy({
        top: 0,
        left: 0 - container.clientWidth / 1.5,
        behavior: 'smooth',
      });
    }
    if (e.target.dataset.action === 'right') {
      container?.scrollBy({
        top: 0,
        left: container.clientWidth / 1.5,
        behavior: 'smooth',
      });
    }
  };

  const handleFilter = (e: any) => {
    setActiveCategory(e.target.dataset.category);
  };

  return (
    <div className={cN(styles.portfolio, 'page')} data-modalopen={modalOpen}>
      <h1 className={styles.title}>PORTFOLIO</h1>
      <div className={styles.filters_ctn}>
        <button
          className={cN(
            styles.controller,
            styles.controller__left,
            'controller',
            'glassmorphism'
          )}
          data-action="left"
          onClick={handleScrollBy}
        ></button>
        <button
          className={cN(
            styles.controller,
            styles.controller__right,
            'controller',
            'glassmorphism'
          )}
          data-action="right"
          onClick={handleScrollBy}
        ></button>
        <div className={styles.filters_hint}>
          <div className={styles.filters_overflow} id="filters_scroll">
            {categories.map((category, index) => (
              <React.Fragment key={category + index}>
                <a
                  className={styles.filter}
                  data-category={category}
                  data-active={activeCategory === category}
                  onClick={handleFilter}
                >
                  {category.toUpperCase()}
                </a>
                {index < categories.length - 1 && <div>|</div>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <section className={styles.gallery}>{gallery}</section>
      <dialog className={styles.dialog}>
        <button
          className={cN(styles.close_button, 'glassmorphism')}
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
