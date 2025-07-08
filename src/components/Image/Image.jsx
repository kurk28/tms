import { clsx } from 'clsx';
import { createSignal } from 'solid-js';
import styles from './Image.module.css';

export function Image(props) {
  let imageRef;
  let nameRef;
  let imageWrapperRef;

  const [isCardOpen, setIsCardOpen] = createSignal(false);

  function onClick() {
    setIsCardOpen((prev) => !prev);
  }

  return (
    <div
      ref={imageWrapperRef}
      class={clsx(styles.imageWrapper, {
        [styles.rotateLeft]: isCardOpen(),
        [styles.rotateRight]: !isCardOpen(),
      })}
      onClick={onClick}
    >
      <img ref={imageRef} src={`/${props.src}`} class={styles.image} />
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
