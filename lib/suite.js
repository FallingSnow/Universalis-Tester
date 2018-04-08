'use strict';

import EventEmitter from 'events';
import {
    createAsync
} from './utils';
import merge from 'lodash.merge';

export default class Suite extends EventEmitter {
    _depth = 0;
    context = new Proxy({}, {
        get: (target, name) => {
            return name in target ?
                target[name] :
                this.parent ?
                this.parent.context[name] :
                undefined;
        }
    });
    befores = [];
    afters = [];
    info = [];
    beforeEaches = [];
    afterEaches = [];
    status = 'pending';
    type = 'suite';
    config = {
        bail: false
    }
    constructor(name, children, config) {
        super();
        this.name = name;
        Object.assign(this.config, config);
        this.children = children;
        for (let child of children) {
            child.parent = this;
            child.depth = this._depth + 1;
            child.on('started', this.emit.bind(this, 'started'));
            child.on('finished', this.emit.bind(this, 'finished'));
            if (child.type === 'test')
                child.context = this.context;
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
    beforeEach(description, func) {
        this.beforeEaches.push({
            name: description,
            info: [],
            func: createAsync(func, this),
            status: 'pending',
            type: 'beforeEach'
        });
        return this;
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
    afterEach(description, func) {
        this.afterEaches.push({
            name: description,
            info: [],
            func: createAsync(func, this),
            status: 'pending',
            type: 'afterEach'
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
        this.beforeEaches = [];
        this.afterEaches = [];
        this.status = 'skipped';
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
    async run() {
        if (this.status !== 'pending') return;

        this._started();
        try {
            await this._run();
            this.status = 'pass';
            this._stopped();
        } catch (e) {
            this.status = 'fail';
            this._stopped();
            this.error = e;
            throw e;
        }
        return this;
    }
    async _run() {
        await this.runFunctions(this.befores);
        this.time = process.hrtime();

        for (let child of this.children) {
            await this.runFunctions(this.beforeEaches);
            try {
                await child.run();
            } catch (e) {
                this.error = e;
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
