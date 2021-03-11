#!/usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs');
const { join } = require('path');
const _ = require('lodash');
const Table = require('cli-table');

const crypter = require('./crypter');
const packageJson = require('./package.json');

const historicPath = join(__dirname, 'historic.json');

const getJson = path => {
  const data = fs.existsSync(path) ? fs.readFileSync(path) : [];

  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
};

const saveJson = (path, data) =>
  fs.writeFileSync(path, JSON.stringify(data, null, '\t'));

const saveHistoric = (rotation, decryptedMessage, encryptedMessage) => {
  const historicJson = getJson(historicPath);
  let shouldSave = true;

  const newObj = {
    rotation,
    decryptedMessage,
    encryptedMessage,
  };

  historicJson.forEach(obj => {
    if (_.isEqual(obj, newObj)) {
      shouldSave = false;
    }
  });

  if (shouldSave) {
    historicJson.push(newObj);
  }

  saveJson(historicPath, historicJson);
};

const showHistoricTable = data => {
  const table = new Table({
    head: ['rotation', 'decrypted message', 'encrypted message'],
    colWidths: [10, 30, 30],
  });

  data.map(obj =>
    table.push([obj.rotation, obj.decryptedMessage, obj.encryptedMessage]),
  );

  console.log(table.toString());
};

program.version(packageJson.version);

program
  .command('encrypt [text] [offset]')
  .description('Encrypts a message')
  .option('-s, --save', 'Saves the encrypted and decrypted message in a json')
  .action(async (text, offset, options) => {
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

    const textToEncrypt = text || answers.text;
    const rotationToEncrypt = parseInt(offset || answers.offset, 10);

    const encryptedMessage = crypter.encrypt(textToEncrypt, rotationToEncrypt);

    if (options.save) {
      saveHistoric(rotationToEncrypt, textToEncrypt, encryptedMessage);
    }

    console.log(
      chalk`{green Here's your encrypted message:} {yellow ${encryptedMessage}}`,
    );
  });

program
  .command('decrypt [text] [offset]')
  .description('Decrypts a message')
  .option('-s, --save', 'Saves the encrypted and decrypted message in a json')
  .action(async (text, offset, options) => {
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

    const textToDecrypt = text || answers.text;
    const rotationToDecrypt = parseInt(offset || answers.offset, 10);

    const decryptedMessage = crypter.decrypt(textToDecrypt, rotationToDecrypt);

    if (options.save) {
      saveHistoric(rotationToDecrypt, decryptedMessage, textToDecrypt);
    }

    console.log(
      chalk`{green Here's your decrypted message:} {yellow ${decryptedMessage}}`,
    );
  });

program
  .command('historic')
  .description('List a historic of messages')
  .action(() => {
    const data = getJson(historicPath);
    showHistoricTable(data);
  });

program.parse(process.argv);
