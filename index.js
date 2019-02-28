'use stirct';

const { parse, save } = require('./parser');
const compare = require('./compare');

const union = (set1, set2) => set2.reduce(
  (acc, cur) => (acc.includes(cur) ? null : acc.push(cur), acc), set1
);

const findMaxInterestingImg = (dataset, img) => {
  let max = -1;
  let maxVal = { tags: [] };

  for (const [, val] of dataset) {
    if (!val.vertical || img.id === val.id) continue;
    const comp = compare(img.tags, val.tags);
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
      const img2 = findMaxInterestingImg(dataset, img);
      dataset.delete(img.id);
      slides.set(slideId, {
        id: slideId++,
        ids: [img.id, img2.id],
        tags: union(img.tags, img2.tags),
      });
    } else {
      slides.set(slideId, {
        id: slideId++,
        ids: [img.id],
        tags: img.tags
      });
    }
  });

  return slides;
};

const findMaxInterestingSlide = (slides, added, curr) => {
  let max = -1;
  let maxSlide = null;

  for (const [id, slide] of slides) {
    if (added.has(id) || id === curr.id) continue;
    const comp = compare(curr.tags, slide.tags);
    if (comp > max) {
      max = comp;
      maxSlide = slide;
    }
  }

  return maxSlide;
};

const makeTransitions = slides => {
  const transitions = [];
  transitions.push(slides.get(0));

  const added = new Set();
  added.add(0);

  while (slides.size !== added.size) {
    console.log(transitions.length);
    const prev = transitions[transitions.length - 1];
    const next = findMaxInterestingSlide(slides, added, prev);
    transitions.push(next);
    added.add(next.id);
  }

  return transitions;
};

const run = async filename => {
  const dataset = await parse('./input/' + filename + '.txt');
  const slides = composeSlides(dataset);
  const sorted = makeTransitions(slides);
  await save('./output/' + filename + '.out', sorted);
};

run('b_lovely_landscapes').catch(console.error);