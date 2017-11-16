"use strict";

import yargs from 'yargs';
import chalk from 'chalk';
import optional from 'optional';
import {
    vfs
} from './memory-fs';
import Path from 'path';
import compile from './webpack-compiler';
import {
    NodeVM
} from 'vm2';


let argv = yargs
    .usage('$0 [options] file', 'Run universalis tester on file')
    .options({
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
    })
    .argv;

(async() => {

    try {
        if (argv.webpack) {
            const configPath = Path.resolve(argv.webpackConfig);
            let webpackConfig = optional(configPath);
            if (!webpackConfig) console.warn('Webpack config was not found!');
            webpackConfig = typeof webpackConfig === 'function' ? webpackConfig(argv.webpackEnv) : webpackConfig;

            console.log('\n' + chalk.bgWhite(chalk.black(' WEBPACK ')));
            let stats = await compile([argv.file], webpackConfig, vfs);
            console.log(stats.toString("minimal"));

            console.log('\n' + chalk.bgWhite(chalk.black(' TESTER ')));
            const assets = stats.toJson({
                assets: true
            }).assets;
            for (let asset of assets) {
                if (asset.name.endsWith('.js')) {
                    await runScript(asset.name);
                }
            }
        }
    } catch (e) {
        console.error(e);
    }

})();

async function runScript(filename) {
    let script = clean(vfs.readFileSync('/a/' + filename).toString());
    let map = vfs.readFileSync('/a/' + filename + '.map').toString();

    function resolveErrorSource(error, stack) {
        console.log('error', error.toString())
        stack.map(function(frame) {
            console.log('frame:', frame.toString())
        }).join('');
        return error;
    }
    // console.log(map)

    // https://github.com/patriksimek/vm2/issues/108
    function vm2hrfix(start) {
        let now = process.hrtime();
        if (start)
            return [now[0] - start[0], now[1] - start[1]];
        return now;
    }
    const vm = new NodeVM({
        sandbox: {
            __TESTER_VFS: vfs,
            __TESTER_vm2hrfix: vm2hrfix,
            __TESTER_resolveSrc: resolveErrorSource
        },
        require: {
            builtin: ["*"],
            external: true,
            context: 'sandbox'
        }
    });

    let sourceMapLoader = `
    process.hrtime = __TESTER_vm2hrfix;
    require('source-map-support').install({
        handleUncaughtExceptions: false,
        environment: 'node',
        retrieveFile: function(so) {console.log(so)}//__TESTER_VFS.readFileSync
    })
    console.log(Error.prepareStackTrace);`;
    console.log(require.extensions)
    require('vm').runInThisContext('(function(require) {'+script+'})', {filename: argv.file})(global.require);
}

function clean(script) {
    if (script[0] === '#')
        script = script.substring(script.indexOf('\n'), script.length);
    return script;
}
