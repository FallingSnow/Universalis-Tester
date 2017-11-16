import {
    Suite,
    Test,
    Runners,
    Reporters
} from '../';
import {assert} from 'chai';

let suites = [new Suite('login window', [
    new Test('should display login form', async function() {
        await (async() => {})();
        return;
    })
    .before('before test - async 1 second timeout', (done) => {
        setTimeout(done, 1000);
    })
    .after('after test', async() => {})
    .after('after test 2', async() => {}),
    new Suite('attempting login with wrong credentials', [
        new Test('should show error message with username', () => {}),
        new Test('should show error message with email', () => {}),
        new Test('should expect this test to fail', async() => {
            assert.isOk('', 'I wanted to fail!');
        }),
        new Test('should return proper error object', async() => {
            assert.deepEqual({status: 'error', message: 'system error', nested: {
                random: 'value'
            }}, {status: 'error', message: 'invalid credentials', nested: {
                expected: 'value'
            }}, 'incorrect error');
        }),
        new Suite('using wrong password', [
            new Test('should show error message', (done) => {
                setTimeout(() => {done(new Error('did not show error message'))}, 50);
            }),
        ]),
    ]),
    new Suite('attempting login with correct credentials', [
        new Test('should display user page', () => {})
    ])
    .beforeEach('before each!', async() => {})
])];

let spec = new Reporters.Spec(new Runners.Default(suites));

spec.start();
