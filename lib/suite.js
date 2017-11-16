'use strict';

import EventEmitter from 'events';
import chalk from 'chalk';
import {
    createAsync
} from './utils';

export default class Suite extends EventEmitter {
    _depth = 0;
    befores = [];
    afters = [];
    beforeEaches = [];
    afterEaches = [];
    status = 'pending';
    type = 'suite';
    config = {
        bail: false
    }
    constructor(name, children) {
        super();
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
        this._depth = depth
    }
    get depth() {
        return this._depth;
    }
    beforeEach(description, func) {
        this.beforeEaches.push({
            name: description,
            func: createAsync(func),
            status: 'pending',
            type: 'before'
        });
        return this;
    }
    before(description, func) {
        this.befores.push({
            name: description,
            func: createAsync(func),
            status: 'pending',
            type: 'before'
        });
        return this;
    }
    after(description, func) {
        this.afters.push({
            name: description,
            func: createAsync(func),
            status: 'pending',
            type: 'after'
        });
        return this;
    }
    afterEach(description, func) {
        this.afterEaches.push({
            name: description,
            func: createAsync(func),
            status: 'pending',
            type: 'after'
        });
        return this;
    }
    async runFunctions(groups) {
        for (let group of groups) {
            this.emit('started', Object.assign(group, {
                depth: this.depth + 1
            }));
            try {
                group.time = process.hrtime();
                await group.func();
                group.time = process.hrtime(group.time);
            } catch (e) {
                group.time = process.hrtime(group.time);
                this.emit('finished', Object.assign(group, {
                    status: 'fail',
                    error: e,
                    depth: this.depth + 1
                }));
                throw e;
            }
            this.emit('finished', Object.assign(group, {
                status: 'pass',
                depth: this.depth + 1
            }));
        }
    }
    async run() {
        this.emit('started', this);
        try {
            await this._run();
            this.status = 'pass';
            this.emit('finished', this);
        } catch (e) {
            this.status = 'fail';
            this.emit('finished', this);
            throw e;
        }
        return this;
    }
    async _run() {
        if (this.status !== 'pending') return;

        await this.runFunctions(this.befores);
        this.time = process.hrtime();

        for (let child of this.children) {
            await this.runFunctions(this.beforeEaches);
            try {
                await child.run();
            } catch (e) {
                this.error = e;
                let indent = '  '.repeat(child.depth)+'  ';
                console.error(chalk.red(indent + this.error.stack.replace(/\n/g, '\n'+indent)));
            }
            await this.runFunctions(this.afterEaches);
            if (this.error && this.config.bail) break;
        }


        this.time = process.hrtime(this.time);
        await this.runFunctions(this.afters);

        if (this.error && this.config.bail)
            throw this.error;
    }
}
