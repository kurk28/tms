import { createSignal } from 'solid-js';
import './App.css';
import { Image } from './components/Image/Image';
import {
  IMAGE_NAMES,
  IMAGE_GERMAN_NAMES,
} from './components/Image/Image.helpers';

function App() {
  const [count, setCount] = createSignal(0);

  return (
    <div class="appWrapper">
      <div class="imageContainer">
        <Image src={IMAGE_NAMES.AC} name={IMAGE_GERMAN_NAMES.AC} />
        <Image src={IMAGE_NAMES.AIRPLANE} name={IMAGE_GERMAN_NAMES.AIRPLANE} />
        <Image src={IMAGE_NAMES.APPLE} name={IMAGE_GERMAN_NAMES.APPLE} />
        <Image src={IMAGE_NAMES.ATM} name={IMAGE_GERMAN_NAMES.ATM} />
      </div>
      <div>
        <button class={'changeBtn'}>Change images</button>
      </div>
    </div>
  );
}

export default App;
