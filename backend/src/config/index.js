import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

let config = null;
let oldHash = null;
let configPath = null;

if (process.env.NODE_ENV === 'local') {
  // TODO
} else {
  configPath = path.resolve(__dirname, 'local-config.json');
}

const getHash = (content) => {
  const hash = crypto.createHash('md5');
  // passing the data to be hashed
  const data = hash.update(content, 'utf-8');
  // Creating the hash in the required format
  return data.digest('hex');
};

const listeners = [];

function updateConfigFromFile() {
  fs.readFile(configPath, (err, data) => {
    if (!err) {
      const content = data.toString();
      const hash = getHash(content);
      if (oldHash !== hash) {
        config = JSON.parse(data.toString());
        console.log('Config is here: ', config);
        oldHash = hash;
        listeners.forEach((listener) => {
          listener(config);
        });
      }
    }
  });
}

updateConfigFromFile();
setInterval(updateConfigFromFile, 5000);

export default async (onChange) => {
  if (onChange) {
    listeners.push(onChange);
    await onChange(config);
  }
  return config;
};
