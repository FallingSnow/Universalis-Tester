'use strict';

import webpack from 'webpack';
import promisify from 'es6-promisify';
import Path from 'path';
import os from 'os';
import fs from 'fs';

export default async function compile(entries, config = {}) {

    // A default config if no real config is provided
    Object.assign(config, {
        entry: entries
    });

    const outputPath = Path.join(os.tmpdir(), 'tester');
    if (!fs.existsSync(outputPath))
        fs.mkdirSync(outputPath);
    config.output.path = outputPath;

    const nodeModulesPath = Path.resolve(outputPath, 'node_modules');
    if (!fs.existsSync(nodeModulesPath))
        fs.symlinkSync(Path.resolve(Path.dirname(entries[0]), 'node_modules'), nodeModulesPath);

    // Initialize the webpack compiler with an in-memory file system
    const compiler = webpack(config);

    return {
        stats: await promisify(compiler.run, compiler)(),
        outputPath
    };
}
