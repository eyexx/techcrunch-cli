#!/usr/bin/env node

var program = require('commander');


program
    .command('top')
    .description('List TechCrunch Top Stories')
    .action(function () {
        console.log("Hello tech crunch")
    })


program.parse(process.argv);
