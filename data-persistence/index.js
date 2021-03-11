const fs = require('fs');
const { join } = require('path');
const _ = require('lodash');
const Table = require('cli-table');

const historicPath = join(__dirname, '..', 'historic.json');

const getJson = () => {
  const data = fs.existsSync(historicPath) ? fs.readFileSync(historicPath) : [];

  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
};

const saveJson = data =>
  fs.writeFileSync(historicPath, JSON.stringify(data, null, '\t'));

const saveHistoric = (rotation, decryptedMessage, encryptedMessage) => {
  const historicJson = getJson();
  let shouldSave = true;

  const newObj = {
    rotation,
    decryptedMessage,
    encryptedMessage,
  };

  console.log(newObj);

  historicJson.forEach(obj => {
    if (_.isEqual(obj, newObj)) {
      shouldSave = false;
    }
  });

  if (shouldSave) {
    historicJson.push(newObj);
  }

  saveJson(historicJson);
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

module.exports = {
  getJson,
  saveHistoric,
  showHistoricTable,
};
