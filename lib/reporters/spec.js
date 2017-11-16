'use strict';
import figures from 'figures';
import chalk from 'chalk';
import prettyHR from 'pretty-hrtime';

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
                        // if (warning)
                        // console.log(indent + chalk.cyan(`[${e.type.uppercase()}] ${e.name}`), warning);
                        break;
                    case 'test':
                        console.log(indent + icon, e.name, warning);
                }
            })
            .run();

        Spec.printResults(this.runner.results.test, this.runner.time);
    }
    checkWarnings() {

    }
    static printResults(results, time) {
        console.log();
        if (results.pass.length)
            console.log(chalk.green(`${results.pass.length} passing`), `(${prettyHR(time)})`);
        // if (this.results.fail.length)
        //     console.log(chalk.red(`${this.results.fail.length} failing`), `(${prettyHR(this.runner.time)})`);
    }
}
