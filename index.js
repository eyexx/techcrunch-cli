#!/usr/bin/env node

var program = require('commander');
const chalk = require('chalk');
const figlet = require('figlet');
var list = require('./lib/list');

console.log(
    chalk.green(
        figlet.textSync('TechCrunch-cli', { horizontalLayout: 'full' })
    )
);


program
    .command('top')
    .description('List TechCrunch Top Stories')
    .action(function () {
        list()
    })


program.parse(process.argv);
