import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import * as dotenv from 'dotenv';
import { execSync } from 'node:child_process';

const ENV_FILE = '.env';
let existingVars = {};
if (existsSync(ENV_FILE)) {
  const fileContent = readFileSync(ENV_FILE);
  existingVars = dotenv.parse(fileContent);
}

const imageFolderSize = execSync('cd public/images && du -sh')
  .toString()
  .split('\t')[0]
  .trim();
existingVars.VITE_IMAGE_FOLDER_SIZE = imageFolderSize;

const imageCount = execSync('cd public/images && find . -type f | wc -l')
  .toString()
  .trim();
existingVars.VITE_IMAGE_COUNT = imageCount;

const newEnvContent =
  Object.entries(existingVars)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n') + '\n';

writeFileSync(ENV_FILE, newEnvContent);
