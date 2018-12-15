#!/usr/bin/env node

var program = require('commander');
const chalk = require('chalk');
const figlet = require('figlet');

console.log(
    chalk.green(
        figlet.textSync('TechCrunch-cli', { horizontalLayout: 'full' })
    )
);


program
    .command('top')
    .description('List TechCrunch Top Stories')
    .action(function () {
        console.log("Hello tech crunch")
    })


program.parse(process.argv);
