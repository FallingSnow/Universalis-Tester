"use strict";

import yargs from 'yargs';
import chalk from 'chalk';
import optional from 'optional';
import Path from 'path';
import compile from './webpack-compiler';
import {
    spawn
} from 'child_process';


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
            let compiled = await compile([argv.file], webpackConfig);
            let stats = compiled.stats;
            console.log(stats.toString("minimal"));

            console.log('\n' + chalk.bgWhite(chalk.black(' TESTER ')));
            const assets = stats.toJson().assets;
            for (let asset of assets) {
                if (asset.name.endsWith('.js')) {
                    await runScript(Path.resolve(compiled.outputPath, asset.name));
                }
            }
        }
    } catch (e) {
        console.error(e);
    }

})();

async function runScript(path) {
    return new Promise(function(resolve, reject) {
        spawn('node', [path], {
                stdio: 'inherit'
            })
            .addListener("error", reject)
            .addListener("exit", resolve);
    });

}
