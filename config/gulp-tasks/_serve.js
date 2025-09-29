import sync from "browser-sync";
const browserSync = sync.create();
import { html } from "./ejs.js";
import { images } from "./images.js";
import { styles, pluginsStyles, stylesMove, stylesLinter } from "./styles.js";
import { tailwind } from "./tailwind.js";
import { jsMain, jsMeta, jsPlugins } from "./js.js";

export function serve() {
  browserSync.init({
    server: `${app.path.buildFolder}`,
    // uncomment if you don't have internet connection
    // online: false
  });

  // PostHTML Watcher
  app.gulp
    .watch(`${app.path.src.html.all}`, app.gulp.series(html))
    .on("change", browserSync.reload);

  // PostCSS Watcher
  app.gulp
    .watch(
      [`${app.path.src.styles.all}`, `!${app.path.src.styles.tailwind}`],
      app.gulp.series(styles)
    )
    .on("change", browserSync.reload);

  // Tailwind Watcher
  app.gulp
    .watch(
      [
        `${app.path.src.html.all}`,
        `${app.path.src.styles.tailwind}`,
        `${app.path.src.js.main}`,
      ],
      app.gulp.series(tailwind)
    )
    .on("change", browserSync.reload);

  // Plugins styles Watcher
  app.gulp
    .watch([`${app.path.src.styles.plugins}`], app.gulp.series(pluginsStyles))
    .on("change", browserSync.reload);

  // babel main.js Watcher
  app.gulp
    .watch(`${app.path.src.js.main}`, app.gulp.series(jsMain))
    .on("change", browserSync.reload);

  // babel meta-settings.js Watcher
  app.gulp
    .watch(`${app.path.src.js.settings}`, app.gulp.series(jsMeta))
    .on("change", browserSync.reload);

  // images Watcher
  app.gulp
    .watch(`${app.path.src.images}`, app.gulp.series(images))
    .on("change", browserSync.reload);

  // js plugins Watcher
  app.gulp
    .watch(`${app.path.src.js.plugins}`, app.gulp.series(jsPlugins))
    .on("change", browserSync.reload);
}

export function stylelintServe() {
  browserSync.init({
    server: `${app.path.buildFolder}`,
    // uncomment if you don't have internet connection
    // online: false
  });

  // PostCSS Watcher
  app.gulp
    .watch(
      [`${app.path.src.styles.all}`, `!${app.path.src.styles.tailwind}`],
      app.gulp.series(stylesMove, styles, stylesLinter)
    )
    .on("change", browserSync.reload);
}
