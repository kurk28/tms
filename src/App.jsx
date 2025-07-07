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
    <div class="imageContainer">
      <Image imgSrc={IMAGE_NAMES.AC} name={IMAGE_GERMAN_NAMES.AC} />
      <Image imgSrc={IMAGE_NAMES.AIRPLANE} name={IMAGE_GERMAN_NAMES.AIRPLANE} />
      <Image imgSrc={IMAGE_NAMES.APPLE} name={IMAGE_GERMAN_NAMES.APPLE} />
      <Image imgSrc={IMAGE_NAMES.ATM} name={IMAGE_GERMAN_NAMES.ATM} />
    </div>
  );
}

export default App;
