'use strict';

const compareTags = (
  firstSet,
  secondSet
) => {
  let union = 0;
  let first = 0;
  let second = 0;

  for (const fTeg of firstSet) {
    if (secondSet.includes(fTeg)) union++;
    else first++;
  }

  for (const sTeg of secondSet) {
    if (!firstSet.includes(sTeg)) second++;
  }

  return Math.min(first, second, union);
};

module.exports = compareTags;
