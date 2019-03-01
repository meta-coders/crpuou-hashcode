'use strict';

const fs = require('fs');
const util = require('util');

const read = util.promisify(fs.readFile);
const write = util.promisify(fs.writeFile);

const parse = async filename => {
  const dataset = {
    V: [],
    H: [],
  };

  const data = await read(filename, 'utf8');
  const [, ...lines] = data.split('\n');

  // delete last empty line
  lines.pop();

  lines.forEach((line, id) => {
    const [orientation,, ...tags] = line.split(' ');
    dataset[orientation].push({
      id,
      tags,
    });
  });

  return dataset;
};

const save = async (filename, slides) => {
  const count = slides.length;

  const text = slides
    .map(
      ids => `${ids.join(' ')}`
    )
    .join('\n');

  const data = `${count}\n${text}`;

  await write(filename, data, 'utf8');
};

module.exports = { parse, save };
