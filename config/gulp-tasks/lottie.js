export function lottieJSON() {
    return app.gulp
        .src(`${app.path.src.lottie}`)
        .pipe(app.gulp.dest(`${app.path.build.lottie}`));
}