import styles from './Footer.module.css';
import { clsx } from 'clsx';

export function Footer(props) {
  return (
    <footer class={styles.footer}>
      <p class={styles.text}>
        For the images big thanks to{' '}
        <a href="https://www.thiings.co/" target="_blank">
          thiings.co
        </a>
      </p>
      <p class={clsx(styles.text, styles.cacheInfo)}>
        You can pre-cache all images:
      </p>
      <button class={styles.cacheBtn} onClick={props.onCacheImagesClick}>
        click here
      </button>
      <span class={styles.imageSize}>[3.2 MB!]</span>
    </footer>
  );
}
