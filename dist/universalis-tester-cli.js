#!/bin/env node

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
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports) {

module.exports = require("es6-promisify");

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_yargs__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_yargs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_yargs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chalk__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chalk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_chalk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_optional__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_optional___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_optional__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_path__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__webpack_compiler__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_child_process__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_child_process___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_child_process__);


let runScript = (() => {
    var _ref2 = _asyncToGenerator(function* (path) {
        return new Promise(function (resolve, reject) {
            Object(__WEBPACK_IMPORTED_MODULE_5_child_process__["spawn"])('node', [path], {
                stdio: 'inherit'
            }).addListener("error", reject).addListener("exit", resolve);
        });
    });

    return function runScript(_x) {
        return _ref2.apply(this, arguments);
    };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }








let argv = __WEBPACK_IMPORTED_MODULE_0_yargs___default.a.usage('$0 [options] file', 'Run universalis tester on file').options({
    'bail': {
        default: false,
        describe: 'Should testing stop after the first suite fails',
        type: 'boolean'
    },
    'webpack': {
        default: false,
        implies: 'webpack-config',
        describe: 'Should tests be compiled with webpack',
        type: 'boolean'
    },
    'webpack-config': {
        default: 'webpack-config.js',
        normalize: true,
        describe: 'Config to run webpack with',
        type: 'string'
    },
    'webpack-env': {
        default: 'test',
        describe: 'Environmental variable passed to config function',
        type: 'string'
    },
    'recursive': {
        default: false,
        describe: 'Run all tests in subdirectories',
        type: 'boolean'
    }
}).argv;

_asyncToGenerator(function* () {

    try {
        if (argv.webpack) {
            const configPath = __WEBPACK_IMPORTED_MODULE_3_path___default.a.resolve(argv.webpackConfig);
            let webpackConfig = __WEBPACK_IMPORTED_MODULE_2_optional___default()(configPath);
            if (!webpackConfig) console.warn('Webpack config was not found!');
            webpackConfig = typeof webpackConfig === 'function' ? webpackConfig(argv.webpackEnv) : webpackConfig;

            console.log('\n' + __WEBPACK_IMPORTED_MODULE_1_chalk___default.a.bgWhite(__WEBPACK_IMPORTED_MODULE_1_chalk___default.a.black(' WEBPACK ')));
            let compiled = yield Object(__WEBPACK_IMPORTED_MODULE_4__webpack_compiler__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_3_path___default.a.dirname(configPath), [argv.file], webpackConfig);
            let stats = compiled.stats;
            console.log(stats.toString("minimal"));

            const info = stats.toJson();
            if (stats.hasErrors()) {
                return;
            }

            console.log('\n' + __WEBPACK_IMPORTED_MODULE_1_chalk___default.a.bgWhite(__WEBPACK_IMPORTED_MODULE_1_chalk___default.a.black(' TESTER ')));
            for (let asset of info.assets) {
                if (asset.name.endsWith('.js')) {
                    yield runScript(__WEBPACK_IMPORTED_MODULE_3_path___default.a.resolve(compiled.outputPath, asset.name));
                }
            }
        }
    } catch (e) {
        console.error(e);
    }
})();

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("yargs");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("optional");

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webpack__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webpack___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_webpack__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_es6_promisify__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_es6_promisify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_es6_promisify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_path__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_os__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_os___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_os__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_fs__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_fs__);


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }







/* harmony default export */ __webpack_exports__["a"] = ((() => {
    var _ref = _asyncToGenerator(function* (context, entry, config = {}) {

        // A default config if no real config is provided
        Object.assign(config, {
            entry,
            context
        });

        const outputPath = __WEBPACK_IMPORTED_MODULE_2_path___default.a.join(__WEBPACK_IMPORTED_MODULE_3_os___default.a.tmpdir(), 'tester');
        if (!__WEBPACK_IMPORTED_MODULE_4_fs___default.a.existsSync(outputPath)) __WEBPACK_IMPORTED_MODULE_4_fs___default.a.mkdirSync(outputPath);
        config.output.path = outputPath;

        const nodeModulesPath = __WEBPACK_IMPORTED_MODULE_2_path___default.a.resolve(outputPath, 'node_modules');
        if (!__WEBPACK_IMPORTED_MODULE_4_fs___default.a.existsSync(nodeModulesPath)) __WEBPACK_IMPORTED_MODULE_4_fs___default.a.symlinkSync(__WEBPACK_IMPORTED_MODULE_2_path___default.a.resolve(context, 'node_modules'), nodeModulesPath);

        // Initialize the webpack compiler with an in-memory file system
        const compiler = __WEBPACK_IMPORTED_MODULE_0_webpack___default()(config);

        return {
            stats: yield __WEBPACK_IMPORTED_MODULE_1_es6_promisify___default()(compiler.run, compiler)(),
            outputPath
        };
    });

    function compile(_x, _x2) {
        return _ref.apply(this, arguments);
    }

    return compile;
})());

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ })
/******/ ]);
});
//# sourceMappingURL=universalis-tester-cli.js.map