import { echo, createChannel } from 'erector';
import gulp from 'gulp';
import babel from 'gulp-babel';
import watch from 'gulp-watch';
import path from 'path';
import uuid4 from 'uuid4';
import config from 'erector-core-transform-config';

function watchStart(ignoreInitial) {
  return function(src, tail) {
    if (!ignoreInitial ) {
      tail(gulp.src(src)); // Initial build
    }
    watch(src, { ignoreInitial: true }) // Watch source
    .on('change', function() {
      tail(gulp.src(src));
    });
  }
}

function srcStart() {
  return function(src, tail) {
    return tail(gulp.src(src));
  }
}

export default function babelify(src, dist, {
  watch = false,
  ignoreInitial = false,
}) {
  const starter = watch ? watchStart(ignoreInitial) : srcStart();
  return function* () {
    const taskName = uuid4();
    yield echo.log('taskName', taskName);
    return createChannel(function(next) {
      gulp.task(taskName, () => {
          const start = new Date().getTime();
          process.env.BUILD_ENV = 'node';
          starter(src, function(stream) {
            stream.pipe(babel(config({
              root: path.resolve(__dirname, '../'),
              runtime: false,
            })))
            .pipe(gulp.dest(dist));
            stream.on('end', function(e) {
              const stats = {
                ms: new Date().getTime() - start,
              };
              next(stats);
            });
            stream.on('error', function(err) {
              throw err;
            });
          });
      });
      gulp.start.apply(gulp, [taskName]);
    });
  };
}
