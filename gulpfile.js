"use strict";

const gulp         = require('gulp'),
	fs             = require('fs'),
	path           = require('path'),
	pub            = 'public',
	src            = 'src',
	fontPath       = `${src}/icons`,
	fontPathPub    = `${pub}/font`,
	pathImg        = `${src}/img`,
	pathPubImg     = `${pub}/img`,
	templatesPath  = `${src}/templates`,

	appName        = 'Marxco Icons CS',
	appDescription = 'Open version of icon font from upcoming Marxco component system.',
	developerName  = 'Alexander "M.O.Z.G Dikov"',
	developerURL   = 'http://mozg-studio.org',
	themeColor     = '#df3132',
	url            = 'https://m-o-z-g.gitlab.io/marxco-icf/',
	icRanges       = {
		"logo":          [60905, 61004], //100
		"badge":         [61005, 61104], //100
		"social":        [61105, 61404], //300
		"finance":       [61405, 61504], //100
		"market":        [61505, 61604], //100
		"grafx":         [61605, 61704], //100
		"3d":            [61705, 61804], //100
		"doc":           [61805, 62304], //500
		"software":      [62305, 62404], //100
		"lic":           [62405, 62504], //100
		"dev":           [62505, 62704], //200
		"polit":         [62705, 62804], //100
		"cult":          [62805, 62904], //100
		"gem":           [62905, 63004], //100
		"miscellaneous": [59905, 60904]  //1000
	},

	ansiColors      = require('ansi-colors'),
	async           = require('async'),
	changed         = require('gulp-changed'),
	consolidate     = require('gulp-consolidate'),
	debug           = require('gulp-debug'),
	del             = require('del'),
	gulpPug         = require('gulp-pug'),
	htmlbeautify    = require('gulp-html-beautify'),
	iconFont        = require('@m-o-z-g/gulp-iconfont'),
	inject          = require('gulp-inject'),
	notify          = require('gulp-notify'),
	rename          = require('gulp-rename'),
	run             = require('gulp-run'),
	runSequence     = require('run-sequence'),
	sort            = require('gulp-sort'),
	sourcemaps      = require('gulp-sourcemaps'),
	vinylPaths      = require('vinyl-paths');

// Error notificator
function reportError(error) {
	let lineNumber = (error.lineNumber) ? `${LINE} error.lineNumber -- ` : ``;

	notify({
		title: `Task Failed [${error.plugin}]`,
		message: `${lineNumber}See console.`
	}).write(error);

	let report = '';
	let chalk = ansiColors.white.bgRed;

	report += `${chalk('TASK:')} [${error.plugin}]`;
	report += `${chalk('PROB:')} [${error.message}]`;
	if (error.lineNumber) { report += `${chalk('LINE:')} ${error.lineNumber}`; }
	if (error.fileName)   { report += `${chalk('FILE:')} ${error.fileName}`; }
	console.error(report);

	this.emit('end');
};

function checkForUnicodeInFilename(e) {
	if ( e.match(/^u[0-9A-F]{4,5}-/g) != null ) {
		return e.match(/^u[0-9A-F]{4,5}-/g)[0].length;
	}

	return false;
};

function randomHash() {
	let hash = "",
	chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (let i = 0; i < 10; i++) {
		hash += chars.charAt(Math.floor(Math.random() * chars.length));
	}

	return hash;
};

const fileVersion = randomHash();

// Clean icons names
function cleanNames(cb) {
	return gulp
		.src(`${fontPath}/**/*.svg`, {base: './'})
		.pipe(vinylPaths(del))
		.pipe(rename(function(path) {
			let l= checkForUnicodeInFilename(path.basename)
			path.basename= (l != null) ? path.basename.substr(l) : path.basename;
		}))
		.pipe(gulp.dest('./'));
};

// Grouping icons within unicode ranges
function unicodify(cb) {
	gulp.src(`${fontPath}/**/*.svg`, {base: './'})
		.pipe(vinylPaths(del))
		.pipe(rename(function(path) {
			let prefix= path.basename.match(/^(.*?)(?=-)/),
				u= '';

			if (prefix != null && icRanges.hasOwnProperty(prefix[0])) {
				prefix= path.basename.match(/^(.*?)(?=-)/)[0];
			} else {
				prefix= 'miscellaneous';
			}

			let folderName= path.dirname.toString().replace(/.*\\/, '');

			if (folderName.match(/^zz_fa/)) {
				u= 'u' + icRanges[prefix][1].toString(16).toUpperCase();
				icRanges[prefix][1] = icRanges[prefix][1] - 1;
			} else {
				u= 'u' + icRanges[prefix][0].toString(16).toUpperCase();
				icRanges[prefix][0] = icRanges[prefix][0] + 1;
			}

			if (icRanges[prefix][1] <= icRanges[prefix][0]) {
				notify({
					title: 'Some icons are out of pool!',
					message: 'Icons in `' + prefix + '` group are out of pool! Please, check them!'
				}).write(error);
			}
			
			path.basename = u + '-' + path.basename;
		}))
		.pipe(gulp.dest('./'))
		.on('finish', cb);
};

// Clean
function clean(cb) {
	return del(pub);
};

function organize(cb) {
	const licIcons          = `${fontPath}/lic-*.svg`,
		socialIcons         = `${fontPath}/social-*.svg`,
		devIcons            = `${fontPath}/dev-*.svg`,
		financeIcons        = `${fontPath}/finance-*.svg`,
		logoIcons           = `${fontPath}/logo-*.svg`,
		politIcons          = `${fontPath}/polit-*.svg`,
		softwareIcons       = `${fontPath}/software-*.svg`,
		grafxIcons          = `${fontPath}/grafx-*.svg`,
		threeDeIcons        = `${fontPath}/3d-*.svg`,
		docIcons            = `${fontPath}/doc-*.svg`,
		badgeIcons          = `${fontPath}/badge-*.svg`,
		marketIcons         = `${fontPath}/market-*.svg`,
		cultIcons           = `${fontPath}/cult-*.svg`,
		gemIcons            = `${fontPath}/gem-*.svg`,
		 miscellaneousIcons = [
		`${fontPath}/*.svg`,
		`!${licIcons}`,
		`!${socialIcons}`,
		`!${devIcons}`,
		`!${financeIcons}`,
		`!${logoIcons}`,
		`!${politIcons}`,
		`!${softwareIcons}`,
		`!${grafxIcons}`,
		`!${threeDeIcons}`,
		`!${docIcons}`,
		`!${badgeIcons}`,
		`!${marketIcons}`,
		`!${cultIcons}`,
		`!${gemIcons}`
	];

	gulp.src(licIcons)
		.pipe(vinylPaths(del))
		.pipe(gulp.dest(`${fontPath}/licenses/`));

	gulp.src(socialIcons)
		.pipe(vinylPaths(del))
		.pipe(gulp.dest(`${fontPath}/social/`));

	gulp.src(devIcons)
		.pipe(vinylPaths(del))
		.pipe(gulp.dest(`${fontPath}/dev/`));

	gulp.src(financeIcons)
		.pipe(vinylPaths(del))
		.pipe(gulp.dest(`${fontPath}/finance/`));

	gulp.src(logoIcons)
		.pipe(vinylPaths(del))
		.pipe(gulp.dest(`${fontPath}/logotypes/`));

	gulp.src(politIcons)
		.pipe(vinylPaths(del))
		.pipe(gulp.dest(`${fontPath}/politics/`));

	gulp.src(softwareIcons)
		.pipe(vinylPaths(del))
		.pipe(gulp.dest(`${fontPath}/software/`));

	gulp.src(grafxIcons)
		.pipe(vinylPaths(del))
		.pipe(gulp.dest(`${fontPath}/graphics/`));

	gulp.src(threeDeIcons)
		.pipe(vinylPaths(del))
		.pipe(gulp.dest(`${fontPath}/3d/`));

	gulp.src(docIcons)
		.pipe(vinylPaths(del))
		.pipe(gulp.dest(`${fontPath}/documents/`));

	gulp.src(badgeIcons)
		.pipe(vinylPaths(del))
		.pipe(gulp.dest(`${fontPath}/badges/`));

	gulp.src(marketIcons)
		.pipe(vinylPaths(del))
		.pipe(gulp.dest(`${fontPath}/marketplaces/`));

	gulp.src(cultIcons)
		.pipe(vinylPaths(del))
		.pipe(gulp.dest(`${fontPath}/culture/`));

	gulp.src(gemIcons)
		.pipe(vinylPaths(del))
		.pipe(gulp.dest(`${fontPath}/gems/`));

	gulp.src(miscellaneousIcons)
		.pipe(vinylPaths(del))
		.pipe(gulp.dest(`${fontPath}/miscellaneous/`));

	cb();
}

function generation(done) {
	let fontName = 'Marxco Icons CS',
		prefix = 'mrx_',
		selector = 'ic',
		iconStream = gulp.src(`${fontPath}/**/*.svg`)
		.pipe(sort({
			comparator: function(file1, file2) {
				function sanitizeIconName(f) {
					let out = new Object();
					out.name = f.path.replace(/.*src([/\\]|\\\\)icons([/\\]|\\\\).*u[A-F0-9]+-/, '');
					out.categorized = out.name.split('-')[0].match('lic|social|dev|finance|logo|polit|software|grafx|3d|doc|badge|market|cult|gem');
					out.categorized = (out.categorized != null) ? true : false;
					return out;
				}
				const f1 = sanitizeIconName(file1),
					f2   = sanitizeIconName(file2);
				let f1n = f1.name,
					f2n = f2.name,
					f1c = f1.categorized,
					f2c = f2.categorized;
				let r;
				if (f1c < f2c) {
					return 1;
				} else if (f1c > f2c) {
					return -1;
				} else {
					if (f1n > f2n) {
						return 1;
					}
					if (f1n < f2n ) {
						return -1;
					}
				}
				return 0;
			}
		}))
		.pipe(iconFont({
			fontName: fontName,
			formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
			copyright: 'Alexander "M.O.Z.G" Dikov',
			description: 'Iconfont for Marxco Component System',
			version: '1.6',
			ascent: 896,
			descent: 128,
			url: url,
			prependUnicode: true
		}))
		.on('glyphs', function(glyphs, options) {
			console.log(glyphs, options);
		})

	async.parallel([
		function handleStyles (cb) {
			iconStream.on('glyphs', function(glyphs, options) {
				gulp.src(templatesPath + '/_styles.css')
					.pipe(consolidate('lodash', {
						fontName: fontName,
						prefix: prefix,
						selector: selector,
						glyphs: glyphs,
						fontPath: 'font',
						fileVersion: fileVersion
					}))
					.pipe(rename('styles.css'))
					.pipe(gulp.dest(pub))
					.on('finish', cb);
			});
		},
		function handleIcons (cb) {
			iconStream.on('glyphs', function(glyphs, options) {
				gulp.src(templatesPath + '/_icons.css')
					.pipe(consolidate('lodash', {
						fontName: fontName,
						prefix: prefix,
						selector: selector,
						glyphs: glyphs,
						fontPath: 'font',
						fileVersion: fileVersion
					}))
					.pipe(rename('icons.css'))
					.pipe(gulp.dest(pub))
					.on('finish', cb);
			});
		},
		function handleShowcase (cb) {
			iconStream.on('glyphs', function(glyphs, options) {
				gulp.src(templatesPath + '/_icons.pug')
					.pipe(consolidate('lodash', {
						glyphs: glyphs
					}))
					.pipe(rename('_icons.pug'))
					.pipe(gulp.dest(src + '/layout/dataset/'))
					.on('finish', cb);
			});
		},
		function handleFonts (cb) {
			iconStream
				.pipe(gulp.dest(fontPathPub))
				.on('finish', cb);
		}
		
	], done);
};

// Images
function images() {
	return gulp.src([`${pathImg}/**/*.*`, `!${pathImg}/_**/*.*`])
		.pipe(gulp.dest(`${pathPubImg}/`))
		.pipe(debug());
};

// Layout
function layout() {
	let sources = gulp.src(`${pub}/**/*.css`, {read: false});

	return gulp
		.src([`${src}/**/*.pug`, `!${src}/**/_*.pug`, `!${src}/update-preview.pug`])
		.pipe(gulpPug())
		.on('error', reportError )
		.pipe(inject(sources, {ignorePath: `${pub}/`, addRootSlash: false}))
		.on('error', reportError )
		.pipe(htmlbeautify({
			indent_size: 1,
			indent_char: "\t"
		}))
		.on('error', reportError )
		.pipe(gulp.dest(pub))
		.pipe(debug());
};

const build = gulp.series(clean, generation, images, layout);
const test = gulp.series(clean, cleanNames, organize, unicodify, generation, images, layout);

// Export tasks
exports.cleanNames = cleanNames;
exports.unicodify = unicodify;
exports.clean = clean;
exports.organize = organize;
exports.generation = generation;
exports.images = images;
exports.layout = layout;
exports.default = build;
exports.test = test;

