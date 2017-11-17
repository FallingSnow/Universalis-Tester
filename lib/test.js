'use strict';

import memwatch from 'memwatch-next';
import timeLimit from 'time-limit-promise';
import EventEmitter from 'events';
import {
    createAsync
} from './utils';

export default class Test extends EventEmitter {
    befores = [];
    afters = [];
    info = [];
    status = 'pending';
    config = {
        stats: false,
        timeout: 20000
    };
    depth = 0;
    type = 'test';
    constructor(name, testFunction) {
        super();
        this.name = name;
        this.testFunction = createAsync(testFunction);
    }
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

        if (this.config.timeout)
            await timeLimit(this._run(), this.config.timeout, {
                rejectWith: new Error('timeout')
            });
        else
            await this._run();

        if (this.error)
            throw this.error;

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
                await this.testFunction();
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
        this._stopped();
        await this.runFunctions(this.afters);
    }
}
