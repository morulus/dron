const gulp = require('gulp');
const path = require('path');
const babel = require('gulp-babel');
const config = require('../erector-core-transform-config');

gulp.task('default', () => {
    const start = new Date().getTime();
    process.env.BUILD_ENV = 'node';
    const babelConfig = config({
      root: path.resolve(__dirname, '../'),
      runtime: false,
    });
    return gulp.src('./src/**/*.js')
    .pipe(babel(babelConfig))
    .pipe(gulp.dest('./dist'))
    .on('done', function() {
      console.log('DONE!!!');
    });
});
