import Link from 'next/link';
import LinkComponent from '../link/link';
import styles from './social.module.css';
import cN from 'classnames';
import Image from 'next/image';

export default function Social() {
  return (
    <div className={cN(styles.social, 'glassmorphism', 'rounded')}>
      <Link
        href={'https://www.instagram.com/blandinemakeup34/'}
        target="_blank"
        id={'instagram'}
      >
        <Image
          src={'/icons/instagram.png'}
          width={192}
          height={192}
          alt="Logo d\'instagram"
          className={styles.icon}
        />
      </Link>
      <Link
        href={'https://www.linkedin.com/in/blandine-degeneve-81178b172/'}
        target="_blank"
        id={'linkedin'}
      >
        <Image
          src={'/icons/linkedin.png'}
          width={256}
          height={256}
          alt="Logo de linkedIn"
          className={styles.icon}
        />
      </Link>
      <Link href={`mailto:${'blandine.degeneve@gmail.com'}`} id={'email'}>
        <Image
          src={'/icons/gmail.png'}
          width={64}
          height={64}
          alt="Logo email"
          className={styles.icon}
        />
      </Link>
    </div>
  );
}
