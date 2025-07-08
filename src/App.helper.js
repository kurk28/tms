export function getImageNames(imageNames) {
  const names = [];
  while (names.length !== 6) {
    const index = Math.floor(Math.random() * imageNames.length);
    if (names.indexOf(imageNames[index]) === -1) {
      names.push(imageNames[index]);
    }
  }
  return names;
}

export function getImageObj(names, imageFileNames, imageGerNames) {
  const imageObj = [];
  for (let name of names) {
    imageObj.push({ src: imageFileNames[name], name: imageGerNames[name] });
  }

  return imageObj;
}
