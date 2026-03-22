// AFINN-165 subset — most common sentiment words
// Full list is ~3400 entries; this covers the most impactful ~500
const AFINN: Record<string, number> = {
  // Strongly negative (-5 to -3)
  abandon: -2, abandoned: -2, abuse: -3, abused: -3, abuses: -3,
  accident: -2, accidents: -2, aggression: -2, agony: -3, alarm: -2,
  angry: -3, annihilate: -3, annoy: -2, annoyed: -2, annoying: -2,
  anxious: -2, appalling: -3, arrest: -2, arrogant: -2, assault: -3,
  attack: -3, attacked: -3, attacks: -3, atrocity: -4, awful: -3,
  bad: -3, badly: -3, ban: -2, bankrupt: -3, barbaric: -4,
  bastard: -5, battle: -2, betray: -3, betrayed: -3, bias: -2,
  bitter: -2, blame: -2, bleed: -2, bleeding: -2, blind: -1,
  block: -1, bloody: -3, blow: -2, bomb: -3, bombed: -3, bombing: -3,
  bored: -2, boring: -3, bother: -2, break: -1, brutal: -3,
  brutality: -4, bully: -3, burden: -2, burn: -2, burned: -2,
  cancer: -3, casualty: -3, catastrophe: -4, chaos: -3, cheat: -3,
  collapse: -2, collateral: -2, combat: -2, condemn: -2, conflict: -2,
  confused: -2, corrupt: -3, corruption: -3, crash: -2, crazy: -2,
  crime: -3, criminal: -3, crisis: -3, critical: -2, criticize: -2,
  cruel: -3, cruelty: -3, crush: -2, cry: -2, damn: -4,
  damage: -3, damaged: -3, danger: -3, dangerous: -3, dead: -3,
  deadly: -3, death: -3, deaths: -3, debris: -2, decay: -2,
  deceive: -3, defeat: -2, demolish: -3, deny: -2, depression: -3,
  desperate: -3, destroy: -3, destroyed: -3, destruction: -3,
  devastating: -3, die: -3, died: -3, difficult: -1, dirty: -2,
  disable: -2, disappoint: -2, disaster: -3, disgust: -3, dislike: -2,
  dispute: -2, disrupt: -2, distress: -3, disturb: -2, doom: -3,
  doubt: -1, dread: -3, drown: -3, dump: -1, dying: -3,
  emergency: -2, enemy: -2, escalation: -2, evil: -3, execution: -3,
  exile: -2, explode: -3, exploit: -2, explosion: -3, extreme: -2,
  extremist: -3, fail: -2, failed: -2, failure: -2, fake: -3,
  fall: -1, fatal: -3, fault: -2, fear: -2, fearful: -2,
  fight: -2, fire: -2, flee: -2, flood: -2, fool: -2,
  force: -1, fraud: -3, frighten: -3, frustrate: -2, fury: -3,
  grief: -2, grim: -2, guilty: -2, gun: -1, guns: -1,
  harm: -2, harmful: -2, harsh: -2, hate: -3, hatred: -3,
  hazard: -2, helpless: -2, hit: -1, horrible: -3, horrific: -4,
  horror: -3, hostile: -2, hostility: -2, humiliate: -3, hunger: -2,
  hurt: -2, ignore: -1, illegal: -3, immoral: -3, imprison: -2,
  infect: -2, injure: -2, injured: -2, injustice: -3, insane: -2,
  insult: -2, invade: -2, invasion: -2, irrational: -2, irritate: -2,
  jail: -2, jeopardize: -2, kill: -3, killed: -3, killing: -3,
  lack: -2, lie: -2, lies: -2, lonely: -2, lose: -2,
  loss: -3, lost: -2, lunatic: -3, mad: -2, massacre: -4,
  menace: -2, mess: -2, militant: -2, miserable: -3, misery: -3,
  missile: -2, missiles: -2, mock: -2, mourn: -2, murder: -3,
  nasty: -3, negative: -2, neglect: -2, nuke: -3, numb: -1,
  offend: -2, oppress: -3, oppression: -3, outrage: -3, overwhelm: -2,
  pain: -2, painful: -2, panic: -3, pathetic: -2, penalize: -2,
  peril: -2, persecute: -3, pessimism: -2, plague: -3, poison: -3,
  pollute: -2, poor: -2, poverty: -2, prison: -2, problem: -2,
  propaganda: -3, protest: -1, provoke: -2, punish: -2, rage: -3,
  rape: -4, reckless: -2, refugee: -2, reject: -2, retaliate: -2,
  revenge: -2, riot: -2, risk: -2, rob: -2, ruin: -2,
  ruthless: -3, sabotage: -3, sad: -2, sanction: -1, sanctions: -1,
  savage: -3, scare: -2, scary: -2, scream: -2, shame: -2,
  shell: -1, shock: -2, shoot: -2, shot: -2, sick: -2,
  siege: -2, sin: -2, slaughter: -4, slave: -3, sloppy: -2,
  smash: -2, sob: -2, sorry: -1, starve: -3, steal: -2,
  storm: -1, strange: -1, stress: -2, strike: -1, struck: -1,
  struggle: -2, stuck: -2, stupid: -3, suffer: -2, suffering: -2,
  suicide: -3, suspect: -1, suspicious: -2, terror: -3, terrorism: -3,
  terrorist: -3, threat: -2, threaten: -2, torture: -4, toxic: -3,
  tragedy: -3, tragic: -3, trap: -2, trauma: -3, trouble: -2,
  ugly: -3, unavoidable: -1, uncertain: -1, unfair: -2, unfortunate: -2,
  unhappy: -2, unsafe: -2, unstable: -2, upset: -2, useless: -2,
  vandalize: -3, victim: -2, victims: -2, violate: -3, violence: -3,
  violent: -3, vulnerable: -2, war: -3, warn: -2, warning: -2,
  waste: -2, weak: -2, weapon: -2, weapons: -2, weep: -2,
  wicked: -3, worried: -2, worry: -2, worse: -3, worst: -3,
  wound: -2, wounded: -2, wrath: -3, wreck: -2, wrong: -2,

  // Positive (+1 to +5)
  accept: 1, accomplish: 2, achieve: 2, admire: 3, advantage: 2,
  agree: 1, agreement: 2, aid: 2, alliance: 2, ally: 2,
  amaze: 2, amazing: 4, appreciate: 2, approval: 2, approve: 2,
  assist: 2, awesome: 4, balanced: 1, beautiful: 3, believe: 1,
  benefit: 2, best: 3, better: 2, bless: 2, blessed: 3,
  bold: 2, bonus: 2, boost: 1, brave: 2, bravery: 3,
  breakthrough: 3, bright: 1, brilliant: 4, calm: 2, care: 2,
  celebrate: 3, ceasefire: 3, cheer: 2, comfort: 2, commend: 2,
  compassion: 2, confident: 2, congratulate: 2, cooperate: 2,
  cooperation: 2, courage: 2, courageous: 3, create: 1, creative: 2,
  cure: 2, defend: 2, defense: 1, delight: 3, democracy: 1,
  determination: 2, determined: 2, diplomacy: 2, diplomat: 1,
  donate: 2, donation: 2, ease: 2, educate: 2, effective: 2,
  empower: 2, encourage: 2, endure: 2, energy: 1, enjoy: 2,
  enlighten: 2, equal: 1, equality: 2, excellent: 3, excite: 3,
  extraordinary: 2, fair: 2, faith: 1, fantastic: 4, favor: 1,
  flourish: 3, forgive: 2, free: 2, freedom: 2, friend: 1,
  friendly: 2, fun: 4, generous: 2, genius: 3, glad: 3,
  glory: 2, good: 3, grace: 1, grateful: 3, great: 3,
  grow: 1, growth: 2, guarantee: 1, guide: 1, happiness: 3,
  happy: 3, harmony: 2, heal: 2, healing: 2, health: 2,
  healthy: 2, heart: 1, help: 2, helpful: 2, hero: 2,
  heroic: 3, honest: 2, honor: 2, hope: 2, hopeful: 2,
  humanitarian: 2, ideal: 2, improve: 2, incredible: 4,
  independence: 2, informative: 2, innocent: 2, innovate: 2,
  insight: 2, inspire: 2, integrity: 2, interest: 1, interesting: 2,
  invest: 1, joy: 3, just: 1, justice: 2, kind: 2, kindness: 3,
  laugh: 1, lead: 1, leader: 1, learn: 1, liberate: 2, liberty: 2,
  life: 1, like: 2, love: 3, loyal: 3, luck: 3, lucky: 3,
  magnificent: 3, meaningful: 2, mercy: 2, miracle: 4, moral: 1,
  negotiate: 1, negotiation: 2, nice: 3, noble: 2, nurture: 2,
  open: 1, opportunity: 2, optimism: 2, optimistic: 2, outstanding: 5,
  paradise: 3, patience: 2, patient: 2, peace: 2, peaceful: 2,
  perfect: 3, pleasure: 3, positive: 2, power: 1, powerful: 2,
  praise: 3, pray: 1, prayer: 1, pride: 2, progress: 2,
  promise: 1, promote: 1, prosper: 2, prosperity: 3, protect: 1,
  protection: 1, proud: 2, recover: 2, recovery: 2, reform: 2,
  refuge: 1, relief: 2, remarkable: 2, rescue: 2, resilience: 2,
  resilient: 2, resolve: 2, respect: 2, restore: 1, reunite: 2,
  right: 1, rights: 1, safe: 1, safety: 1, save: 2,
  secure: 2, security: 1, shelter: 1, shine: 1, smart: 2,
  smile: 2, solidarity: 2, solution: 1, solve: 1, stable: 2,
  strength: 2, strong: 2, succeed: 3, success: 2, successful: 3,
  superb: 5, support: 2, survive: 2, sustain: 1, sweet: 2,
  thankful: 2, thrive: 3, together: 1, tolerate: 1, top: 2,
  transform: 1, treasure: 2, triumph: 4, true: 2, trust: 1,
  truth: 2, unify: 2, unite: 2, unity: 2, uplift: 2,
  useful: 2, valuable: 2, value: 1, victory: 3, vital: 1,
  volunteer: 2, welcome: 2, well: 2, win: 4, wisdom: 1,
  wise: 2, wonderful: 4, worth: 2, worthy: 2,
};

export function analyzeSentiment(text: string): {
  score: number;
  comparative: number;
  label: 'positive' | 'negative' | 'neutral';
} {
  const words = text
    .toLowerCase()
    .replace(/[^a-z\s]/g, '')
    .split(/\s+/)
    .filter(Boolean);

  let score = 0;
  for (const word of words) {
    if (AFINN[word] !== undefined) {
      score += AFINN[word];
    }
  }

  const comparative = words.length > 0 ? score / words.length : 0;
  const label =
    comparative > 0.05
      ? 'positive'
      : comparative < -0.05
        ? 'negative'
        : 'neutral';

  return { score, comparative, label };
}
