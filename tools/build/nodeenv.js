const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const path = require('path');
const getBabelConfiguration = require('../getBabelConfiguration.js');

gulp.task('default', () => {
    return watch('../../src/**/*.js', { ignoreInitial: false })
    .pipe(babel(getBabelConfiguration({
      root: path.resolve(__dirname, '../..'),
    })))
    .pipe(gulp.dest('../../dist'));
});
