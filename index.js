'use stirct';

const parse = require('./parser');
const compare = require('./compare');

const union = (set1, set2) => set2.reduce(
  (acc, cur) => (acc.includes(cur) ? null : acc.push(cur), acc), set1
);

const findMaxInterestingImg = (dataset, key, tags) => {
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
  const slides = new Map();
  let slideId = 0;

  dataset.forEach(img => {
    if (img.vertical) {
      const img2 = findMaxInterestingImg(dataset, img.id, img.tags);
      dataset.delete(img.id);
      slides.set(slideId++, {
        ids: [img.id, img2.id],
        tags: union(img.tags, img2.tags),
      });
    } else {
      slides.set(slideId++, { ids: [img.id], tags: img.tags });
    }
  });

  return slides;
};

const findMaxInterestingSlide = (slides, slideId) => {
  let max = -1;
  let maxVal = null;

  for (const [, val] of slides) {
    const comp = compare(tags, val.tags);
    if (comp > max) {
      max = comp;
      maxVal = val;
    }
  }

  slides.delete(maxVal.id);
  return maxVal;
};

const makeTransitions = slides => {
  const transitions = [];


  for (const [slideId, slide] of slides) {

  }
};

const run = async () => {
  const dataset = await parse('./input/a_example.txt');
  const slides = composeSlides(dataset);
  const sorted = makeTransitions(slides);
};

run().catch(console.error);