import gulpEjsMonster from "gulp-ejs-monster";
import prettier from "gulp-plugin-prettier";

export function html() {
  return app.gulp
    .src(`${app.path.src.html.pages}`)
    .pipe(
      gulpEjsMonster({
        /* plugin options */
      })
    )
    .pipe(
      prettier.format({
        tabWidth: 2,
        singleQuote: false,
        bracketSameLine: false,
      })
    )
    .pipe(app.gulp.dest(`${app.path.build.html}`));
}
