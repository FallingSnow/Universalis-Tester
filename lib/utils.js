'use strict';

import promisify from 'es6-promisify';

// https://github.com/then/is-promise/blob/master/index.js
export function isPromise(obj) {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

export function createAsync(func) {
    if (func.length) {
        return promisify(func, this);
    } else if (isPromise(func)) {
        return func.bind(this);
    } else {
        let _self = this;
        return () => new Promise((resolve, reject) => {
            try {
                resolve(func.call(_self));
            } catch (e) {
                reject(e);
            }
        });
    }
}
