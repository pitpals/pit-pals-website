// Planning profiles for the five illustrated animals in the Pit Pals New Smoke UI.
// Source and scope notes: docs/smoke-time-methodology.md. Times are synthesized
// ballparks from cited recipes, not measured predictions or safety guarantees.
export const FOOD_SAFETY = Object.freeze({
  beef: 'USDA minimum for whole-cut beef: 145°F, then rest at least 3 minutes.',
  pork: 'USDA minimum for whole-cut pork: 145°F, then rest at least 3 minutes.',
  poultry: 'USDA minimum for all poultry: 165°F in the thickest part.',
  fish: 'USDA minimum for finfish: 145°F.',
  lamb: 'USDA minimum for whole-cut lamb: 145°F, then rest at least 3 minutes.'
});

const APP_CUTS = Object.freeze({
  // The four traditionally grilled steak cuts are omitted from this smoker-only tool.
  Beef: ['Back Ribs', 'Brisket Flat', 'Brisket Point', 'Chuck Roast', 'Eye of Round', 'Packer Brisket', 'Plate Ribs', 'Short Ribs', 'Other'],
  Pork: ['Baby Back Ribs', 'Spare Ribs', 'Ham', 'Pork Belly', 'Pork Butt', 'Pork Shoulder', 'Tenderloin', 'Other'],
  Poultry: ['Chicken Breast', 'Chicken Thighs', 'Chicken Wings', 'Whole Chicken', 'Turkey Breast', 'Turkey Thighs', 'Turkey Wings', 'Whole Turkey', 'Duck Breast', 'Duck Thighs', 'Duck Wings', 'Whole Duck', 'Other'],
  Fish: ['Catfish', 'Haddock', 'Salmon', 'Tilapia', 'Trout', 'Other'],
  Lamb: ['Leg of Lamb', 'Rack of Lamb', 'Shoulder', 'Other']
});

export const ANIMALS = Object.freeze(Object.keys(APP_CUTS));
export const CUTS = APP_CUTS;
export const SUPPORTED_PIT_RANGE = Object.freeze([225, 275]);

export const SOURCES = Object.freeze({
  safety: 'https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures',
  brisket: 'https://www.thermoworks.com/blogs/thermoblog/smoked-brisket-a-how-to-primer',
  flat: 'https://www.thermoworks.com/blogs/thermoblog/how-to-smoke-a-brisket-flat-tailgating-temperatures',
  brisketTraeger: 'https://www.traeger.com/learn/how-to-smoked-brisket',
  point: 'https://www.traeger.com/learn/brisket-flat-vs-point',
  porkButt: 'https://www.thermoworks.com/blogs/thermoblog/how-to-cook-bbq-pork-butt',
  porkTraeger: 'https://www.traeger.com/learn/pulled-pork',
  ribs: 'https://www.traeger.com/learn/types-pork-ribs',
  beefRibs: 'https://www.traeger.com/learn/types-of-ribs',
  shortRibs: 'https://www.thermoworks.com/blogs/thermoblog/smoked-beef-short-ribs-temperature-is-a-recipe-for-success',
  plateRibs: 'https://www.traeger.com/cuts/beef/plate-short-ribs',
  belly: 'https://www.traeger.com/learn/pork-belly-vs-bacon',
  tenderloin: 'https://www.traeger.com/pork-tenderloin',
  chicken: 'https://www.traeger.com/learn/how-to-smoke-whole-chicken',
  chickenBreast: 'https://www.traeger.com/recipes/smoked-chicken-breast',
  turkey: 'https://www.traeger.com/learn/how-to-smoke-turkey',
  turkeyBreast: 'https://www.traeger.com/ca/en/recipes/cajun-brined-smoked-turkey-breast',
  salmon: 'https://www.traeger.com/learn/how-to-smoke-salmon',
  trout: 'https://www.traeger.com/recipes/smoked-trout',
  lambLeg: 'https://heygrillhey.com/smoked-leg-of-lamb/',
  lambShoulder: 'https://blog.thermoworks.com/smoked-lamb-shoulder/',
  lambRack: 'https://www.traeger.com/recipes/smoked-rack-of-lamb',
  chuck: 'https://www.traeger.com/cuts/beef/chuck-roast',
  ham: 'https://www.traeger.com/learn/how-to-cook-ham',
  eyeRound: 'https://heygrillhey.com/smoked-eye-of-round/',
  chickenWings: 'https://www.traeger.com/learn/smoked-chicken-wings',
  turkeyWings: 'https://www.traeger.com/learn/turkey-wings',
  turkeyThighs: 'https://www.traeger.com/learn/how-to-smoke-turkey',
  duck: 'https://www.traeger.com/recipes/roast-duck',
  fishGeneral: 'https://www.traeger.com/grill-types/bbq-smokers',
  chuckPulled: 'https://heygrillhey.com/smoked-pulled-beef/',
  turkeyLegs: 'https://www.traeger.com/learn/smoked-turkey-legs'
});

const stall = 'A stall around 150–170°F can last hours. Wrapping may shorten it; cooking unwrapped can take longer. Build in several extra hours.';
const brisketFinish = 'Cook until probe-tender, often around 195–205°F; one exact number cannot guarantee tenderness.';
const ribFinish = 'Cook until the rack bends and the meat feels tender; 195–205°F is a guide, not a guarantee.';

// anchors are [smoker °F, estimated minutes at referenceWeight]; interpolation is
// permitted only between declared anchors. exponent 0 = rack/portion timing.
const PROFILES = {
  Beef: {
    'Back Ribs': {weight: [2, 6], referenceWeight: 4, exponent: 0, anchors: [[225, 360], [250, 300]], assumption: 'One trimmed beef back-rib rack, wrapped after the bark sets.', finish: ribFinish, rest: 'Rest 20–30 minutes.', notes: ['Back ribs have less meat above the bones than plate or short ribs; rack thickness matters more than pounds.'], sources: ['beefRibs', 'safety']},
    'Brisket Flat': {weight: [3, 9], referenceWeight: 6, exponent: 0.55, anchors: [[225, 480], [250, 390], [275, 330]], assumption: 'One trimmed, relatively even flat; wrap when the bark is set.', finish: brisketFinish, rest: 'Rest at least 1 hour; 2 hours helps scheduling.', notes: ['The lean flat can dry out, especially at thin edges.', stall], sources: ['flat', 'brisket', 'point', 'safety']},
    'Brisket Point': {weight: [3, 8], referenceWeight: 5, exponent: 0.62, anchors: [[225, 540], [250, 450], [275, 390]], assumption: 'One separated, thick, well-marbled point; wrap when the bark is set.', finish: brisketFinish, rest: 'Rest at least 1 hour.', notes: ['The thicker, fattier point may need longer rendering than a flat of similar weight.', stall], sources: ['point', 'brisket', 'brisketTraeger', 'safety']},
    'Packer Brisket': {weight: [8, 18], referenceWeight: 13, exponent: 0.68, anchors: [[225, 720], [250, 600], [275, 510]], assumption: 'Whole trimmed packer with flat and point; wrap when the bark is set.', finish: brisketFinish, rest: 'Rest at least 1 hour; 2–3 hours is useful for a large packer.', notes: ['The flat and point can finish differently; probe both muscles.', stall], sources: ['brisket', 'brisketTraeger', 'point', 'safety']},
    'Plate Ribs': {weight: [4, 10], referenceWeight: 7, exponent: 0.1, anchors: [[225, 480]], assumption: 'One meaty plate-rib rack, wrapped after about 5 hours at 225°F.', finish: 'Cook until very tender, commonly around 203–205°F.', rest: 'Rest 30–60 minutes.', notes: ['Large plate ribs have substantial meat and connective tissue; a stall is possible.', 'Rack thickness matters more than total pounds.'], sources: ['plateRibs', 'shortRibs', 'safety']},
    'Short Ribs': {weight: [2, 7], referenceWeight: 4, exponent: 0.15, anchors: [[225, 540]], assumption: 'English-cut bone-in chuck short ribs, not thin flanken slices.', finish: 'Cook until probe-tender, commonly around 200–205°F.', rest: 'Rest 20–30 minutes.', notes: ['Connective tissue and possible stalls matter more than weight alone.', 'Plate ribs use a separate profile.'], sources: ['shortRibs', 'safety']}
  },
  Pork: {
    'Baby Back Ribs': {weight: [1.5, 4], referenceWeight: 2.5, exponent: 0, anchors: [[225, 300], [250, 240]], assumption: 'One baby-back rack, wrapped after the bark sets.', finish: ribFinish, rest: 'Rest 10–15 minutes.', notes: ['Baby backs are smaller and usually cook faster than spare ribs.', 'Rack thickness matters more than total pounds.'], sources: ['ribs', 'safety']},
    'Spare Ribs': {weight: [2.5, 6], referenceWeight: 4, exponent: 0, anchors: [[225, 360], [250, 300]], assumption: 'One spare-rib rack, wrapped after the bark sets.', finish: ribFinish, rest: 'Rest 10–15 minutes.', notes: ['Spare ribs are typically larger and fattier than baby backs.', 'Rack thickness matters more than total pounds.'], sources: ['ribs', 'safety']},
    'Pork Butt': {weight: [5, 12], referenceWeight: 8, exponent: 0.72, anchors: [[225, 720], [250, 600]], assumption: 'One whole butt for pulled pork; wrap after the bark sets.', finish: 'For pulled pork, cook until probe-tender, commonly around 195–205°F. USDA safety minimum is lower.', rest: 'Rest at least 1 hour.', notes: ['The stall can add several hours. Plan a 2–4 hour scheduling buffer.', 'Bone-in and boneless shapes may cook differently.'], sources: ['porkButt', 'porkTraeger', 'safety']},
    'Pork Shoulder': {weight: [5, 12], referenceWeight: 8, exponent: 0.78, anchors: [[225, 780], [250, 660]], assumption: 'One full shoulder/picnic roast for pulled pork; wrap after the bark sets.', finish: 'For pulled pork, cook until probe-tender, commonly around 195–205°F. USDA safety minimum is lower.', rest: 'Rest at least 1 hour.', notes: ['A full shoulder differs in shape and skin/fat from a butt. The stall can add hours.', 'Bone-in and boneless shapes may cook differently; plan a 2–4 hour buffer.'], sources: ['porkButt', 'porkTraeger', 'safety']},
    'Pork Belly': {weight: [2, 5], referenceWeight: 3, exponent: 0.25, anchors: [[275, 195]], assumption: 'Skinless whole slab at 275°F for tender slices, not cubes or bacon.', finish: 'For tender slices, render to about 195–200°F. USDA safety minimum is 145°F with a 3-minute rest.', rest: 'Rest 10–15 minutes.', notes: ['Pull-apart texture or cubed burnt ends use a different method and time.'], sources: ['belly', 'safety']},
    'Tenderloin': {weight: [0.75, 2], referenceWeight: 1.25, exponent: 0.2, anchors: [[225, 150]], assumption: 'One intact pork tenderloin, not a thicker pork loin roast.', finish: 'Reach at least 145°F, then rest at least 3 minutes.', rest: 'Rest 5–10 minutes.', notes: ['Very lean; probe early to avoid drying out.', 'Thickness matters more than the package weight.'], sources: ['tenderloin', 'safety']}
  },
  Poultry: {
    'Chicken Breast': {weight: [0.3, 1.25], referenceWeight: 0.65, exponent: 0.15, anchors: [[225, 150]], assumption: 'One ordinary boneless breast, roughly 1–1½ inches thick; weight is per piece.', finish: 'Reach 165°F in the thickest part.', rest: 'Rest 5–10 minutes.', notes: ['Thickness matters more than weight; start checking early.', 'Higher heat can improve skin on skin-on portions.'], sources: ['chickenBreast', 'safety']},
    'Whole Chicken': {weight: [3, 6], referenceWeight: 4.5, exponent: 0.45, anchors: [[225, 240]], assumption: 'One unstuffed whole chicken, not spatchcocked.', finish: 'Reach 165°F in the thickest part of the breast and thigh.', rest: 'Rest 10–15 minutes.', notes: ['At 225°F, skin may stay soft; a higher-heat finish changes the cook time.'], sources: ['chicken', 'safety']},
    'Turkey Breast': {weight: [4, 7], referenceWeight: 5.5, exponent: 0.2, anchors: [[225, 120]], assumption: 'One bone-in, brined turkey breast; weight includes bone.', finish: 'Reach 165°F in the thickest part.', rest: 'Rest at least 15 minutes.', notes: ['Thickness, brining, and bone affect timing; check early.', 'Higher heat can improve skin but changes this estimate.'], sources: ['turkeyBreast', 'safety']},
    'Whole Turkey': {weight: [8, 16], referenceWeight: 12, exponent: 0.9, anchors: [[225, 480], [250, 390]], assumption: 'One unstuffed whole turkey cooked at a steady smoker temperature.', finish: 'Reach 165°F in the thickest part of the breast and thigh.', rest: 'Rest 20–30 minutes.', notes: ['Plan extra time for weather and bird shape.', 'A 275°F finish can improve skin but changes this single-temperature estimate.'], sources: ['turkey', 'safety']}
  },
  Fish: {
    'Salmon': {weight: [0.5, 3], referenceWeight: 1.5, exponent: 0.1, anchors: [[225, 210]], assumption: 'One cured, air-dried fillet about 1–1½ inches thick, hot-smoked at 225°F.', finish: 'Reach 145°F in the thickest part.', rest: 'No extended rest; serve or chill promptly.', notes: ['Thickness and cure matter far more than total weight.', 'This is hot smoking, not cold smoking.'], sources: ['salmon', 'safety']},
    'Trout': {weight: [0.3, 2], referenceWeight: 1, exponent: 0.1, anchors: [[225, 105]], assumption: 'One ordinary trout fillet, about ½–1 inch thick, hot-smoked at 225°F.', finish: 'Reach 145°F in the thickest part.', rest: 'No extended rest; serve or chill promptly.', notes: ['Thickness matters more than total weight.', 'This is hot smoking, not cold smoking.'], sources: ['trout', 'safety']}
  },
  Lamb: {
    'Leg of Lamb': {weight: [5, 7], referenceWeight: 6, exponent: 0.3, anchors: [[225, 225]], assumption: 'One boneless leg, about 5–7 lb, cooked at 225°F for sliced medium lamb.', finish: 'Reach at least 145°F, then rest at least 3 minutes.', rest: 'Rest 15–20 minutes.', notes: ['Bone-in legs and thick rolled roasts may take longer.', 'This is a sliced roast, not a pull-apart shoulder.'], sources: ['lambLeg', 'safety']}
  }
};

// These profiles turn a named cut into a useful starting point with an explicit
// standard preparation. Some use a related cut or a mixed-temperature recipe as
// a comparison; that limitation is shown in the result rather than hidden.
Object.assign(PROFILES.Beef, {
  'Chuck Roast': {weight: [2.5, 6], referenceWeight: 4, exponent: 0.5, anchors: [[225, 570]], assumption: 'One thick chuck roast for pulled beef; smoke, then cover in a pan through the stall while keeping the smoker near 225°F.', finish: 'Cook until probe-tender and shreddable, often 200–210°F.', rest: 'Rest at least 20 minutes.', notes: ['The cited pulled-beef method raises the pit from 225°F to 250°F; this single-temperature timing is a rough adaptation.', 'Braising liquid and wrapping can greatly change the stall and total time.'], sources: ['chuckPulled', 'chuck', 'safety'], evidence: 'adapted'},
  'Eye of Round': {weight: [2, 5], referenceWeight: 3, exponent: 0.35, anchors: [[225, 240]], assumption: 'One intact, lean eye-of-round roast smoked for thin sliced beef, without a separate sear.', finish: 'Reach at least 145°F and rest at least 3 minutes for the USDA minimum.', rest: 'Rest 10–15 minutes.', notes: ['This lean roast can dry out quickly; the cited recipe includes a sear and lower smoke pull temperature.', 'Shape and target doneness matter more than pounds alone.'], sources: ['eyeRound', 'safety'], evidence: 'adapted'}
});

Object.assign(PROFILES.Pork, {
  Ham: {weight: [5, 10], referenceWeight: 7, exponent: 0.8, anchors: [[225, 150]], assumption: 'One fully cooked, USDA-inspected packaged half ham reheated at 225°F, not a fresh raw ham.', finish: 'Check the package: USDA-inspected fully cooked ham may be reheated to 140°F; other fully cooked ham needs 165°F. Fresh ham needs 145°F plus a 3-minute rest.', rest: 'Rest 20 minutes.', notes: ['Fresh/uncooked ham is a different cook and this time does not apply.', 'A spiral cut, glaze, bone, and package instructions can change timing.'], sources: ['ham', 'safety'], evidence: 'direct'}
});

Object.assign(PROFILES.Poultry, {
  'Chicken Thighs': {weight: [0.25, 1], referenceWeight: 0.5, exponent: 0.15, anchors: [[225, 150]], assumption: 'One bone-in, skin-on chicken thigh, roughly 1–1½ inches thick; weight is per thigh.', finish: 'Reach at least 165°F at the thickest point, away from bone.', rest: 'Rest 5–10 minutes.', notes: ['This is a comparison with chicken portions, since thigh thickness and bone dominate time.', 'Dark meat may be preferred at a higher temperature for texture; higher pit heat improves skin.'], sources: ['chicken', 'safety'], evidence: 'comparison'},
  'Chicken Wings': {weight: [0.15, 0.6], referenceWeight: 0.3, exponent: 0, anchors: [[225, 90]], assumption: 'One ordinary whole wing or separated flat/drumette, single layer on the grate; weight is per wing.', finish: 'Reach at least 165°F at the thickest point.', rest: 'Rest 5 minutes.', notes: ['Wing size matters more than package weight.', 'A high-heat crisping step is optional and is outside this smoke-time estimate.'], sources: ['chickenWings', 'safety']},
  'Duck Breast': {weight: [0.4, 1.25], referenceWeight: 0.75, exponent: 0.15, anchors: [[225, 150]], assumption: 'One skin-on domestic duck breast hot-smoked at 225°F without a separate sear.', finish: 'Reach at least 165°F for USDA poultry guidance.', rest: 'Rest 5–10 minutes.', notes: ['This is a rough comparison with poultry portions; duck breast thickness and rendered skin are major variables.', 'Many duck recipes use a lower finish or a sear, which changes the timing.'], sources: ['duck', 'chickenBreast', 'safety'], evidence: 'comparison'},
  'Duck Thighs': {weight: [0.3, 1], referenceWeight: 0.6, exponent: 0.15, anchors: [[225, 180]], assumption: 'One bone-in domestic duck thigh hot-smoked at 225°F.', finish: 'Reach at least 165°F at the thickest point, away from bone.', rest: 'Rest 10 minutes.', notes: ['This is a rough comparison with whole duck and chicken thighs; bone, fat rendering, and thickness can move the finish.', 'A crisp-skin finish adds a separate high-heat step.'], sources: ['duck', 'chicken', 'safety'], evidence: 'comparison'},
  'Duck Wings': {weight: [0.15, 0.6], referenceWeight: 0.3, exponent: 0, anchors: [[225, 120]], assumption: 'One domestic duck wing, single layer on the grate at 225°F; weight is per wing.', finish: 'Reach at least 165°F at the thickest point.', rest: 'Rest 5 minutes.', notes: ['This is a rough comparison with chicken wings; duck wing size and skin/fat change timing.', 'A crisp-skin finish adds a separate high-heat step.'], sources: ['duck', 'chickenWings', 'safety'], evidence: 'comparison'},
  'Turkey Thighs': {weight: [0.75, 2.5], referenceWeight: 1.5, exponent: 0.2, anchors: [[250, 240]], assumption: 'One bone-in turkey thigh at 250°F, uncured; weight is per thigh.', finish: 'Reach at least 165°F at the thickest point, away from bone.', rest: 'Rest 10–15 minutes.', notes: ['This is a comparison with turkey legs; a cured leg recipe can take much longer.', 'Bone and thickness matter more than package weight.'], sources: ['turkeyLegs', 'turkeyThighs', 'safety'], evidence: 'comparison'},
  'Turkey Wings': {weight: [0.4, 1.5], referenceWeight: 0.8, exponent: 0.1, anchors: [[250, 120]], assumption: 'One ordinary turkey wing at 250°F, single layer on the grate; weight is per wing.', finish: 'Reach at least 165°F at the thickest point.', rest: 'Rest 10 minutes.', notes: ['Large or unusually thick wings may take longer.', 'A baking sheet or covered pan changes the cook time and skin texture.'], sources: ['turkeyWings', 'safety']},
  'Whole Duck': {weight: [4, 7], referenceWeight: 5.5, exponent: 0.35, anchors: [[225, 210]], assumption: 'One domestic whole duck, unstuffed, skin pricked for fat rendering.', finish: 'Reach at least 165°F in the thickest breast and thigh.', rest: 'Rest 20–30 minutes.', notes: ['The cited recipe stops at 160°F; this estimate allows extra time to reach USDA 165°F.', 'A high-heat skin finish changes the total time.'], sources: ['duck', 'safety'], evidence: 'adapted'}
});

Object.assign(PROFILES.Fish, {
  Catfish: {weight: [0.3, 2], referenceWeight: 1, exponent: 0.1, anchors: [[225, 120]], assumption: 'One catfish fillet about ¾–1 inch thick, hot-smoked at 225°F; not a whole fish.', finish: 'Reach 145°F in the thickest part.', rest: 'Serve or chill promptly.', notes: ['This is a rough fillet estimate within Traeger’s 1–3 hour hot-smoked fish guidance.', 'Fillet thickness, brining, and skin change the time.'], sources: ['fishGeneral', 'safety'], evidence: 'comparison'},
  Haddock: {weight: [0.25, 1.5], referenceWeight: 0.75, exponent: 0.1, anchors: [[225, 90]], assumption: 'One thin haddock fillet about ½–¾ inch thick, hot-smoked at 225°F.', finish: 'Reach 145°F in the thickest part.', rest: 'Serve or chill promptly.', notes: ['This is a rough fillet estimate within Traeger’s 1–3 hour hot-smoked fish guidance.', 'A thicker fillet or whole fish can take longer; thickness dominates weight.'], sources: ['fishGeneral', 'safety'], evidence: 'comparison'},
  Tilapia: {weight: [0.2, 1.25], referenceWeight: 0.6, exponent: 0.1, anchors: [[225, 90]], assumption: 'One thin tilapia fillet about ½–¾ inch thick, hot-smoked at 225°F.', finish: 'Reach 145°F in the thickest part.', rest: 'Serve or chill promptly.', notes: ['This is a rough fillet estimate within Traeger’s 1–3 hour hot-smoked fish guidance.', 'Thick fillets and brining can move the finish; check early.'], sources: ['fishGeneral', 'safety'], evidence: 'comparison'}
});

Object.assign(PROFILES.Lamb, {
  'Rack of Lamb': {weight: [1, 3], referenceWeight: 2, exponent: 0.1, anchors: [[250, 90]], assumption: 'One frenched rack, roughly 1½–2 inches thick, at 250°F without a separate sear.', finish: 'Reach at least 145°F and rest at least 3 minutes.', rest: 'Rest 10 minutes.', notes: ['This is adapted from a smoked-then-seared recipe that ends at a lower temperature.', 'Rack thickness and a high-heat sear change timing.'], sources: ['lambRack', 'safety'], evidence: 'adapted'},
  Shoulder: {weight: [4, 10], referenceWeight: 8, exponent: 0.55, anchors: [[250, 360]], assumption: 'One whole bone-in lamb shoulder at a steady 250°F for pulled lamb, without a hot finishing phase.', finish: 'Cook until probe-tender, commonly around 200–205°F.', rest: 'Rest 20–30 minutes.', notes: ['The cited method raises the pit to 325°F for the last hour; a steady 250°F finish may take longer.', 'Bone and shoulder shape vary; allow a generous buffer.'], sources: ['lambShoulder', 'safety'], evidence: 'adapted'}
});

for (const animalProfiles of Object.values(PROFILES)) {
  for (const profile of Object.values(animalProfiles)) profile.temperatureRange = SUPPORTED_PIT_RANGE;
}

const SPECIAL_UNAVAILABLE = {
  'Pork|Ham': 'Fresh ham and fully cooked ham being reheated have different cooking methods and safety targets. Choose a recipe for the exact product.',
  'Lamb|Shoulder': 'Pulled lamb shoulder often needs a hotter finish; a single steady smoker temperature misses that method.',
  'Lamb|Rack of Lamb': 'Rack timing depends on thickness and often includes a high-heat sear; weight and one smoker temperature are insufficient.',
  'Beef|Chuck Roast': 'Chuck roast methods vary between direct smoking and a covered braise. Those finish at very different times.',
  'Beef|Eye of Round': 'This lean roast needs a specified doneness and thickness; weight alone gives a poor estimate.'
};

export function getProfile(animal, cut) {
  return PROFILES[animal]?.[cut] ?? null;
}

export function getCutInfo(animal, cut) {
  if (!APP_CUTS[animal]?.includes(cut)) return null;
  const profile = getProfile(animal, cut);
  return {
    animal, cut, profile,
    safety: animal === 'Pork' && cut === 'Ham'
      ? 'Fully cooked ham: reheat to 165°F, or 140°F if packaged in a USDA-inspected plant. Fresh ham: 145°F plus a 3-minute rest. Check the package.'
      : FOOD_SAFETY[animal.toLowerCase()],
    unavailableReason: profile ? null : (SPECIAL_UNAVAILABLE[`${animal}|${cut}`] || (cut === 'Other'
      ? 'A custom cut needs its shape and preparation before a responsible time can be estimated.'
      : 'Thickness, cut shape, or cooking method varies too much for a reliable estimate from these four inputs.'))
  };
}

export function formatMinutes(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  if (!hours) return `${remainder}m`;
  return remainder ? `${hours}h ${remainder}m` : `${hours}h`;
}

function minutesAtTemperature(anchors, temperature) {
  // A bounded temperature adjustment for convenience; see methodology notes.
  if (anchors.length === 1) return anchors[0][1] * Math.pow(anchors[0][0] / temperature, 1.4);
  for (let i = 0; i < anchors.length - 1; i += 1) {
    const [lowTemp, lowMinutes] = anchors[i];
    const [highTemp, highMinutes] = anchors[i + 1];
    if (temperature >= lowTemp && temperature <= highTemp) {
      return lowMinutes + (highMinutes - lowMinutes) * (temperature - lowTemp) / (highTemp - lowTemp);
    }
  }
  const [edgeTemperature, edgeMinutes] = temperature < anchors[0][0] ? anchors[0] : anchors[anchors.length - 1];
  return edgeMinutes * Math.pow(edgeTemperature / temperature, 1.4);
}

export function calculateSmokeTime({animal, cut, weight, temperature}) {
  const info = getCutInfo(animal, cut);
  if (!info) return {status: 'invalid', message: 'Choose an animal and one of its cuts.'};
  const pounds = Number(weight);
  const degrees = Number(temperature);
  if (weight === '' || !Number.isFinite(pounds) || pounds <= 0) return {status: 'invalid', message: 'Enter a weight greater than zero in pounds.'};
  if (temperature === '' || !Number.isFinite(degrees) || degrees < SUPPORTED_PIT_RANGE[0] || degrees > SUPPORTED_PIT_RANGE[1]) return {status: 'invalid', message: 'Enter a smoker temperature from 225°F to 275°F.'};
  if (!info.profile) return {status: 'unavailable', ...info, message: info.unavailableReason};
  const profile = info.profile;
  if (pounds < profile.weight[0] || pounds > profile.weight[1]) return {status: 'unavailable', ...info, message: `This profile covers ${profile.weight[0]}–${profile.weight[1]} lb. Outside that range, use a cut-specific recipe and thermometer.`};
  const base = minutesAtTemperature(profile.anchors, degrees);
  // All accepted temperatures stay within the 225–275°F hot-smoking range.
  const center = base * Math.pow(pounds / profile.referenceWeight, profile.exponent);
  const roundedCenter = Math.round(center / 30) * 30;
  const halfWidth = center < 180 ? 15 : 30;
  const lowMinutes = Math.max(15, roundedCenter - halfWidth);
  const highMinutes = roundedCenter + halfWidth;
  return {
    status: 'estimated', ...info, weight: pounds, temperature: degrees,
    temperatureAdjustmentInferred: !profile.anchors.some(anchor => anchor[0] === degrees) &&
      (profile.anchors.length === 1 || degrees < profile.anchors[0][0] || degrees > profile.anchors[profile.anchors.length - 1][0]),
    lowMinutes, highMinutes,
    display: `${formatMinutes(lowMinutes)} – ${formatMinutes(highMinutes)}`
  };
}
