var browserSync = require('browser-sync');
var gulp = require('gulp');
var config = require('../config');

var browserSyncTask = function browserSyncTask() {
	var proxy = config.tasks.browserSync.proxy || null;
	if (typeof proxy === 'string') {
		config.tasks.browserSync.proxy = proxy = {
			target: proxy
		};
	}

	var server = proxy || config.tasks.browserSync.server;
	browserSync.init(config.tasks.browserSync);
};

gulp.task('browserSync', browserSyncTask);
module.exports = browserSyncTask;