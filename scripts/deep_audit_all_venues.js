const fs = require('fs');
const code = fs.readFileSync('src/data/restaurants.ts', 'utf8');
const eqIdx = code.indexOf('= [');
const jsonStr = code.slice(eqIdx + 2, code.lastIndexOf(']') + 1);
const list = JSON.parse(jsonStr);

console.log(`Auditing all ${list.length} restaurants for location mismatches and flagship fidelity...\n`);

const neighborhoodKeywords = {
  'Indiranagar': ['indiranagar', 'indira nagar', 'hal 2nd stage', 'hal 1st stage', 'binnamangala', 'doopanahalli', 'defence colony', '100 feet', '12th main', '100ft'],
  'Church Street & MG Road': ['church st', 'mg road', 'm.g. road', 'brigade', 'museum rd', 'rest house', 'residency rd', 'ashok nagar', 'shanthala nagar', 'st. mark', 'st marks', 'craig park', 'shanthi nagar'],
  'Malleshwaram': ['malleshwaram', 'malleswaram', 'margosa', 'sampige', 'sheshadripuram', 'kumara park'],
  'Basavanagudi': ['basavanagudi', 'gandhi bazaar', 'vv puram', 'v.v. puram', 'sajjan rao', 'nr colony', 'n.r. colony', 'shankarapura', 'lalbagh', 'lal bagh'],
  'Koramangala': ['koramangala', 'santhosapuram', 'ejipura'],
  'HSR Layout': ['hsr layout', 'hsr', 'sector 1', 'sector 2', 'sector 3', 'sector 4', 'sector 5', 'sector 6', 'sector 7'],
  'Bellandur & Ecoworld': ['bellandur', 'ecoworld', 'ecospace', 'rmz', 'outer ring rd', 'devarabisanahalli', 'kadubeesanahalli', 'marathahalli'],
  'Sarjapur Road': ['sarjapur', 'kaikondrahalli', 'doddakannelli', 'kasavanahalli'],
  'Kalyan Nagar & Kammanahalli': ['kalyan nagar', 'kammanahalli', 'hrbr', 'cmr rd', 'hennur', 'banaswadi'],
  'Whitefield': ['whitefield', 'epip', 'itpl', 'hoodi', 'seegehalli', 'kannamangala', 'mahadevapura'],
  'Jayanagar': ['jayanagar', '4th block', '3rd block', '9th block', '7th block', '8th block'],
  'Lavelle Road': ['lavelle rd', 'lavelle road', 'vittal mallya', 'ub city', 'kasturba', 'richmond'],
  'CBD & Central': ['shivajinagar', 'shivaji nagar', 'infantry', 'crescent', 'tasker town', 'gandhinagar', 'gandhi nagar', 'majestic', 'frazer town', 'cox town', 'richmond', 'wood st', 'halasuru', 'ulsoor', 'shanthinagar', 'shanti nagar'],
  'Bel Road & North BLR': ['hennur', 'bagalur', 'thanisandra', 'sahakar nagar', 'hebbal', 'yelahanka', 'bellary rd', 'ganganagar']
};

const potentialMismatches = [];

list.forEach(r => {
  const addrLower = (r.address || '').toLowerCase();
  const hood = r.neighborhood;
  const keywords = neighborhoodKeywords[hood] || [];

  const matchesHood = keywords.some(k => addrLower.includes(k));
  if (!matchesHood) {
    potentialMismatches.push({
      id: r.id,
      name: r.name,
      assignedHood: hood,
      address: r.address,
      lat: r.lat,
      lng: r.lng
    });
  }

  // Check branches as well
  if (r.branches) {
    r.branches.forEach(b => {
      const bAddrLower = (b.address || '').toLowerCase();
      const bHood = b.neighborhood;
      const bKeywords = neighborhoodKeywords[bHood] || [];
      const bMatches = bKeywords.some(k => bAddrLower.includes(k));
      if (!bMatches) {
        potentialMismatches.push({
          id: `${r.id} -> ${b.name}`,
          name: `${r.name} (${b.name})`,
          assignedHood: bHood,
          address: b.address,
          lat: b.lat,
          lng: b.lng
        });
      }
    });
  }
});

console.log(`Found ${potentialMismatches.length} entries for manual fidelity review:\n`);
potentialMismatches.forEach((m, idx) => {
  console.log(`${idx + 1}. [${m.assignedHood}] ${m.name}`);
  console.log(`   Address: ${m.address}`);
  console.log(`   Coords: ${m.lat}, ${m.lng}\n`);
});
