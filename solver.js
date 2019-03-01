'use stirct';

const { parse, save } = require('./parser');
const compare = require('./compare');

const run = async (filename, handler) => {
  const dataset = await parse('./input/' + filename + '.txt');

  const slides = handler(dataset);

  await save('./output/' + filename + '.out', slides);
};

const a = 'a_example';
const b = 'b_lovely_landscapes';
const c = 'c_memorable_moments';
const d = 'd_pet_pictures';
const e = 'e_shiny_selfies';

run(a)
  .catch(console.error);

// run(b)
//   .catch(console.error);

// run(c)
//   .catch(console.error);

// run(d)
//   .catch(console.error);

// run(d)
//   .catch(console.error);
