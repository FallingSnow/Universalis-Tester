import {
    Suite,
    Test
} from '../index.js';
import must from 'must';

export default [new Suite('must - login window', [
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
            must('').equal('I wanted to fail!');
        }),
        new Test('user should be in scope', function() {
            must('').equal('I wanted to fail!');
        }),
        new Test('should return proper error object', async () => {
            must({
                status: 'error',
                message: 'system error',
                nested: {
                    random: 'value'
                }
            }, 'incorrect error').equal({
                status: 'error',
                message: 'invalid credentials',
                nested: {
                    expected: 'value'
                }
            });
        }),
        new Suite('using wrong password', [
            new Test('should show error message', (done) => {
                setTimeout(() => {
                    done(new Error('did not show error message'))
                }, 50);
            }),
            new Test('user should be in scope', function() {
                must(this.context.user, 'user was not in scope').exist();
            })
        ]),
    ]),
    new Suite('attempting login with correct credentials', [
        new Test('should display user page', () => {}),
        new Test('should authenticate websocket connection', () => {}),
        new Test('user should not be in scope', function() {
            must(this.context.user, 'user was not in scope').exist();
        })
    ])
    .beforeEach('before each!', async () => {})
])];
