'use client';

import styles from './home.module.css';
import cN from 'classnames';
import LinkComponent from '@/components/link/link';
import { Context, useContext } from 'react';
import { InstagramContext, InstagramI } from '@/context/instagram';
import { get_media_by_hashtag } from './utils/instagram';
import Image from 'next/image';
import Social from '@/components/social/social';

export default function Home() {
  const instagram = useContext(InstagramContext as Context<InstagramI>);
  const media_url = get_media_by_hashtag(instagram, 'cover');
  return (
    <div className={cN(styles.home, 'page')}>
      <div className={styles.imgctn}>
        {media_url && (
          <Image
            src={media_url}
            alt="Photo de Couverture"
            fill
            priority
            className={styles.image}
          ></Image>
        )}
      </div>
      <section className={styles.section}>
        <h1 className={styles.title}>
          Blandine Degenève
          <br />
          Makeup Artist
        </h1>
        <article className={styles.introduction}>
          <span>
            {`Passionnée par le maquillage et le monde de la beauté depuis mon plus
jeune âge, j'ai fait de ma passion mon métier. J'ai commencé par
une formation d'esthétique, basée principalement sur la beauté :
maquillage jour, soirée, mariage. Intégré une école de maquillage pour
élargir mes compétences, découvert le milieu de la scène comme le
théâtre ou l'opéra, l&apos;artistique avec les body et face
painting, le cinéma avec les tournages et la photographie. Je
travaille depuis pour des tournages, courts, moyens et longs métrages,
clips, shootings photos, spectacles et événements variés.`}
          </span>
          <span>
            Décrouvir mes{' '}
            <LinkComponent
              action={() => {}}
              href={'/realisations'}
              name="réalisations"
            ></LinkComponent>{' '}
            !
          </span>
        </article>
        <div className={styles.links}>
          <div className={styles.cards}>
            <LinkComponent
              action={() => {}}
              href={'/portfolio'}
              name={'portfolio'}
            ></LinkComponent>
          </div>
          <div className={styles.cards}>
            <LinkComponent
              action={() => {}}
              href={'/prestations'}
              name={'prestations'}
            ></LinkComponent>
          </div>
        </div>
        <div className={styles.contacts}>
          <Social />
        </div>
      </section>
    </div>
  );
}
