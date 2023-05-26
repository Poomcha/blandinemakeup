import styles from './home.module.css';
import cN from 'classnames';

export default function Home() {
  return (
    <div className={cN(styles.home, 'page')}>
      <div className={styles.imgctn}>
        <span className={styles.temp}>IMAGE</span>
      </div>
      <section className={styles.section}>
        <h1 className={styles.title}>BLANDINEMAKEUP</h1>
        <article className={styles.introduction}>
          <span className={styles.temp}>DESCRIPTION</span>
        </article>
        <div className={styles.links}>
          <div className={styles.cards}>
            <span className={styles.temp}>PRESTATIONS</span>
          </div>
          <div className={styles.cards}>
            <span className={styles.temp}>PORTFOLIO</span>
          </div>
        </div>
        <div className={styles.contacts}>
          <div className={styles.contacticon}>
            <span className={styles.temp}>IG</span>
          </div>
          <div className={styles.contacticon}>
            <span className={styles.temp}>@</span>
          </div>
          <div className={styles.contacticon}>
            <span className={styles.temp}>LI</span>
          </div>
        </div>
      </section>
    </div>
  );
}
