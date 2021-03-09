#!/usr/bin/env node

const program = require('commander');
const package = require('./package.json');

program.version(package.version);

program
    .command('encrypt [text]')
    .description('Encrypts a message')
    .action((text) => {
        console.log(text);
    });

program.parse(process.argv);