export function images() {
  return app.gulp
    .src(`${app.path.src.images}`)
    .pipe(app.gulp.dest(`${app.path.build.images}`));
}

/**
 *
 * import fs from "fs";
 * import path from "path";
 *
 * import imagemin from "imagemin";
 * import imageminJpegtran from "imagemin-jpegtran";
 * import imageminPngquant from "imagemin-pngquant";
 * import imageminSvgo from "imagemin-svgo";
 * import imageminGIF from "imagemin-gifsicle";
 * import imageminMozjpeg from "imagemin-mozjpeg";
 * import imageminWebp from "imagemin-webp";
 *
 * function getFolders(dir) {
 *   return fs.readdirSync(dir).filter(function (file) {
 *     return fs.statSync(path.join(dir, file)).isDirectory();
 *   });
 * }
 *
 * function recursiveGoThroughAllFolders(root, folderName = ``, arr = []) {
 *   let newFolderName = root;
 *   if (folderName) {
 *     newFolderName = `${root}/${folderName}`;
 *     root = newFolderName;
 *   }
 *
 *   arr.push(root);
 *   const childrenFolders = getFolders(newFolderName);
 *   if (childrenFolders) {
 *     childrenFolders.forEach((folder) => {
 *       recursiveGoThroughAllFolders(root, folder, arr);
 *     });
 *   }
 *   return arr;
 * }
 *
 * function minimizeFolder(folder) {
 *   (async () => {
 *     await imagemin([`${folder}/*.svg`], {
 *       destination: `${app.path.buildFolder}/${folder.substring(4)}`,
 *       plugins: [
 *         imageminSvgo({
 *           plugins: [
 *             {
 *               name: "removeViewBox",
 *               active: false,
 *             },
 *           ],
 *         }),
 *       ],
 *     });
 *   })();
 *
 *   (async () => {
 *     await imagemin([`${folder}/*.{jpg,jpeg}`], {
 *       destination: `${app.path.buildFolder}/${folder.substring(4)}`,
 *       plugins: [imageminJpegtran()],
 *     });
 *   })();
 *
 *   (async () => {
 *     await imagemin([`${folder}/*.png`], {
 *       destination: `${app.path.buildFolder}/${folder.substring(4)}`,
 *       plugins: [imageminPngquant()],
 *     });
 *   })();
 *
 *   (async () => {
 *     await imagemin([`${folder}/*.gif`], {
 *       destination: `${app.path.buildFolder}/${folder.substring(4)}`,
 *       plugins: [imageminGIF()],
 *     });
 *   })();
 *
 *   // (async () => {
 *   //   await imagemin([`${folder}/*.{jpg,jpeg,png}`], {
 *   //     destination: `dist/${folder.substring(4)}`,
 *   //     plugins: [imageminWebp({ quality: 50 })],
 *   //   });
 *
 *   //   console.log("WebP optimized");
 *   // })();
 * }
 *
 * export function imagesWithMinifier(done) {
 *   let allFolders = recursiveGoThroughAllFolders(`${app.path.srcFolder}/images`);
 *   console.log(allFolders);
 *   allFolders.forEach((elem) => {
 *     minimizeFolder(elem);
 *   });
 *
 *   done();
 * }
 *
 * */
