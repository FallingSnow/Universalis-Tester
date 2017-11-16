'use strict';

import webpack from 'webpack';
import promisify from 'es6-promisify';

export default async function compile(entries, config = {}, vfs) {

    // A default config if no real config is provided
    Object.assign(config, {
        entry: entries
    });
    config.output.path = "/a/";

    // Initialize the webpack compiler with an in-memory file system
    const compiler = webpack(config);
    compiler.outputFileSystem = vfs;

    return await promisify(compiler.run, compiler)();
}
