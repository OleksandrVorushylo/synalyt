import gulp from "gulp";
import { plugins } from "./config/gulp-plugins.js";
import { path } from "./config/gulp-settings.js";
import { clear } from "./config/gulp-tasks/clear.js";

global.app = {
  isBuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build"),
  gulp: gulp,
  path: path,
  plugins: plugins,
};

import { html } from "./config/gulp-tasks/ejs.js";
import {
  styles,
  pluginsStyles,
  stylesMove,
  stylesLinter,
} from "./config/gulp-tasks/styles.js";
import { tailwind, tailwindConfigMigration } from "./config/gulp-tasks/tailwind.js";
import { images } from "./config/gulp-tasks/images.js";
import { jsMain, jsMeta, jsPlugins, jsMove } from "./config/gulp-tasks/js.js";
import { fonts } from "./config/gulp-tasks/fonts.js";
import { serve, stylelintServe } from "./config/gulp-tasks/_serve.js";
import { lottieJSON } from "./config/gulp-tasks/lottie.js";

import { scanPHP } from "./config/gulp-tasks/scanPHP.js";

const devTasks = gulp.series(
  clear,
  fonts,
  html,
  styles,
  tailwind,
  pluginsStyles,
  jsPlugins,
  jsMeta,
  jsMain,
  images,
  lottieJSON,
  serve
);

const buildTasks = gulp.series(
  scanPHP,
  tailwindConfigMigration,
  fonts,
  stylesMove,
  jsMove,
  pluginsStyles,
  stylesLinter,
  tailwind,
  gulp.parallel(html, styles, jsPlugins, jsMeta, jsMain, images, lottieJSON)
);

const stylelintTasks = gulp.series(
  stylesMove,
  styles,
  stylesLinter,
  stylelintServe
);

const dev = gulp.series(devTasks);
const stylelint = gulp.series(stylelintTasks);

let build = gulp.series(buildTasks);

export { dev };
export { build };
export { stylelint };
