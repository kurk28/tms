import { clsx } from 'clsx';
import { createSignal } from 'solid-js';
import styles from './Image.module.css';
import { IMAGE_BORDER_COLOR } from './Image.helpers';

export function Image(props) {
  let imageRef;
  let nameRef;
  let imageWrapperRef;

  const fallbackSrc = 'icons/320.png';

  const [isCardOpen, setIsCardOpen] = createSignal(false);
  const [hasError, setHasError] = createSignal(false);

  function onClick() {
    setIsCardOpen((prev) => !prev);
  }

  return (
    <div
      ref={imageWrapperRef}
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
        ref={imageRef}
        src={hasError() ? fallbackSrc : props.src}
        class={styles.image}
        onError={() => {
          setHasError(true);
        }}
      />
      <div
        ref={nameRef}
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
