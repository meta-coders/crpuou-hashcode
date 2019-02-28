'use stirct';

const parse = require('./parser');
const compare = require('./compare');

const union = (set1, set2) => set2.reduce(
  (acc, cur) => (acc.includes(cur) ? null : acc.push(cur), acc), set1
);

const findMaxInteresting = (dataset, key, tags) => {
  let max = -1;
  let maxVal = null;

  for (const [, val] of dataset) {
    const comp = compare(tags, val.tags);
    if (comp > max) {
      max = comp;
      maxVal = val;
    }
  }

  dataset.delete(maxVal.id);
  return maxVal;
};

const composeSlides = dataset => {
  const slides = [];

  dataset.forEach(img => {
    if (img.vertical) {
      const img2 = findMaxInteresting(dataset, img.id, img.tags);
      dataset.delete(img.id);
      slides.push({
        ids: [img.id, img2.id],
        tags: union(img.tags, img2.tags),
      });
    } else {
      slides.push({ ids: [img.id], tags: img.tags });
    }
  });

  return slides;
};

const run = async () => {
  const dataset = await parse('./input/a_example.txt');
  const slides = composeSlides(dataset);
  console.log(slides);
};

run().catch(console.error);