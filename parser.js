'use strict';

const fs = require('fs');
const util = require('util');

const read = util.promisify(fs.readFile);

const parse = async filename => {
  const data = await read(filename, 'utf8');
  const [, ...lines] = data.split('\n');
  const dataset = new Map();

  // delete last empty line
  lines.pop();

  lines.forEach((line, id) => {
    const [orientation,, ...tags] = line.split(' ');
    const vertical = orientation === 'V';
    dataset.set(id, { id, vertical, tags });
  });

  return dataset;
};

module.exports = parse;
