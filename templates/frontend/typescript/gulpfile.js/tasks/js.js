var config = require('../config');
var handleErrors = require('../lib/handleErrors');
var fs = require('fs');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var tsify = require("tsify");
var path = require('path');
var realpathify = require('realpathify')



var paths = {
	src: path.join(config.root.src, config.tasks.js.src, '/**/*.{' + config.tasks.js.extensions + '}'),
	dest: path.join(config.root.dest, config.tasks.js.dest),
	entries: [
		path.join(config.root.src, config.tasks.js.src, config.tasks.js.entries.app)
	]
};

var extensions = config.tasks.js.extensions.map(function(extension) {
	return '.' + extension
});

var jsTask = function jsTask() {
	var b = browserify({
		entries: paths.entries,
		extensions: extensions,
		debug: true
	});

	if(global.production) {

		fs.writeFile('src/config.json', JSON.stringify({
			env: 'production'
		  }));

		return b
			.plugin(tsify, { 
				target: 'ES5',
				allowJs: true,
				files: [
					"src/javascripts/json.d.ts"
				],
				resolveJsonModule: true
			})
			.plugin(realpathify)
			.bundle()
			.on('error', handleErrors)
			// Use vinyl-source-stream to make the stream gulp compatible. Specify the desired output filename here.
			.pipe(source('app.js'))
			.pipe(buffer())
			.pipe(uglify())
			// Specify the output destination
			.pipe(gulp.dest(paths.dest));
	}
	else {

		fs.writeFile('src/config.json', JSON.stringify({
			env: 'development'
		  }));

		return b
			.plugin(tsify, { 
				target: 'ES5',
				allowJs: true,
				files: [
					"src/javascripts/json.d.ts"
				],
				resolveJsonModule: true
			})
			.plugin(realpathify)
			.bundle()
			.on('error', handleErrors)
			// Use vinyl-source-stream to make the stream gulp compatible. Specify the desired output filename here.
			.pipe(source('app.js'))
			.pipe(buffer())
			.pipe(sourcemaps.init({loadMaps: true}))
					// Add transformation tasks to the pipeline here.
					.pipe(uglify())
					.on('error', handleErrors)
			.pipe(sourcemaps.write())
			// Specify the output destination
			.pipe(gulp.dest(paths.dest))
			.pipe(browserSync.stream());
	}
};

gulp.task('js', jsTask);
module.exports = jsTask;
