import {
    Runners,
    Reporters
} from '../index.js';

import chai from './chai.spec.js';
import must from './must.spec.js';

let spec = new Reporters.Spec(new Runners.Default(chai.concat(must)));

spec.postProcessors.push((e) => {
    if (e.type === 'before' || e.type === 'after')
        e.info.push('Message on all before/afters');
});

spec.start();
