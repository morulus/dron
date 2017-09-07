const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const path = require('path');
const getBabelConfiguration = require('../getBabelConfiguration.js');

gulp.task('default', () => {
    process.env.BUILD_ENV = 'node';
    return gulp.src('../../src/**/*.js')
    .pipe(babel(getBabelConfiguration({
      root: path.resolve(__dirname, '../..'),
      runtime: true,
    })))
    .pipe(gulp.dest('../../dist'));
});
