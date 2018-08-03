var gulp = require('gulp');
var runSequence = require('run-sequence');

var defaultTask = function defaultTask(cb) {
	runSequence('clean', ['fonts', 'images', 'videos'], ['css', 'html', 'js'], 'watch', cb);
};

gulp.task('default', defaultTask);