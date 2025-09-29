// Receive name of project Folder
import * as nodePath from "path";

// path to root Folder
const rootFolder = nodePath.basename(nodePath.resolve());

// path to output Folder
const buildFolder = `./dist`;

// path to source Folder
const srcFolder = `./src`;

// Пути к папкам и файлам проекта
export const path = {
	build: {
		html: `${buildFolder}/`,

		js: {
			source: `${buildFolder}/js-src/`,
			main: `${buildFolder}/js/`,
			plugins: `${buildFolder}/js/plugins/`,
		},

		styles: {
			source: `${buildFolder}/styles/`,
			main: `${buildFolder}/css/`,
			plugins: `${buildFolder}/css/plugins/`,
		},

		images: `${buildFolder}/images/`,
		fonts: `${buildFolder}/fonts/`,
		files: `${buildFolder}/files/`,
		lottie: `${buildFolder}/lottie/`,

		scanPHP: `${buildFolder}/`,
		tailwindConfig: `${buildFolder}/`
	},
	src: {
		html: {
			all: `${srcFolder}/**/*.{html,ejs}`,
			pages: `${srcFolder}/*.html`,
		},

		js: {
			all: `${srcFolder}/js-src/**/*.{js,map}`,
			main: `${srcFolder}/js-src/main.js`,
			plugins: `${srcFolder}/js-src/plugins/*.{js,map}`,
			settings: `${srcFolder}/js-src/meta-settings.js`,
		},

		styles: {
			all: `${srcFolder}/styles/**/*.*`,
			main: `${srcFolder}/styles/style.pcss`,
			plugins: `${srcFolder}/styles/_plugins/*.css`,
			tailwind: `${srcFolder}/styles/tailwind.pcss`,
		},

		images: `${srcFolder}/images/**/*`,

		fonts: `${srcFolder}/fonts/*.+(ttf|otf|eof|svg|woff|woff2)`,
		fontsFolder: `${srcFolder}/fonts`,

		lottie: `${srcFolder}/lottie/**.json`,

		scanPHP: "scan.php",
		tailwindConfig: "tailwind.config.cjs"
	},

	buildFolder: buildFolder,
	rootFolder: rootFolder,
	srcFolder: srcFolder,
};

export const reportFormatter = ({ messages, source }) =>
	messages
		.map(
			(message) =>
				message?.plugin &&
				message?.plugin !== "postcss-svgo" &&
				`${"".padEnd(10)}⚠️  \x1b[43m[${message?.plugin}]\x1b[49m: ${source}:${
					message?.line || ""
				}:${message?.column || ""} \x1b[33m${message?.text}\x1b[39m \n`
		)
		.join("");
