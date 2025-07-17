import { IMAGE_BORDER_COLOR } from './components/Image/Image.helpers';
import { getImageEndpoint } from './endpoints/endpoints';

export const IMAGE_CHUNK_LENGTH = 10;
const MAX_IMAGE_ON_PAGE = 8;

export function getRandomImageNames(imageNames) {
  const names = [];
  while (names.length < MAX_IMAGE_ON_PAGE) {
    const index = Math.floor(Math.random() * imageNames.length);
    if (names.indexOf(imageNames[index]) === -1) {
      names.push(imageNames[index]);
    }
  }
  return names;
}

export function getImageObj(names, images) {
  const imageObj = [];
  for (let name of names) {
    imageObj.push({
      src: getImageEndpoint(images[name].fileName),
      name: images[name].gerName,
      color: getImageBorderColor(images[name].gerName),
    });
  }

  return imageObj;
}

export function getChunks(array, size) {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
}

export function getImageBorderColor(name) {
  const article = name.split(' ')[0];
  switch (article) {
    case 'der':
      return IMAGE_BORDER_COLOR.BLUE;
    case 'die':
      return IMAGE_BORDER_COLOR.RED;
    case 'das':
      return IMAGE_BORDER_COLOR.GREEN;
    default:
      return IMAGE_BORDER_COLOR.GREY;
  }
}
