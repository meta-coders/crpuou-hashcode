'use stirct';

const { parse, save } = require('./parser');
const compare = require('./compare');

const union = (set1, set2) => set2.reduce(
  (acc, cur) => (acc.includes(cur) ? null : acc.push(cur), acc), set1
);

const findMaxInterestingImg = (dataset, tags) => {
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
      const img2 = findMaxInterestingImg(dataset, img.tags);
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

const findMaxInterestingSlide = (slides, tags) => {
  let max = -1;
  let maxId = null;
  let maxSlide = null;

  for (const [id, slide] of slides) {
    const comp = compare(tags, slide.tags);
    if (comp > max) {
      max = comp;
      maxId = id;
      maxSlide = slide;
    }
  }

  slides.delete(maxId);
  return maxSlide;
};

const makeTransitions = slides => {
  const transitions = [];

  transitions.push(slides.get(0));
  slides.delete(0);

  while (slides.size !== 0) {
    const prev = transitions[transitions.length - 1];
    const next = findMaxInterestingSlide(slides, prev.tags);
    transitions.push(next);
  }

  return transitions;
};

const run = async filename => {
  const dataset = await parse('./input/' + filename + '.txt');
  const slides = composeSlides(dataset);
  const sorted = makeTransitions(slides);
  await save('./output/' + filename + '.out', sorted);
};

run('a_example.txt').catch(console.error);