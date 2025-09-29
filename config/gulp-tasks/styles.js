import postcss from "gulp-postcss";
import pcssImport from "postcss-import";
import pcssMixins from "postcss-mixins";
import nested from "postcss-nested";
import pcssShort from "postcss-short";
import pcssPresetEnv from "postcss-preset-env";
import cqPolyfill from "cq-prolyfill/postcss-plugin.js";
import pcssAutoprefixer from "autoprefixer";
import pcssFunctions from "postcss-functions";
import cssnano from "cssnano";
import pcssReporter from "postcss-reporter";
import pcssCustomProperties from "postcss-custom-properties";
import rename from "gulp-rename";
import postcssColor from "postcss-color-mod-function";
import rfs from "rfs";
import postcssExtend from "postcss-extend";
import pcssShortNativeVars from "postcss-short-native-vars";
import sourcemaps from "gulp-sourcemaps";
import stylelint from "stylelint";
import pcssComment from "postcss-comment";

import {
  ac,
  rc,
  perc,
  vw,
  setTransition,
} from "../../src/styles/_functions/pcss-functions.js";
import { reportFormatter } from "../gulp-settings.js";

export function styles() {
  const plugins = [
    pcssImport,
    rfs({ breakpoint: 1440 }),
    pcssMixins,
    postcssExtend,
    pcssShortNativeVars,
    pcssFunctions({
      functions: { ac, rc, perc, vw, setTransition },
    }),
    pcssCustomProperties,
    postcssColor,
    pcssShort,
    nested,
    pcssPresetEnv({ stage: 0 }),
    pcssAutoprefixer,
    cqPolyfill,
    cssnano,
    pcssReporter({
      clearReportedMessages: true,
      formatter: reportFormatter,
    }),
  ];

  return app.gulp
    .src(`${app.path.src.styles.main}`)
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins, { parser: pcssComment }))
    .pipe(
      rename({
        extname: ".css",
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(app.gulp.dest(`${app.path.build.styles.main}`));
}

export function stylesMove() {
  return app.gulp
    .src(`${app.path.src.styles.all}`)
    .pipe(app.gulp.dest(`${app.path.build.styles.source}`));
}

export function stylesLinter() {
  const plugins = [
    pcssImport({
      plugins: [stylelint],
    }),
    pcssReporter({
      clearReportedMessages: true,
      formatter: reportFormatter,
    }),
  ];

  return app.gulp.src(`${app.path.src.styles.main}`).pipe(postcss(plugins));
}

export function pluginsStyles() {
  return app.gulp
    .src(`${app.path.src.styles.plugins}`)
    .pipe(app.gulp.dest(`${app.path.build.styles.plugins}`));
}
