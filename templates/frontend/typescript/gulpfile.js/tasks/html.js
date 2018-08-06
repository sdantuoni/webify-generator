var config = require('../config');
var browserSync = require('browser-sync');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var handleErrors = require('../lib/handleErrors');
var htmlmin = require('gulp-htmlmin');
var useref = require('gulp-useref');
var path = require('path');
var nunjucksRender = require('gulp-nunjucks-render');
var plugins = require('gulp-load-plugins')();
plugins.versionAppend = require('gulp-version-append');

var exclude = path.normalize('!**/{' + config.tasks.html.excludeFolders.join(',') + '}/**');

var paths = {
	src: [path.join(config.root.src, config.tasks.html.src, '/**/*.html'), exclude],
	dest: path.join(config.root.dest, config.tasks.html.dest)
};

var defaultsNunjucks = {
	path: [
	  config.root.src + '/html/',
	  config.root.src + '/html/components/', 
	  config.root.src + '/html/animations/',
	  config.root.src + '/html/pages/'
	],
	ext: '.html'
  };

var htmlTask = function htmlTask() {

	if(global.production) {
		return gulp.src(paths.src)
			.on('error', handleErrors)
			.pipe(plugins.versionAppend(['html', 'js', 'css']))
			.pipe(nunjucksRender(defaultsNunjucks))
			.pipe(useref({ searchPath: config.root.src }))
			// Minifying conditionally due to useref passing down any type of assets to the stream
			// .pipe(gulpif('*.html', htmlmin(config.tasks.html.htmlmin)))
			.pipe(gulp.dest(paths.dest));
	}
	else {

		return gulp.src(paths.src)
			.on('error', handleErrors)
			.pipe(plugins.versionAppend(['html', 'js', 'css']))
			.pipe(nunjucksRender(defaultsNunjucks))
			.pipe(useref({ searchPath: config.root.src }))
			.pipe(gulp.dest(paths.dest))
			.pipe(browserSync.stream());
	}

};

gulp.task('html', htmlTask);


module.exports = htmlTask;