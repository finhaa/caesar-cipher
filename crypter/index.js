const encrypt = (text, offset) => {
  let newText = '';
  let num;

  for (let i = 0; i < text.length; i += 1) {
    num = text.charCodeAt(i);

    if (num >= 65 && num <= 90) {
      num = ((num - 65 + offset) % 26) + 65;
      newText = newText.concat(String.fromCharCode(num));
    } else if (num >= 97 && num <= 122) {
      num = ((num - 97 + offset) % 26) + 97;
      newText = newText.concat(String.fromCharCode(num));
    } else {
      newText = newText.concat(String.fromCharCode(num));
    }
  }

  return newText;
};

const decrypt = (text, offset) => {
  let newText = '';
  let num;

  for (let i = 0; i < text.length; i += 1) {
    num = text.charCodeAt(i);

    if (num >= 65 && num <= 90) {
      num = ((num - 90 - offset) % 26) + 90;
      newText = newText.concat(String.fromCharCode(num));
    } else if (num >= 97 && num <= 122) {
      num = ((num - 122 - offset) % 26) + 122;
      newText = newText.concat(String.fromCharCode(num));
    } else {
      newText = newText.concat(String.fromCharCode(num));
    }
  }

  return newText;
};

module.exports = { encrypt, decrypt };
