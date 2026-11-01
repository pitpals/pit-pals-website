import test from 'node:test';
import assert from 'node:assert/strict';
import {readdirSync, readFileSync} from 'node:fs';
import {ANIMALS, CUTS, FOOD_SAFETY, PUBLISHED_GUIDANCE, SOURCES, calculateSmokeTime, cutArtworkName, formatMinutes, getProfile} from '../assets/smoke-time-model.mjs';

const calc = (animal, cut, weight, temperature = 225) => calculateSmokeTime({animal, cut, weight, temperature});

test('every picker option has an image beside the calculator module', () => {
  const moduleUrl = new URL('../assets/smoke-time-calculator.js', import.meta.url);
  const files = new Set(readdirSync(new URL('./images/calculator/', moduleUrl)));
  for (const animal of ANIMALS) {
    assert.ok(files.has(`PP_Animal_${animal}.png`), animal);
    for (const cut of CUTS[animal]) {
      const name = cutArtworkName(cut);
      assert.ok(files.has(`PP_Cut_${animal}_${name}.png`), `${animal}: ${cut}`);
    }
  }
});

test('five requested animals and current named cuts have profiles', () => {
  assert.deepEqual(ANIMALS, ['Beef', 'Pork', 'Poultry', 'Fish', 'Lamb']);
  assert.equal(CUTS.Beef.includes('Ribeye'), false);
  assert.equal(Object.values(CUTS).flat().length, 30);
  for (const cut of ['Duck Breast', 'Duck Thighs', 'Duck Wings']) assert.ok(!CUTS.Poultry.includes(cut));
  for (const cut of ['Haddock', 'Tilapia']) assert.ok(!CUTS.Fish.includes(cut));
  for (const cut of ['Fully Cooked Ham', 'Pork Shoulder (Picnic)']) assert.ok(CUTS.Pork.includes(cut));
  for (const animal of ANIMALS) for (const cut of CUTS[animal]) {
    assert.notEqual(cut, 'Other');
    const profile = getProfile(animal, cut);
    assert.ok(profile, `${animal}: ${cut}`);
    assert.ok(profile.sources.length > 0);
    assert.ok(profile.sources.every(key => SOURCES[key]));
    assert.deepEqual(profile.temperatureRange, [225, 275]);
    for (const copy of [profile.assumption, profile.finish, profile.rest, ...profile.notes]) {
      assert.doesNotMatch(copy, /[;—]/, `${animal}: ${cut}`);
    }
    assert.equal(calc(animal, cut, profile.referenceWeight, 250).status, 'estimated', `${animal}: ${cut}`);
  }
});

test('flat, point and packer have distinct timing and assumptions', () => {
  const flat = calc('Beef', 'Brisket Flat', 6);
  const point = calc('Beef', 'Brisket Point', 6);
  const packer = calc('Beef', 'Packer Brisket', 13);
  assert.equal(flat.status, 'estimated');
  assert.equal(point.status, 'estimated');
  assert.equal(packer.status, 'estimated');
  assert.notEqual(flat.lowMinutes, point.lowMinutes);
  assert.notEqual(point.lowMinutes, packer.lowMinutes);
  for (const result of [flat, point, packer]) {
    assert.match(result.profile.notes.join(' '), /stall/i);
    assert.match(result.profile.notes.join(' '), /Wrapping/i);
    assert.match(result.profile.finish, /probe-tender/i);
    assert.match(result.profile.rest, /hour/i);
  }
});

test('weight and smoker temperature move a long cook appropriately', () => {
  assert.ok(calc('Beef', 'Packer Brisket', 16, 225).lowMinutes > calc('Beef', 'Packer Brisket', 10, 225).lowMinutes);
  assert.ok(calc('Beef', 'Packer Brisket', 13, 225).lowMinutes > calc('Beef', 'Packer Brisket', 13, 275).lowMinutes);
  assert.ok(calc('Pork', 'Pork Butt', 10, 225).lowMinutes > calc('Pork', 'Pork Butt', 6, 225).lowMinutes);
  assert.ok(calc('Poultry', 'Whole Turkey', 12, 225).lowMinutes > calc('Poultry', 'Whole Turkey', 12, 250).lowMinutes);
});

test('packer timing follows the published weight and temperature table', () => {
  const supported = calc('Beef', 'Packer Brisket', 16, 250);
  assert.deepEqual([supported.lowMinutes, supported.highMinutes, supported.averageMinutes], [900, 1080, 990]);
  assert.equal(supported.averageKind, 'reference');
  assert.deepEqual(supported.sourceKeys, ['packerChiles']);
  const corroborated = calc('Beef', 'Packer Brisket', 13, 225);
  assert.equal(corroborated.averageKind, 'reference');
  assert.deepEqual([corroborated.lowMinutes, corroborated.highMinutes, corroborated.averageMinutes], [840, 960, 900]);
  assert.deepEqual(corroborated.sourceKeys, ['packerChiles']);
  const nearAnchor = calc('Beef', 'Packer Brisket', 13, 226);
  assert.equal(nearAnchor.averageKind, 'modeled');
  assert.equal(nearAnchor.temperatureAdjustmentInferred, true);
  assert.ok(nearAnchor.highMinutes >= 960);
  const large = calc('Beef', 'Packer Brisket', 20, 250);
  assert.equal(large.weightExtrapolated, true);
  assert.equal(large.averageKind, 'modeled');
  assert.ok(large.averageMinutes > supported.averageMinutes);
  assert.ok(large.lowMinutes >= supported.lowMinutes);
  assert.ok(large.highMinutes > supported.highMinutes);
});

test('method-matched corrections keep direct recipes separate from modeled estimates', () => {
  const point = calc('Beef', 'Brisket Point', 5, 250);
  assert.match(point.method, /unwrapped/);
  assert.deepEqual(point.sourceKeys, ['pointSBS']);

  const butt = calc('Pork', 'Pork Butt', 8, 250);
  assert.match(butt.method, /foil wrapped/);
  assert.deepEqual([butt.lowMinutes, butt.highMinutes, butt.averageMinutes], [360, 540, 450]);
  assert.equal(calc('Pork', 'Pork Butt', 8, 225).rangeKind, 'modeled');

  const bellyLow = calc('Pork', 'Pork Belly', 4, 225);
  const bellyHigh = calc('Pork', 'Pork Belly', 3, 275);
  assert.match(bellyLow.method, /wrapped/);
  assert.match(bellyHigh.method, /unwrapped/);
  assert.deepEqual(bellyLow.sourceKeys, ['bellyHey']);
  assert.deepEqual(bellyHigh.sourceKeys, ['bellyTraeger']);
  assert.equal(calc('Pork', 'Pork Belly', 3, 250).rangeKind, 'modeled');

  const breast = calc('Poultry', 'Chicken Breast', 0.65, 225);
  assert.equal(breast.averageKind, 'modeled');
  assert.ok(breast.averageMinutes >= 120 && breast.averageMinutes <= 180);
  assert.equal(calc('Poultry', 'Whole Chicken', 4.5, 225).averageMinutes, 210);
  assert.equal(calc('Poultry', 'Whole Duck', 5.5, 225).averageMinutes, 195);
  assert.equal(calc('Fish', 'Salmon', 1.5, 225).rangeKind, 'published');
  assert.equal(calc('Fish', 'Salmon', 1.5, 275).rangeKind, 'modeled');
  assert.equal(calc('Poultry', 'Turkey Wings', 0.8, 250).rangeKind, 'published');
});

test('all brisket profiles estimate through 20 pounds with wider extrapolated windows', () => {
  for (const [cut, baselineWeightMax] of [['Brisket Flat', 9], ['Brisket Point', 8], ['Packer Brisket', 18]]) {
    const usual = calc('Beef', cut, baselineWeightMax, 250);
    const large = calc('Beef', cut, 20, 250);
    assert.equal(usual.status, 'estimated', cut);
    assert.equal(usual.weightExtrapolated, false, cut);
    assert.equal(large.status, 'estimated', cut);
    assert.equal(large.weightExtrapolated, true, cut);
    assert.ok((large.lowMinutes + large.highMinutes) / 2 > (usual.lowMinutes + usual.highMinutes) / 2, cut);
    assert.ok(large.highMinutes - large.lowMinutes > usual.highMinutes - usual.lowMinutes, cut);
  }
});

test('ribs and wings do not scale linearly with package weight', () => {
  assert.equal(calc('Pork', 'Baby Back Ribs', 2, 225).lowMinutes, calc('Pork', 'Baby Back Ribs', 3.5, 225).lowMinutes);
  assert.ok(calc('Pork', 'Spare Ribs', 4, 225).lowMinutes > calc('Pork', 'Baby Back Ribs', 3, 225).lowMinutes);
  assert.equal(calc('Poultry', 'Chicken Wings', 0.2, 225).lowMinutes, calc('Poultry', 'Chicken Wings', 0.5, 225).lowMinutes);
});

test('poultry, fish, pork and lamb guidance remains cut-specific and safe', () => {
  assert.match(calc('Poultry', 'Whole Duck', 5.5).safety, /165°F/);
  assert.match(calc('Fish', 'Salmon', 1.5).profile.assumption, /hot-smoked/);
  assert.match(calc('Fish', 'Salmon', 1.5).safety, /145°F/);
  assert.match(calc('Pork', 'Pork Butt', 8).profile.finish, /USDA safety minimum is lower/);
  assert.match(calc('Pork', 'Fully Cooked Ham', 7).profile.assumption, /fully cooked/);
  assert.match(calc('Pork', 'Fully Cooked Ham', 7).safety, /Fresh ham/);
  assert.match(calc('Lamb', 'Rack of Lamb', 2, 250).safety, /145°F/);
  assert.match(FOOD_SAFETY.beef, /3 minutes/);
});

test('invalid and unsupported inputs are clear', () => {
  assert.equal(calc('Game', 'Venison', 3).status, 'invalid');
  assert.equal(calc('Beef', 'Other', 3).status, 'invalid');
  assert.equal(calc('Beef', 'Brisket Flat', 0).status, 'invalid');
  assert.equal(calc('Beef', 'Brisket Flat', 'bad').status, 'invalid');
  assert.equal(calc('Beef', 'Brisket Flat', 6, 300).status, 'invalid');
  assert.equal(calc('Beef', 'Brisket Flat', 25).status, 'estimated');
});

test('unusual weights keep an estimate and the cut assumptions', () => {
  const butt = calc('Pork', 'Pork Butt', 3.4, 250);
  assert.equal(butt.status, 'estimated');
  assert.equal(butt.weightExtrapolated, true);
  assert.deepEqual(butt.typicalWeightRange, [5, 12]);
  assert.ok(butt.highMinutes > butt.lowMinutes);
  assert.ok(butt.profile.sources.length > 0);
  for (const animal of ANIMALS) for (const cut of CUTS[animal]) {
    const profile = getProfile(animal, cut);
    for (const weight of [profile.weight[0] / 2, profile.weight[1] * 1.5]) {
      const estimate = calc(animal, cut, weight, 250);
      assert.equal(estimate.status, 'estimated', `${animal}: ${cut} at ${weight} lb`);
      assert.equal(estimate.weightExtrapolated, true, `${animal}: ${cut}`);
      assert.ok(estimate.highMinutes > estimate.lowMinutes, `${animal}: ${cut}`);
    }
  }
  for (const cut of ['Brisket Flat', 'Packer Brisket']) {
    const tiny = calc('Beef', cut, 0.01, 250);
    assert.equal(tiny.status, 'estimated');
    assert.ok(tiny.lowMinutes <= tiny.averageMinutes && tiny.averageMinutes <= tiny.highMinutes, cut);
    assert.ok(tiny.windowLowMinutes <= tiny.windowHighMinutes, cut);
  }
});

test('every cut returns an ordered estimate at each preset and a custom temperature', () => {
  for (const animal of ANIMALS) for (const cut of CUTS[animal]) {
    const weight = getProfile(animal, cut).referenceWeight;
    for (const temperature of [225, 250, 262, 275]) {
      const result = calc(animal, cut, weight, temperature);
      assert.equal(result.status, 'estimated', `${animal} ${cut} at ${temperature}°F`);
      assert.ok(result.lowMinutes <= result.averageMinutes && result.averageMinutes <= result.highMinutes,
        `${animal} ${cut} at ${temperature}°F`);
      assert.ok(result.sourceKeys.every(key => SOURCES[key]), `${animal} ${cut} at ${temperature}°F`);
      assert.equal(result.evidenceLowMinutes, result.lowMinutes, `${animal} ${cut} at ${temperature}°F`);
      assert.equal(result.evidenceHighMinutes, result.highMinutes, `${animal} ${cut} at ${temperature}°F`);
      assert.ok(result.windowLowMinutes >= result.lowMinutes, `${animal} ${cut} at ${temperature}°F`);
      assert.ok(result.windowHighMinutes <= result.highMinutes, `${animal} ${cut} at ${temperature}°F`);
      assert.ok(result.windowLowMinutes <= result.averageMinutes && result.averageMinutes <= result.windowHighMinutes,
        `${animal} ${cut} at ${temperature}°F`);
      assert.ok(result.windowHighMinutes - result.windowLowMinutes <= 120, `${animal} ${cut} at ${temperature}°F`);
    }
  }
});

test('published ranges and source averages use comparable original recipes', () => {
  for (const [name, guidance] of Object.entries(PUBLISHED_GUIDANCE)) {
    assert.ok(guidance.records.length > 0, name);
    const urls = guidance.records.map(record => SOURCES[record.source]);
    assert.ok(urls.every(Boolean), name);
    assert.equal(new Set(urls).size, urls.length, `${name} counts an original recipe twice`);
    for (const copy of [guidance.method, ...(guidance.notes ?? [])]) assert.doesNotMatch(copy, /[;—]/, name);
    for (const record of guidance.records) assert.ok(record.min > 0 && record.max >= record.min, name);
  }
  const catfish = calc('Fish', 'Catfish', 1, 225);
  assert.equal(catfish.averageKind, 'sources');
  assert.equal(catfish.lowMinutes, 45);
  assert.equal(catfish.highMinutes, 60);
  assert.equal(catfish.averageMinutes, 55);
  assert.equal(catfish.sourceKeys.length, 2);
  const shoulder = calc('Lamb', 'Shoulder', 4, 250);
  assert.equal(shoulder.averageKind, 'sources');
  assert.equal(shoulder.averageMinutes, 420);
  assert.equal(shoulder.display, '6H – 8H');
  const wings = calc('Poultry', 'Chicken Wings', 0.3, 275);
  assert.equal(wings.averageMinutes, 95);
  assert.equal(wings.lowMinutes, 75);
  assert.equal(wings.highMinutes, 120);
});

test('a single recipe stays a reference and unsupported conditions remain marked as modeled', () => {
  const point = calc('Beef', 'Brisket Point', 5, 250);
  assert.equal(point.averageKind, 'reference');
  assert.equal(point.averageMinutes, 420);
  assert.deepEqual(point.sourceKeys, ['pointSBS']);
  const otherTemperature = calc('Beef', 'Brisket Point', 5, 225);
  assert.equal(otherTemperature.averageKind, 'modeled');
  assert.equal(otherTemperature.rangeKind, 'modeled');
  const unusualWeight = calc('Pork', 'Pork Butt', 3.4, 225);
  assert.equal(unusualWeight.averageKind, 'modeled');
  assert.equal(unusualWeight.weightExtrapolated, true);
  const pointOnly = calc('Poultry', 'Turkey Thighs', 1.6, 275);
  assert.equal(pointOnly.display, 'About 3H');
  assert.equal(pointOnly.averageKind, 'reference');
});

test('finish window stays within two hours while wider evidence remains available', () => {
  const long = calc('Beef', 'Packer Brisket', 13, 225);
  const wider = calc('Beef', 'Packer Brisket', 16, 250);
  const short = calc('Poultry', 'Chicken Wings', 0.3, 225);
  assert.equal(long.highMinutes - long.lowMinutes, 120);
  assert.equal(wider.highMinutes - wider.lowMinutes, 180);
  assert.equal(wider.windowHighMinutes - wider.windowLowMinutes, 120);
  assert.equal(wider.windowNarrowed, true);
  assert.ok(short.highMinutes - short.lowMinutes >= 30);
  assert.equal(formatMinutes(630), '10H 30M');
  assert.equal(formatMinutes(60), '1H');
  assert.equal(long.averageMinutes, 900);
  assert.equal(long.display, '14H – 16H');
  assert.equal(calc('Fish', 'Catfish', 1, 250).temperatureAdjustmentInferred, true);
  assert.equal(calc('Beef', 'Brisket Point', 5, 237).temperatureAdjustmentInferred, true);
  assert.equal(calc('Beef', 'Brisket Flat', 6, 250).temperatureAdjustmentInferred, false);
});

test('result card explains the finish window and omits a repeated food-safety bullet', () => {
  const page = readFileSync(new URL('../smoking-time-calculator/index.html', import.meta.url), 'utf8');
  const script = readFileSync(new URL('../assets/smoke-time-calculator.js', import.meta.url), 'utf8');
  assert.match(page, /id="result-average"/);
  assert.match(page, /Estimated Finish Window/);
  assert.match(page, /Best Guess Average/);
  assert.doesNotMatch(page, /id="result-evidence"/);
  assert.doesNotMatch(script, /Single-source planning value/);
  assert.match(script, /Best Guess Average/);
  assert.match(script, /Does not include resting time/);
  assert.doesNotMatch(script, /'Reference Time'|'Planning Center'|cooking time only/);
  assert.doesNotMatch(script, /detail\('Food safety:'/);
});
