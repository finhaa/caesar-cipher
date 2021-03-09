#!/usr/bin/env node

const program = require('commander');

const crypter = require('./crypter');
const packageJson = require('./package.json');

program.version(packageJson.version);

program
  .command('encrypt <text> <offset>')
  .description('Encrypts a message')
  .action((text, offset) => {
    console.log(crypter.encrypt(text, parseInt(offset, 10)));
  });

program
  .command('decrypt <text> <offset>')
  .description('Decrypts a message')
  .action((text, offset) => {
    console.log(crypter.decrypt(text, parseInt(offset, 10)));
  });

program.parse(process.argv);
