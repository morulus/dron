'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = babelify;

var _erector = require('erector');

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpBabel = require('gulp-babel');

var _gulpBabel2 = _interopRequireDefault(_gulpBabel);

var _gulpWatch = require('gulp-watch');

var _gulpWatch2 = _interopRequireDefault(_gulpWatch);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _uuid = require('uuid4');

var _uuid2 = _interopRequireDefault(_uuid);

var _erectorCoreTransformConfig = require('erector-core-transform-config');

var _erectorCoreTransformConfig2 = _interopRequireDefault(_erectorCoreTransformConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function watchStart(ignoreInitial) {
  return function (src, tail) {
    if (!ignoreInitial) {
      tail(_gulp2.default.src(src)); // Initial build
    }
    (0, _gulpWatch2.default)(src, { ignoreInitial: true }) // Watch source
    .on('change', function () {
      tail(_gulp2.default.src(src));
    });
  };
}

function srcStart() {
  return function (src, tail) {
    return tail(_gulp2.default.src(src));
  };
}

function babelify(src, dist, _ref) {
  var _ref$watch = _ref.watch,
      watch = _ref$watch === undefined ? false : _ref$watch,
      _ref$ignoreInitial = _ref.ignoreInitial,
      ignoreInitial = _ref$ignoreInitial === undefined ? false : _ref$ignoreInitial;

  var starter = watch ? watchStart(ignoreInitial) : srcStart();
  return (/*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var taskName;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              taskName = (0, _uuid2.default)();
              _context.next = 3;
              return _erector.echo.log('taskName', taskName);

            case 3:
              return _context.abrupt('return', (0, _erector.createChannel)(function (next) {
                _gulp2.default.task(taskName, function () {
                  var start = new Date().getTime();
                  process.env.BUILD_ENV = 'node';
                  starter(src, function (stream) {
                    stream.pipe((0, _gulpBabel2.default)((0, _erectorCoreTransformConfig2.default)({
                      root: _path2.default.resolve(__dirname, '../'),
                      runtime: false
                    }))).pipe(_gulp2.default.dest(dist));
                    stream.on('end', function (e) {
                      var stats = {
                        ms: new Date().getTime() - start
                      };
                      next(stats);
                    });
                    stream.on('error', function (err) {
                      throw err;
                    });
                  });
                });
                _gulp2.default.start.apply(_gulp2.default, [taskName]);
              }));

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })
  );
}
module.exports = exports['default'];