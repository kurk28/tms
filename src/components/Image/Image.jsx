import { clsx } from 'clsx';
import { createSignal } from 'solid-js';
import styles from './Image.module.css';
import { IMAGE_BORDER_COLOR } from './Image.helpers';

export function Image(props) {
  const fallbackImgSrc = 'icons/320.png';

  const [isCardOpen, setIsCardOpen] = createSignal(false);
  const [hasError, setHasError] = createSignal(false);
  const [isMainImageVisible, setIsMainImageVisible] = createSignal(false);

  const onClick = () => setIsCardOpen((prev) => !prev);
  const onMainImageLoad = () => {
    setIsMainImageVisible(true);
    setHasError(false);
  };
  const onErrorImageLoad = () => setHasError(true);

  return (
    <div
      class={clsx(styles.imageWrapper, {
        [styles.rotateLeft]: isCardOpen(),
        [styles.rotateRight]: !isCardOpen(),
        [styles.borderBlue]: props.color === IMAGE_BORDER_COLOR.BLUE,
        [styles.borderRed]: props.color === IMAGE_BORDER_COLOR.RED,
        [styles.borderGreen]: props.color === IMAGE_BORDER_COLOR.GREEN,
        [styles.borderGrey]: props.color === IMAGE_BORDER_COLOR.GREY,
      })}
      onClick={onClick}
    >
      <img
        src={fallbackImgSrc}
        class={clsx(styles.image, { [styles.hidden]: isMainImageVisible() })}
        onError={onErrorImageLoad}
      />
      <img
        src={props.src}
        class={clsx(styles.image, {
          [styles.hidden]: !isMainImageVisible() || hasError(),
        })}
        onError={onErrorImageLoad}
        onLoad={onMainImageLoad}
      />
      <div
        class={clsx(styles.name, {
          [styles.show]: isCardOpen(),
          [styles.hide]: !isCardOpen(),
        })}
      >
        {props.name}
      </div>
    </div>
  );
}
