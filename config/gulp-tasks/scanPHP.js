export function scanPHP() {
  return app.gulp
    .src(`${app.path.src.scanPHP}`)
    .pipe(app.gulp.dest(`${app.path.build.scanPHP}`));
}
