'use strict';

const compare1 = (
  pictureA,
  pictureB
) => {
  const union = [];
  let a = 0;
  let b = 0;

  let tag;
  for (tag of pictureA) {
    if (pictureB.includes(tag)) union.push(tag);
    else a++;
  }

  for (tag of pictureB) {
    if (!union.includes(tag)) b++;
  }

  return Math.min(a, b, union.length);
};

const compare2 = (
  pictureA,
  pictureB
) => {
  let union = 0;
  let a = 0;
  let b = 0;

  let tag;
  for (tag of pictureA) {
    if (pictureB.includes(tag)) union++;
    else a++;
  }

  for (tag of pictureB) {
    if (!pictureA.includes(tag)) b++;
  }

  return Math.min(a, b, union);
};

module.exports = {
  compare1,
  compare2
};
