'use stirct';

const parse = require('./parser');
const compare = require('./compare');

const union = (set1, set2) => set2.reduce(
  (acc, cur) => (acc.includes(cur) ? null : acc.push(cur), acc), set1
);

const findMaxInteresting = (dataset, start) => {
  let min = Infinity;
  let minId = null;

};

const composeSlides = dataset => {
  const slides = [];

  dataset.forEach((img, i) => {
    if (img.vertical) {
      slides.push({ ids: [img.id], tags: img.tags });
    } else {
      const img2 = findMaxInteresting(dataset, i + 1);
      slides.push({
        ids: [img.id, img2.id],
        tags: union(img.tags, img2.tags),
      });
    }
  });

  return slides;
};

const run = async () => {
  const dataset = await parse('./input/a_example.txt');
  console.log(dataset);
};

// run().catch(console.error);