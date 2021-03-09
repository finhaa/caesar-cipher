#!/usr/bin/env node

const program = require('commander');
const packageJson = require('./package.json');

program.version(packageJson.version);

program
  .command('encrypt [text]')
  .description('Encrypts a message')
  .action(text => {
    console.log(text);
  });

program.parse(process.argv);
