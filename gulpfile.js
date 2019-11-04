var gulp           = require('gulp'),
	pub            = 'public',
	src            = 'src',
	styles         = src + '/styles',
	fontPath       = src + '/icons',
	fontPathPub    = pub + '/font',
	JSONPath       = src + '/json',
	templatesPath  = src + '/templates',

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
	autoprefixer    = require('autoprefixer-stylus'),
	changed         = require('gulp-changed'),
	consolidate     = require('gulp-consolidate'),
	debug           = require('gulp-debug'),
	del             = require('del'),
	gulpPug         = require('gulp-pug'),
	htmlbeautify    = require('gulp-html-beautify'),
	iconFont        = require('gulp-iconfont'),
	inject          = require('gulp-inject'),
	notify          = require('gulp-notify'),
	rename          = require('gulp-rename'),
	run             = require('gulp-run'),
	runSequence     = require('run-sequence'),
	sourcemaps      = require('gulp-sourcemaps'),
	vinylPaths      = require('vinyl-paths');

// Error notificator
var reportError = function (error) {
	var lineNumber = (error.lineNumber) ? 'LINE ' + error.lineNumber + ' -- ' : '';

	notify({
		title: 'Task Failed [' + error.plugin + ']',
		message: lineNumber + 'See console.'
	}).write(error);

	var report = '';
	var chalk = ansiColors.white.bgRed;

	report += chalk('TASK:') + ' [' + error.plugin + ']\n';
	report += chalk('PROB:') + ' ' + error.message + '\n';
	if (error.lineNumber) { report += chalk('LINE:') + ' ' + error.lineNumber + '\n'; }
	if (error.fileName)   { report += chalk('FILE:') + ' ' + error.fileName + '\n'; }
	console.error(report);

	this.emit('end');
};

var checkForUnicodeInFilename = function(e) {
	if ( e.match(/^u[0-9A-F]{4,5}-/g) != null ) {
		return e.match(/^u[0-9A-F]{4,5}-/g)[0].length;
	}

	return false;
};

var randomHash = function () {
  var hash = "";
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 10; i++)
    hash += chars.charAt(Math.floor(Math.random() * chars.length));

  return hash;
},
fileVersion = randomHash();

gulp.task('default', function() {
	// place code for your default task here
});

// Clean icons names
gulp.task('clean-names', function(cb) {
	return gulp.src(fontPath + '/**/*.svg', {base: './'})
		.pipe(vinylPaths(del))
		.pipe(rename(function(path) {
			var l= checkForUnicodeInFilename(path.basename)
			path.basename= (l != null) ? path.basename.substr(l) : path.basename;
		}))
		.pipe(gulp.dest('./'));
});

// Grouping icons within unicode ranges
gulp.task('unicodify', function(cb) {
	gulp.src(fontPath + '/**/*.svg', {base: './'})
		.pipe(vinylPaths(del))
		.pipe(rename(function(path) {
			prefix= path.basename.match(/^(.*?)(?=-)/);

			if (prefix != null && icRanges.hasOwnProperty(prefix[0])) {
				prefix= path.basename.match(/^(.*?)(?=-)/)[0];
			} else {
				prefix= 'miscellaneous';
			}

			folderName= path.dirname.toString().replace(/.*\\/, '');

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
		.pipe(gulp.dest('./'));
});

// Clean
gulp.task('clean', function(cb) {
	return run( 'rimraf '+ pub ).exec();
});

gulp.task('organize', function () {
	licIcons           = fontPath + '/lic-*.svg',
	socialIcons        = fontPath + '/social-*.svg',
	devIcons           = fontPath + '/dev-*.svg',
	financeIcons       = fontPath + '/finance-*.svg',
	logoIcons          = fontPath + '/logo-*.svg',
	politIcons         = fontPath + '/polit-*.svg',
	softwareIcons      = fontPath + '/software-*.svg',
	grafxIcons         = fontPath + '/grafx-*.svg',
	threeDeIcons       = fontPath + '/3d-*.svg',
	docIcons           = fontPath + '/doc-*.svg',
	badgeIcons         = fontPath + '/badge-*.svg',
	marketIcons        = fontPath + '/market-*.svg',
	cultIcons          = fontPath + '/cult-*.svg',
	gemIcons           = fontPath + '/gem-*.svg',
	miscellaneousIcons = [
		fontPath + '/*.svg',
		'!' + fontPath + '/lic-*.svg',
		'!' + fontPath + '/social-*.svg',
		'!' + fontPath + '/dev-*.svg',
		'!' + fontPath + '/finance-*.svg',
		'!' + fontPath + '/logo-*.svg',
		'!' + fontPath + '/polit-*.svg',
		'!' + fontPath + '/software-*.svg',
		'!' + fontPath + '/grafx-*.svg',
		'!' + fontPath + '/3d-*.svg',
		'!' + fontPath + '/doc-*.svg',
		'!' + fontPath + '/badge-*.svg',
		'!' + fontPath + '/market-*.svg',
		'!' + fontPath + '/cult-*.svg',
		'!' + fontPath + '/gem-*.svg'
	];

	gulp.src(licIcons)
		.pipe(vinylPaths(del))
		.pipe(gulp.dest(fontPath + '/licenses/'));

	gulp.src(socialIcons)
		.pipe(vinylPaths(del))
		.pipe(gulp.dest(fontPath + '/social/'));

	gulp.src(devIcons)
		.pipe(vinylPaths(del))
		.pipe(gulp.dest(fontPath + '/dev/'));

	gulp.src(financeIcons)
		.pipe(vinylPaths(del))
		.pipe(gulp.dest(fontPath + '/finance/'));

	gulp.src(logoIcons)
		.pipe(vinylPaths(del))
		.pipe(gulp.dest(fontPath + '/logotypes/'));

	gulp.src(politIcons)
		.pipe(vinylPaths(del))
		.pipe(gulp.dest(fontPath + '/politics/'));

	gulp.src(softwareIcons)
		.pipe(vinylPaths(del))
		.pipe(gulp.dest(fontPath + '/software/'));

	gulp.src(grafxIcons)
		.pipe(vinylPaths(del))
		.pipe(gulp.dest(fontPath + '/graphics/'));

	gulp.src(threeDeIcons)
		.pipe(vinylPaths(del))
		.pipe(gulp.dest(fontPath + '/3d/'));

	gulp.src(docIcons)
		.pipe(vinylPaths(del))
		.pipe(gulp.dest(fontPath + '/documents/'));

	gulp.src(badgeIcons)
		.pipe(vinylPaths(del))
		.pipe(gulp.dest(fontPath + '/badges/'));

	gulp.src(marketIcons)
		.pipe(vinylPaths(del))
		.pipe(gulp.dest(fontPath + '/marketplaces/'));

	gulp.src(cultIcons)
		.pipe(vinylPaths(del))
		.pipe(gulp.dest(fontPath + '/culture/'));

	gulp.src(gemIcons)
		.pipe(vinylPaths(del))
		.pipe(gulp.dest(fontPath + '/gems/'));

	gulp.src(miscellaneousIcons)
		.pipe(vinylPaths(del))
		.pipe(gulp.dest(fontPath + '/miscellaneous/'));
})

gulp.task('generation', function () {
	var fontName = 'Marxco Icons CS',
		iconStream = gulp.src([fontPath + '/**/*.svg'])
		.pipe(iconFont({
			fontName: fontName,
			formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
			copyright: 'Alexander "M.O.Z.G" Dikov',
			description: 'Iconfont for Marxco Component System',
			version: '1.5',
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
						glyphs: glyphs,
						fontPath: 'font',
						fileVersion: fileVersion
					}))
					.pipe(rename('icons.css'))
					.pipe(gulp.dest(pub))
					.on('finish', cb);
			});
		},
		// function handleAbstract (cb) {
		// 	iconStream.on('glyphs', function(glyphs, options) {
		// 		gulp.src(templatesPath + '/_a_ic.styl')
		// 			.pipe(consolidate('lodash', {
		// 				fontName: fontName,
		// 			}))
		// 			.pipe(rename('ic.styl'))
		// 			.pipe(gulp.dest(marxco + '/core/abstract/'))
		// 			.on('finish', cb);
		// 	});
		// },
		// function handleFamily (cb) {
		// 	iconStream.on('glyphs', function(glyphs, options) {
		// 		gulp.src(templatesPath + '/_font.styl')
		// 			.pipe(consolidate('lodash', {
		// 				glyphs: glyphs,
		// 				fileVersion: fileVersion,
		// 				fontName: fontName,
		// 				fontPath: '/assets/fonts'
		// 			}))
		// 			.pipe(rename('font.styl'))
		// 			.pipe(gulp.dest(marxco + '/core/variable/'))
		// 			.on('finish', cb);
		// 	});
		// },
		function handleShowcase (cb) {
			iconStream.on('glyphs', function(glyphs, options) {
				gulp.src(templatesPath + '/_icons.pug')
					.pipe(consolidate('lodash', {
						glyphs: glyphs
					}))
					.pipe(rename('_icons.pug'))
					.pipe(gulp.dest(src + '/layout/'))
					.on('finish', cb);
			});
		},
		function handleFonts (cb) {
			iconStream
				.pipe(gulp.dest(fontPathPub))
				.on('finish', cb);
		}
	]);
});

// Layout
gulp.task('layout', function buildHTML() {
	var sources = gulp.src(pub + '/**/*.css', {read: false});

	return gulp.src([src + '/layout/**/*.pug', '!' + src + '/layout/**/_*.pug'])
		.pipe(gulpPug({ }))
		.on('error', reportError )
		.pipe(inject(sources, {ignorePath: pub + '/', addRootSlash: false}))
		.on('error', reportError )
		.pipe(htmlbeautify(
			options = {
				indent_size: 1,
				indent_char: "\t"
			}))
		.on('error', reportError )
		.pipe(gulp.dest(pub))
		.pipe(debug());
});

gulp.task('default', ['clean'], function(cb) {
	runSequence(['generation'], 'layout', cb);
});

