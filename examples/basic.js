import {
    Suite,
    Test,
    Runners,
    Reporters
} from '../index.js';
import {
    assert
} from 'chai';

let suites = [new Suite('login window', [
    new Test('should display login form', async function() {
        await (async () => {})();
        return;
    })
    .before('async before test with 100ms timeout', function(done) {
        // this.skip();
        setTimeout(done, 100);
    })
    .after('after test', async () => {})
    .after('after test 2', async () => {}),
    new Suite('attempting login with wrong credentials', [
        new Test('should show error message with username', function() {
            return {
                user: 'The User!'
            };
        }),
        new Test('should show error message with email', function() {}),
        new Test('should expect this test to fail', async () => {
            assert.isOk('', 'I wanted to fail!');
        }),
        new Test('user should be in scope', function() {
            assert.isOk(this.context.user, 'I wanted to fail!');
        }),
        new Test('should return proper error object', async () => {
            assert.deepEqual({
                status: 'error',
                message: 'system error',
                nested: {
                    random: 'value'
                }
            }, {
                status: 'error',
                message: 'invalid credentials',
                nested: {
                    expected: 'value'
                }
            }, 'incorrect error');
        }),
        new Suite('using wrong password', [
            new Test('should show error message', (done) => {
                setTimeout(() => {
                    done(new Error('did not show error message'))
                }, 50);
            }),
            new Test('user should be in scope', function() {
                assert.isOk(this.context.user, 'user was not in scope');
            })
        ]),
    ]),
    new Suite('attempting login with correct credentials', [
        new Test('should display user page', () => {}),
        new Test('should authenticate websocket connection', () => {}),
        new Test('user should not be in scope', function() {
            assert.isNotOk(this.context.user, 'user was in scope');
        })
    ])
    .beforeEach('before each!', async () => {})
])];

let spec = new Reporters.Spec(new Runners.Default(suites));

spec.postProcessors.push((e) => {
    if (e.type === 'before' || e.type === 'after')
        e.info.push('Message on all before/afters');
});

spec.start();
