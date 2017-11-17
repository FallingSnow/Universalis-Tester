'use strict';
import figures from 'figures';
import chalk from 'chalk';
import prettyHR from 'pretty-hrtime';
import {
    structuredPatch
} from 'diff';


const timeColors = {
    100: chalk.red,
    20: chalk.yellow
};
const times = [100, 20];
export function timeWarning(e) {

    const millisecondsDuration = (e.time[0] * 1e3) + (e.time[1] / 1e6);

    for (let time of times) {
        if (millisecondsDuration > time) {
            e.info.push(timeColors[time](`(${prettyHR(e.time)})`));
            break;
        }
    }
}

export default class Spec {
    postProcessors = [
        timeWarning
    ];
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
                    chalk.green(figures.tick) : e.status === 'fail' ? chalk.red(figures.cross) : e.status === 'skipped' ? chalk.blue(figures.line) : chalk.yellow(figures.warning);
                let number = e.status === 'fail' ? `[${chalk.bold(this.runner.results[e.type][e.status].length)}] ` : '';
                let indent = '  '.repeat(e.depth);

                for (let postProcessor of this.postProcessors) {
                    postProcessor(e);
                }

                switch (e.type) {
                    case 'before':
                    case 'after':
                        if (e.info.length)
                            console.log(indent + chalk.yellow(e.name), e.info.join(' '));
                        break;
                    case 'test':
                        console.log(indent + icon, e.name, number + e.info.join(' '));
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
            let indentLog = function() {
                for (let a of arguments) {
                    console.log('  ' + a.toString().split('\n').join('\n  '));
                }
            }
            indentLog(chalk.red(test.error.stack) + '\n');
            if (test.error.showDiff) {
                const patch = structuredPatch('actual', 'expected', JSON.stringify(test.error.actual, null, 2) + '\n', JSON.stringify(test.error.expected, null, 2) + '\n');
                indentLog(chalk.green(`+ expected`), chalk.red(`- actual`));
                const patchString = patch.hunks[0].lines.map(line => {
                    if (line.startsWith('-'))
                        return chalk.red(line);
                    if (line.startsWith('+'))
                        return chalk.green(line);
                    return line;
                }).join('\n');
                indentLog(patchString);
            }
            console.log();
        }

        for (let category of Object.keys(results)) {
            const num = results[category].length;
            if (num) {
                switch (category) {
                    case 'pass':
                        console.log(chalk.green(`${num} passing`), `(${prettyHR(time)})`);
                        break;
                    case 'fail':
                        console.log(chalk.red(`${num} failing`));
                        break;
                    default:
                        console.log(chalk.cyan(`${results[category].length} ${category}`));
                        break;
                }
            }
        }
    }


}
