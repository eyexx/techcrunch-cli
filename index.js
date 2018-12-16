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
        list.fetchArticles()
    })

program
    .command('search')
    .arguments('<searchTerms...>')
    .description('Search Articles By Words')
    .action(function (searchTerms) {
        list.fetchArticles()
    })


program.parse(process.argv);
