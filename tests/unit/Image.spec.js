import fs from 'fs';
import path from 'path';
import { describe, it, expect } from 'vitest';
import { IMAGES } from '../../src/components/Image/Image.helpers';

const imageDir = path.resolve(__dirname, '../../public/images');

describe('Image:', () => {
  it('should have an existing image file for every vocabulary entry', () => {
    const files = fs.readdirSync(imageDir);
    for (const [_, entry] of Object.entries(IMAGES)) {
      const isFileExists = files.includes(entry.fileName);
      expect(isFileExists).toBe(true);
    }
  });

  it('should have an existing image file for every vocabulary entry 1', () => {
    const files = fs.readdirSync(imageDir);
    const values = Object.values(IMAGES);
    let number = 0;
    for (let file of files) {
      number = values.findIndex((v) => v.fileName === file);
      if (number === -1) console.log(file);
      expect(number).not.toBe(-1);
    }
  });
});
