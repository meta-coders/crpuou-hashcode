'use stirct';

const parse = require('./parser');

parse('./input/a_example.txt')
  .then(console.log)
  .catch(console.error);