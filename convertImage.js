// use this script to convert .jpeg files into .webp files
// don't forget to install cwebp: https://developers.google.com/speed/webp/docs/cwebp

const path = require('node:path');
const { readdirSync, writeFileSync, mkdirSync } = require('node:fs');
const { execSync } = require('node:child_process');

let pngImages = [];

try {
  pngImages = readdirSync(__dirname).filter((imageName) =>
    imageName.endsWith('.png')
  );
} catch (e) {
  console.log('Error reading directory:', e);
}

mkdirSync(path.join(__dirname, 'result/images'), { recursive: true });

pngImages.forEach((pngImage) => {
  try {
    const webpImage = pngImage.split('.')[0] + '.webp';
    const outputPath = path.join(__dirname, 'result', 'images', webpImage);
    const command = `cwebp -q 80 "${pngImage}" -resize 320 320 -o ${outputPath}`;
    execSync(command, { stdio: 'inherit' });
  } catch (e) {
    console.log(`Failed to convert ${pngImage}`, e.message);
  }
});

let webpImages = [];
webpImages = readdirSync(path.join(__dirname, 'result', 'images'));
const data = {};
const filePath = path.join(__dirname, 'result', 'data.js');
webpImages.forEach((image) => {
  let key = image.split('.')[0].toUpperCase();
  if (key.includes('-')) {
    key = key.replaceAll('-', '_');
  }

  data[key] = { gerName: '', fileName: image };
});
writeFileSync(
  filePath,
  `const data = ${JSON.stringify(data, null, 2)}`,
  'utf8'
);

console.log('Created:', data);
