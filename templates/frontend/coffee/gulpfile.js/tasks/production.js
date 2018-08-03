var config = require('../config')
var gulp = require('gulp')
var runSequence = require('run-sequence');

var productionTask = function(cb) {
	global.production = true;
	runSequence('clean', ['fonts', 'images', 'videos'], ['css', 'html', 'js'], function(){ cb(); process.exit(0); });
}

gulp.task('production', productionTask)
module.exports = productionTask