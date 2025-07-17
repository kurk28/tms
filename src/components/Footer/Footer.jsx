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
      <span class={styles.imageSize}>{`[${props.imageFolderSize}]`}</span>
      {props.cachedImagesCount && (
        <span class={styles.filesCachedWrapper}>
          Files cached: {props.totalImagesCount} / {props.cachedImagesCount}
        </span>
      )}
    </footer>
  );
}
