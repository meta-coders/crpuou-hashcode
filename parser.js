'use strict';

const fs = require('fs');
const util = require('util');

const read = util.promisify(fs.readFile);
const write = util.promisify(fs.writeFile);

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

const save = async (filename, transitions) => {
  const count = transitions.length;
  const text = transitions.map(({ ids }) => `${ids.join(' ')}`).join('\n');
  const data = `${count}\n${text}`;
  await write(filename, data, 'utf8');
};

module.exports = { parse, save };
