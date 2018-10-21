"use strict";

import yargs from 'yargs';
import chalk from 'chalk';
import Path from 'path';
import compile from './webpack-compiler';
import {
    spawn
} from 'child_process';
import fs from 'fs';
import util from 'util';
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
            files = (await util.promisify(recursive)(argv.file)).filter(f => {
                return f.endsWith('.spec.js');
            }).map(f => {
                return './' + f;
            });
            // Attempt to find a webpack config to use with configuration
            configPath = findWebpackConfig(argv.file);
        } else {
            configPath = findWebpackConfig(Path.dirname(argv.file));
        }

        let webpackConfig;
        if (configPath) {
            webpackConfig = __non_webpack_require__(configPath);
            webpackConfig = typeof webpackConfig === 'function' ? webpackConfig(argv.webpackEnv) : webpackConfig;
        } else {
            console.warn('Webpack config was not found!');
        }

        if (webpackConfig) {
            console.log('\n' + chalk.bgWhite(chalk.black(' WEBPACK ')));

            const compiled = await compile(configPath ? Path.dirname(configPath) : Path.resolve(Path.dirname(argv.file)), files, webpackConfig);
            const stats = compiled.stats;
            console.log(stats.toString("minimal"));

            const info = stats.toJson();
            if (stats.hasErrors()) {
                return;
            }
            files = [];
            for (const asset of info.assets) {
                if (asset.name.endsWith('.js')) {
                    files.push(Path.resolve(compiled.outputPath, asset.name));
                }
            }
        }

        console.log('\n' + chalk.bgWhite(chalk.black(' TESTER ')));
        for (const file of files) {
            await runScript(file);
        }
    } catch (e) {
        console.error(e);
    }

})();

function findWebpackConfig(start) {
    while (!fs.existsSync(Path.resolve(start, argv.webpackConfig))) {
        const newStart = Path.dirname(start);
        if (start === newStart)
            return false;
        start = newStart;
    }
    return Path.resolve(start, argv.webpackConfig);
}

async function runScript(path) {
    return new Promise(function(resolve, reject) {
        let node = spawn('node', [path], {
                stdio: 'inherit'
            })
            .addListener("error", reject)
            .addListener("exit", resolve);
            process.on('SIGINT', () => {node.kill()});
            process.on('SIGUSR2', () => {node.kill()});
            process.on('uncaughtException', () => {node.kill()});
    });

}
