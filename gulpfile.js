"use strict";

const gulp         = require('gulp'),
	fs             = require('fs'),
	path           = require('path'),
	pub            = 'public',
	src            = 'src',
	iconsPath     = `${src}/icons`,
	fontPathSrc   = `${src}/font`,
	templatesPath = `${src}/templates`,
	packageJSON   = require( path.join( __dirname, "package.json" ) );

let icRanges      = {
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
	"userpic":       [63005, 63104], //100
	"miscellaneous": [59905, 60904]  //1000
};

const ansiColors     = require('ansi-colors'),
	async            = require('async'),
	consolidate      = require('gulp-consolidate'),
	debug            = require('gulp-debug'),
	del              = require('del'),
	tap              = require('gulp-tap'),
	iconFont         = require('@m-o-z-g/gulp-iconfont'),
	notify           = require('gulp-notify'),
	rename           = require('gulp-rename'),
	sort             = require('gulp-sort'),
	svgo             = require('gulp-svgo'),
	uglify           = require('gulp-uglify'),
	encodeSVGDatauri = require('./node_modules/svgo/lib/svgo/tools.js').encodeSVGDatauri,
	vinylPaths       = require('vinyl-paths');

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

// SVG Optimizer
function optimize(cb) {
	return gulp
	.src(`${iconsPath}/**/*svg`)
	.pipe(svgo({
		plugins: [{
			cleanupAttrs: true
		}, {
			removeAttrs: {attrs: "(fill-rule|fill|stroke-linejoin|stroke-miterlimit|stroke|clip-rule)"}
		}, {
			addAttributesToSVGElement: {attributes: ["role=\"img\""]}
		}, {
			sortAttrs: true
		}]
	}))
	.pipe(gulp.dest(iconsPath))
	.on('finish', cb);
};

// Clean icons names
function cleanNames(cb) {
	return gulp
		.src(`${iconsPath}/**/*.svg`, {base: './'})
		.pipe(vinylPaths(del))
		.pipe(rename(function(path) {
			let l= checkForUnicodeInFilename(path.basename)
			path.basename= (l != null) ? path.basename.substr(l) : path.basename;
		}))
		.pipe(gulp.dest('./'))
		.on('finish', cb);
};

// Grouping icons within unicode ranges
function unicodify(cb) {
	gulp.src(`${iconsPath}/**/*.svg`, {base: './'})
	.pipe(vinylPaths(del))
	.pipe(rename(function(path) {
		if (checkForUnicodeInFilename(path.basename) == false) {
			let prefix= path.basename.match(/^(.*?)(?=-)/),
			u= '';
		
			if (prefix != null && icRanges.hasOwnProperty(prefix[0])) {
				prefix= prefix[0];
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
		}
	}))
	.pipe(gulp.dest('./'))
	.on('finish', cb);
};

// Clean
function clean(cb) {
	return del(pub);
};

function organize(done) {
	const licIcons    = `${iconsPath}/lic-*.svg`,
		socialIcons   = `${iconsPath}/social-*.svg`,
		devIcons      = `${iconsPath}/dev-*.svg`,
		financeIcons  = `${iconsPath}/finance-*.svg`,
		logoIcons     = `${iconsPath}/logo-*.svg`,
		politIcons    = `${iconsPath}/polit-*.svg`,
		softwareIcons = `${iconsPath}/software-*.svg`,
		grafxIcons    = `${iconsPath}/grafx-*.svg`,
		threeDeIcons  = `${iconsPath}/3d-*.svg`,
		docIcons      = `${iconsPath}/doc-*.svg`,
		badgeIcons    = `${iconsPath}/badge-*.svg`,
		marketIcons   = `${iconsPath}/market-*.svg`,
		cultIcons     = `${iconsPath}/cult-*.svg`,
		gemIcons      = `${iconsPath}/gem-*.svg`,
		userpicIcons  = `${iconsPath}/userpic-*.svg`,
		 miscellaneousIcons = [
		`${iconsPath}/*.svg`,
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
		`!${gemIcons}`,
		`!${userpicIcons}`
	];

	async.series([
		function (cb) {
			gulp.src(licIcons)
			.pipe(vinylPaths(del))
			.pipe(gulp.dest(`${iconsPath}/licenses/`))
			.on('end', cb);
		},
		function (cb) {
			gulp.src(socialIcons)
			.pipe(vinylPaths(del))
			.pipe(gulp.dest(`${iconsPath}/social/`))
			.on('end', cb);
		},
		function (cb) {
			gulp.src(devIcons)
			.pipe(vinylPaths(del))
			.pipe(gulp.dest(`${iconsPath}/dev/`))
			.on('end', cb);
		},
		function (cb) {
			gulp.src(financeIcons)
			.pipe(vinylPaths(del))
			.pipe(gulp.dest(`${iconsPath}/finance/`))
			.on('end', cb);
		},
		function (cb) {
			gulp.src(logoIcons)
			.pipe(vinylPaths(del))
			.pipe(gulp.dest(`${iconsPath}/logotypes/`))
			.on('end', cb);
		},
		function (cb) {
			gulp.src(politIcons)
			.pipe(vinylPaths(del))
			.pipe(gulp.dest(`${iconsPath}/politics/`))
			.on('end', cb);
		},
		function (cb) {
			gulp.src(softwareIcons)
			.pipe(vinylPaths(del))
			.pipe(gulp.dest(`${iconsPath}/software/`))
			.on('end', cb);
		},
		function (cb) {
			gulp.src(grafxIcons)
			.pipe(vinylPaths(del))
			.pipe(gulp.dest(`${iconsPath}/graphics/`))
			.on('end', cb);
		},
		function (cb) {
			gulp.src(threeDeIcons)
			.pipe(vinylPaths(del))
			.pipe(gulp.dest(`${iconsPath}/3d/`))
			.on('end', cb);
		},
		function (cb) {
			gulp.src(docIcons)
			.pipe(vinylPaths(del))
			.pipe(gulp.dest(`${iconsPath}/documents/`))
			.on('end', cb);
		},
		function (cb) {
			gulp.src(badgeIcons)
			.pipe(vinylPaths(del))
			.pipe(gulp.dest(`${iconsPath}/badges/`))
			.on('end', cb);
		},
		function (cb) {
			gulp.src(marketIcons)
			.pipe(vinylPaths(del))
			.pipe(gulp.dest(`${iconsPath}/marketplaces/`))
			.on('end', cb);
		},
		function (cb) {
			gulp.src(cultIcons)
			.pipe(vinylPaths(del))
			.pipe(gulp.dest(`${iconsPath}/culture/`))
			.on('end', cb);
		},
		function (cb) {
			gulp.src(gemIcons)
			.pipe(vinylPaths(del))
			.pipe(gulp.dest(`${iconsPath}/gems/`))
			.on('end', cb);
		},
		function (cb) {
			gulp.src(userpicIcons)
			.pipe(vinylPaths(del))
			.pipe(gulp.dest(`${iconsPath}/userpics/`))
			.on('end', cb);
		},
		function (cb) {
			gulp.src(miscellaneousIcons)
			.pipe(vinylPaths(del))
			.pipe(gulp.dest(`${iconsPath}/miscellaneous/`))
			.on('end', cb);
		}
	],
	function (err, values) {
		if (err) { reportError(err); }
		else { done(); }
	});
}

function generation(done) {
	let fontName = 'Marxco Icons CS',
		prefix = 'mrx_',
		selector = 'ic',
		_tempArray = {},
		iconStream = gulp.src(`${iconsPath}/**/*.svg`)
		.pipe(sort({
			comparator: function(file1, file2) {
				function sanitizeIconName(f) {
					let out = new Object();
					out.name = f.path.replace(/.*src([/\\]|\\\\)icons([/\\]|\\\\).*u[A-F0-9]+-/, '');
					out.categorized = out.name.split('-')[0].match('lic|social|dev|finance|logo|polit|software|grafx|3d|doc|badge|market|cult|gem|userpic');
					out.categorized = (out.categorized != null) ? true : false;
					return out;
				}
				const f1 = sanitizeIconName(file1),
					f2   = sanitizeIconName(file2);
				let f1n = f1.name,
					f2n = f2.name,
					f1c = f1.categorized,
					f2c = f2.categorized;
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
		.pipe(tap(function (file, t) {
			let l = checkForUnicodeInFilename(file.stem),
			$fn = (l != null) ? file.stem.substr(l) : file.stem,
			$svg = file.contents.toString();
			_tempArray[$fn] = {
				svg: $svg.replace(/"/g, '\\"'),
				dataURI: encodeSVGDatauri( $svg )
			};
		}))
		.pipe(iconFont({
			fontName: fontName,
			formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
			copyright: packageJSON.author.name,
			description: packageJSON.description,
			version: packageJSON.version.replace(/(?<=^([0-9]+)\.([0-9]+)).*/, ''),
			ascent: 896,
			descent: 128,
			url: packageJSON.author.url,
			prependUnicode: true
		}))
		.on('glyphs', function(glyphs, options) {
			for (let i = 0; i < glyphs.length; i++) {
				let glyphName = glyphs[i].name;
				glyphs[i] = { ...glyphs[i], ..._tempArray[glyphName] }
			}
		
			console.log(glyphs, options);
		})

	async.parallel([
		function handleJSON (cb) {
			iconStream.on('glyphs', function(glyphs, options) {
				gulp.src(`${templatesPath}/_ic-font.json`)
				.pipe(consolidate('lodash', {
					glyphs: glyphs
				}))
				.pipe(rename('data.json'))
				.pipe(gulp.dest(src))
				.on('finish', cb);
			});
		},
		function handleIcons (cb) {
			iconStream.on('glyphs', function(glyphs, options) {
				gulp.src(`${templatesPath}/_icons.styl`)
				.pipe(consolidate('lodash', {
					fontName: fontName,
					prefix: prefix,
					selector: selector,
					glyphs: glyphs,
					fontPath: '/font/',
					fileVersion: fileVersion
				}))
				.pipe(rename('icons.styl'))
				.pipe(gulp.dest(src))
				.on('finish', cb);
			});
		},
		function handleShowcase (cb) {
			iconStream.on('glyphs', function(glyphs, options) {
				gulp.src(`${templatesPath}/_icons.pug`)
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
				.pipe(gulp.dest(fontPathSrc))
				.on('finish', cb);
		}
		
	], done);
};

const build = gulp.series(clean, optimize, organize, unicodify, generation);
const test = gulp.series(clean, optimize, cleanNames, organize, unicodify, generation);

// Export tasks
exports.cleanNames = cleanNames;
exports.unicodify = unicodify;
exports.clean = clean;
exports.organize = organize;
exports.generation = generation;
exports.optimize = optimize;
exports.default = build;
exports.test = test;

