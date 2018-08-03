var config = require('../config')
var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var handleErrors = require('../lib/handleErrors');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var gulpif = require('gulp-if');
var path = require('path');

var paths = {
	src: path.join(config.root.src, config.tasks.css.src, '/**/app.{' + config.tasks.css.extensions + '}'),
	dest: path.join(config.root.dest, config.tasks.css.dest)
};

var cssTask = function cssTask() {
	if(global.production) {
		return gulp.src(paths.src)
			.pipe(sass(config.tasks.css.sass)).on('error', handleErrors)
			.pipe(autoprefixer(config.tasks.css.autoprefixer))
			.pipe(cssnano())
			.pipe(gulp.dest(paths.dest))
	}
	else {
		return gulp.src(paths.src)
			.pipe(sass(config.tasks.css.sass)).on('error', handleErrors)
			.pipe(sourcemaps.init())
			.pipe(autoprefixer(config.tasks.css.autoprefixer))
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(paths.dest))
			.pipe(browserSync.stream());
	}
};

gulp.task('css', cssTask);
module.exports = cssTask;