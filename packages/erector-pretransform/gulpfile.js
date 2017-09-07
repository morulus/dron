const gulp = require('gulp');
const path = require('path');
const babel = require('gulp-babel');
const config = require('../erector-core-transform-config');

gulp.task('default', () => {
    const start = new Date().getTime();
    process.env.BUILD_ENV = 'node';
    gulp.src('./src/**/*.js')
    .pipe(babel(config({
      root: path.resolve(__dirname, '../'),
      runtime: false,
    })))
    .pipe(gulp.dest('./dist'));
});
