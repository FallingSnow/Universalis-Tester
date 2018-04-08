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
    if (!e.time)
        return;
    const millisecondsDuration = (e.time[0] * 1e3) + (e.time[1] / 1e6);

    for (let time of times) {
        if (millisecondsDuration > time) {
            e.info.push(timeColors[time](`(${prettyHR(e.time)})`));
            break;
        }
    }
}
export function cpuWarning(e) {
    if (e.cpu) {
        e.info.push(e.cpu.user);
    }
}

export default class Spec {
    postProcessors = [
        timeWarning,
        cpuWarning
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
                let number = e.status === 'fail' ? `[${chalk.bold(this.runner.results[e.type][e.status].length+ e.type.charAt(0))}] ` : '';
                let indent = '  '.repeat(e.depth);

                for (let postProcessor of this.postProcessors) {
                    postProcessor(e);
                }

                switch (e.type) {
                    case 'before':
                    case 'after':
                        if (e.info.length || e.status === 'fail')
                            console.log(indent, chalk.yellow(`[${e.type}]`), e.name, number + e.info.join(' '));
                        if (e.status === 'fail')
                            console.error(chalk.red(indent + '  - ' + e.error.message));
                        break;
                    case 'test':
                        console.log(indent + icon, e.name, number + e.info.join(' '));
                        if (e.status === 'fail')
                            console.error(chalk.red(indent + '  - ' + e.error.message));
                        break;
                }
            })
            .run();

        Spec.printResults(this.runner.results, this.runner.time);
    }
    static printResults(results, time) {
        console.log();
        for (let [cat, res] of Object.entries(results)) {
            // TODO: Fix dirty hack
            if (cat === 'suite')
                continue;

            for (let i = 0; i < res.fail.length; i++) {
                let e = res.fail[i];
                console.log(`${i + 1}${cat.charAt(0)}) ${e.name}`);
                let indentLog = function() {
                    for (let a of arguments) {
                        console.log('  ' + a.toString().split('\n').join('\n  '));
                    }
                }
                indentLog(chalk.red(e.error.stack) + '\n');
                if (e.error.showDiff) {
                    const patch = structuredPatch('actual', 'expected', JSON.stringify(e.error.actual, null, 2) + '\n', JSON.stringify(e.error.expected, null, 2) + '\n');
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
        }

        // TODO: rewrite this garbage
        for (let cat of ['test', 'suite']) {
            const type = cat+'(s)';
            for (let status of Object.keys(results[cat])) {
                const num = results[cat][status].length;
                if (num) {
                    switch (status) {
                        case 'pass':
                            console.log( chalk.green(`${num} ${type} ${cat === 'suite' ? 'ran' : 'passing'}`), `(${prettyHR(time)})`);
                            break;
                        case 'fail':
                            console.log(chalk.red(`${num} ${type} failing`));
                            break;
                        default:
                            console.log(chalk.cyan(`${num} ${type} ${status}`));
                            break;
                    }
                }
            }
        }
    }


}
