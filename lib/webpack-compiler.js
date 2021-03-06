'use strict';

import webpack from 'webpack';
import util from 'util';
import Path from 'path';
import os from 'os';
import fs from 'fs';

export default async function compile(context, entry, config = {}) {

    // A default config if no real config is provided
    Object.assign(config, {
        entry,
        context
    });

    const outputPath = Path.join(os.tmpdir(), context.substring(context.lastIndexOf(Path.sep), context.length));
    if (!fs.existsSync(outputPath))
        fs.mkdirSync(outputPath);
    config.output.path = outputPath;

    const nodeModulesPath = Path.resolve(outputPath, 'node_modules');
    if (!fs.existsSync(nodeModulesPath))
        fs.symlinkSync(Path.resolve(context, 'node_modules'), nodeModulesPath);

    const compiler = webpack(config);

    return {
        stats: await util.promisify(compiler.run.bind(compiler))(),
        outputPath
    };
}
