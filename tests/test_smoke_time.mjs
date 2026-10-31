import test from 'node:test';
import assert from 'node:assert/strict';
import {ANIMALS, CUTS, FOOD_SAFETY, SOURCES, calculateSmokeTime, formatMinutes, getProfile} from '../assets/smoke-time-model.mjs';

const calc = (animal, cut, weight, temperature = 225) => calculateSmokeTime({animal, cut, weight, temperature});

test('five requested animals and current named cuts have profiles', () => {
  assert.deepEqual(ANIMALS, ['Beef', 'Pork', 'Poultry', 'Fish', 'Lamb']);
  assert.equal(CUTS.Beef.includes('Ribeye'), false);
  assert.equal(Object.values(CUTS).flat().length, 35);
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

test('all brisket profiles estimate through 20 pounds with wider extrapolated windows', () => {
  for (const [cut, baselineWeightMax] of [['Brisket Flat', 9], ['Brisket Point', 8], ['Packer Brisket', 18]]) {
    const usual = calc('Beef', cut, baselineWeightMax, 250);
    const large = calc('Beef', cut, 20, 250);
    assert.equal(usual.status, 'estimated', cut);
    assert.equal(usual.weightExtrapolated, false, cut);
    assert.equal(large.status, 'estimated', cut);
    assert.equal(large.weightExtrapolated, true, cut);
    assert.ok((large.lowMinutes + large.highMinutes) / 2 > (usual.lowMinutes + usual.highMinutes) / 2, cut);
    assert.equal(large.highMinutes - large.lowMinutes, 180, cut);
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
  assert.match(calc('Pork', 'Ham', 7).profile.assumption, /fully cooked/);
  assert.match(calc('Pork', 'Ham', 7).safety, /Fresh ham/);
  assert.match(calc('Lamb', 'Rack of Lamb', 2, 250).safety, /145°F/);
  assert.match(FOOD_SAFETY.beef, /3 minutes/);
});

test('invalid and unsupported inputs are clear', () => {
  assert.equal(calc('Game', 'Venison', 3).status, 'invalid');
  assert.equal(calc('Beef', 'Other', 3).status, 'invalid');
  assert.equal(calc('Beef', 'Brisket Flat', 0).status, 'invalid');
  assert.equal(calc('Beef', 'Brisket Flat', 'bad').status, 'invalid');
  assert.equal(calc('Beef', 'Brisket Flat', 6, 300).status, 'invalid');
  assert.equal(calc('Beef', 'Brisket Flat', 25).status, 'unavailable');
});

test('rounding and display stay useful', () => {
  const long = calc('Beef', 'Packer Brisket', 13, 225);
  const short = calc('Poultry', 'Chicken Wings', 0.3, 225);
  assert.equal(long.highMinutes - long.lowMinutes, 60);
  assert.equal(short.highMinutes - short.lowMinutes, 30);
  assert.equal(formatMinutes(630), '10h 30m');
  assert.equal(formatMinutes(60), '1h');
  assert.match(long.display, /^\d+h(?: 30m)? – \d+h(?: 30m)?$/);
  assert.equal(calc('Fish', 'Catfish', 1, 250).temperatureAdjustmentInferred, true);
  assert.equal(calc('Beef', 'Brisket Flat', 6, 250).temperatureAdjustmentInferred, false);
});
