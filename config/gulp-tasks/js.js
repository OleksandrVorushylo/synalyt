import uglify from "gulp-uglify";
import concat from "gulp-concat";
import sourcemaps from "gulp-sourcemaps";
import swc from "gulp-swc";

const swcOptions = {
  jsc: {
    target: "es5",
  },
  sourceMaps: true,
};

export function jsMeta() {
  return app.gulp
    .src(`${app.path.src.js.settings}`)
    .pipe(sourcemaps.init())
    .pipe(swc(swcOptions))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(app.gulp.dest(`${app.path.build.js.main}`));
}

export function jsMain() {
  return app.gulp
    .src(`${app.path.src.js.main}`)
    .pipe(sourcemaps.init())
    .pipe(swc(swcOptions))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(app.gulp.dest(`${app.path.build.js.main}`));
}

export function jsPlugins() {
  return app.gulp
    .src(`${app.path.src.js.plugins}`)
    .pipe(app.gulp.dest(`${app.path.build.js.plugins}`));
}

export function jsMove() {
  return app.gulp
    .src(`${app.path.src.js.all}`)
    .pipe(app.gulp.dest(`${app.path.build.js.source}`));
}
