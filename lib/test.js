'use strict';

import memwatch from 'node-memwatch';
import timeLimit from 'time-limit-promise';
import EventEmitter from 'events';
import {
    createAsync
} from './utils';
import merge from 'lodash.merge';

export default class Test extends EventEmitter {
    befores = [];
    afters = [];
    info = [];
    status = 'pending';
    context = {};
    depth = 0;
    type = 'test';
    config = {
        stats: false,
        timeout: 20000
    };
    constructor(name, testFunction, config) {
        super();
        Object.assign(this.config, config);
        this.name = name;
        this.testFunction = createAsync(testFunction, this);
    }
    // get _indent() {
    //     return '  '.repeat(this.depth) + '  >';
    // }
    // log() {
    //     const indent = this._indent;
    //     let args = Array.from(arguments);
    //     args.unshift(indent);
    //     for (let a of args) {
    //         if (typeof a !== 'undefined')
    //             a = a.toString().split('\n').join('\n' + indent);
    //     }
    //     console.log.apply(console, args);
    // }
    before(description, func) {
        this.befores.push({
            name: description,
            info: [],
            func: createAsync(func, this),
            status: 'pending',
            type: 'before'
        });
        return this;
    }
    after(description, func) {
        this.afters.push({
            name: description,
            info: [],
            func: createAsync(func, this),
            status: 'pending',
            type: 'after'
        });
        return this;
    }
    skip(condition) {
        if (!condition && typeof condition !== 'undefined') {
            return this;
        }

        if (this._running)
            throw new Error('You cannot skip a test while it is running.');
        if (this._ran)
            throw new Error('You cannot skip a test that has already run.');

        this.befores = [];
        this.afters = [];
        this.status = 'skipped';
    }
    async runFunctions(groups) {
        for (let group of groups) {
            this.emit('started', Object.assign(group, {
                depth: this.depth + 1
            }));
            try {
                group.time = process.hrtime();

                let result = await group.func();
                if (result instanceof Error)
                    throw result;

                merge(this.context, result);

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
    _started() {
        this._running = true;
        this.emit('started', this);
    }
    _stopped() {
        this._running = false;
        this._ran = true;
        this.emit('finished', this);
    }
    async run() {
        this._started();
        try {
            if (this.config.timeout)
                await timeLimit(this._run(), this.config.timeout, {
                    rejectWith: new Error('timeout')
                });
            else
                await this._run();
            this.status = 'pass';
            this._stopped();
        } catch (e) {
            this.status = 'fail';
            this._stopped();
            if (!this.error)
                this.error = e;
            throw e;
        }

        return this;
    }
    async _run() {
        await this.runFunctions(this.befores);
        this._started();

        if (this.config.stats) {
            this.memory = new memwatch.HeapDiff();
            this.cpu = process.cpuUsage();
        }
        this.time = process.hrtime();

        if (this.status === 'pending')
            try {
                let result = await this.testFunction();
                if (result instanceof Error)
                    throw result;

                merge(this.context, result);
                this.status = 'pass';
            } catch (e) {
                this.status = 'fail';
                this.error = e;
            }


        this.time = process.hrtime(this.time);
        if (this.timeout) clearTimeout(this.timeout);
        if (this.config.stats) {
            this.cpu = process.cpuUsage(this.cpu);
            this.memory = this.memory.end();
        }
        await this.runFunctions(this.afters);
        if (this.error)
            throw this.error;
    }
}
