// Planning profiles for the five illustrated animals in the Pit Pals New Smoke UI.
// Source and scope notes: docs/smoke-time-methodology.md. Published records
// take precedence at matched conditions. Other combinations use modeled
// planning ballparks, not measured predictions or safety guarantees.
export const FOOD_SAFETY = Object.freeze({
  beef: 'USDA minimum for whole-cut beef: 145°F, then rest at least 3 minutes.',
  pork: 'USDA minimum for whole-cut pork: 145°F, then rest at least 3 minutes.',
  poultry: 'USDA minimum for all poultry: 165°F in the thickest part.',
  fish: 'USDA minimum for finfish: 145°F.',
  lamb: 'USDA minimum for whole-cut lamb: 145°F, then rest at least 3 minutes.'
});

const APP_CUTS = Object.freeze({
  // The four traditionally grilled steak cuts are omitted from this smoker-only tool.
  Beef: ['Back Ribs', 'Brisket Flat', 'Brisket Point', 'Chuck Roast', 'Eye of Round', 'Packer Brisket', 'Plate Ribs', 'Short Ribs'],
  Pork: ['Baby Back Ribs', 'Spare Ribs', 'Ham', 'Pork Belly', 'Pork Butt', 'Pork Shoulder', 'Tenderloin'],
  Poultry: ['Chicken Breast', 'Chicken Thighs', 'Chicken Wings', 'Whole Chicken', 'Turkey Breast', 'Turkey Thighs', 'Turkey Wings', 'Whole Turkey', 'Whole Duck'],
  Fish: ['Catfish', 'Salmon', 'Trout'],
  Lamb: ['Leg of Lamb', 'Rack of Lamb', 'Shoulder']
});

export const ANIMALS = Object.freeze(Object.keys(APP_CUTS));
export const CUTS = APP_CUTS;
export const SUPPORTED_PIT_RANGE = Object.freeze([225, 300]);

export function cutArtworkName(cut) {
  return cut.replace(/[^a-z0-9]/gi, '');
}

export const SOURCES = Object.freeze({
  safety: 'https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures',
  brisket: 'https://www.thermoworks.com/blogs/thermoblog/smoked-brisket-a-how-to-primer',
  flat: 'https://www.thermoworks.com/blogs/thermoblog/how-to-smoke-a-brisket-flat-tailgating-temperatures',
  brisketTraeger: 'https://www.traeger.com/learn/how-to-smoked-brisket',
  point: 'https://www.traeger.com/learn/brisket-flat-vs-point',
  porkButt: 'https://www.thermoworks.com/blogs/thermoblog/how-to-cook-bbq-pork-butt',
  porkTraeger: 'https://www.traeger.com/learn/pulled-pork',
  porkTraegerRecipe: 'https://www.traeger.com/recipes/traeger-pulled-pork',
  ribs: 'https://www.traeger.com/learn/types-pork-ribs',
  beefRibs: 'https://www.traeger.com/learn/types-of-ribs',
  shortRibs: 'https://www.thermoworks.com/blogs/thermoblog/smoked-beef-short-ribs-temperature-is-a-recipe-for-success',
  plateRibs: 'https://www.traeger.com/cuts/beef/plate-short-ribs',
  belly: 'https://www.traeger.com/learn/pork-belly-vs-bacon',
  bellyTraeger: 'https://www.traeger.com/recipes/smoked-pork-belly',
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
  turkeyLegs: 'https://www.traeger.com/learn/smoked-turkey-legs',
  catfishKent: 'https://kentrollins.com/blogs/fish/smoked-catfish',
  catfishSmoker: 'https://www.smoker-cooking.com/easy-smoked-catfish.html',
  lambShoulderHey: 'https://heygrillhey.com/smoked-lamb-shoulder/',
  lambShoulderBoard: 'https://americanlamb.com/recipes/smoked-lamb-shoulder/',
  spareAmazing: 'https://amazingribs.com/books/Amazing-Ribs-Made-Easy.pdf',
  spareJeff: 'https://www.smoking-meat.com/smoking-times-and-temperatures-chart',
  spareHey: 'https://heygrillhey.com/low-and-slow-smoked-spare-ribs/',
  wingsKingsford: 'https://www.kingsford.com/recipes/smoked-chicken-wings/',
  wingsJeff: 'https://www.smoking-meat.com/smoking-times-and-temperatures-chart',
  flatSBS: 'https://www.smokedbbqsource.com/smoked-brisket-flat-recipe/',
  pointSBS: 'https://www.smokedbbqsource.com/how-to-smoke-a-brisket-point/',
  packerHey: 'https://heygrillhey.com/texas-style-smoked-beef-brisket/',
  packerChiles: 'https://www.chilesandsmoke.com/smoked-brisket/',
  backRibsHey: 'https://heygrillhey.com/smoked-beef-back-ribs/',
  shortRibsHey: 'https://heygrillhey.com/smoked-beef-chuck-ribs/',
  buttHey: 'https://heygrillhey.com/simple-smoked-pulled-pork/',
  tenderloinSBS: 'https://www.smokedbbqsource.com/smoked-pork-tenderloin/',
  breastJeff: 'https://www.smoking-meat.com/smoking-times-and-temperatures-chart',
  thighHey: 'https://heygrillhey.com/smoked-chicken-thighs/',
  thighJeff: 'https://www.smoking-meat.com/smoking-times-and-temperatures-chart',
  turkeyWingsTraeger: 'https://www.traeger.com/recipes/bbq-turkey-wings',
  turkeyThighDennis: 'https://www.askchefdennis.com/smoked-turkey-thighs/',
  salmonHey: 'https://heygrillhey.com/smoked-salmon-dip/',
  troutTraeger: 'https://www.traeger.com/recipes/smoked-trout',
  chuckJeff: 'https://www.smoking-meat.com/smoking-times-and-temperatures-chart',
  babyAmazing: 'https://amazingribs.com/books/Amazing-Ribs-Made-Easy.pdf',
  bellyHey: 'https://heygrillhey.com/bbq-smoked-pork-belly/',
  turkeyBreastHey: 'https://heygrillhey.com/smoked-turkey-breast/',
  hamJeff: 'https://www.smoking-meat.com/smoking-times-and-temperatures-chart'
});

const stall = 'A stall around 150–170°F can last hours. Wrapping may shorten it. Cooking unwrapped can take longer. Build in several extra hours.';
const brisketFinish = 'Cook until probe-tender, often around 195–205°F. One exact number cannot guarantee tenderness.';
const ribFinish = 'Cook until the rack bends and the meat feels tender. 195–205°F is a guide, not a guarantee.';

// anchors are [smoker °F, estimated minutes at referenceWeight]; interpolation is
// permitted only between declared anchors. exponent 0 = rack/portion timing.
const PROFILES = {
  Beef: {
    'Back Ribs': {weight: [2, 6], referenceWeight: 4, exponent: 0, anchors: [[225, 360], [250, 300]], assumption: 'One trimmed beef back-rib rack, wrapped after the bark sets.', finish: ribFinish, rest: 'Rest 20–30 minutes.', notes: ['Back ribs have less meat above the bones than plate or short ribs. Rack thickness matters more than pounds.'], sources: ['beefRibs', 'safety']},
    'Brisket Flat': {weight: [3, 20], baselineWeightMax: 9, referenceWeight: 6, exponent: 0.55, anchors: [[225, 480], [250, 390], [275, 330]], assumption: 'One trimmed, relatively even flat. Wrap when the bark is set.', finish: brisketFinish, rest: 'Rest at least 1 hour. Allow 2 hours when planning your cook.', notes: ['The lean flat can dry out, especially at thin edges.', stall], sources: ['flat', 'brisket', 'point', 'safety']},
    'Brisket Point': {weight: [3, 20], baselineWeightMax: 8, referenceWeight: 5, exponent: 0.62, anchors: [[225, 540], [250, 420], [275, 390]], assumption: 'One separated, thick, well-marbled point smoked unwrapped.', finish: brisketFinish, rest: 'Rest at least 1 hour.', notes: ['The thicker, fattier point may need longer rendering than a flat of similar weight.', stall], sources: ['pointSBS', 'brisket', 'safety']},
    'Packer Brisket': {weight: [8, 20], baselineWeightMax: 18, referenceWeight: 13, exponent: 0.68, anchors: [[225, 900], [250, 780], [275, 660]], assumption: 'Whole trimmed packer with flat and point. Wrap when the bark is set.', finish: brisketFinish, rest: 'Rest at least 1 hour. Allow 2 to 3 hours for a large packer.', notes: ['The flat and point can finish differently. Probe both muscles.', stall], sources: ['packerChiles', 'packerHey', 'safety']},
    'Plate Ribs': {weight: [4, 10], referenceWeight: 7, exponent: 0.1, anchors: [[225, 480]], assumption: 'One meaty plate-rib rack, wrapped after about 5 hours at 225°F.', finish: 'Cook until very tender, commonly around 203–205°F.', rest: 'Rest 30–60 minutes.', notes: ['Large plate ribs have substantial meat and connective tissue. A stall is possible.', 'Rack thickness matters more than total pounds.'], sources: ['plateRibs', 'shortRibs', 'safety']},
    'Short Ribs': {weight: [2, 7], referenceWeight: 4, exponent: 0.15, anchors: [[225, 540]], assumption: 'English-cut bone-in chuck short ribs, not thin flanken slices.', finish: 'Cook until probe-tender, commonly around 200–205°F.', rest: 'Rest 20–30 minutes.', notes: ['Connective tissue and possible stalls matter more than weight alone.', 'Plate ribs use a separate profile.'], sources: ['shortRibs', 'safety']}
  },
  Pork: {
    'Baby Back Ribs': {weight: [1.5, 4], referenceWeight: 2.5, exponent: 0, anchors: [[225, 300], [250, 240]], assumption: 'One baby-back rack, wrapped after the bark sets.', finish: ribFinish, rest: 'Rest 10–15 minutes.', notes: ['Baby backs are smaller and usually cook faster than spare ribs.', 'Rack thickness matters more than total pounds.'], sources: ['ribs', 'safety']},
    'Spare Ribs': {weight: [2.5, 6], referenceWeight: 4, exponent: 0, anchors: [[225, 360], [250, 300]], assumption: 'One spare-rib rack, wrapped after the bark sets.', finish: ribFinish, rest: 'Rest 10–15 minutes.', notes: ['Spare ribs are typically larger and fattier than baby backs.', 'Rack thickness matters more than total pounds.'], sources: ['ribs', 'safety']},
    'Pork Butt': {weight: [5, 12], referenceWeight: 8, exponent: 0.72, anchors: [[225, 720], [250, 450]], assumption: 'One whole butt for pulled pork. Wrap after the bark sets, around 160°F.', finish: 'For pulled pork, cook until probe-tender, commonly around 195–205°F. USDA safety minimum is lower.', rest: 'Rest at least 1 hour.', notes: ['The stall can add several hours. Plan a 2–4 hour scheduling buffer.', 'Bone-in and boneless shapes may cook differently.'], sources: ['porkButt', 'porkTraegerRecipe', 'safety']},
    'Pork Shoulder': {weight: [5, 12], referenceWeight: 8, exponent: 0.78, anchors: [[225, 780], [250, 660]], assumption: 'One full shoulder/picnic roast for pulled pork. Wrap after the bark sets.', finish: 'For pulled pork, cook until probe-tender, commonly around 195–205°F. USDA safety minimum is lower.', rest: 'Rest at least 1 hour.', notes: ['A picnic shoulder differs in shape and skin/fat from a butt. The stall can add hours.', 'Bone-in and boneless shapes may cook differently. Plan a 2–4 hour buffer.'], sources: ['porkButt', 'porkTraeger', 'safety'], evidence: 'comparison'},
    'Pork Belly': {weight: [2, 5], referenceWeight: 3, exponent: 0.25, anchors: [[225, 450], [275, 195]], assumption: 'One skinless whole slab cooked to about 200°F for tender slices, not cubes or bacon.', finish: 'For tender slices, render to about 195–200°F. USDA safety minimum is 145°F with a 3-minute rest.', rest: 'Rest 10–15 minutes.', notes: ['The 225°F recipe wraps after 165°F. The 275°F recipe stays unwrapped. Times between them are rough because the methods differ.', 'Pull-apart texture or cubed burnt ends use a different method and time.'], sources: ['bellyHey', 'bellyTraeger', 'safety'], evidence: 'adapted'},
    'Tenderloin': {weight: [0.75, 2], referenceWeight: 1.25, exponent: 0.2, anchors: [[225, 150]], assumption: 'One intact pork tenderloin, not a thicker pork loin roast.', finish: 'Reach at least 145°F, then rest at least 3 minutes.', rest: 'Rest 5–10 minutes.', notes: ['Very lean. Probe early to avoid drying out.', 'Thickness matters more than the package weight.'], sources: ['tenderloin', 'safety']}
  },
  Poultry: {
    'Chicken Breast': {weight: [0.3, 1.25], referenceWeight: 0.65, exponent: 0.15, anchors: [[225, 150]], assumption: 'One ordinary boneless breast, roughly 1–1½ inches thick. Weight is per piece.', finish: 'Reach 165°F in the thickest part.', rest: 'Rest 5–10 minutes.', notes: ['The cited recipe cooks to 160°F. This estimate allows time to reach 165°F.', 'Thickness matters more than weight. Start checking early.'], sources: ['chickenBreast', 'safety'], evidence: 'adapted'},
    'Whole Chicken': {weight: [3, 6], referenceWeight: 4.5, exponent: 0.45, anchors: [[225, 210]], assumption: 'One unstuffed whole chicken, not spatchcocked.', finish: 'Reach 165°F in the thickest part of the breast and thigh.', rest: 'Rest 10–15 minutes.', notes: ['At 225°F, skin may stay soft. A higher-heat finish changes the cook time.'], sources: ['chicken', 'safety']},
    'Turkey Breast': {weight: [4, 7], referenceWeight: 5.5, exponent: 0.2, anchors: [[225, 120]], assumption: 'One bone-in, brined turkey breast. Weight includes bone.', finish: 'Reach 165°F in the thickest part.', rest: 'Rest at least 15 minutes.', notes: ['Thickness, brining, and bone affect timing. Check early.', 'Higher heat can improve skin but changes this estimate.'], sources: ['turkeyBreast', 'safety']},
    'Whole Turkey': {weight: [8, 16], referenceWeight: 12, exponent: 0.9, anchors: [[225, 480], [250, 390]], assumption: 'One unstuffed whole turkey cooked at a steady smoker temperature.', finish: 'Reach 165°F in the thickest part of the breast and thigh.', rest: 'Rest 20–30 minutes.', notes: ['Plan extra time for weather and bird shape.', 'A 275°F finish can improve skin but changes this single-temperature estimate.'], sources: ['turkey', 'safety']}
  },
  Fish: {
    'Salmon': {weight: [0.5, 3], referenceWeight: 1.5, exponent: 0.1, anchors: [[225, 210]], assumption: 'One cured, air-dried fillet about 1–1½ inches thick, hot-smoked at 225°F.', finish: 'Reach 145°F in the thickest part.', rest: 'No extended rest. Serve or chill promptly.', notes: ['Thickness and cure matter far more than total weight.', 'This is hot smoking, not cold smoking.'], sources: ['salmon', 'safety']},
    'Trout': {weight: [0.3, 2], referenceWeight: 1, exponent: 0.1, anchors: [[225, 105]], assumption: 'One ordinary trout fillet, about ½–1 inch thick, hot-smoked at 225°F.', finish: 'Reach 145°F in the thickest part.', rest: 'No extended rest. Serve or chill promptly.', notes: ['Thickness matters more than total weight.', 'This is hot smoking, not cold smoking.'], sources: ['trout', 'safety']}
  },
  Lamb: {
    'Leg of Lamb': {weight: [5, 7], referenceWeight: 6, exponent: 0.3, anchors: [[225, 225]], assumption: 'One boneless leg, about 5–7 lb, cooked at 225°F for sliced medium lamb.', finish: 'Reach at least 145°F, then rest at least 3 minutes.', rest: 'Rest 15–20 minutes.', notes: ['Bone-in legs and thick rolled roasts may take longer.', 'This is a sliced roast, not a pull-apart shoulder.'], sources: ['lambLeg', 'safety']}
  }
};

// These profiles turn a named cut into a useful starting point with an explicit
// standard preparation. Some use a related cut or a mixed-temperature recipe as
// a comparison; that limitation is shown in the result rather than hidden.
Object.assign(PROFILES.Beef, {
  'Chuck Roast': {weight: [2.5, 6], referenceWeight: 4, exponent: 0.5, anchors: [[225, 570]], assumption: 'One thick chuck roast for pulled beef. Smoke, then cover in a pan through the stall while keeping the smoker near 225°F.', finish: 'Cook until probe-tender and shreddable, often 200–210°F.', rest: 'Rest at least 20 minutes.', notes: ['The cited pulled-beef method raises the pit from 225°F to 250°F. This single-temperature timing is a rough adaptation.', 'Braising liquid and wrapping can greatly change the stall and total time.'], sources: ['chuckPulled', 'chuck', 'safety'], evidence: 'adapted'},
  'Eye of Round': {weight: [2, 5], referenceWeight: 3, exponent: 0.35, anchors: [[225, 240]], assumption: 'One intact, lean eye-of-round roast smoked for thin sliced beef, without a separate sear.', finish: 'Reach at least 145°F and rest at least 3 minutes for the USDA minimum.', rest: 'Rest 10–15 minutes.', notes: ['This lean roast can dry out quickly. The cited recipe includes a sear and lower smoke pull temperature.', 'Shape and target doneness matter more than pounds alone.'], sources: ['eyeRound', 'safety'], evidence: 'adapted'}
});

Object.assign(PROFILES.Pork, {
  'Ham': {weight: [5, 10], referenceWeight: 7, exponent: 0.8, anchors: [[225, 150]], assumption: 'One fully cooked, USDA-inspected packaged half ham reheated at 225°F, not a fresh raw ham.', finish: 'Check the package: USDA-inspected fully cooked ham may be reheated to 140°F. Other fully cooked ham needs 165°F. Fresh ham needs 145°F plus a 3-minute rest.', rest: 'Rest 20 minutes.', notes: ['Fresh/uncooked ham is a different cook and this time does not apply.', 'A spiral cut, glaze, bone, and package instructions can change timing.'], sources: ['ham', 'safety'], evidence: 'direct'}
});

Object.assign(PROFILES.Poultry, {
  'Chicken Thighs': {weight: [0.25, 1], referenceWeight: 0.5, exponent: 0.15, anchors: [[225, 150]], assumption: 'One bone-in, skin-on chicken thigh, roughly 1–1½ inches thick. Weight is per thigh.', finish: 'Reach at least 165°F at the thickest point, away from bone.', rest: 'Rest 5–10 minutes.', notes: ['This is a comparison with chicken portions, since thigh thickness and bone dominate time.', 'Dark meat may be preferred at a higher temperature for texture. Higher pit heat improves skin.'], sources: ['chicken', 'safety'], evidence: 'comparison'},
  'Chicken Wings': {weight: [0.15, 0.6], referenceWeight: 0.3, exponent: 0, anchors: [[225, 90]], assumption: 'One ordinary whole wing or separated flat/drumette, single layer on the grate. Weight is per wing.', finish: 'Reach at least 165°F at the thickest point.', rest: 'Rest 5 minutes.', notes: ['Wing size matters more than package weight.', 'A high-heat crisping step is optional and is outside this smoke-time estimate.'], sources: ['chickenWings', 'safety']},
  'Turkey Thighs': {weight: [0.75, 2.5], referenceWeight: 1.5, exponent: 0.2, anchors: [[250, 240]], assumption: 'One bone-in turkey thigh at 250°F, uncured. Weight is per thigh.', finish: 'Reach at least 165°F at the thickest point, away from bone.', rest: 'Rest 10–15 minutes.', notes: ['This is a comparison with turkey legs. A cured leg recipe can take much longer.', 'Bone and thickness matter more than package weight.'], sources: ['turkeyLegs', 'turkeyThighs', 'safety'], evidence: 'comparison'},
  'Turkey Wings': {weight: [0.4, 1.5], referenceWeight: 0.8, exponent: 0.1, anchors: [[250, 120]], assumption: 'One ordinary turkey wing at 250°F, single layer on the grate. Weight is per wing.', finish: 'Reach at least 165°F at the thickest point.', rest: 'Rest 10 minutes.', notes: ['Large or unusually thick wings may take longer.', 'A baking sheet or covered pan changes the cook time and skin texture.'], sources: ['turkeyWings', 'safety']},
  'Whole Duck': {weight: [4, 7], referenceWeight: 5.5, exponent: 0.35, anchors: [[225, 195]], assumption: 'One domestic whole duck, unstuffed, skin pricked for fat rendering.', finish: 'Reach at least 165°F in the thickest breast and thigh.', rest: 'Rest 20–30 minutes.', notes: ['The cited recipe stops at 160°F. This estimate allows extra time to reach USDA 165°F.', 'A high-heat skin finish changes the total time.'], sources: ['duck', 'safety'], evidence: 'adapted'}
});

Object.assign(PROFILES.Fish, {
  Catfish: {weight: [0.3, 2], referenceWeight: 1, exponent: 0.1, anchors: [[225, 120]], assumption: 'One catfish fillet about ¾–1 inch thick, hot-smoked at 225°F. Not a whole fish.', finish: 'Reach 145°F in the thickest part.', rest: 'Serve or chill promptly.', notes: ['This is a rough fillet estimate within Traeger’s 1–3 hour hot-smoked fish guidance.', 'Fillet thickness, brining, and skin change the time.'], sources: ['fishGeneral', 'safety'], evidence: 'comparison'},
});

Object.assign(PROFILES.Lamb, {
  'Rack of Lamb': {weight: [1, 3], referenceWeight: 2, exponent: 0.1, anchors: [[250, 90]], assumption: 'One frenched rack, roughly 1½–2 inches thick, at 250°F without a separate sear.', finish: 'Reach at least 145°F and rest at least 3 minutes.', rest: 'Rest 10 minutes.', notes: ['This is adapted from a smoked-then-seared recipe that ends at a lower temperature.', 'Rack thickness and a high-heat sear change timing.'], sources: ['lambRack', 'safety'], evidence: 'adapted'},
  Shoulder: {weight: [4, 10], referenceWeight: 8, exponent: 0.55, anchors: [[250, 360]], assumption: 'One whole bone-in lamb shoulder at a steady 250°F for pulled lamb, without a hot finishing phase.', finish: 'Cook until probe-tender, commonly around 200–205°F.', rest: 'Rest 20–30 minutes.', notes: ['The cited method raises the pit to 325°F for the last hour. A steady 250°F finish may take longer.', 'Bone and shoulder shape vary. Allow a generous buffer.'], sources: ['lambShoulder', 'safety'], evidence: 'adapted'}
});

for (const animalProfiles of Object.values(PROFILES)) {
  for (const profile of Object.values(animalProfiles)) profile.temperatureRange = SUPPORTED_PIT_RANGE;
}

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
      : FOOD_SAFETY[animal.toLowerCase()]
  };
}

export function formatMinutes(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  if (!hours) return `${remainder}M`;
  return remainder ? `${hours}H ${remainder}M` : `${hours}H`;
}

// Only records with the same cut, pit temperature, preparation and finish are
// aggregated. Each entry is one original recipe, not a second citation to it.
// These source ranges are cook time only and exclude rest and preparation.
export const PUBLISHED_GUIDANCE = Object.freeze({
  'Beef|Back Ribs': {temperature: 275, method: 'One beef back-rib rack, paper wrapped after the bark sets.', records: [
    {source: 'backRibsHey', min: 240, max: 360}
  ]},
  'Beef|Brisket Flat': {temperature: 250, method: 'One trimmed brisket flat, paper wrapped after the bark sets. The recipe does not specify a reliable size band.', records: [
    {source: 'flatSBS', min: 360, max: 480}
  ]},
  'Beef|Brisket Point': {temperature: 250, weight: [4, 6], method: 'One separated point, about 5 lb, smoked unwrapped to tenderness. Burnt ends are excluded.', records: [
    {source: 'pointSBS', min: 360, max: 480}
  ]},
  'Beef|Short Ribs': {temperature: 250, method: 'One thick, bone-in chuck short-rib rack, smoked unwrapped.', records: [
    {source: 'shortRibsHey', min: 480, max: 600}
  ]},
  'Beef|Chuck Roast': {temperature: 225, weight: [3, 4], method: 'One chuck roast for pulled beef, cooked until shreddable.', notes: ['Braising liquid and wrapping can change the stall and total time.'], records: [
    {source: 'chuckJeff', min: 480, max: 600}
  ]},
  'Pork|Spare Ribs': {temperature: 225, method: 'One ordinary spare-rib rack, smoked without a timed braise.', records: [
    {source: 'spareAmazing', min: 300, max: 360},
    {source: 'spareJeff', min: 360, max: 360}
  ]},
  'Pork|Spare Ribs|250': {temperature: 250, method: 'One spare-rib rack, smoked unwrapped until tender.', records: [
    {source: 'spareHey', min: 270, max: 330}
  ]},
  'Pork|Baby Back Ribs': {temperature: 225, method: 'One ordinary baby-back rack, smoked unwrapped until tender.', records: [
    {source: 'babyAmazing', min: 180, max: 240}
  ]},
  'Pork|Pork Butt': {temperature: 250, weight: [6, 9], method: 'One bone-in Boston butt, foil wrapped around 160°F and cooked to about 204°F for pulled pork.', records: [
    {source: 'porkTraegerRecipe', min: 360, max: 540}
  ]},
  'Pork|Pork Belly': {temperature: 225, weight: [4, 4], method: 'One whole skinless slab, about 4 lb, wrapped after 165°F and cooked to about 200°F.', records: [
    {source: 'bellyHey', min: 480, max: 480}
  ]},
  'Pork|Pork Belly|275': {temperature: 275, weight: [3, 3], method: 'One skinless whole pork belly slab, about 3 lb, smoked unwrapped to 200°F.', records: [
    {source: 'bellyTraeger', min: 180, max: 210}
  ]},
  'Pork|Ham': {temperature: 225, weight: [9, 10], method: 'One fully cooked, USDA-inspected spiral ham, about 10 lb, reheated to 140°F.', records: [
    {source: 'hamJeff', min: 180, max: 240}
  ]},
  'Pork|Tenderloin': {temperature: 250, weight: [0.75, 1.5], method: 'One intact pork tenderloin, about 1 lb, smoked to 145°F.', records: [
    {source: 'tenderloinSBS', min: 60, max: 75}
  ]},
  'Poultry|Chicken Thighs': {temperature: 275, method: 'One bone-in chicken thigh, cooked to about 175°F.', notes: ['Thigh thickness and bone placement affect the finish. Higher pit heat can improve the skin.'], records: [
    {source: 'thighHey', min: 45, max: 75},
    {source: 'thighJeff', min: 120, max: 120}
  ]},
  'Poultry|Chicken Wings': {temperature: 275, method: 'Ordinary wings in a single layer, smoked to about 175°F without a separate crisping stage.', records: [
    {source: 'wingsKingsford', min: 75, max: 90},
    {source: 'wingsJeff', min: 90, max: 120}
  ]},
  'Poultry|Turkey Wings': {temperature: 275, method: 'Joint-separated turkey wings, smoked to about 185°F.', records: [
    {source: 'turkeyWingsTraeger', min: 90, max: 120}
  ]},
  'Poultry|Turkey Wings|250': {temperature: 250, method: 'Turkey wings cooked in a single layer until fully done.', notes: ['Thicker wings may need longer than two hours.'], records: [
    {source: 'turkeyWings', min: 120, max: 120}
  ]},
  'Poultry|Turkey Breast': {temperature: 275, weight: [4, 5], method: 'One boneless, skinless 4–5 lb turkey breast, cider brined and smoked to 165°F.', records: [
    {source: 'turkeyBreastHey', min: 180, max: 180}
  ]},
  'Poultry|Turkey Thighs': {temperature: 275, weight: [1.5, 1.75], method: 'One bone-in turkey thigh, about 1½–1¾ lb, smoked to 165°F.', records: [
    {source: 'turkeyThighDennis', min: 180, max: 180}
  ]},
  'Fish|Salmon': {temperature: 225, method: 'One cured, air-dried salmon fillet, hot smoked to 145°F.', records: [
    {source: 'salmon', min: 180, max: 240}
  ]},
  'Fish|Trout': {temperature: 225, method: 'One trout fillet, hot smoked until opaque and checked at 145°F.', records: [
    {source: 'troutTraeger', min: 90, max: 120}
  ]},
  'Fish|Catfish': {temperature: 225, method: 'One catfish fillet, hot smoked until flaky and checked at 145°F.', notes: ['Fillet thickness, brining, and skin can change the time. Check early.'], records: [
    {source: 'catfishKent', min: 45, max: 60},
    {source: 'catfishSmoker', min: 45, max: 60}
  ]},
  'Lamb|Shoulder': {temperature: 250, weight: [3, 5], method: 'One bone-in lamb shoulder, paper wrapped after the bark sets, cooked until pull-apart tender.', notes: ['Shoulder shape and the stall can move the finish. Check several spots for tenderness.'], records: [
    {source: 'lambShoulderHey', min: 360, max: 480},
    {source: 'lambShoulderBoard', min: 360, max: 480}
  ]}
});

function aggregateGuidance(guidance) {
  const records = guidance.records;
  const midpoints = records.map(record => (record.min + record.max) / 2);
  const average = midpoints.reduce((sum, midpoint) => sum + midpoint, 0) / midpoints.length;
  const step = average < 360 ? 5 : 15;
  return {
    lowMinutes: Math.floor(Math.min(...records.map(record => record.min)) / step) * step,
    highMinutes: Math.ceil(Math.max(...records.map(record => record.max)) / step) * step,
    averageMinutes: Math.round(average / step) * step,
    sourceKeys: records.map(record => record.source),
    averageKind: records.length > 1 ? 'sources' : 'reference'
  };
}

// Keep the source or model bounds intact. The shorter visible interval is a
// cook-planning window around the center, not a claim about all outcomes.
function finishWindow(lowMinutes, highMinutes, averageMinutes) {
  const windowNarrowed = highMinutes - lowMinutes > 120;
  const windowLowMinutes = windowNarrowed
    ? Math.max(lowMinutes, Math.min(averageMinutes - 60, highMinutes - 120))
    : lowMinutes;
  const windowHighMinutes = windowNarrowed ? windowLowMinutes + 120 : highMinutes;
  return {
    evidenceLowMinutes: lowMinutes,
    evidenceHighMinutes: highMinutes,
    windowLowMinutes, windowHighMinutes, windowNarrowed,
    display: windowLowMinutes === windowHighMinutes
      ? `About ${formatMinutes(averageMinutes)}`
      : `${formatMinutes(windowLowMinutes)} – ${formatMinutes(windowHighMinutes)}`
  };
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

// Chiles and Smoke publishes steady-pit ranges for whole, paper-wrapped
// packers by weight band at all three supported temperatures. These are one
// source's planning ranges, not observed cook-time distributions.
const PACKER_TIMES = Object.freeze([
  {weight: [8, 10], times: {225: [600, 720], 250: [480, 600], 275: [420, 540]}},
  {weight: [10, 12], times: {225: [720, 840], 250: [600, 720], 275: [480, 600]}},
  {weight: [12, 14], times: {225: [840, 960], 250: [720, 840], 275: [600, 720]}},
  {weight: [14, 16], times: {225: [960, 1080], 250: [840, 960], 275: [720, 840]}},
  {weight: [16, 18], times: {225: [1080, 1200], 250: [900, 1080], 275: [780, 960]}}
]);

function packerTimesAtTemperature(times, temperature) {
  if (times[temperature]) return times[temperature];
  const lower = temperature < 250 ? 225 : 250;
  const upper = lower + 25;
  const fraction = (temperature - lower) / 25;
  return times[lower].map((value, index) => value + (times[upper][index] - value) * fraction);
}

function calculatePackerBrisket(info, pounds, degrees) {
  const profile = info.profile;
  const weightExtrapolated = pounds < 8 || pounds > 18;
  const band = PACKER_TIMES.find(({weight: [low, high]}, index) =>
    pounds >= low && (pounds < high || (index === PACKER_TIMES.length - 1 && pounds <= high)));
  const reference = band ?? (pounds < 8 ? PACKER_TIMES[0] : PACKER_TIMES.at(-1));
  const exactTemperature = degrees === 225 || degrees === 250 || degrees === 275;
  const [publishedLow, publishedHigh] = packerTimesAtTemperature(reference.times, degrees);
  let lowMinutes;
  let highMinutes;
  let averageMinutes;
  let averageKind;
  let rangeKind;
  const sourceKeys = ['packerChiles'];

  if (band && exactTemperature) {
    const [sourceLow, sourceHigh] = reference.times[degrees];
    ({lowMinutes, highMinutes, averageMinutes, averageKind} = aggregateGuidance({
      records: [{source: 'packerChiles', min: sourceLow, max: sourceHigh}]
    }));
    rangeKind = 'published';
  } else {
    const referenceWeight = (reference.weight[0] + reference.weight[1]) / 2;
    const ratio = band ? 1 : pounds / referenceWeight;
    const center = Math.max(15, (publishedLow + publishedHigh) / 2 * ratio);
    const step = center < 360 ? 5 : 15;
    const widening = weightExtrapolated ? 0.2 : 0;
    lowMinutes = Math.max(15, Math.floor(publishedLow * ratio * (1 - widening) / step) * step);
    if (pounds > 18) lowMinutes = Math.ceil(Math.max(lowMinutes, publishedLow) / step) * step;
    highMinutes = Math.max(lowMinutes + step, Math.ceil(publishedHigh * ratio * (1 + widening) / step) * step);
    averageMinutes = Math.max(lowMinutes, Math.min(highMinutes, Math.round(center / step) * step));
    averageKind = 'modeled';
    rangeKind = 'modeled';
  }

  return {
    status: 'estimated', ...info, weight: pounds, temperature: degrees,
    weightExtrapolated, typicalWeightRange: [8, 18],
    temperatureAdjustmentInferred: !exactTemperature,
    lowMinutes, highMinutes, averageMinutes, averageKind, rangeKind,
    method: profile.assumption, notes: profile.notes, sourceKeys,
    guidanceWeight: band?.weight ?? null,
    ...finishWindow(lowMinutes, highMinutes, averageMinutes)
  };
}

export function calculateSmokeTime({animal, cut, weight, temperature}) {
  const info = getCutInfo(animal, cut);
  if (!info) return {status: 'invalid', message: 'Choose an animal and one of its cuts.'};
  const pounds = Number(weight);
  const degrees = Number(temperature);
  if (weight === '' || !Number.isFinite(pounds) || pounds <= 0) return {status: 'invalid', message: 'Enter a weight greater than zero in pounds.'};
  if (temperature === '' || !Number.isFinite(degrees) || degrees < SUPPORTED_PIT_RANGE[0] || degrees > SUPPORTED_PIT_RANGE[1]) return {status: 'invalid', message: 'Choose a smoker temperature from 225°F to 300°F.'};
  if (!info.profile) return {status: 'invalid', message: 'This cut has no estimate configured.'};
  if (animal === 'Beef' && cut === 'Packer Brisket') return calculatePackerBrisket(info, pounds, degrees);
  const profile = info.profile;
  const typicalWeightMax = profile.baselineWeightMax ?? profile.weight[1];
  const weightExtrapolated = pounds < profile.weight[0] || pounds > typicalWeightMax;
  const guidance = PUBLISHED_GUIDANCE[`${animal}|${cut}|${degrees}`] ?? PUBLISHED_GUIDANCE[`${animal}|${cut}`];
  if (guidance && degrees === guidance.temperature && !weightExtrapolated &&
      (!guidance.weight || (pounds >= guidance.weight[0] && pounds <= guidance.weight[1]))) {
    const published = aggregateGuidance(guidance);
    return {
      status: 'estimated', ...info, weight: pounds, temperature: degrees,
      weightExtrapolated: false, typicalWeightRange: [profile.weight[0], typicalWeightMax],
      temperatureAdjustmentInferred: false, rangeKind: 'published',
      method: guidance.method, notes: guidance.notes ?? profile.notes, guidanceWeight: guidance.weight ?? null, ...published,
      ...finishWindow(published.lowMinutes, published.highMinutes, published.averageMinutes)
    };
  }
  const base = minutesAtTemperature(profile.anchors, degrees);
  // At 300°F, start from this same cut and weight at 275°F. That keeps a
  // published 275°F recipe from being replaced by a slower generic anchor.
  const nearestLowerEstimate = degrees === 300
    ? calculateSmokeTime({animal, cut, weight: pounds, temperature: 275}) : null;
  const center = nearestLowerEstimate
    ? nearestLowerEstimate.averageMinutes * Math.pow(275 / 300, 1.4)
    : base * Math.pow(pounds / profile.referenceWeight, profile.exponent);
  const step = center < 360 ? 5 : 15;
  const roundedCenter = Math.max(15, Math.round(center / step) * step);
  // A modeled planning band is deliberately broader than the former ±30-minute
  // interval. It is not presented as a published range or a confidence interval.
  const halfWidth = Math.max(weightExtrapolated ? 90 : step, Math.ceil(center * (weightExtrapolated ? 0.3 : 0.2) / step) * step);
  const lowMinutes = Math.max(15, roundedCenter - halfWidth);
  const highMinutes = Math.max(lowMinutes + step, roundedCenter + halfWidth);
  return {
    status: 'estimated', ...info, weight: pounds, temperature: degrees, weightExtrapolated,
    typicalWeightRange: [profile.weight[0], typicalWeightMax],
    temperatureAdjustmentInferred: !profile.anchors.some(anchor => anchor[0] === degrees),
    lowMinutes, highMinutes, averageMinutes: roundedCenter, averageKind: 'modeled', rangeKind: 'modeled',
    method: profile.assumption,
    notes: profile.notes,
    sourceKeys: nearestLowerEstimate?.sourceKeys ?? profile.sources.filter(key => key !== 'safety'),
    ...finishWindow(lowMinutes, highMinutes, roundedCenter)
  };
}
