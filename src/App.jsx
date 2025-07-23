import { createSignal, For, createRenderEffect } from 'solid-js';
import './App.css';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Image } from './components/Image/Image';
import { IMAGE_NAMES_ARR, IMAGES } from './components/Image/Image.helpers';
import {
  getRandomImageNames,
  getImageObj,
  getChunks,
  IMAGE_CHUNK_LENGTH,
} from './App.helper';
import { getImageEndpoint } from './endpoints/endpoints';

function App() {
  const totalImagesCount = import.meta.env.VITE_IMAGE_COUNT;
  const imageFolderSize = import.meta.env.VITE_IMAGE_FOLDER_SIZE;
  const [images, setImages] = createSignal([]);
  const [cachedImagesCount, setCachedImagesCount] = createSignal(0);

  const onChangeBtnClick = () => {
    const imageNames = getRandomImageNames(IMAGE_NAMES_ARR);
    const imageObjs = getImageObj(imageNames, IMAGES);
    setImages(imageObjs);
  };

  const cacheAllImages = async (images) => {
    const notCached = [];
    const chunks = getChunks(images, IMAGE_CHUNK_LENGTH);
    for (let i = 0; i < chunks.length; i++) {
      const promises = chunks[i].map((fileName) => {
        return fetch(getImageEndpoint(IMAGES[fileName].fileName));
      });
      const result = await Promise.allSettled(promises);
      result.forEach((r, index) =>
        r.status === 'rejected'
          ? notCached.push(chunks[i][index])
          : setCachedImagesCount((prev) => ++prev)
      );
    }

    return notCached;
  };

  const onCacheImagesClick = async () => {
    setCachedImagesCount(0);
    const notCachedImages = await cacheAllImages(IMAGE_NAMES_ARR);
    if (notCachedImages.length !== 0)
      console.warn('Not all images were cachedi: ', notCachedImages);
  };

  createRenderEffect(() => {
    if (images.length === 0) {
      onChangeBtnClick();
    }
  });

  return (
    <>
      <div class="headerWrapper">
        <Header />
      </div>
      <div class="bodyWrapper">
        <div class="game">
          <div class="imageContainer">
            <For each={images()}>
              {(item) => (
                <Image src={item.src} name={item.name} color={item.color} />
              )}
            </For>
          </div>
          <div class="changeBtnWrapper">
            <button onClick={onChangeBtnClick} class={'changeBtn'}>
              Change images
            </button>
          </div>
        </div>
      </div>
      <div class="footerWrapper">
        <Footer
          onCacheImagesClick={onCacheImagesClick}
          totalImagesCount={totalImagesCount}
          cachedImagesCount={cachedImagesCount()}
          imageFolderSize={imageFolderSize}
        />
      </div>
    </>
  );
}

export default App;
