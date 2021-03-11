#!/usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');

const crypter = require('./crypter');
const packageJson = require('./package.json');

program.version(packageJson.version);

program
  .command('encrypt [text] [offset]')
  .description('Encrypts a message')
  .action(async (text, offset) => {
    let answers;

    if (!text || !offset) {
      answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'text',
          message: `What's the message?`,
          validate: value =>
            value ? true : 'You should provide a message to encrypt',
        },
        {
          type: 'number',
          name: 'offset',
          message: `Which rotation will used?`,
          validate: value =>
            value ? true : 'You should provide a rotation value to encrypt',
        },
      ]);
    }

    console.log(
      chalk`{green Here's your encrypted message:} {yellow ${crypter.encrypt(
        text || answers.text,
        parseInt(offset || answers.offset, 10),
      )}}`,
    );
  });

program
  .command('decrypt [text] [offset]')
  .description('Decrypts a message')
  .action(async (text, offset) => {
    let answers;

    if (!text || !offset) {
      answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'text',
          message: `What's the message?`,
          validate: value =>
            value ? true : 'You should provide a message to decrypt',
        },
        {
          type: 'number',
          name: 'offset',
          message: `Which rotation will used?`,
          validate: value =>
            value
              ? true
              : 'You should provide a rotation value to decrypt and must be a number',
        },
      ]);
    }

    console.log(
      chalk`{green Here's your decrypted message:} {yellow ${crypter.decrypt(
        text || answers.text,
        parseInt(offset || answers.offset, 10),
      )}}`,
    );
  });

program.parse(process.argv);
