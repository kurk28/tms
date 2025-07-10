import { createSignal, For, createRenderEffect } from 'solid-js';
import './App.css';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Image } from './components/Image/Image';
import {
  IMAGE_FILE_NAMES,
  IMAGE_GERMAN_NAMES,
  IMAGE_NAMES,
} from './components/Image/Image.helpers';
import { getImageNames, getImageObj } from './App.helper';

function App() {
  const [imageNames, setImageNames] = createSignal([]);

  const onChangeBtnClick = () => {
    const imageNames = getImageNames(IMAGE_NAMES);
    const imageObjs = getImageObj(
      imageNames,
      IMAGE_FILE_NAMES,
      IMAGE_GERMAN_NAMES
    );
    setImageNames(imageObjs);
  };

  createRenderEffect(() => {
    if (imageNames.length === 0) {
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
            <For each={imageNames()} fallback={<div>Loading...</div>}>
              {(item) => <Image src={item.src} name={item.name} />}
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
        <Footer />
      </div>
    </>
  );
}

export default App;
