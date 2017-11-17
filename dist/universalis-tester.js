require("source-map-support").install();

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("es6-promisify");

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isPromise */
/* harmony export (immutable) */ __webpack_exports__["a"] = createAsync;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_es6_promisify__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_es6_promisify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_es6_promisify__);




// https://github.com/then/is-promise/blob/master/index.js
function isPromise(obj) {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function createAsync(func, bind) {
    if (func.length) {
        return __WEBPACK_IMPORTED_MODULE_0_es6_promisify___default()(func, bind);
    } else if (isPromise(func)) {
        return func.bind(bind);
    } else {
        return () => new Promise((resolve, reject) => {
            try {
                resolve(func.call(bind));
            } catch (e) {
                reject(e);
            }
        });
    }
}

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib__ = __webpack_require__(6);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Suite", function() { return __WEBPACK_IMPORTED_MODULE_0__lib__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Test", function() { return __WEBPACK_IMPORTED_MODULE_0__lib__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Runners", function() { return __WEBPACK_IMPORTED_MODULE_0__lib__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Reporters", function() { return __WEBPACK_IMPORTED_MODULE_0__lib__["a"]; });


console.log('Universalis Tester 0.0.1');



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__suite__ = __webpack_require__(7);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__suite__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__test__ = __webpack_require__(8);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_1__test__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__runners__ = __webpack_require__(11);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__runners__; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__reporters__ = __webpack_require__(13);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_3__reporters__; });







/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_events__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_events__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chalk__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chalk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_chalk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(3);


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }





class Suite extends __WEBPACK_IMPORTED_MODULE_0_events___default.a {
    constructor(name, children) {
        super();
        this._depth = 0;
        this.befores = [];
        this.afters = [];
        this.info = [];
        this.beforeEaches = [];
        this.afterEaches = [];
        this.status = 'pending';
        this.type = 'suite';
        this.config = {
            bail: false
        };
        this.name = name;
        this.children = children;
        for (let child of children) {
            child.parent = this;
            child.depth = this._depth + 1;
            child.on('started', this.emit.bind(this, 'started'));
            child.on('finished', this.emit.bind(this, 'finished'));
        }
    }
    set depth(depth) {
        for (let child of this.children) {
            child.depth = depth + 1;
        }
        this._depth = depth;
    }
    get depth() {
        return this._depth;
    }
    beforeEach(description, func) {
        this.beforeEaches.push({
            name: description,
            info: [],
            func: Object(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* createAsync */])(func, this),
            status: 'pending',
            type: 'before'
        });
        return this;
    }
    before(description, func) {
        this.befores.push({
            name: description,
            info: [],
            func: Object(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* createAsync */])(func, this),
            status: 'pending',
            type: 'before'
        });
        return this;
    }
    after(description, func) {
        this.afters.push({
            name: description,
            info: [],
            func: Object(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* createAsync */])(func, this),
            status: 'pending',
            type: 'after'
        });
        return this;
    }
    afterEach(description, func) {
        this.afterEaches.push({
            name: description,
            info: [],
            func: Object(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* createAsync */])(func, this),
            status: 'pending',
            type: 'after'
        });
        return this;
    }
    skip(condition) {
        if (!condition && typeof condition !== 'undefined') {
            return this;
        }

        if (this._running) throw new Error('You cannot skip a test while it is running.');
        if (this._ran) throw new Error('You cannot skip a test that has already run.');

        this.befores = [];
        this.afters = [];
        this.beforeEaches = [];
        this.afterEaches = [];
        this.status = 'skipped';
    }
    _started() {
        this._running = true;
        this.emit('started', this);
    }
    _stopped() {
        this._running = false;
        this._ran = true;
        this.emit('finished', this);
    }
    runFunctions(groups) {
        var _this = this;

        return _asyncToGenerator(function* () {
            for (let group of groups) {
                _this.emit('started', Object.assign(group, {
                    depth: _this.depth + 1
                }));
                try {
                    group.time = process.hrtime();
                    yield group.func();
                    group.time = process.hrtime(group.time);
                } catch (e) {
                    group.time = process.hrtime(group.time);
                    _this.emit('finished', Object.assign(group, {
                        status: 'fail',
                        error: e,
                        depth: _this.depth + 1
                    }));
                    throw e;
                }
                _this.emit('finished', Object.assign(group, {
                    status: 'pass',
                    depth: _this.depth + 1
                }));
            }
        })();
    }
    run() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            if (_this2.status !== 'pending') return;

            _this2._started();
            try {
                yield _this2._run();
                _this2.status = 'pass';
                _this2._stopped();
            } catch (e) {
                _this2.status = 'fail';
                _this2._stopped();
                throw e;
            }
            return _this2;
        })();
    }
    _run() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            yield _this3.runFunctions(_this3.befores);
            _this3.time = process.hrtime();

            for (let child of _this3.children) {
                yield _this3.runFunctions(_this3.beforeEaches);
                try {
                    yield child.run();
                } catch (e) {
                    _this3.error = e;
                    let indent = '  '.repeat(child.depth) + '  ';
                    console.error(__WEBPACK_IMPORTED_MODULE_1_chalk___default.a.red(indent + '- ' + _this3.error.message));
                }
                yield _this3.runFunctions(_this3.afterEaches);
                if (_this3.error && _this3.config.bail) break;
            }

            _this3.time = process.hrtime(_this3.time);
            yield _this3.runFunctions(_this3.afters);

            if (_this3.error && _this3.config.bail) throw _this3.error;
        })();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Suite;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_memwatch_next__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_memwatch_next___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_memwatch_next__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_time_limit_promise__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_time_limit_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_time_limit_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_events__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_events__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(3);


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }






class Test extends __WEBPACK_IMPORTED_MODULE_2_events___default.a {
    constructor(name, testFunction) {
        super();
        this.befores = [];
        this.afters = [];
        this.info = [];
        this.status = 'pending';
        this.config = {
            stats: false,
            timeout: 20000
        };
        this.depth = 0;
        this.type = 'test';
        this.name = name;
        this.testFunction = Object(__WEBPACK_IMPORTED_MODULE_3__utils__["a" /* createAsync */])(testFunction);
    }
    before(description, func) {
        this.befores.push({
            name: description,
            info: [],
            func: Object(__WEBPACK_IMPORTED_MODULE_3__utils__["a" /* createAsync */])(func, this),
            status: 'pending',
            type: 'before'
        });
        return this;
    }
    after(description, func) {
        this.afters.push({
            name: description,
            info: [],
            func: Object(__WEBPACK_IMPORTED_MODULE_3__utils__["a" /* createAsync */])(func, this),
            status: 'pending',
            type: 'after'
        });
        return this;
    }
    skip(condition) {
        if (!condition && typeof condition !== 'undefined') {
            return this;
        }

        if (this._running) throw new Error('You cannot skip a test while it is running.');
        if (this._ran) throw new Error('You cannot skip a test that has already run.');

        this.befores = [];
        this.afters = [];
        this.status = 'skipped';
    }
    runFunctions(groups) {
        var _this = this;

        return _asyncToGenerator(function* () {
            for (let group of groups) {
                _this.emit('started', Object.assign(group, {
                    depth: _this.depth + 1
                }));
                try {
                    group.time = process.hrtime();
                    yield group.func();
                    group.time = process.hrtime(group.time);
                } catch (e) {
                    group.time = process.hrtime(group.time);
                    _this.emit('finished', Object.assign(group, {
                        status: 'fail',
                        error: e,
                        depth: _this.depth + 1
                    }));
                    throw e;
                }
                _this.emit('finished', Object.assign(group, {
                    status: 'pass',
                    depth: _this.depth + 1
                }));
            }
        })();
    }
    _started() {
        this._running = true;
        this.emit('started', this);
    }
    _stopped() {
        this._running = false;
        this._ran = true;
        this.emit('finished', this);
    }
    run() {
        var _this2 = this;

        return _asyncToGenerator(function* () {

            if (_this2.config.timeout) yield __WEBPACK_IMPORTED_MODULE_1_time_limit_promise___default()(_this2._run(), _this2.config.timeout, {
                rejectWith: new Error('timeout')
            });else yield _this2._run();

            if (_this2.error) throw _this2.error;

            return _this2;
        })();
    }
    _run() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            yield _this3.runFunctions(_this3.befores);
            _this3._started();

            if (_this3.config.stats) {
                _this3.memory = new __WEBPACK_IMPORTED_MODULE_0_memwatch_next___default.a.HeapDiff();
                _this3.cpu = process.cpuUsage();
            }
            _this3.time = process.hrtime();

            if (_this3.status === 'pending') try {
                yield _this3.testFunction();
                _this3.status = 'pass';
            } catch (e) {
                _this3.status = 'fail';
                _this3.error = e;
            }

            _this3.time = process.hrtime(_this3.time);
            if (_this3.timeout) clearTimeout(_this3.timeout);
            if (_this3.config.stats) {
                _this3.cpu = process.cpuUsage(_this3.cpu);
                _this3.memory = _this3.memory.end();
            }
            _this3._stopped();
            yield _this3.runFunctions(_this3.afters);
        })();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Test;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("memwatch-next");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("time-limit-promise");

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__default__ = __webpack_require__(12);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Default", function() { return __WEBPACK_IMPORTED_MODULE_0__default__["a"]; });


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_events__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_events__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chalk__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chalk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_chalk__);


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }




class Default extends __WEBPACK_IMPORTED_MODULE_0_events___default.a {
    constructor(tests, options) {
        super();
        this.options = {
            bail: true
        };
        this.results = {
            suite: {
                pass: [],
                fail: [],
                skipped: [],
                pending: []
            },
            test: {
                pass: [],
                fail: [],
                skipped: [],
                pending: []
            },
            before: {
                pass: [],
                fail: [],
                skipped: [],
                pending: []
            },
            after: {
                pass: [],
                fail: [],
                skipped: [],
                pending: []
            }
        };
        this.tests = tests;
        Object.assign(this.options, options);
    }
    run() {
        var _this = this;

        return _asyncToGenerator(function* () {
            let _self = _this;
            _this.time = process.hrtime();
            for (let test of _this.tests) {
                test.on('started', _this.emit.bind(_this, 'started'));
                test.on('finished', function (e) {
                    _this.results[e.type][e.status].push(e);
                    _self.emit.call(_self, 'finished', e);
                });
                try {
                    yield test.run();
                } catch (e) {
                    console.error(e);
                    if (_this.options.bail) break;
                }
            }
            _this.time = process.hrtime(_this.time);
        })();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Default;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spec__ = __webpack_require__(14);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Spec", function() { return __WEBPACK_IMPORTED_MODULE_0__spec__["a"]; });


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export timeWarning */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_figures__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_figures___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_figures__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chalk__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chalk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_chalk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_pretty_hrtime__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_pretty_hrtime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_pretty_hrtime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_diff__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_diff___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_diff__);


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }






const timeColors = {
    100: __WEBPACK_IMPORTED_MODULE_1_chalk___default.a.red,
    20: __WEBPACK_IMPORTED_MODULE_1_chalk___default.a.yellow
};
const times = [100, 20];
function timeWarning(e) {

    const millisecondsDuration = e.time[0] * 1e3 + e.time[1] / 1e6;

    for (let time of times) {
        if (millisecondsDuration > time) {
            e.info.push(timeColors[time](`(${__WEBPACK_IMPORTED_MODULE_2_pretty_hrtime___default()(e.time)})`));
            break;
        }
    }
}

class Spec {
    constructor(runner) {
        this.postProcessors = [timeWarning];

        this.runner = runner;
    }
    start() {
        var _this = this;

        return _asyncToGenerator(function* () {
            yield _this.runner.on('started', function (e) {
                switch (e.type) {
                    case 'suite':
                        console.log('\n' + '  '.repeat(e.depth) + e.name);
                        break;
                }
            }).on('finished', function (e) {
                let icon = e.status === 'pass' ? __WEBPACK_IMPORTED_MODULE_1_chalk___default.a.green(__WEBPACK_IMPORTED_MODULE_0_figures___default.a.tick) : e.status === 'fail' ? __WEBPACK_IMPORTED_MODULE_1_chalk___default.a.red(__WEBPACK_IMPORTED_MODULE_0_figures___default.a.cross) : e.status === 'skipped' ? __WEBPACK_IMPORTED_MODULE_1_chalk___default.a.blue(__WEBPACK_IMPORTED_MODULE_0_figures___default.a.line) : __WEBPACK_IMPORTED_MODULE_1_chalk___default.a.yellow(__WEBPACK_IMPORTED_MODULE_0_figures___default.a.warning);
                let number = e.status === 'fail' ? `[${__WEBPACK_IMPORTED_MODULE_1_chalk___default.a.bold(_this.runner.results[e.type][e.status].length)}] ` : '';
                let indent = '  '.repeat(e.depth);

                for (let postProcessor of _this.postProcessors) {
                    postProcessor(e);
                }

                switch (e.type) {
                    case 'before':
                    case 'after':
                        if (e.info.length) console.log(indent + __WEBPACK_IMPORTED_MODULE_1_chalk___default.a.yellow(e.name), e.info.join(' '));
                        break;
                    case 'test':
                        console.log(indent + icon, e.name, number + e.info.join(' '));
                }
            }).run();

            Spec.printResults(_this.runner.results.test, _this.runner.time);
        })();
    }
    static printResults(results, time) {
        console.log();
        for (let i = 0; i < results.fail.length; i++) {
            let test = results.fail[i];
            console.log(`${i + 1}) ${test.type !== 'test' ? `${test.type} hook: ` : ''}${test.name}`);
            let indentLog = function () {
                for (let a of arguments) {
                    console.log('  ' + a.toString().split('\n').join('\n  '));
                }
            };
            indentLog(__WEBPACK_IMPORTED_MODULE_1_chalk___default.a.red(test.error.stack) + '\n');
            if (test.error.showDiff) {
                const patch = Object(__WEBPACK_IMPORTED_MODULE_3_diff__["structuredPatch"])('actual', 'expected', JSON.stringify(test.error.actual, null, 2) + '\n', JSON.stringify(test.error.expected, null, 2) + '\n');
                indentLog(__WEBPACK_IMPORTED_MODULE_1_chalk___default.a.green(`+ expected`), __WEBPACK_IMPORTED_MODULE_1_chalk___default.a.red(`- actual`));
                const patchString = patch.hunks[0].lines.map(line => {
                    if (line.startsWith('-')) return __WEBPACK_IMPORTED_MODULE_1_chalk___default.a.red(line);
                    if (line.startsWith('+')) return __WEBPACK_IMPORTED_MODULE_1_chalk___default.a.green(line);
                    return line;
                }).join('\n');
                indentLog(patchString);
            }
            console.log();
        }

        for (let category of Object.keys(results)) {
            const num = results[category].length;
            if (num) {
                switch (category) {
                    case 'pass':
                        console.log(__WEBPACK_IMPORTED_MODULE_1_chalk___default.a.green(`${num} passing`), `(${__WEBPACK_IMPORTED_MODULE_2_pretty_hrtime___default()(time)})`);
                        break;
                    case 'fail':
                        console.log(__WEBPACK_IMPORTED_MODULE_1_chalk___default.a.red(`${num} failing`));
                        break;
                    default:
                        console.log(__WEBPACK_IMPORTED_MODULE_1_chalk___default.a.cyan(`${results[category].length} ${category}`));
                        break;
                }
            }
        }
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Spec;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("figures");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("pretty-hrtime");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("diff");

/***/ })
/******/ ]);
});
//# sourceMappingURL=universalis-tester.js.map