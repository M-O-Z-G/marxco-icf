const util          = require('util'),
	fs              = require('fs'),
	path            = require('path'),
	replace         = require('replace-in-file'),
	escapeRegExp    = require('lodash.escaperegexp'),
	copyFilePromise = util.promisify(fs.copyFile);

// the directory in which you're outputting your build
let baseDir = 'public'
// the name for the directory where your static files will be moved to
let staticDir = 'static'
// the directory where your source files are placed
let sourceDir = 'src'

const pathMake = (p) => {
	if (!fs.existsSync(path.join(__dirname, baseDir, p))){
		fs.mkdirSync(path.join(__dirname, baseDir, p));
}}

pathMake(staticDir) // if the staticDir directory isn't there, create it
// pathMake(assetsDir)// same for the assetsDir directory
pathMake('font') // same for the fontsDir directory
pathMake('js')
pathMake('styles')

const hashRemove = (hash) => {
	return hash.replace(/\.[a-z0-9]{8}\./gm, '.')
}

const linkReplace = (file, list, dir) => {
	list.forEach(name => {
		let startPath = `${dir}/`
		if(dir == null) { startPath = '' }
		let options = {
			files: path.join(baseDir, file),
			from: new RegExp(escapeRegExp(name), 'g'),
			to: startPath + hashRemove(name)
		}
		try {
			let changedFiles = replace.sync(options);
			// console.log('Modified files:', changedFiles.join(', '));
		}
		catch (error) {
			console.error('Error occurred:', error);
}})}

const parcelFakeUnignore = (file, list, dir) => {
	let options = {
		files: path.join(baseDir, file),
		from: new RegExp(/<!-- parcel-ignore \[ (.*) \] -->/, 'gm'),
		to: '$1'
	}
	try {
		let changedFiles = replace.sync(options);
		// console.log('Modified files:', changedFiles.join(', '));
	}
	catch (error) {
		console.error('Error occurred:', error);
}}

const filesMove = (list, dest) => {
	list.forEach(
		name => {
			fs.rename(path.join(__dirname, baseDir, name), path.join(__dirname, baseDir, dest, hashRemove(name)), function (err) {
				if (err) throw err
				console.log(`Successfully moved ${hashRemove(name)}`)
})})}

const copyFiles = (srcDir, destDir, files) => {
	return Promise.all(files.map(f => {
		return copyFilePromise(path.join(srcDir, f), path.join(destDir, f));
	}));
}

// Loop through the baseDir directory
fs.readdir(`./${baseDir}`, (err, files) => {
	// store all files in custom arrays by type
	let html         = [],
		js           = [],
		css          = [],
		jsMaps       = [],
		cssMaps      = [],
		fonts        = [],
		webman       = [],
		staticAssets = []

	const sortFiles = () => {
		files.forEach(file => {
			// first HTML files
			if(file.match(/.+\.(html)$/)) {
				console.log('html match', file)
				html.push(file)
			} else  if(file.match(/.+\.(js)$/)) { // then JavaScripts
				console.log('JavaScript match', file)
				js.push(file)
			} else if(file.match(/.+\.(woff|woff2|eot|ttf|otf)$/)) { // then fonts
				console.log('Font match', file)
				fonts.push(file)
			} else if (file.match(/.+\.(svg)$/)) { // Cheching for font SVG
				console.log('SVG match', file)
				if (fs.readFileSync(path.join(baseDir, file), 'utf8').match(/\<font\s/gm) != null) {
					fonts.push(file)
				} else {
					staticAssets.push(file)
				}
			} else if(file.match(/.+\.(css)$/)) { // then CSS
				console.log('css match', file)
				css.push(file)
			} else if(file.match(/.+\.(js.map)$/)) { // then sourcemaps
				console.log('JS sourcemaps match', file)
				jsMaps.push(file)
			} else if(file.match(/.+\.(css.map)$/)) { // then sourcemaps
				console.log('CSS sourcemaps match', file)
				cssMaps.push(file)
			} else if(file.match(/.+\.(webmanifest)$/)) { // then webmanifest
				console.log('CSS sourcemaps match', file)
				webman.push(file)
			} else if(file.match(/.+\..+$/)){ // all other files, exclude current directory and directory one level up
				if (!file.match(/.+\.(json|webmanifest)$/)) {
					console.log('Static match', file)
					staticAssets.push(file)
				}
			}
		});
	}

	const replaceLinks = () => {
		// check what went where
		console.log('html', html, '\ncss', css, '\ncss sourcemaps', cssMaps, '\njs', js, '\njs sourcemaps', jsMaps, '\nfonts', fonts, '\nstaticAssets', staticAssets)

		// create an array for all compiled assets
		// let assets = css.concat(js).concat(map)

		// replace all other resources in html
		html.forEach(
			file => {
				staticAssets.forEach(name => {
					let options = {
						files: path.join(baseDir, file),
						from: new RegExp(escapeRegExp(name), 'g'),
						to: staticDir + '/' +  hashRemove(name)
					}
					try {
						let changedFiles = replace.sync(options);
						// console.log('Modified files:', changedFiles.join(', '));
					}
					catch (error) {
						console.error('Error occurred:', error);
					}
				})
				// assets.forEach(name => {
				// 	let options = {
				// 		files: path.join(baseDir, file),
				// 		from: new RegExp(escapeRegExp(name), 'g'),
				// 		to: assetsDir + '/' +  hashRemove(name)
				// 	}
				// 	try {
				// 		let changedFiles = replace.sync(options);
				// 		console.log('Modified files:', changedFiles.join(', '));
				// 	}
				// 	catch (error) {
				// 		console.error('Error occurred:', error);
				// 	}
				// })
				linkReplace(file, fonts, 'font')
				// linkReplace(file, js, 'js')
				parcelFakeUnignore(file)
				linkReplace(file, css, 'styles')
			}
		)

		webman.forEach(
			file => {
				staticAssets.forEach(name => {
					let options = {
						files: path.join(baseDir, file),
						from: new RegExp(escapeRegExp(name), 'g'),
						to: staticDir + '/' +  hashRemove(name)
					}
					try {
						let changedFiles = replace.sync(options);
					}
					catch (error) {
						console.error('Error occurred:', error);
					}
				})
				linkReplace(file, staticAssets, staticDir)
			}
		)

		// replace map links in js
		js.forEach(
			file => {
				jsMaps.forEach(name => {
					let options = {
						files: path.join(baseDir, file),
						from: name,
						to: hashRemove(name)
					}
					try {
						let changedFiles = replace.sync(options);
						// console.log('Modified files:', changedFiles.join(', '));
					}
					catch (error) {
						console.error('Error occurred:', error);
					}
				})
			}
		)

		// replace links in css
		css.forEach(
			file => {
				staticAssets.forEach(name => {
					let options = {
						files: path.join(baseDir, file),
						from: new RegExp(escapeRegExp(name), 'g'),
						to: '../' + staticDir + '/' + hashRemove(name)
					}
					try {
						let changedFiles = replace.sync(options);
						// console.log('Modified files:', changedFiles.join(', '));
					}
					catch (error) {
						console.error('Error occurred:', error);
					}
				})
				linkReplace(file, fonts, '../font')
				linkReplace(file, cssMaps, null)
			}
		)
	}

	const moveBuildFiles = () => {
		// filesMove(assets, assetsDir) // move js and css and maps
		filesMove(fonts, 'font') // move fonts
		filesMove(js, 'js')
		filesMove(jsMaps, 'js')
		filesMove(css, 'styles')
		filesMove(cssMaps, 'styles')
		filesMove(staticAssets, staticDir) // move staticAssets
	}

	sortFiles();
	replaceLinks();
	moveBuildFiles();
});

// fs.copyFile(`${sourceDir}\\data.json`, `${baseDir}\\data.json`, (err) => {
// 	if (err) throw err;
// 	console.log('data.json was copied');
// });

// fs.copyFile(`${sourceDir}\\js\\main.js`, `${baseDir}\\js\\main.js`, (err) => {
// 	if (err) throw err;
// 	console.log('data.json was copied');
// });
// usage
copyFiles(sourceDir, baseDir, ['data.json', 'js\\main.js']).then(() => {
	console.log("JSON and JS are copied.");
}).catch(err => {
	console.log(err);
});