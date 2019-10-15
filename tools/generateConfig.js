import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

/* eslint-disable no-console */

const sourceDir = path.join(__dirname, '../config');
const buildDir = path.join(__dirname, '../build');
const distDir = path.join(__dirname, '../build/dist');

function getConfigSourceFiles() {
  return new Promise((resolve, reject) => {
    fs.readdir(sourceDir, (err, fileNames) => {
      if (err) {
        console.log(chalk.red(err));
        reject(err);
      } else {
        resolve(fileNames.filter(filePath =>
          !fs.lstatSync(path.join(sourceDir, filePath)).isDirectory()));
      }
    });
  });
}

function buildConfigFiles() {
  console.log(chalk.white('\ngenerating config files...'));
  console.log(chalk.gray(`sourcing from: ${chalk.yellow(sourceDir)}`));
  return getConfigSourceFiles()
    .then(fileNames => fileNames.reduce(
      (promise, fileName) => promise.then(() => new Promise((resolve, reject) => {
        fs.readFile(path.join(sourceDir, fileName), (readErr, content) => {
          if (readErr) {
            reject(`Unable to read file: ${path.join(sourceDir, fileName)} => ${readErr}`);
          } else {
            const config = `const APP_CONFIG = ${content.toString().replace(/^\s+|\s+$/g, '')};`;
            const destFileName = fileName.replace('.json', '.js');
            fs.writeFile(path.join(buildDir, destFileName), config, (writeErr) => {
              if (writeErr) {
                reject(writeErr);
              } else {
                console.log(chalk.gray(fileName, '-->', destFileName));
                resolve();
              }
            });
          }
        });
      })), Promise.resolve()));
}

function copyConfigToDist(env) {
  const distSource = `app.${env}.config.js`;
  return new Promise((resolve, reject) => {
    const destFileName = 'app.config.js';
    fs.copyFile(path.join(buildDir, distSource), path.join(distDir, destFileName), (copyErr) => {
      if (copyErr) {
        reject(copyErr);
      } else {
        console.log(chalk.yellow(
          'copied',
          chalk.white(distSource),
          'as',
          chalk.white(destFileName),
          'into',
          chalk.white('/build/dist'),
          'folder\n',
        ));
        resolve();
      }
    });
  });
}

export default (env = 'local') => buildConfigFiles()
  .then(() => copyConfigToDist(env));
