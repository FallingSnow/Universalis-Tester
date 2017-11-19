'use strict';

import promisify from 'es6-promisify';

// https://github.com/then/is-promise/blob/master/index.js
export function isPromise(obj) {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

export function createAsync(func, bind) {
    if (!bind)
        throw new Error('bind argument may not be invalid');
    if (func.length) {
        return promisify(func, bind);
    } else if (isPromise(func)) {
        return func.bind(bind);
    } else {
        return () => new Promise((resolve, reject) => {
            try {
                resolve(func.call(bind));
            } catch (e) {
                reject(e);
            }
        });
    }
}
