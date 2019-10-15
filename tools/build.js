// More info on Webpack's Node API here: https://webpack.github.io/docs/node.js-api.html
// Allowing console calls below since this is a build file.
/* eslint-disable no-console */
import webpack from 'webpack';
import chalk from 'chalk';
import config from '../webpack.config.dist';
import generateConfig from './generateConfig';

const arg = process.argv.splice(2)[0] || 'prod';

console.log(chalk.white('*** BUILD STARTED ***\n'));

webpack(config).run((error, stats) => {
  if (error) { // so a fatal error occurred. Stop here.
    console.log(chalk.red(error));
    return 1;
  }
  const jsonStats = stats.toJson();
  if (jsonStats.hasErrors) {
    jsonStats.errors.map(err => console.log(chalk.red(err)));
    return 1;
  }

  if (jsonStats.hasWarnings) {
    console.log(chalk.yellow('Webpack generated the following warnings: '));
    jsonStats.warnings.map(warning => console.log(chalk.yellow(warning)));
  }
  console.log(`Webpack stats: ${stats}`);
  // if we got this far, the build succeeded.
  try {
    generateConfig(arg).then(() => {
      console.log(chalk.green('Build finished and available in /build/dist!'));
      console.log(chalk.green('Type "npm run open:dist" to try the build.'));
    });
    return 0;
  } catch (err) {
    console.log(chalk.red(err));
    return -1;
  }
});
