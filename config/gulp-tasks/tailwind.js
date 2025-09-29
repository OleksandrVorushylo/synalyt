import postcss from "gulp-postcss";
import pcssImport from "postcss-import";
import nested from "postcss-nested";
import pcssAutoprefixer from "autoprefixer";
import pcssReporter from "postcss-reporter";
import rename from "gulp-rename";
import tailwindcss from "tailwindcss";
import sourcemaps from "gulp-sourcemaps";

import { reportFormatter } from "../gulp-settings.js";

export function tailwind() {
  const plugins = [
    pcssImport({
      // plugins: [stylelint],
    }),
    nested,
    tailwindcss,
    pcssAutoprefixer,
    pcssReporter({
      clearReportedMessages: true,
      formatter: reportFormatter,
    }),
  ];

  return app.gulp
    .src(`${app.path.src.styles.tailwind}`)
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(
      rename({
        basename: "tailwind",
        extname: ".css",
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(app.gulp.dest(`${app.path.build.styles.main}`));
}

export function tailwindConfigMigration() {
  return app.gulp
    .src(`${app.path.src.tailwindConfig}`)
    .pipe(app.gulp.dest(`${app.path.build.tailwindConfig}`));
}