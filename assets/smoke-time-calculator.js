import { ANIMALS, CUTS, SOURCES, calculateSmokeTime, cutArtworkName, formatMinutes } from './smoke-time-model.mjs';

const form = document.querySelector('#smoke-form');
const result = document.querySelector('#result');
const animalWindow = document.querySelector('#animal-window');
const cutWindow = document.querySelector('#cut-window');
const weightInput = document.querySelector('#weight');
const temperatureInput = document.querySelector('#temperature');
const temperatureChoice = document.querySelector('#temperature-choice');
const SOURCE_LABELS = {
  flat: 'ThermoWorks flat guide', brisket: 'ThermoWorks brisket primer', point: 'Traeger flat vs. point',
  brisketTraeger: 'Traeger brisket guide', porkButt: 'ThermoWorks pork butt', porkTraeger: 'Traeger pulled pork',
  ribs: 'Traeger rib guide', beefRibs: 'Traeger beef ribs', shortRibs: 'ThermoWorks short ribs',
  plateRibs: 'Traeger plate ribs', belly: 'Traeger pork belly', tenderloin: 'Traeger tenderloin',
  chicken: 'Traeger whole chicken', chickenBreast: 'Traeger chicken breast', chickenWings: 'Traeger chicken wings',
  turkey: 'Traeger turkey guide', turkeyBreast: 'Traeger turkey breast', turkeyLegs: 'Traeger turkey legs',
  turkeyWings: 'Traeger turkey wings', turkeyThighs: 'Traeger turkey guide', duck: 'Traeger whole duck',
  salmon: 'Traeger smoked salmon', trout: 'Traeger smoked trout', fishGeneral: 'Traeger fish guide',
  lambLeg: 'Hey Grill Hey lamb leg', lambShoulder: 'ThermoWorks lamb shoulder', lambRack: 'Traeger lamb rack',
  chuck: 'Traeger chuck roast', chuckPulled: 'Hey Grill Hey pulled chuck', eyeRound: 'Hey Grill Hey eye of round',
  ham: 'Traeger ham guide', porkTraegerRecipe: 'Traeger wrapped pork butt', bellyTraeger: 'Traeger pork belly recipe',
  catfishKent: 'Kent Rollins catfish', catfishSmoker: 'Smoker Cooking catfish',
  lambShoulderHey: 'Hey Grill Hey lamb shoulder', lambShoulderBoard: 'American Lamb Board shoulder',
  spareAmazing: 'AmazingRibs spare ribs', spareJeff: 'Smoking Meat spare ribs', spareHey: 'Hey Grill Hey spare ribs',
  wingsKingsford: 'Kingsford chicken wings', wingsJeff: 'Smoking Meat chicken wings',
  flatSBS: 'Smoked BBQ Source brisket flat', pointSBS: 'Smoked BBQ Source brisket point',
  packerHey: 'Hey Grill Hey packer brisket', packerChiles: 'Chiles and Smoke packer brisket', backRibsHey: 'Hey Grill Hey beef back ribs',
  shortRibsHey: 'Hey Grill Hey beef short ribs', buttHey: 'Hey Grill Hey pork butt',
  tenderloinSBS: 'Smoked BBQ Source tenderloin', breastJeff: 'Smoking Meat chicken breast',
  thighHey: 'Hey Grill Hey chicken thighs', thighJeff: 'Smoking Meat chicken thighs',
  turkeyWingsTraeger: 'Traeger turkey wings', turkeyThighDennis: 'Ask Chef Dennis turkey thighs',
  salmonHey: 'Hey Grill Hey salmon', troutTraeger: 'Traeger trout', chuckJeff: 'Smoking Meat chuck roast',
  babyAmazing: 'AmazingRibs baby back ribs', bellyHey: 'Hey Grill Hey pork belly',
  turkeyBreastHey: 'Hey Grill Hey turkey breast', hamJeff: 'Smoking Meat fully cooked ham'
};
let animalIndex = 0;
let cutIndex = 1; // Brisket Flat is a familiar starting example.

const wrap = (index, length) => (index + length) % length;
const currentAnimal = () => ANIMALS[animalIndex];
const currentCut = () => CUTS[currentAnimal()][cutIndex];
const artwork = (kind, animal, cut) => {
  const name = kind === 'animal' ? `PP_Animal_${animal}` : `PP_Cut_${animal}_${cutArtworkName(cut)}`;
  return new URL(`./images/calculator/${name}.png`, import.meta.url).href;
};

function renderPicker(kind) {
  const items = kind === 'animal' ? ANIMALS : CUTS[currentAnimal()];
  const selectedIndex = kind === 'animal' ? animalIndex : cutIndex;
  const window = kind === 'animal' ? animalWindow : cutWindow;
  const count = document.querySelector(`#${kind}-count`);
  const radius = matchMedia('(max-width: 600px)').matches ? 1 : 2;
  window.replaceChildren();
  for (let offset = -radius; offset <= radius; offset += 1) {
    const index = wrap(selectedIndex + offset, items.length);
    const label = items[index];
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `carousel-tile${offset === 0 ? ' is-selected' : ''}`;
    button.setAttribute('aria-pressed', offset === 0 ? 'true' : 'false');
    button.setAttribute('aria-label', `${label}${offset === 0 ? ', selected' : ''}`);
    const imagePath = kind === 'animal' ? artwork('animal', label) : artwork('cut', currentAnimal(), label);
    const image = document.createElement('img');
    image.src = imagePath;
    image.alt = '';
    image.width = 360;
    image.height = 360;
    button.append(image);
    const title = document.createElement('strong');
    title.textContent = label;
    button.append(title);
    button.addEventListener('click', () => {
      if (kind === 'animal') {
        animalIndex = index;
        cutIndex = 0;
        renderPicker('animal');
        renderPicker('cut');
      } else {
        cutIndex = index;
        renderPicker('cut');
      }
      result.hidden = true;
      (kind === 'animal' ? animalWindow : cutWindow).querySelector('.is-selected')?.focus();
    });
    window.append(button);
  }
  count.textContent = `${selectedIndex + 1} of ${items.length} · ${items[selectedIndex]}`;
}

function step(kind, direction) {
  if (kind === 'animal') {
    animalIndex = wrap(animalIndex + direction, ANIMALS.length);
    cutIndex = 0;
    renderPicker('animal');
    renderPicker('cut');
  } else {
    cutIndex = wrap(cutIndex + direction, CUTS[currentAnimal()].length);
    renderPicker('cut');
  }
  result.hidden = true;
}

for (const kind of ['animal', 'cut']) {
  document.querySelector(`#${kind}-prev`).addEventListener('click', () => step(kind, -1));
  document.querySelector(`#${kind}-next`).addEventListener('click', () => step(kind, 1));
  const picker = document.querySelector(`#${kind}-carousel`);
  picker.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      step(kind, event.key === 'ArrowRight' ? 1 : -1);
      picker.querySelector('.is-selected')?.focus();
    }
  });
  let startX = null;
  picker.addEventListener('touchstart', event => { startX = event.touches[0].clientX; }, {passive: true});
  picker.addEventListener('touchend', event => {
    if (startX === null) return;
    const distance = event.changedTouches[0].clientX - startX;
    startX = null;
    if (Math.abs(distance) > 45) {
      event.preventDefault();
      step(kind, distance < 0 ? 1 : -1);
    }
  }, {passive: false});
}

temperatureChoice.addEventListener('change', () => {
  const custom = temperatureChoice.value === 'custom';
  temperatureInput.hidden = !custom;
  if (!custom) temperatureInput.value = temperatureChoice.value;
  if (custom) temperatureInput.focus();
  result.hidden = true;
});
weightInput.addEventListener('input', () => { result.hidden = true; });
temperatureInput.addEventListener('input', () => { result.hidden = true; });
let mobileLayout = matchMedia('(max-width: 600px)').matches;
addEventListener('resize', () => {
  const nowMobile = matchMedia('(max-width: 600px)').matches;
  if (nowMobile !== mobileLayout) {
    mobileLayout = nowMobile;
    renderPicker('animal');
    renderPicker('cut');
  }
});

function detail(label, value) {
  const paragraph = document.createElement('p');
  const strong = document.createElement('strong');
  strong.textContent = `${label} `;
  paragraph.append(strong, document.createTextNode(value));
  return paragraph;
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const calculation = calculateSmokeTime({
    animal: currentAnimal(), cut: currentCut(), weight: weightInput.value,
    temperature: temperatureInput.value
  });
  const kicker = document.querySelector('#result-kicker');
  const value = document.querySelector('#result-value');
  const averageWrap = document.querySelector('#result-average-wrap');
  const averageLabel = document.querySelector('#result-average-label');
  const averageValue = document.querySelector('#result-average');
  const context = document.querySelector('#result-context');
  const details = document.querySelector('#result-details');
  const reminder = result.querySelector('.result-reminder');
  details.replaceChildren();
  if (calculation.status === 'estimated') {
    kicker.textContent = 'Estimated Finish Window';
    value.textContent = calculation.display;
    averageWrap.hidden = false;
    averageLabel.textContent = 'Best Guess Average';
    averageValue.textContent = formatMinutes(calculation.averageMinutes);
    context.textContent = `${calculation.weight} lb ${calculation.cut.toLowerCase()} · ${calculation.temperature}°F smoker · Does not include resting time`;
    const sourceTemperature = calculation.profile.anchors[0][0];
    const methodAtSelection = calculation.rangeKind === 'published' ? calculation.method :
      calculation.method.replaceAll(`${sourceTemperature}°F`, `${calculation.temperature}°F`);
    details.append(detail('Assumed method:', methodAtSelection));
    if (calculation.averageKind === 'sources') {
      details.append(detail('Estimate basis:', 'Based on comparable published recipes for this cut.'));
    } else if (calculation.averageKind === 'reference') {
      details.append(detail('Estimate basis:', 'Based on one published recipe for this cut and smoker temperature.'));
    } else {
      details.append(detail('Estimate basis:', 'Estimated from researched cut times, weight, and smoker temperature.'));
    }
    if (calculation.rangeKind === 'modeled' && calculation.profile.evidence === 'comparison') {
      details.append(detail('Evidence note:', 'This uses a related cut as a starting point. Check the cut early.'));
    } else if (calculation.rangeKind === 'modeled' && calculation.profile.evidence === 'adapted') {
      details.append(detail('Evidence note:', 'The cited recipe uses a different finish or pit schedule, so the cook may take longer.'));
    }
    if (calculation.temperatureAdjustmentInferred) {
      details.append(detail('Smoker temperature:', 'Estimated from nearby researched temperatures.'));
    }
    const heading = document.createElement('h4');
    heading.textContent = 'Key considerations that could change the estimate';
    details.append(heading);
    const list = document.createElement('ul');
    if (calculation.weightExtrapolated) {
      const item = document.createElement('li');
      const [usualMin, usualMax] = calculation.typicalWeightRange;
      const size = calculation.weight < usualMin ? 'below' : 'above';
      item.textContent = `${calculation.weight} lb is ${size} the usual ${usualMin}–${usualMax} lb range for ${calculation.cut.toLowerCase()}. This estimate extends the weight profile. Size, shape, and preparation may shift the finish time.`;
      list.append(item);
    }
    for (const note of calculation.notes.slice(0, 3 - list.children.length)) {
      const item = document.createElement('li');
      item.textContent = note;
      list.append(item);
    }
    details.append(list);
    reminder.textContent = calculation.windowNarrowed
      ? 'This two-hour window is a planning target. Cooks can finish outside it, especially when a stall lasts for hours. Check doneness with a thermometer and a tenderness test.'
      : 'This is a planning ballpark, not a promise. A thermometer and tenderness check determine doneness.';
    const finish = calculation.rangeKind === 'published' && calculation.cut === 'Chicken Thighs'
      ? 'The cited times aim for about 175°F in the thickest part, away from bone.'
      : calculation.rangeKind === 'published' && calculation.cut === 'Chicken Wings'
        ? 'The cited times aim for about 175°F in the thickest part.'
        : calculation.rangeKind === 'published' && calculation.cut === 'Turkey Wings'
          ? 'The cited recipe aims for about 185°F in the thickest part.'
          : calculation.profile.finish;
    details.append(detail('Doneness:', finish));
    details.append(detail('Rest, after cooking:', calculation.profile.rest));
    const sources = document.createElement('p');
    sources.className = 'result-sources';
    sources.append('Method references: ');
    for (const [index, key] of calculation.sourceKeys.entries()) {
      if (index) sources.append(' · ');
      const anchor = document.createElement('a');
      anchor.href = SOURCES[key];
      anchor.textContent = SOURCE_LABELS[key] || key;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      sources.append(anchor);
    }
    details.append(sources);
  } else {
    kicker.textContent = 'Check your inputs';
    value.textContent = 'Enter valid details';
    averageWrap.hidden = true;
    context.textContent = calculation.message;
  }
  result.hidden = false;
  result.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest'});
});

renderPicker('animal');
renderPicker('cut');
