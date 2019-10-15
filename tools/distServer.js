// This file configures a web server for testing the distribution build
// on your local machine.

import browserSync from 'browser-sync';
import historyApiFallback from 'connect-history-api-fallback';
import chalk from 'chalk';
/* eslint-disable no-console */

console.log(chalk.green('Opening dist build...'));

const port = parseInt(5001, 10);

// Run Browsersync
browserSync({
  port,
  ui: {
    port: port + 1,
  },
  server: {
    baseDir: 'build/dist',
    https: false,
  },

  files: [
    'src/*.html',
  ],

  middleware: [historyApiFallback()],
});
