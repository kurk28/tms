import { onMount, onCleanup } from 'solid-js';
import styles from './Image.module.css';

export const IMAGE_NAMES = {
  AC: 'ac.webp',
  AIRPLANE: 'airplane.webp',
  APPLE: 'apple.webp',
  ATM: 'atm.webp',
  BABY: 'baby.webp',
  BACON: 'bacon.webp',
  BALLET: 'ballet.webp',
  BALLOON: 'balloon.webp',
  BALLOON_2: 'balloon-2.webp',
  BAND: 'band.webp',
  BANANA: 'banana.webp',
  BEAR: 'bear.webp',
};

export function Image(props) {
  let imageRef;
  let clickEventListener;

  onMount(() => {
    if (imageRef) {
      clickEventListener = function (event) {
        if (event.animationName === styles.rotateImage) {
          imageRef.classList.remove(styles.rotateImage);
        }
      };
      imageRef.addEventListener('animationend', clickEventListener);
    }
  });

  onCleanup(() =>
    imageRef.removeEventListener('animationend', clickEventListener)
  );

  function onClick() {
    if (imageRef) {
      imageRef.classList.add(styles.rotateImage);
    }
  }

  return (
    <>
      <img
        ref={imageRef}
        src={`../../../public/${props.name}`}
        class={styles.image}
        onClick={onClick}
      />
    </>
  );
}
