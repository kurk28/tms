import { createSignal } from 'solid-js';
import './App.css';
import { Image, IMAGE_NAMES } from './components/Image/Image';

function App() {
  const [count, setCount] = createSignal(0);

  return (
    <>
      <div class="imageContainer">
        <Image name={IMAGE_NAMES.AC} />
        <Image name={IMAGE_NAMES.AIRPLANE} />
        <Image name={IMAGE_NAMES.APPLE} />
        <Image name={IMAGE_NAMES.ATM} />
      </div>
    </>
  );
}

export default App;
