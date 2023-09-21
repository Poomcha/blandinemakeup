'use client';

import styles from './portfolio.module.css';
import { InstagramContext, InstagramI } from '@/context/instagram';
import Image from 'next/image';
import { Context, useContext } from 'react';
import cN from 'classnames';
import useWindowDimensions from '@/hooks/useWindowDimensions';

const categories = [
  'beauté',
  'artistique',
  'tournage',
  'shooting',
  'backstage',
];

export default function Portfolio() {
  const instagram = useContext(InstagramContext as Context<InstagramI>);
  const wDimensions = useWindowDimensions();
  const imageDimensions = (wDimensions.width - 18) / 3;
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
            />
          </div>
        ))
    : [];

  return (
    <div className={cN(styles.portfolio, 'page')}>
      <h1 className={styles.title}>PORTFOLIO</h1>
      <section className={styles.gallery}>{gallery}</section>
    </div>
  );
}
