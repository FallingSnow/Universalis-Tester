'use strict';
import figures from 'figures';
import chalk from 'chalk';
import prettyHR from 'pretty-hrtime';
import diff from 'deep-diff';

export default class Spec {
    warnings = {
        time: {
            20: chalk.yellow,
            100: chalk.red,
        }
    };
    constructor(runner) {
        this.runner = runner;
    }
    async start() {
        await this.runner
            .on('started', e => {
                switch (e.type) {
                    case 'suite':
                        console.log('\n' + ('  '.repeat(e.depth)) + e.name);
                        break;
                }
            })
            .on('finished', e => {
                let icon = e.status === 'pass' ?
                    chalk.green(figures.tick) : chalk.red(figures.cross);
                let indent = '  '.repeat(e.depth);

                let warning = '';
                const millisecondsDuration = (e.time[0] * 1e3) + (e.time[1] / 1e6);
                for (let [time, color] of Object.entries(this.warnings.time)) {
                    if (millisecondsDuration > time) {
                        warning = color(`(${prettyHR(e.time)})`);
                    }
                }
                switch (e.type) {
                    case 'before':
                    case 'after':
                        if (warning)
                        console.log(indent + chalk.yellow(e.name), warning);
                        break;
                    case 'test':
                        console.log(indent + icon, e.name, warning);
                }
            })
            .run();

        Spec.printResults(this.runner.results.test, this.runner.time);
    }
    static printResults(results, time) {
        console.log();
        for (let i = 0; i < results.fail.length; i++) {
            let test = results.fail[i];
            console.log(`${i + 1}) ${test.type !== 'test' ? `${test.type} hook: ` : ''}${test.name}`);
            console.log(chalk.red(test.error.stack) + '\n');
            if (test.error.showDiff) {
                // TODO: show actual diff
                let difference = diff(test.error.expected, test.error.actual);
                console.log(chalk.red(`- actual: ${test.error.actual}`));
                console.log(chalk.green(`+ expected: ${test.error.expected}`));
            }
            console.log();
        }
        if (results.pass.length)
            console.log(chalk.green(`${results.pass.length} passing`), `(${prettyHR(time)})`);
        if (results.fail.length)
            console.log(chalk.red(`${results.fail.length} failing`));
    }


}
