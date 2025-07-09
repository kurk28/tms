/* @refresh reload */
import { render } from 'solid-js/web';
import './index.css';
import App from './App.jsx';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/serviceWorker.js')
    .then((reg) => console.info('Service worker registered', reg))
    .catch((error) => console.error('Error on registration', error));
}

const root = document.getElementById('root');

render(() => <App />, root);
