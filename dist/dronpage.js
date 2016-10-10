this["dron"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.randomizeContent = exports.followUserMouse = undefined;

	var _followMouse = __webpack_require__(4);

	var _followMouse2 = _interopRequireDefault(_followMouse);

	var _randomizeContent2 = __webpack_require__(5);

	var _randomizeContent3 = _interopRequireDefault(_randomizeContent2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(1);

	exports.followUserMouse = _followMouse2.default;
	exports.randomizeContent = _randomizeContent3.default;

/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = followUserMouse;

	var _getRandomInt = __webpack_require__(6);

	var _getRandomInt2 = _interopRequireDefault(_getRandomInt);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function cos(ra) {
	  if (ra == 270 || ra == 90) return 0;else return Math.cos(this.de_ra(ra));
	}

	function ra_de(radian) {
	  var y = radian * 180 / Math.PI;
	  while (y > 360) {
	    y = y - 360;
	  }return y;
	}

	function de_ra(de) {
	  var pi = Math.PI;
	  var de_ra = de * (pi / 180);
	  return de_ra;
	}

	function sin(ra) {
	  if (ra == 0 || ra == 180 || ra == 360) return 0;else return Math.sin(de_ra(ra));
	}

	function delta2sc(a, b, $C) {
	  var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2) - 2 * a * b * cos($C));

	  var $A = ra_de(Math.acos((b * b + c * c - a * a) / (2 * b * c)));

	  var $B = 180 - $A - $C;

	  var result = {
	    a: a,
	    b: b,
	    c: c,
	    '$A': $A,
	    '$B': $B,
	    '$C': $C
	  };

	  return result;
	}

	function delta2c1s(a, $C, $A) {
	  var $B = 180 - ($C + $A);
	  var c = a * (sin($C) / sin($A));
	  var b = a * (sin($B) / sin($A));
	  return {
	    a: a,
	    b: b,
	    c: c,
	    '$A': $A,
	    '$B': $B,
	    '$C': $C
	  };
	}

	function getDistance(x1, y1, x2, y2) {
	  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
	}

	function limitMax(n, max) {
	  return Math.abs(n) > max ? max * (n / Math.abs(n)) : n;
	}

	function followUserMouse(element, h1Element, pupilElement) {

	  function transform(X, Y) {
	    element.style.transform = "perspective(750px) scale(1) rotateX(" + X + "deg) rotateY(" + Y + "deg) translateZ(130px)";
	    // markElement.style.transform = "perspective(750px) scale(1) rotateX("+(X+50)+"deg) rotateY("+(Y)+"deg) translateZ(130px)";
	  }

	  var area = {
	    width: document.body.clientWidth,
	    height: document.body.clientHeight,
	    X: 0,
	    Y: 0,
	    lastCoords: [0, 0],
	    lostMouse: false,
	    followMouse: true
	  };
	  window.addEventListener('resize', function () {
	    area.width = document.body.clientWidth;
	    area.height = document.body.clientHeight;
	  });

	  document.body.addEventListener('mousemove', function (e) {
	    if (!area.followMouse) return;
	    var distance = getDistance(area.lastCoords[0], area.lastCoords[1], e.clientX, e.clientY);
	    var a = area.width / 2 - e.clientX;
	    var b1 = e.clientY - 150;

	    var _delta2sc = delta2sc(a, b1, 90);

	    var $B = _delta2sc.$B;
	    var pWidthShift = a / (area.width / 2);
	    var pHeightShifta = Math.abs(b1 / (area.height / 2));
	    var pWidthShifta = Math.abs(pWidthShift);

	    var _delta2c1s = delta2c1s(50, $B, 90);

	    var c = _delta2c1s.c;
	    var b = _delta2c1s.b;


	    if (pWidthShifta < 0.3 && pHeightShifta < 0.4) {
	      area.Y = 0;
	      area.X = 0;
	    } else {
	      area.Y = Math.round(b) * -1 * (pWidthShift / pWidthShifta);
	      area.X = Math.round(c) * -1;
	    }
	    area.lastCoords = [e.clientX, e.clientY];

	    if (distance > 300) {
	      area.followMouse = false;
	      area.lostMouse = setTimeout(function () {
	        area.lostMouse = false;
	      }, 1000);
	    }

	    if (!area.lostMouse) {
	      area.lastX = area.X;
	      area.lastY = area.Y;
	      transform(area.X + Math.random() * 10 - 5, area.Y + Math.random() * 10 - 5);
	      pupilElement.style.transform = 'scale(' + 1.5 * (1 - pWidthShifta) + ')';
	    } else {
	      transform(area.lastX, area.lastY);
	      pupilElement.style.transform = 'scale(1)';
	    }
	  });

	  /**
	   * Randomize behavior
	   */
	  setInterval(function () {
	    if ((0, _getRandomInt2.default)(0, 9) > 3) {
	      area.followMouse = true;
	    } else {
	      area.followMouse = false;
	      var rX = limitMax(area.lastX + (0, _getRandomInt2.default)(-25, 25), 50);
	      var rY = limitMax(area.lastY + (0, _getRandomInt2.default)(-25, 25), 50);
	      transform(rX, rY);
	      pupilElement.style.transform = 'scale(' + (0, _getRandomInt2.default)(0.5, 1.5) + ')';
	    }
	  }, 1000);

	  /**
	   * Randomize colors
	   */
	  var colors = ["#1e0fff", "#55ff0f", "#ff0f0f", "#c40fff", "#ff0fc0", "#0f85ff"];
	  setInterval(function () {

	    var rc = colors[(0, _getRandomInt2.default)(0, colors.length - 1)];
	    console.log(rc);
	    document.body.style.backgroundColor = rc;
	    element.style.backgroundColor = rc;
	    h1Element.style.color = rc;
	  }, 10000);
	}
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = randomizeContent;

	var _getRandomInt = __webpack_require__(6);

	var _getRandomInt2 = _interopRequireDefault(_getRandomInt);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function randomizeContent(element) {
	  setInterval(function () {
	    element.innerHTML = String.fromCharCode((0, _getRandomInt2.default)(40, 4000));
	  }, 100);
	}
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = getRandomInt;
	function getRandomInt(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	module.exports = exports["default"];

/***/ }
/******/ ]);