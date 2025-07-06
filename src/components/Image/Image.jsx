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
  return (
    <>
      <img src={`../../../public/${props.name}`} class={styles.image} />
    </>
  );
}
