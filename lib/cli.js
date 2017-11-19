"use strict";

import yargs from 'yargs';
import chalk from 'chalk';
import optional from 'optional';
import Path from 'path';
import compile from './webpack-compiler';
import {
    spawn
} from 'child_process';
import fs from 'fs';
import promisify from 'es6-promisify';
import recursive from 'recursive-readdir';


let argv = yargs
    .usage('$0 [options] file', 'Run universalis tester on file')
    .options({
        'bail': {
            default: false,
            describe: 'Should testing stop after the first suite fails',
            type: 'boolean'
        },
        'webpack-config': {
            default: 'webpack.config.js',
            describe: 'Config to run webpack with',
            type: 'string'
        },
        'webpack-env': {
            default: 'test',
            describe: 'Environmental variable passed to config function',
            type: 'string'
        }
    })
    .argv;

(async () => {

    try {
        let files = [argv.file];
        let configPath = '';

        // Handle directories
        if (fs.lstatSync(argv.file).isDirectory()) {
            files = (await promisify(recursive)(argv.file)).filter(f => {
                return f.endsWith('.spec.js');
            }).map(f => {
                return f;
            });
            // Attempt to find a webpack config to use with configuration
            configPath = findWebpackConfig(argv.file);
        } else {
            configPath = findWebpackConfig(Path.dirname(argv.file));
        }

        let webpackConfig = optional(configPath);
        if (!webpackConfig) console.warn('Webpack config was not found!');
        webpackConfig = typeof webpackConfig === 'function' ? webpackConfig(argv.webpackEnv) : webpackConfig;

        console.log('\n' + chalk.bgWhite(chalk.black(' WEBPACK ')));

        let compiled = await compile(configPath ? Path.dirname(configPath) : Path.resolve(Path.dirname(argv.file)), files, webpackConfig);
        let stats = compiled.stats;
        console.log(stats.toString("minimal"));

        const info = stats.toJson();
        if (stats.hasErrors()) {
            return;
        }

        console.log('\n' + chalk.bgWhite(chalk.black(' TESTER ')));
        for (let asset of info.assets) {
            if (asset.name.endsWith('.js')) {
                await runScript(Path.resolve(compiled.outputPath, asset.name));
            }
        }
    } catch (e) {
        console.error(e);
    }

})();

function findWebpackConfig(start) {
    while (!fs.existsSync(Path.resolve(start, argv.webpackConfig))) {
        let newStart = Path.dirname(start);
        if (start === newStart)
            return false;
        start = newStart;
    }
    return Path.resolve(start, argv.webpackConfig);
}

async function runScript(path) {
    return new Promise(function(resolve, reject) {
        spawn('node', [path], {
                stdio: 'inherit'
            })
            .addListener("error", reject)
            .addListener("exit", resolve);
    });

}
