'use strict';
import EventEmitter from 'events';
import chalk from 'chalk';

export default class Default extends EventEmitter {
    options = {
        bail: true
    };
    results = {
        suite: {
            pass: [],
            fail: [],
            skipped: [],
            pending: []
        },
        test: {
            pass: [],
            fail: [],
            skipped: [],
            pending: []
        },
        before: {
            pass: [],
            fail: [],
            skipped: [],
            pending: []
        },
        beforeEach: {
            pass: [],
            fail: [],
            skipped: [],
            pending: []
        },
        after: {
            pass: [],
            fail: [],
            skipped: [],
            pending: []
        },
        afterEach: {
            pass: [],
            fail: [],
            skipped: [],
            pending: []
        },
    };
    constructor(tests, options) {
        super();
        this.tests = tests;
        Object.assign(this.options, options);
    }
    async run() {
        let _self = this;
        this.time = process.hrtime();
        for (let test of this.tests) {
            test.on('started', this.emit.bind(this, 'started'));
            test.on('finished', e => {
                this.results[e.type][e.status].push(e);
                _self.emit.call(_self, 'finished', e);
            });
            try {
                await test.run();
            } catch (e) {
                console.error(e);
                if (this.options.bail)
                    break;
            }
        }
        this.time = process.hrtime(this.time);
    }
}
