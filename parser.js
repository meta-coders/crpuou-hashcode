'use strict';

const fs = require('fs');
const util = require('util');

const read = util.promisify(fs.readFile);

const parse = async filename => {
  const data = await read(filename, 'utf8');
  const [, ...lines] = data.split('\n');
  const dataset = [];

  // delete last empty line
  lines.pop();

  lines.forEach((line, id) => {
    const [orientation,, ...tags] = line.split(' ');
    dataset.push({ id, orientation, tags });
  });

  return dataset;
};

module.exports = parse;
