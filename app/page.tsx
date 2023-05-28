'use client';

import styles from './home.module.css';
import cN from 'classnames';
import LinkComponent from '@/components/link';

export default function Home() {
  return (
    <div className={cN(styles.home, 'page')}>
      <div className={styles.imgctn}>
        <span className={styles.temp}>IMAGE</span>
      </div>
      <section className={styles.section}>
        <h1 className={styles.title}>TITRE</h1>
        <article className={styles.introduction}>
          <span className={styles.temp}>DESCRIPTION</span>
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
          <div className={styles.contacticon}>
            <LinkComponent
              action={() => {}}
              href={'https://www.instagram.com/blandinemakeup34/'}
              openNew={true}
              name={'instagram'}
            ></LinkComponent>
          </div>
          <div className={styles.contacticon}>
            <LinkComponent
              action={() => {}}
              href={'mailto:blandine.degeneve@gmail.com'}
              name={'email'}
            ></LinkComponent>{' '}
          </div>
          <div className={styles.contacticon}>
            <LinkComponent
              action={() => {}}
              href={'https://www.linkedin.com/in/blandine-degeneve-81178b172/'}
              openNew={true}
              name={'linkedIn'}
            ></LinkComponent>
          </div>
        </div>
      </section>
    </div>
  );
}
