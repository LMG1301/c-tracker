'use client'

import { useState, useEffect, useCallback, useRef } from "react";

const YT = (q) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
const V = {
  "hip-cars": YT("hip CARs quadruped mobility squat university"), "90-90": YT("90 90 hip switches mobility"), "wgs": YT("world's greatest stretch"), "cossack": YT("cossack squat mobility"), "wall-ankle": YT("wall ankle mobilization"), "deep-squat": YT("deep squat hold"),
  "shoulder-cars": YT("shoulder CARs"), "thread-needle": YT("thread the needle thoracic"), "cat-cow": YT("cat cow spinal"), "band-pull": YT("band pull apart jeff nippard"), "prone-swim": YT("prone swimmer lower trap"), "scap-pushup": YT("scapular push up"), "scorpion": YT("scorpion stretch"),
  "ankle-cars": YT("ankle CARs"), "tspine-rot": YT("thoracic rotation"), "kb-halo": YT("kettlebell halo"), "sl-bridge": YT("single leg glute bridge"),
  "broad-jump": YT("broad jump explosive phil daru"), "squat-pause": YT("pause back squat squat university"), "bss": YT("bulgarian split squat jeff nippard"), "sl-rdl": YT("single leg romanian deadlift"), "pallof": YT("pallof press phil daru"),
  "plyo-push": YT("plyometric push up explosive"), "bench-pause": YT("pause bench press jeff nippard"), "pullup": YT("weighted pull up jeff nippard"), "ohp": YT("overhead press strict jeff nippard"), "pendlay": YT("pendlay row explosive"), "mech-drop": YT("mechanical drop set pull ups"), "face-pull": YT("face pull jeff nippard"), "woodchop": YT("cable woodchop low to high"),
  "clean": YT("hang power clean crossfit"), "deadlift": YT("conventional deadlift cluster sets"), "box-jump": YT("box jump crossfit"), "floor-press": YT("floor press barbell"), "chinup": YT("chin up eccentric"), "kb-rot-swing": YT("kettlebell rotational swing"), "landmine-rot": YT("landmine rotation barbell"),
  // Variant videos
  "walking-lunge": YT("walking lunge dumbbell technique"), "step-up": YT("step up barbell technique"), "gh-raise": YT("glute ham raise technique"), "leg-curl-slide": YT("slider leg curl hamstring"), "ab-wheel": YT("ab wheel rollout technique"), "dead-bug": YT("dead bug core exercise"),
  "db-bench": YT("dumbbell bench press technique jeff nippard"), "db-row": YT("dumbbell row single arm technique"), "lat-raise": YT("lateral raise technique jeff nippard"), "arnold-press": YT("arnold press technique"), "cable-fly": YT("cable fly technique"), "ez-curl": YT("ez bar curl technique"),
  "kb-swing": YT("kettlebell swing technique phil daru"), "jump-squat": YT("jump squat technique explosive"), "med-slam": YT("medicine ball slam technique"), "med-rot-throw": YT("medicine ball rotational throw MMA"), "sprawl": YT("sprawl technique MMA phil daru"),
  "pigeon": YT("pigeon stretch hip mobility"), "frog-stretch": YT("frog stretch adductor mobility"), "couch-stretch": YT("couch stretch hip flexor"), "wall-slide": YT("wall slide shoulder mobility"), "open-book": YT("open book thoracic rotation"),
};

const COACH = {
  "broad-jump": { why: "Puissance horizontale : double-legs et closing de distance.", how: "Triple extension explosive, bras en arriere, atterrir soft, reset complet.", focus: "Intent maximal. Si la distance baisse, la serie est finie.", icon: "💥" },
  "squat-pause": { why: "La pause elimine le stretch-shortening cycle. Force depuis un dead stop, transferable aux scrambles.", how: "Descente 3s, pause 2s en bas, explosion. Profondeur max, dos droit.", focus: "Tension dans la pause. Pousser le sol, pas la barre.", icon: "🏋️" },
  "bss": { why: "Double la charge par jambe. Corrige les asymetries du combat.", how: "Pied sureleve, descente 3s, genou frole le sol, drive explosif. DBs le long du corps.", focus: "80% du poids jambe avant. Genou track au-dessus du pied.", icon: "🦵" },
  "walking-lunge": { why: "Alternative au BSS : plus dynamique, travaille la deceleration et le changement de direction.", how: "Pas long, genou arriere frole le sol, drive du talon avant. DBs le long du corps.", focus: "Torse droit, pas d'inclinaison laterale. Controler la descente.", icon: "🦵" },
  "step-up": { why: "Force unilaterale concentrique pure, sans phase excentrique assistee.", how: "Box 40-50cm, pied complet dessus, drive du talon, controler la descente.", focus: "Ne pas pousser avec le pied du bas. Toute la force vient de la jambe haute.", icon: "🦵" },
  "sl-rdl": { why: "Chaine posterieure unilaterale + stabilite anti-rotation pour le grappling.", how: "Hinge hanche, jambe arriere monte, DB descend le long du tibia. Dos plat.", focus: "Hanches carrees, pas de rotation. Fessier pour remonter.", icon: "🦵" },
  "gh-raise": { why: "Ischio-jambiers en excentrique : prevention des blessures, force de sprint.", how: "Ancre les pieds, descente controlee depuis les genoux, remonter en contractant les ischios.", focus: "Controle maximal a la descente. Pas de hip hinge.", icon: "🔧" },
  "leg-curl-slide": { why: "Alternative bodyweight aux ischios. Faisable partout avec des sliders.", how: "Allonge dos au sol, pieds sur sliders, bridge + curl des jambes vers les fesses.", focus: "Garder les hanches hautes tout le mouvement.", icon: "🔧" },
  "pallof": { why: "Anti-rotation pure : base du core pour frappes, sprawls, defense takedown.", how: "Cable/bande poitrine, pousser les mains, hold 2s en extension, revenir.", focus: "Resister a la rotation. Core engage avant de pousser.", icon: "🧱" },
  "ab-wheel": { why: "Anti-extension : stabilite du tronc pour encaisser les coups et maintenir la posture.", how: "A genoux, rouler lentement vers l'avant, revenir sans casser la posture du dos.", focus: "Serrer les abdos et les fessiers. Le bas du dos ne doit jamais s'affaisser.", icon: "🧱" },
  "dead-bug": { why: "Coordination core + respiration, ideal en echauffement ou en finition.", how: "Dos au sol, bras en l'air, genoux a 90deg. Etendre un bras + jambe opposee alternativement.", focus: "Le bas du dos reste colle au sol. Expirer en etendant.", icon: "🧱" },
  "plyo-push": { why: "Puissance de poussee explosive : frames, push-offs, frappes directes.", how: "Push-up, descente controlee, explosion max, mains decollent. Atterrir soft.", focus: "Qualite > quantite. Plus de decollement = stop.", icon: "💥" },
  "bench-pause": { why: "Force dans la position la plus faible, sans momentum.", how: "Arche legere, omoplates serrees, descente 3s, pause 1s poitrine, explosion.", focus: "Pieds au sol. Barre au-dessus des poignets. Coudes 45 deg.", icon: "🏋️" },
  "pullup": { why: "Roi du haut du corps pour le grappling. Prise, tirage, controle distance.", how: "Pronation, dead hang, tirer coudes vers hanches, menton au-dessus.", focus: "Initier avec les lats. Descente controlee.", icon: "🏋️" },
  "ohp": { why: "Poussee verticale : frames debout, underhooks, posture clinch.", how: "Strict debout, barre des clavicules, trajet vertical, verrouillage haut.", focus: "Fessiers + abdos serres. Tete passe a travers une fois au-dessus du front.", icon: "🏋️" },
  "arnold-press": { why: "Alternative a l'OHP : plus de rotation, travaille les 3 faisceaux du deltoide.", how: "Assis ou debout, DBs devant paumes vers soi, rotation + press vers le haut.", focus: "Mouvement fluide, pas de a-coup. Rotation complete.", icon: "🏋️" },
  "pendlay": { why: "Tirage explosif depuis le sol : snap-downs et controle de nuque.", how: "Buste parallele, barre au sol chaque rep. Tirage explosif vers le nombril.", focus: "Explosif, pas slow grind. Coudes serres, pas de triche hanches.", icon: "💥" },
  "db-row": { why: "Alternative au Pendlay : unilateral, corrige les asymetries, plus de range.", how: "Un genou sur le banc, DB tire vers la hanche, coude serre le long du corps.", focus: "Pas de rotation du torse. Sentir l'omoplate se retracter.", icon: "🔧" },
  "mech-drop": { why: "Max stimulus hypertrophique en min de temps. 3 grips sans pause.", how: "Wide pull-ups AMRAP > neutral AMRAP > chin-ups AMRAP. Zero repos entre.", focus: "Echec technique sur chaque grip. Total 15-25+ reps.", icon: "🔥" },
  "face-pull": { why: "Sante epaules, equilibre push/pull. Prevention blessures frappe.", how: "Cable visage, tirer vers oreilles, rotation externe en fin.", focus: "Rear delts + rotateurs externes. Tempo 2-1-2-0. Pas de momentum.", icon: "🔧" },
  "lat-raise": { why: "Alternative aux face pulls : cible le deltoide lateral pour la largeur d'epaules.", how: "DBs le long du corps, monter bras tendus jusqu'a parallele. Controler la descente.", focus: "Pas d'elan. Penser a verser de l'eau avec les pouces legerement vers le bas.", icon: "🔧" },
  "woodchop": { why: "Rotation hanche>epaule : pattern de frappe (hooks, uppercuts, coudes).", how: "Cable bas, rotation diagonale bas>haut. Mouvement part des hanches.", focus: "Bras = cables. Puissance = rotation hanche. Pieds ancres.", icon: "🥊" },
  "cable-fly": { why: "Isolation pecs en fin de seance. Etirement + contraction maximale.", how: "Cables a hauteur d'epaule, amener les mains devant, squeeze 1s, revenir.", focus: "Coudes legerement flechis. Sentir l'etirement des pecs a l'ouverture.", icon: "🔧" },
  "clean": { why: "Gold standard hanche>mains : takedowns, clinch, transfert puissance frappe.", how: "Position hang, triple extension explosive, front rack. 55-65kg.", focus: "Saut avec la barre, pas tirage de bras. Coudes hauts au catch.", icon: "💥" },
  "deadlift": { why: "Force brute chaine posterieure. Base de toute puissance de hanche.", how: "Cluster 3+3+3, 20s intra-set. Setup identique chaque rep.", focus: "Lats engages, dos plat, pousser le sol.", icon: "🏋️" },
  "box-jump": { why: "Extension explosive hanche : level changes, sprawls, puissance jambes.", how: "50-60cm, sauter deux pieds, atterrir soft, STEP DOWN.", focus: "Reset complet entre reps. Qualite du saut, pas vitesse.", icon: "💥" },
  "jump-squat": { why: "Alternative au box jump : meme pattern explosif, pas besoin de box.", how: "Air squat + saut max en haut, atterrir soft, descendre directement dans le squat suivant.", focus: "Extension complete des hanches au sommet.", icon: "💥" },
  "floor-press": { why: "Force de poussee range specifique combat : frames, escapes, get-ups.", how: "Au sol, coudes touchent chaque rep, pousser explosif.", focus: "Le sol = feedback. Coudes symetriques.", icon: "🏋️" },
  "db-bench": { why: "Alternative au floor press : plus de ROM, travaille la stabilisation unilaterale.", how: "Un DB par main, descente controlee, pousser sans faire toucher les DBs en haut.", focus: "Controler la trajectoire. Plus d'instabilite = plus de stabilisateurs actives.", icon: "🏋️" },
  "chinup": { why: "Force tirage grappling + hypertrophie biceps. Excentrique = resilience tendineuse.", how: "Supination, menton au-dessus, descente 3s jusqu'au dead hang.", focus: "Resister a la gravite a la descente.", icon: "🏋️" },
  "kb-rot-swing": { why: "Puissance rotationnelle hanche : round kick et hook pattern.", how: "Swing avec rotation torse en haut. 8/cote, alternance.", focus: "Rotation des hanches, KB suit. Snap violent.", icon: "🥊" },
  "med-rot-throw": { why: "Alternative au KB rot swing : release permet la vitesse max sans deceleration.", how: "Med ball 4-6kg, rotation de hanche, lancer contre le mur. Ramasser, repeter.", focus: "Intent max. Lacher la balle = pas de freinage = puissance pure.", icon: "🥊" },
  "landmine-rot": { why: "Rotation sous charge, axe fixe : obliques + puissance rotationnelle.", how: "Barre dans le coin, deux mains, pivoter hanche cote a cote.", focus: "Pieds ancres, rotation du bassin. Bras transmettent.", icon: "🥊" },
  "kb-swing": { why: "Snap de hanche explosif : takedown drive, knee strike, sprawl.", how: "Hinge hanche, snap violent, bras suivent. 16kg pour la vitesse.", focus: "C'est un mouvement de hanche, pas de bras. Fessiers contractes en haut.", icon: "🥊" },
  "med-slam": { why: "Puissance verticale max velocity : ground and pound, clinch knees.", how: "Ball au-dessus de la tete, slam max au sol. 4-8kg.", focus: "Tout le corps participe. Expirer violemment au slam.", icon: "💥" },
};

const PHASES = [
  { name: "Fondation", weeks: [1,2,3,4], sub: "Hypertrophie + apprentissage moteur", color: "#40916C" },
  { name: "Accumulation", weeks: [5,6,7,8], sub: "Force + pauses + 1.5 reps", color: "#E76F51" },
  { name: "Intensification", weeks: [9,10,11,12], sub: "Puissance + speed-strength", color: "#9B5DE5" },
];

const QUOTES = [
  { text: "Le minimum effective dose : le plus petit stimulus qui declenche l'adaptation.", author: "Kevin Ferreira" },
  { text: "Train for the demands of your sport, not the demands of the gym.", author: "Phil Daru" },
  { text: "Recovery is not the absence of training. It is the presence of adaptation.", author: "Joel Jamieson" },
  { text: "You can't fire a cannon from a canoe.", author: "Phil Daru" },
  { text: "Once a quality is developed, it requires remarkably little to maintain.", author: "Kevin Ferreira" },
  { text: "Never be sore the next day.", author: "Firas Zahabi" },
  { text: "I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times.", author: "Bruce Lee" },
  { text: "A champion is someone who gets up when they can't.", author: "Jack Dempsey" },
  { text: "The more you sweat in training, the less you bleed in combat.", author: "Richard Marcinko" },
  { text: "It's not about how hard you hit. It's about how hard you can get hit and keep moving forward.", author: "Rocky Balboa" },
  { text: "Discipline is doing what you hate to do, but doing it like you love it.", author: "Mike Tyson" },
  { text: "I hated every minute of training, but I said: don't quit. Suffer now and live the rest of your life as a champion.", author: "Muhammad Ali" },
  { text: "The fight is won or lost far away from witnesses, behind the lines, in the gym, and out there on the road.", author: "Muhammad Ali" },
  { text: "Mental toughness is spartanism with qualities of sacrifice, self-denial, dedication.", author: "Vince Lombardi" },
  { text: "You don't rise to the level of your goals. You fall to the level of your systems.", author: "James Clear" },
  { text: "The successful warrior is the average man, with laser-like focus.", author: "Bruce Lee" },
  { text: "If you always put limits on everything you do, it will spread into your work and your life. There are no limits.", author: "Bruce Lee" },
  { text: "To be the best, you've got to handle the most pressure.", author: "Khabib Nurmagomedov" },
  { text: "I'm not the most talented, I'm not the most gifted, but I will not be outworked.", author: "Georges St-Pierre" },
  { text: "Courage is not the absence of fear, but the triumph over it.", author: "Nelson Mandela" },
];

function pSets(s) { if (!s) return 0; const m = s.match(/^(\d+)/); return m ? parseInt(m[1]) : 0; }

/*
  Exercise slot: { id, name, sets, detail, rest, muscle, locked?, superset?, alts?: [{ id, name, sets, detail, rest, muscle }] }
  locked = true means main lift, no variant allowed
  alts = array of alternative exercises for this slot
*/
const DAYS = [
  {
    id: "lower", label: "JOUR 1", sub: "LOWER", emoji: "🦵",
    sections: [
      { name: "Mobilite Hanches + Chevilles", duration: "12 min", type: "mobility", exercises: [
        { id: "hip-cars", name: "Hip CARs (quadrupedie)", detail: "3 cercles/direction/jambe" },
        { id: "90-90", name: "90/90 Hip Switches", detail: "3 transitions/cote, 3-5s pause" },
        { id: "wgs", name: "World's Greatest Stretch", detail: "5 reps/cote", alts: [
          { id: "pigeon", name: "Pigeon Stretch", detail: "30s/cote, enfoncer la hanche" },
          { id: "frog-stretch", name: "Frog Stretch", detail: "30-45s, pousser les genoux" },
        ]},
        { id: "cossack", name: "Cossack Squats", detail: "5/cote, 2-3s hold en bas" },
        { id: "wall-ankle", name: "Wall Ankle Mobilizations", detail: "10 rocks/cote, 2s hold" },
        { id: "deep-squat", name: "Deep Squat Hold", detail: "30-45 secondes", alts: [
          { id: "couch-stretch", name: "Couch Stretch", detail: "30s/cote, hip flexor" },
        ]},
      ]},
      { name: "Force & Explosivite", duration: "35 min", type: "strength", exercises: [
        { id: "broad-jump", name: "Broad Jumps", sets: "4x5", detail: "Intent max, extension complete", rest: "90s", muscle: "Full Body", locked: true },
        { id: "squat-pause", name: "Back Squat (pause)", sets: "4x4", detail: "Tempo 3/2/X/0, ~85-95kg", rest: "2.5 min", muscle: "Quads, Glutes", locked: true },
        { id: "bss", name: "Bulgarian Split Squat (DB)", sets: "3x6", detail: "Tempo 3/1/X/0, 15kg DBs, /jambe", rest: "90s", muscle: "Quads, Glutes", alts: [
          { id: "walking-lunge", name: "Walking Lunges (DB)", sets: "3x8", detail: "Pas long, genou frole le sol, /jambe", rest: "90s", muscle: "Quads, Glutes" },
          { id: "step-up", name: "Step-ups (DB/BB)", sets: "3x6", detail: "Box 40-50cm, drive du talon, /jambe", rest: "90s", muscle: "Quads, Glutes" },
        ]},
        { id: "sl-rdl", name: "Single-Leg RDL", sets: "3x8", detail: "Tempo 3/0/1/1, 15kg DB, /jambe", rest: "60s", muscle: "Hamstrings, Glutes", alts: [
          { id: "gh-raise", name: "Glute-Ham Raise", sets: "3x6", detail: "Excentrique controle, assist si besoin", rest: "60s", muscle: "Hamstrings" },
          { id: "leg-curl-slide", name: "Slider Leg Curl", sets: "3x8", detail: "Bridge + curl, hanches hautes", rest: "60s", muscle: "Hamstrings, Glutes" },
        ]},
        { id: "pallof", name: "Pallof Press", sets: "3x10", detail: "2s hold en extension, /cote", rest: "45s", muscle: "Core", alts: [
          { id: "ab-wheel", name: "Ab Wheel Rollout", sets: "3x8", detail: "A genoux, extension max controlee", rest: "45s", muscle: "Core" },
          { id: "dead-bug", name: "Dead Bug", sets: "3x8", detail: "Bras + jambe opposee, /cote", rest: "45s", muscle: "Core" },
        ]},
      ]},
    ],
    finisher: {
      name: "Rowing Intervals", description: "5 x 500m rameur, 90s repos.", alt: "Alt : Pyramide 100>500>100m", duration: 900,
      scoreType: "splits", splits: 5, splitLabel: "500m",
      alts: [
        { name: "Assault Bike Intervals", description: "5 x 1 min max effort, 90s repos.", duration: 750, scoreType: "splits", splits: 5, splitLabel: "1 min" },
        { name: "KB Swing Ladder", description: "10-15-20-25-30 KB Swings (16kg), repos = 1 min entre chaque.", duration: 600, scoreType: "totalreps" },
      ]
    },
  },
  {
    id: "upper", label: "JOUR 2", sub: "UPPER", emoji: "💪",
    sections: [
      { name: "Mobilite Epaules + T-Spine", duration: "12 min", type: "mobility", exercises: [
        { id: "shoulder-cars", name: "Shoulder CARs", detail: "3 cercles/direction/bras" },
        { id: "thread-needle", name: "Thread the Needle", detail: "5/cote, 2-3s hold", alts: [
          { id: "open-book", name: "Open Book", detail: "5/cote, 3s hold en ouverture" },
        ]},
        { id: "cat-cow", name: "Cat-Cow", detail: "5 respirations" },
        { id: "band-pull", name: "Band Pull-Aparts", detail: "15 reps" },
        { id: "prone-swim", name: "Prone Swimmers", detail: "10 reps" },
        { id: "scap-pushup", name: "Scapular Push-ups", detail: "10 reps" },
        { id: "scorpion", name: "Scorpion Stretches", detail: "5/cote", alts: [
          { id: "wall-slide", name: "Wall Slides", detail: "10 reps, coudes colles au mur" },
        ]},
      ]},
      { name: "Force & Hypertrophie", duration: "40 min", type: "strength", exercises: [
        { id: "plyo-push", name: "Plyometric Push-ups", sets: "3x5", detail: "Explosif, mains decollent", rest: "90s", muscle: "Pecs, Triceps", locked: true },
        { id: "bench-pause", name: "Bench Press (pause)", sets: "4x5", detail: "Tempo 3/1/X/0, ~70-85kg", rest: "2 min", muscle: "Pecs, Triceps", superset: "B1", locked: true },
        { id: "pullup", name: "Weighted Pull-ups", sets: "4x5", detail: "Tempo 2/0/X/1, +6-15kg", rest: "2 min", muscle: "Lats, Biceps", superset: "B2", locked: true },
        { id: "ohp", name: "OHP (strict)", sets: "3x6", detail: "~50-60kg debout", rest: "90s", muscle: "Delts, Triceps", superset: "C1", locked: true, alts: [
          { id: "arnold-press", name: "Arnold Press (DB)", sets: "3x8", detail: "Rotation + press, assis ou debout", rest: "90s", muscle: "Delts, Triceps", superset: "C1" },
        ]},
        { id: "pendlay", name: "Pendlay Row", sets: "3x8", detail: "Tirage explosif depuis le sol", rest: "90s", muscle: "Upper Back", superset: "C2", alts: [
          { id: "db-row", name: "DB Row (1 bras)", sets: "3x8", detail: "Genou sur banc, tirage hanche, /bras", rest: "90s", muscle: "Upper Back", superset: "C2" },
        ]},
        { id: "mech-drop", name: "Mechanical Drop Set", sets: "2x0", detail: "Wide>neutral>chin-ups AMRAP", rest: "2 min", muscle: "Lats, Biceps" },
        { id: "face-pull", name: "Face Pulls", sets: "3x15", detail: "Tempo 2/1/2/0, rotation ext.", rest: "45s", muscle: "Rear Delts", alts: [
          { id: "lat-raise", name: "Lateral Raises (DB)", sets: "3x12", detail: "Bras tendus, parallele au sol", rest: "45s", muscle: "Delts lateraux" },
        ]},
        { id: "woodchop", name: "Woodchop (low>high)", sets: "3x8", detail: "Rotation hanche, /cote", rest: "45s", muscle: "Obliques", alts: [
          { id: "cable-fly", name: "Cable Fly", sets: "3x12", detail: "Squeeze 1s, etirement complet", rest: "45s", muscle: "Pecs" },
        ]},
      ]},
    ],
    finisher: {
      name: "EMOM 15 min", description: "Min 1: 10 KB Swings | Min 2: 8 Push-ups + 4 Sprawls | Min 3: 12 cal rameur. x5.", alt: "+1-2 reps/sem", duration: 900,
      scoreType: "rounds_reps", 
      alts: [
        { name: "Tabata Push-ups", description: "8 rounds : 20s push-ups max / 10s repos.", duration: 240, scoreType: "splits", splits: 8, splitLabel: "Round" },
        { name: "Cindy (scaled)", description: "AMRAP 10 min : 5 Pull-ups + 10 Push-ups + 15 Air Squats.", duration: 600, scoreType: "rounds_reps" },
      ]
    },
  },
  {
    id: "full", label: "JOUR 3", sub: "FULL BODY POWER", emoji: "⚡",
    sections: [
      { name: "Mobilite Complete", duration: "12 min", type: "mobility", exercises: [
        { id: "ankle-cars", name: "Ankle CARs", detail: "3 cercles/direction/pied" },
        { id: "hip-cars", name: "Hip CARs", detail: "3 cercles/direction/jambe" },
        { id: "90-90", name: "90/90 Hip Switches", detail: "3 transitions/cote" },
        { id: "wgs", name: "World's Greatest Stretch", detail: "5/cote" },
        { id: "tspine-rot", name: "Thoracic Rotations", detail: "5/cote" },
        { id: "kb-halo", name: "KB Halo", detail: "5/direction" },
        { id: "sl-bridge", name: "Single-Leg Glute Bridge", detail: "8/cote" },
      ]},
      { name: "Puissance & Force Combat", duration: "35 min", type: "strength", exercises: [
        { id: "clean", name: "Hang Power Clean", sets: "5x3", detail: "Intent max, 55-65kg", rest: "2.5 min", muscle: "Full Body", locked: true },
        { id: "deadlift", name: "Deadlift (cluster)", sets: "3x3", detail: "3+3+3, 20s intra-set, ~90-105kg", rest: "2.5 min", muscle: "Post. Chain", superset: "B1", locked: true },
        { id: "box-jump", name: "Box Jumps", sets: "3x5", detail: "50-60cm, step down", rest: "90s", muscle: "Quads, Glutes", superset: "B2", locked: true, alts: [
          { id: "jump-squat", name: "Jump Squats (KB)", sets: "3x6", detail: "KB goblet 16kg, extension max", rest: "90s", muscle: "Quads, Glutes", superset: "B2" },
        ]},
        { id: "floor-press", name: "Floor Press", sets: "3x8", detail: "Tempo 2/1/X/0", rest: "90s", muscle: "Pecs, Triceps", superset: "C1", alts: [
          { id: "db-bench", name: "DB Bench Press", sets: "3x8", detail: "Full ROM, controler la trajectoire", rest: "90s", muscle: "Pecs, Triceps", superset: "C1" },
        ]},
        { id: "chinup", name: "Chin-ups", sets: "3x6", detail: "Excentrique 3s", rest: "90s", muscle: "Lats, Biceps", superset: "C2", locked: true },
        { id: "kb-rot-swing", name: "KB Rotational Swings", sets: "3x8", detail: "Rotation explosive, /cote", rest: "60s", muscle: "Obliques", superset: "D1", alts: [
          { id: "med-rot-throw", name: "Med Ball Rot. Throw", sets: "3x5", detail: "4-6kg, lancer contre mur, /cote", rest: "60s", muscle: "Obliques, Hips", superset: "D1" },
        ]},
        { id: "landmine-rot", name: "Landmine Rotation", sets: "3x8", detail: "Rotation hanche, /cote", rest: "60s", muscle: "Core", superset: "D2", alts: [
          { id: "kb-swing", name: "KB Swings", sets: "3x12", detail: "16kg, snap de hanche explosif", rest: "60s", muscle: "Post. Chain, Glutes", superset: "D2" },
          { id: "med-slam", name: "Med Ball Slams", sets: "3x8", detail: "4-8kg, slam max", rest: "60s", muscle: "Full Body", superset: "D2" },
        ]},
      ]},
    ],
    finisher: {
      name: "Fight Simulation", description: "3 rounds 5 min, 1 min repos. 60s/exo : Bike > Burpees > KB Swings > Mt Climbers > Goblet Squats.", alt: "Score : total reps.", duration: 1080,
      scoreType: "splits", splits: 3, splitLabel: "Round",
      alts: [
        { name: "Sprawl & Brawl", description: "AMRAP 8 min : 3 Sprawls + 5 KB Swings + 7 Burpees.", duration: 480, scoreType: "rounds_reps" },
        { name: "MMA Tabata", description: "8 rounds 20s/10s. Alt : Burpees / Med Ball Slams / Mt Climbers / Sprawls.", duration: 240, scoreType: "splits", splits: 8, splitLabel: "Round" },
      ]
    },
  },
];

const SK = "sc-tracker-v8";
function getPhase(w) { return PHASES.find(p => p.weeks.includes(w)) || PHASES[0]; }

export default function SCTracker() {
  const [tab, setTab] = useState("session");
  const [week, setWeek] = useState(1);
  const [dayIdx, setDayIdx] = useState(0);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [qi, setQi] = useState(Math.floor(Math.random() * QUOTES.length));
  const [openSec, setOpenSec] = useState({});
  const [openEx, setOpenEx] = useState(null);
  const [swapSlot, setSwapSlot] = useState(null);
  const [resetConfirm, setResetConfirm] = useState("");
  const [resetOpen, setResetOpen] = useState(false);
  const [timer, setTimer] = useState(null);
  const [timerVal, setTimerVal] = useState(0);
  const [timerLabel, setTimerLabel] = useState("");
  const tRef = useRef(null);

  useEffect(() => { try { const r = localStorage.getItem(SK); if (r) setData(JSON.parse(r)); } catch {} setLoading(false); }, []);
  const save = useCallback((nd) => { setData(nd); try { localStorage.setItem(SK, JSON.stringify(nd)); } catch {} }, []);

  useEffect(() => {
    if (timer !== null && timerVal > 0) {
      tRef.current = setInterval(() => setTimerVal(v => { if (v <= 1) { clearInterval(tRef.current); setTimer(null); return 0; } return v - 1; }), 1000);
      return () => clearInterval(tRef.current);
    }
  }, [timer]);
  const startT = (s, l) => { setTimerVal(s); setTimerLabel(l || ""); setTimer(Date.now()); };
  const stopT = () => { clearInterval(tRef.current); setTimer(null); setTimerVal(0); };

  const secIsOpen = (k) => openSec[k] === true;
  const toggleSec = (k) => setOpenSec(p => ({ ...p, [k]: !secIsOpen(k) }));

  // Variant selection: stored as var-{week}-{dayIdx}-{slotKey} = altId
  const varKey = (slotKey) => `var-${week}-${dayIdx}-${slotKey}`;
  const getVar = (slotKey) => data[varKey(slotKey)] || null; // null = default exercise
  const setVar = (slotKey, altId) => save({ ...data, [varKey(slotKey)]: altId });
  // Finisher variant
  const finVarKey = () => `finvar-${week}-${dayIdx}`;
  const getFinVar = () => { const v = data[finVarKey()]; return v !== undefined && v !== null ? v : null; };
  const setFinVar = (idx) => save({ ...data, [finVarKey()]: idx });

  const resolveEx = (ex, slotKey) => {
    const selected = getVar(slotKey);
    if (selected && ex.alts) {
      const alt = ex.alts.find(a => a.id === selected);
      if (alt) return { ...alt, _slot: slotKey, _alts: ex.alts, _defaultId: ex.id, _default: ex };
    }
    return { ...ex, _slot: slotKey, _alts: ex.alts || [], _defaultId: ex.id, _default: ex };
  };

  const resolveFinisher = (fin) => {
    const idx = getFinVar();
    if (idx !== null && fin.alts && fin.alts[idx]) return { ...fin.alts[idx], _hasAlts: true, _alts: fin.alts, _default: fin };
    return { ...fin, _hasAlts: !!fin.alts?.length, _alts: fin.alts || [], _default: fin };
  };

  const ky = (w, d, id) => `${w}-${d}-${id}`;
  const getMob = (id) => data[ky(week, dayIdx, id)] || { done: false };
  const toggleMob = (id) => { const k = ky(week, dayIdx, id); save({ ...data, [k]: { done: !getMob(id).done } }); };

  const getStr = (id, n) => {
    const d = data[ky(week, dayIdx, id)];
    if (d?.sets?.length >= n) return d;
    return { sets: Array.from({ length: n }, (_, i) => d?.sets?.[i] || { done: false, weight: "" }) };
  };
  const toggleSetDone = (id, si, n) => {
    const k = ky(week, dayIdx, id); const ex = getStr(id, n); const ss = [...ex.sets];
    ss[si] = { ...ss[si], done: !ss[si].done }; save({ ...data, [k]: { ...ex, sets: ss } });
  };
  const setSetW = (id, si, val, n) => {
    const k = ky(week, dayIdx, id); const ex = getStr(id, n); const ss = [...ex.sets];
    ss[si] = { ...ss[si], weight: val }; save({ ...data, [k]: { ...ex, sets: ss } });
  };
  const setSetR = (id, si, val, n) => {
    const k = ky(week, dayIdx, id); const ex = getStr(id, n); const ss = [...ex.sets];
    ss[si] = { ...ss[si], reps: val }; save({ ...data, [k]: { ...ex, sets: ss } });
  };

  const getHist = (exId) => {
    const h = [];
    for (let w = 1; w <= 12; w++) for (let d = 0; d < 3; d++) {
      const e = data[ky(w, d, exId)];
      if (e?.sets?.some(s => s.weight && Number(s.weight) > 0)) {
        h.push({ week: w, weight: Math.max(...e.sets.filter(s => s.weight).map(s => Number(s.weight) || 0)) });
      }
    }
    return h;
  };

  const fk = (w, d) => `fin-${w}-${d}`;
  const getFin = () => data[fk(week, dayIdx)] || { rounds: "", reps: "", note: "" };
  const saveFin = (f, v) => save({ ...data, [fk(week, dayIdx)]: { ...getFin(), [f]: v } });

  const phase = getPhase(week);
  const day = DAYS[dayIdx];
  const fmt = (s) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,"0")}`;
  const f = "'Outfit', -apple-system, system-ui, sans-serif";
  const cd = { background: "#fff", borderRadius: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" };

  if (loading) return <div style={{ background: "#F8F7F4", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ color: "#40916C" }}>Chargement...</div></div>;

  const renderSession = () => {
    const fin = getFin();
    const rFin = resolveFinisher(day.finisher);
    return (
      <>
        {/* Quote */}
        <div style={{ margin: "0 20px 12px", padding: "14px 16px", ...cd }}>
          <div style={{ fontSize: 13, color: "#6B7280", fontStyle: "italic", lineHeight: 1.5, fontFamily: f }}>"{QUOTES[qi].text}"</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: phase.color, fontFamily: f }}>{QUOTES[qi].author}</span>
            <div style={{ display: "flex", gap: 4 }}>
              <button onClick={() => setQi(i => i > 0 ? i-1 : QUOTES.length-1)} style={{ border: "1px solid #E5E7EB", background: "#fff", borderRadius: 6, width: 26, height: 26, cursor: "pointer", color: "#9CA3AF", fontSize: 13 }}>←</button>
              <button onClick={() => setQi(i => (i+1)%QUOTES.length)} style={{ border: "1px solid #E5E7EB", background: "#fff", borderRadius: 6, width: 26, height: 26, cursor: "pointer", color: "#9CA3AF", fontSize: 13 }}>→</button>
            </div>
          </div>
        </div>

        {/* Sections */}
        {day.sections.map((sec, si) => {
          const sk = `${dayIdx}-${si}`;
          const open = secIsOpen(sk);
          const isMob = sec.type === "mobility";
          // Section completion check
          let secTotal = 0, secDone = 0;
          sec.exercises.forEach(ex => {
            if (isMob) {
              const resolved = resolveEx(ex, `${si}-${sec.exercises.indexOf(ex)}`);
              secTotal++; if (getMob(resolved.id).done) secDone++;
            } else {
              const resolved = resolveEx(ex, `${si}-${sec.exercises.indexOf(ex)}`);
              const n = pSets(resolved.sets); secTotal += Math.max(n, 1);
              if (n > 0) getStr(resolved.id, n).sets.slice(0, n).forEach(s => { if (s.done) secDone++; });
            }
          });
          const secComplete = secTotal > 0 && secDone === secTotal;
          const secPct = secTotal > 0 ? Math.round((secDone / secTotal) * 100) : 0;

          return (
            <div key={si} style={{ margin: "0 20px 10px", ...cd, border: secComplete ? `2px solid ${phase.color}` : "none" }}>
              <div onClick={() => toggleSec(sk)} style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: secComplete ? phase.color : "#1F2937", fontFamily: f, textDecoration: secComplete ? "line-through" : "none" }}>
                  {secComplete ? "✅" : (isMob ? "🧘" : "🏋️")}  {sec.name}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {!open && secPct > 0 && <span style={{ fontSize: 10, fontWeight: 700, color: secComplete ? phase.color : "#9CA3AF", fontFamily: f }}>{secPct}%</span>}
                  <span style={{ fontSize: 11, color: "#9CA3AF", fontFamily: f }}>{sec.duration}</span>
                  <span style={{ fontSize: 12, color: "#D1D5DB" }}>{open ? "▲" : "▼"}</span>
                </div>
              </div>

              {open && isMob && sec.exercises.map((rawEx, ei) => {
                const ex = resolveEx(rawEx, `${si}-${ei}`);
                const m = getMob(ex.id);
                const hasAlts = ex._alts?.length > 0;
                return (
                  <div key={`${si}-${ei}`} style={{ borderTop: "1px solid #F3F4F6", padding: "10px 16px" }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <div onClick={() => toggleMob(ex.id)} style={{
                        width: 22, height: 22, borderRadius: 7, flexShrink: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                        background: m.done ? phase.color : "#fff", border: m.done ? `2px solid ${phase.color}` : "2px solid #D1D5DB",
                      }}>{m.done && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: m.done ? "#9CA3AF" : "#1F2937", fontFamily: f, textDecoration: m.done ? "line-through" : "none" }}>{ex.name}</div>
                        <div style={{ fontSize: 11, color: "#9CA3AF", fontFamily: f }}>{ex.detail}</div>
                      </div>
                      {hasAlts && (
                        <div style={{ position: "relative" }}>
                          <button onClick={(e) => { e.stopPropagation(); setSwapSlot(swapSlot === ex._slot ? null : ex._slot); }}
                            style={{ width: 26, height: 26, borderRadius: 7, background: "#F0FDF4", border: "none", cursor: "pointer", fontSize: 12 }}>🔄</button>
                          {swapSlot === ex._slot && (
                            <div style={{ position: "absolute", right: 0, top: 30, background: "#fff", borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.12)", padding: 6, zIndex: 50, minWidth: 180 }}>
                              <div onClick={() => { setVar(ex._slot, null); setSwapSlot(null); }} style={{ padding: "8px 10px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontFamily: f, fontWeight: ex.id === rawEx.id ? 700 : 400, color: ex.id === rawEx.id ? phase.color : "#4B5563", background: ex.id === rawEx.id ? `${phase.color}10` : "transparent" }}>
                                {rawEx.name}
                              </div>
                              {rawEx.alts?.map(alt => (
                                <div key={alt.id} onClick={() => { setVar(ex._slot, alt.id); setSwapSlot(null); }} style={{ padding: "8px 10px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontFamily: f, fontWeight: ex.id === alt.id ? 700 : 400, color: ex.id === alt.id ? phase.color : "#4B5563", background: ex.id === alt.id ? `${phase.color}10` : "transparent" }}>
                                  {alt.name}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                      {V[ex.id] && <a href={V[ex.id]} target="_blank" rel="noopener noreferrer" style={{ width: 26, height: 26, borderRadius: 7, background: "#FEF3F2", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", flexShrink: 0 }}><span style={{ fontSize: 10 }}>▶</span></a>}
                    </div>
                  </div>
                );
              })}

              {open && !isMob && sec.exercises.map((rawEx, ei) => {
                const slotKey = `${si}-${ei}`;
                const ex = resolveEx(rawEx, slotKey);
                const n = pSets(ex.sets);
                const exData = getStr(ex.id, n);
                const allDone = n > 0 && exData.sets.slice(0,n).every(s => s.done);
                const isOpen = openEx === slotKey;
                const coach = COACH[ex.id];
                const hasAlts = ex._alts?.length > 0;
                const isLocked = rawEx.locked && !hasAlts;

                return (
                  <div key={slotKey} style={{ borderTop: "1px solid #F3F4F6" }}>
                    <div onClick={() => setOpenEx(isOpen ? null : slotKey)} style={{ padding: "11px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                      {coach && <span style={{ fontSize: 15 }}>{coach.icon}</span>}
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" }}>
                          <span style={{ fontSize: 13, fontWeight: 600, color: allDone ? "#9CA3AF" : "#1F2937", fontFamily: f, textDecoration: allDone ? "line-through" : "none" }}>{ex.name}</span>
                          {ex.superset && <span style={{ fontSize: 8, fontWeight: 700, color: "#fff", background: phase.color+"90", borderRadius: 4, padding: "1px 4px", fontFamily: f }}>{ex.superset}</span>}
                          {rawEx.locked && <span style={{ fontSize: 8, color: "#9CA3AF" }}>🔒</span>}
                        </div>
                        <div style={{ fontSize: 11, color: "#9CA3AF", fontFamily: f }}>{ex.sets} | {ex.muscle}</div>
                      </div>
                      {n > 0 && <div style={{ display: "flex", gap: 3 }}>{Array.from({ length: n }, (_, i) => <div key={i} style={{ width: 7, height: 7, borderRadius: 4, background: exData.sets[i]?.done ? phase.color : "#E5E7EB" }} />)}</div>}
                      {hasAlts && (
                        <div style={{ position: "relative" }}>
                          <button onClick={(e) => { e.stopPropagation(); setSwapSlot(swapSlot === slotKey ? null : slotKey); }}
                            style={{ width: 26, height: 26, borderRadius: 7, background: "#F0FDF4", border: "none", cursor: "pointer", fontSize: 11 }}>🔄</button>
                          {swapSlot === slotKey && (
                            <div onClick={e => e.stopPropagation()} style={{ position: "absolute", right: 0, top: 30, background: "#fff", borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.12)", padding: 6, zIndex: 50, minWidth: 200 }}>
                              <div style={{ fontSize: 10, color: "#9CA3AF", fontFamily: f, padding: "4px 10px", fontWeight: 700, letterSpacing: 0.5 }}>VARIANTES</div>
                              <div onClick={() => { setVar(slotKey, null); setSwapSlot(null); }} style={{ padding: "8px 10px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontFamily: f, fontWeight: ex.id === rawEx.id ? 700 : 400, color: ex.id === rawEx.id ? phase.color : "#4B5563", background: ex.id === rawEx.id ? `${phase.color}10` : "transparent" }}>
                                {rawEx.name} {rawEx.locked ? "🔒" : ""}
                              </div>
                              {rawEx.alts?.map(alt => (
                                <div key={alt.id} onClick={() => { setVar(slotKey, alt.id); setSwapSlot(null); setOpenEx(null); }} style={{ padding: "8px 10px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontFamily: f, fontWeight: ex.id === alt.id ? 700 : 400, color: ex.id === alt.id ? phase.color : "#4B5563", background: ex.id === alt.id ? `${phase.color}10` : "transparent" }}>
                                  {alt.name}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                      <span style={{ fontSize: 11, color: "#D1D5DB" }}>{isOpen ? "▲" : "▼"}</span>
                    </div>

                    {isOpen && (
                      <div style={{ padding: "0 16px 14px" }}>
                        {coach && (
                          <div style={{ background: `${phase.color}08`, border: `1px solid ${phase.color}20`, borderRadius: 12, padding: "12px 14px", marginBottom: 10 }}>
                            <div style={{ marginBottom: 6 }}><span style={{ fontSize: 10, fontWeight: 700, color: phase.color, fontFamily: f, letterSpacing: 0.5 }}>POURQUOI</span><div style={{ fontSize: 12, color: "#4B5563", fontFamily: f, marginTop: 2, lineHeight: 1.5 }}>{coach.why}</div></div>
                            <div style={{ marginBottom: 6 }}><span style={{ fontSize: 10, fontWeight: 700, color: phase.color, fontFamily: f, letterSpacing: 0.5 }}>COMMENT</span><div style={{ fontSize: 12, color: "#4B5563", fontFamily: f, marginTop: 2, lineHeight: 1.5 }}>{coach.how}</div></div>
                            <div><span style={{ fontSize: 10, fontWeight: 700, color: phase.color, fontFamily: f, letterSpacing: 0.5 }}>FOCUS</span><div style={{ fontSize: 12, color: "#1F2937", fontFamily: f, marginTop: 2, lineHeight: 1.5, fontWeight: 600 }}>{coach.focus}</div></div>
                          </div>
                        )}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                          <div style={{ fontSize: 11, color: "#6B7280", fontFamily: f }}>{ex.detail} | Repos {ex.rest}</div>
                          {V[ex.id] && <a href={V[ex.id]} target="_blank" rel="noopener noreferrer" style={{ padding: "4px 10px", borderRadius: 8, background: "#FEF3F2", textDecoration: "none", fontSize: 11, color: "#EF4444", fontFamily: f, fontWeight: 600 }}>▶ Video</a>}
                        </div>
                        {Array.from({ length: n }, (_, si) => {
                          const set = exData.sets[si] || { done: false, weight: "", reps: "" };
                          const kgId = `kg-${ex.id}-${si}`;
                          const repId = `reps-${ex.id}-${si}`;
                          const nextKgId = si < n-1 ? `kg-${ex.id}-${si+1}` : null;
                          return (
                            <div key={si} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                              <div onClick={() => toggleSetDone(ex.id, si, n)} style={{
                                width: 24, height: 24, borderRadius: 7, flexShrink: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                                background: set.done ? phase.color : "#fff", border: set.done ? `2px solid ${phase.color}` : "2px solid #E5E7EB",
                                transition: "all 0.2s",
                              }}>{set.done ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg> : <span style={{ fontSize: 11, fontWeight: 700, color: "#B0B8C1", fontFamily: f }}>{si+1}</span>}</div>
                              <input id={kgId} style={{ width: 50, padding: "5px 4px", borderRadius: 8, border: "1.5px solid #E5E7EB", background: set.done ? "#F0FDF4" : "#FAFAF9", color: "#1F2937", fontSize: 13, fontFamily: f, textAlign: "center", outline: "none" }}
                                placeholder="kg" value={set.weight||""} type="number" inputMode="decimal"
                                onChange={e => setSetW(ex.id, si, e.target.value, n)}
                                onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); document.getElementById(repId)?.focus(); }}} />
                              <span style={{ fontSize: 10, color: "#D1D5DB", fontFamily: f }}>x</span>
                              <input id={repId} style={{ width: 42, padding: "5px 4px", borderRadius: 8, border: "1.5px solid #E5E7EB", background: set.done ? "#F0FDF4" : "#FAFAF9", color: "#1F2937", fontSize: 13, fontFamily: f, textAlign: "center", outline: "none" }}
                                placeholder="reps" value={set.reps||""} type="number" inputMode="numeric"
                                onChange={e => setSetR(ex.id, si, e.target.value, n)}
                                onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); if (!set.done) toggleSetDone(ex.id, si, n); if (nextKgId) setTimeout(() => document.getElementById(nextKgId)?.focus(), 50); else e.target.blur(); }}} />
                              {si === n-1 && <button onClick={() => { const s = ex.rest?.includes("min") ? parseFloat(ex.rest)*60 : parseInt(ex.rest)||90; startT(s, ex.name); }} style={{ padding: "4px 8px", borderRadius: 6, border: "1px solid #E5E7EB", background: "#fff", color: "#9CA3AF", fontSize: 10, cursor: "pointer", fontFamily: f, marginLeft: "auto" }}>⏱ {ex.rest}</button>}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}

        {/* Finisher */}
        <div style={{ margin: "0 20px 12px", ...cd }}>
          {/* Header - always visible */}
          <div onClick={() => toggleSec(`fin-${dayIdx}`)} style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div onClick={(e) => { e.stopPropagation(); saveFin("done", !fin.done); }} style={{
                width: 24, height: 24, borderRadius: 8, flexShrink: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                background: fin.done ? phase.color : "#fff", border: fin.done ? `2px solid ${phase.color}` : "2px solid #D1D5DB",
              }}>{fin.done && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}</div>
              <span style={{ fontSize: 14, fontWeight: 800, color: fin.done ? "#9CA3AF" : "#1F2937", fontFamily: f, textDecoration: fin.done ? "line-through" : "none" }}>🔥  {rFin.name}</span>
              {rFin._hasAlts && (
                <div style={{ position: "relative" }}>
                  <button onClick={(e) => { e.stopPropagation(); setSwapSlot(swapSlot === "finisher" ? null : "finisher"); }} style={{ width: 26, height: 26, borderRadius: 7, background: "#F0FDF4", border: "none", cursor: "pointer", fontSize: 11 }}>🔄</button>
                  {swapSlot === "finisher" && (
                    <div onClick={e => e.stopPropagation()} style={{ position: "absolute", left: 0, top: 30, background: "#fff", borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.12)", padding: 6, zIndex: 50, minWidth: 220 }}>
                      <div style={{ fontSize: 10, color: "#9CA3AF", fontFamily: f, padding: "4px 10px", fontWeight: 700, letterSpacing: 0.5 }}>FINISHERS</div>
                      <div onClick={() => { setFinVar(null); setSwapSlot(null); }} style={{ padding: "8px 10px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontFamily: f, fontWeight: getFinVar() === null ? 700 : 400, color: getFinVar() === null ? phase.color : "#4B5563", background: getFinVar() === null ? `${phase.color}10` : "transparent" }}>
                        {day.finisher.name}
                      </div>
                      {day.finisher.alts?.map((alt, i) => (
                        <div key={i} onClick={() => { setFinVar(i); setSwapSlot(null); }} style={{ padding: "8px 10px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontFamily: f, fontWeight: getFinVar() === i ? 700 : 400, color: getFinVar() === i ? phase.color : "#4B5563", background: getFinVar() === i ? `${phase.color}10` : "transparent" }}>
                          {alt.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <span style={{ fontSize: 12, color: "#D1D5DB" }}>{secIsOpen(`fin-${dayIdx}`) ? "▲" : "▼"}</span>
          </div>

          {/* Collapsible content */}
          {secIsOpen(`fin-${dayIdx}`) && (
            <div style={{ padding: "0 16px 14px", borderTop: "1px solid #F3F4F6" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginTop: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: "#6B7280", fontFamily: f, lineHeight: 1.5 }}>{rFin.description}</div>
                  {rFin.alt && <div style={{ fontSize: 11, color: "#9CA3AF", fontFamily: f, marginTop: 2, fontStyle: "italic" }}>{rFin.alt}</div>}
                </div>
                <button onClick={() => startT(rFin.duration, rFin.name)} style={{ padding: "6px 12px", borderRadius: 10, border: "none", background: phase.color, color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: f, flexShrink: 0, marginLeft: 10 }}>⏱ {Math.round(rFin.duration/60)}m</button>
              </div>

              <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #F3F4F6" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#9CA3AF", fontFamily: f, letterSpacing: 1, marginBottom: 8 }}>SCORE</div>

                {(rFin.scoreType === "splits") && (
                  <div>
                    {Array.from({ length: rFin.splits }, (_, i) => {
                      const splits = fin.splits || [];
                      const val = splits[i] || "";
                      return (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                          <span style={{ fontSize: 11, color: "#9CA3AF", fontFamily: f, width: 50 }}>{rFin.splitLabel} {i+1}</span>
                          <input style={{ width: 70, padding: "5px 6px", borderRadius: 8, border: "1.5px solid #E5E7EB", background: "#FAFAF9", color: "#1F2937", fontSize: 13, fontFamily: f, textAlign: "center", outline: "none" }}
                            placeholder={rFin.splitLabel === "Round" ? "reps" : "m:ss"} value={val}
                            onChange={e => { const ns = [...(fin.splits || Array(rFin.splits).fill(""))]; ns[i] = e.target.value; saveFin("splits", ns); }} />
                          <span style={{ fontSize: 10, color: "#D1D5DB", fontFamily: f }}>{rFin.splitLabel === "Round" ? "reps" : "temps"}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {(rFin.scoreType === "rounds_reps") && (
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <div><label style={{ fontSize: 10, color: "#9CA3AF", fontFamily: f }}>Rounds</label><input style={{ display: "block", width: 48, padding: "6px", borderRadius: 8, border: "1.5px solid #E5E7EB", background: "#FAFAF9", color: "#1F2937", fontSize: 15, fontFamily: f, textAlign: "center", outline: "none", fontWeight: 700, marginTop: 3 }} value={fin.rounds||""} type="number" inputMode="numeric" placeholder="0" onChange={e => saveFin("rounds", e.target.value)} /></div>
                    <span style={{ fontSize: 16, color: "#D1D5DB", fontWeight: 700, marginTop: 12 }}>+</span>
                    <div><label style={{ fontSize: 10, color: "#9CA3AF", fontFamily: f }}>Reps</label><input style={{ display: "block", width: 48, padding: "6px", borderRadius: 8, border: "1.5px solid #E5E7EB", background: "#FAFAF9", color: "#1F2937", fontSize: 15, fontFamily: f, textAlign: "center", outline: "none", fontWeight: 700, marginTop: 3 }} value={fin.reps||""} type="number" inputMode="numeric" placeholder="0" onChange={e => saveFin("reps", e.target.value)} /></div>
                    {(fin.rounds||fin.reps) && <div style={{ marginLeft: "auto", marginTop: 12, fontSize: 18, fontWeight: 900, color: phase.color, fontFamily: f }}>{fin.rounds||0}r+{fin.reps||0}</div>}
                  </div>
                )}

                {(rFin.scoreType === "totalreps") && (
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <div><label style={{ fontSize: 10, color: "#9CA3AF", fontFamily: f }}>Total reps</label><input style={{ display: "block", width: 64, padding: "6px", borderRadius: 8, border: "1.5px solid #E5E7EB", background: "#FAFAF9", color: "#1F2937", fontSize: 15, fontFamily: f, textAlign: "center", outline: "none", fontWeight: 700, marginTop: 3 }} value={fin.totalreps||""} type="number" inputMode="numeric" placeholder="0" onChange={e => saveFin("totalreps", e.target.value)} /></div>
                    {fin.totalreps && <div style={{ marginLeft: "auto", fontSize: 18, fontWeight: 900, color: phase.color, fontFamily: f }}>{fin.totalreps} reps</div>}
                  </div>
                )}

                {(!rFin.scoreType) && (
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <div><label style={{ fontSize: 10, color: "#9CA3AF", fontFamily: f }}>Rounds</label><input style={{ display: "block", width: 48, padding: "6px", borderRadius: 8, border: "1.5px solid #E5E7EB", background: "#FAFAF9", color: "#1F2937", fontSize: 15, fontFamily: f, textAlign: "center", outline: "none", fontWeight: 700, marginTop: 3 }} value={fin.rounds||""} type="number" inputMode="numeric" placeholder="0" onChange={e => saveFin("rounds", e.target.value)} /></div>
                    <span style={{ fontSize: 16, color: "#D1D5DB", fontWeight: 700, marginTop: 12 }}>+</span>
                    <div><label style={{ fontSize: 10, color: "#9CA3AF", fontFamily: f }}>Reps</label><input style={{ display: "block", width: 48, padding: "6px", borderRadius: 8, border: "1.5px solid #E5E7EB", background: "#FAFAF9", color: "#1F2937", fontSize: 15, fontFamily: f, textAlign: "center", outline: "none", fontWeight: 700, marginTop: 3 }} value={fin.reps||""} type="number" inputMode="numeric" placeholder="0" onChange={e => saveFin("reps", e.target.value)} /></div>
                  </div>
                )}

                <input style={{ width: "100%", padding: "7px 10px", borderRadius: 8, border: "1.5px solid #E5E7EB", background: "#FAFAF9", color: "#1F2937", fontSize: 12, fontFamily: f, outline: "none", marginTop: 8 }} placeholder="Note (charges, sensations...)" value={fin.note||""} onChange={e => saveFin("note", e.target.value)} />
              </div>
            </div>
          )}
        </div>
      </>
    );
  };

  const renderProgress = () => {
    const wd = [];
    for (let w = 1; w <= 12; w++) {
      let t = 0, d = 0;
      DAYS.forEach((dy, di) => dy.sections.forEach(sec => sec.exercises.forEach(ex => {
        if (sec.type === "mobility") { t++; if (data[ky(w,di,ex.id)]?.done) d++; }
        else { const n = pSets(ex.sets); t += Math.max(n,1); const e = data[ky(w,di,ex.id)]; if (e?.sets) e.sets.slice(0,n).forEach(s => { if (s.done) d++; }); }
      })));
      wd.push({ week: w, pct: t > 0 ? Math.round((d/t)*100) : 0 });
    }
    return (
      <div style={{ padding: "0 20px 20px" }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, color: "#1F2937", fontFamily: f, marginBottom: 16 }}>Progression</h3>
        <div style={{ ...cd, padding: 18, marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 110 }}>
            {wd.map(w => { const p = getPhase(w.week); return (
              <div key={w.week} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <span style={{ fontSize: 8, color: w.pct > 0 ? "#6B7280" : "transparent", fontFamily: f, fontWeight: 600 }}>{w.pct}%</span>
                <div style={{ width: "100%", maxWidth: 18, borderRadius: 5, height: Math.max(4, (w.pct/100)*85), background: w.pct > 0 ? p.color : "#F3F4F6" }} />
                <span style={{ fontSize: 9, color: w.week===week ? "#1F2937" : "#9CA3AF", fontFamily: f, fontWeight: w.week===week ? 800 : 400 }}>{w.week}</span>
              </div>
            ); })}
          </div>
        </div>
        <div style={{ ...cd, padding: 18 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#1F2937", fontFamily: f, marginBottom: 12 }}>Semaine {week}</div>
          {DAYS.map((dy, di) => {
            let t = 0, d = 0;
            dy.sections.forEach(sec => sec.exercises.forEach(ex => {
              if (sec.type === "mobility") { t++; if (data[ky(week,di,ex.id)]?.done) d++; }
              else { const n = pSets(ex.sets); t += Math.max(n,1); const e = data[ky(week,di,ex.id)]; if (e?.sets) e.sets.slice(0,n).forEach(s => { if (s.done) d++; }); }
            }));
            const pct = t > 0 ? Math.round((d/t)*100) : 0;
            return (
              <div key={di} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderTop: di > 0 ? "1px solid #F3F4F6" : "none" }}>
                <span style={{ fontSize: 13, color: "#4B5563", fontFamily: f }}>{dy.emoji} {dy.sub}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 70, height: 5, background: "#F3F4F6", borderRadius: 3, overflow: "hidden" }}><div style={{ width: `${pct}%`, height: "100%", background: phase.color }} /></div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: pct===100 ? phase.color : "#9CA3AF", fontFamily: f, width: 30, textAlign: "right" }}>{pct}%</span>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ textAlign: "center", marginTop: 20 }}>
          {!resetOpen ? (
            <button onClick={() => setResetOpen(true)} style={{ padding: "8px 20px", borderRadius: 10, border: "1px solid #FCA5A5", background: "#FEF2F2", color: "#EF4444", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: f }}>Reset donnees</button>
          ) : (
            <div style={{ background: "#fff", borderRadius: 16, padding: 20, boxShadow: "0 4px 20px rgba(0,0,0,0.1)", display: "inline-block", textAlign: "center" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#EF4444", fontFamily: f, marginBottom: 4 }}>Attention</div>
              <div style={{ fontSize: 12, color: "#6B7280", fontFamily: f, marginBottom: 12 }}>Tape <strong>RESET</strong> pour confirmer la suppression de toutes les donnees.</div>
              <input style={{ width: 140, padding: "8px", borderRadius: 8, border: "1.5px solid #FCA5A5", background: "#FEF2F2", color: "#1F2937", fontSize: 14, fontFamily: f, textAlign: "center", outline: "none", fontWeight: 700 }}
                placeholder="RESET" value={resetConfirm} onChange={e => setResetConfirm(e.target.value.toUpperCase())} />
              <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 10 }}>
                <button onClick={() => { setResetOpen(false); setResetConfirm(""); }} style={{ padding: "6px 16px", borderRadius: 8, border: "1px solid #E5E7EB", background: "#fff", color: "#6B7280", fontSize: 12, cursor: "pointer", fontFamily: f }}>Annuler</button>
                <button onClick={() => {
                  if (resetConfirm === "RESET") { try { localStorage.removeItem(SK); } catch {} setData({}); setResetOpen(false); setResetConfirm(""); }
                }} style={{ padding: "6px 16px", borderRadius: 8, border: "none", background: resetConfirm === "RESET" ? "#EF4444" : "#E5E7EB", color: resetConfirm === "RESET" ? "#fff" : "#9CA3AF", fontSize: 12, fontWeight: 700, cursor: resetConfirm === "RESET" ? "pointer" : "default", fontFamily: f }}>Supprimer tout</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderCharges = () => (
    <div style={{ padding: "0 20px 20px" }}>
      <h3 style={{ fontSize: 16, fontWeight: 800, color: "#1F2937", fontFamily: f, marginBottom: 16 }}>Charges & Records</h3>
      {DAYS.map((dy, di) => {
        const ck = `charges-${di}`;
        const open = secIsOpen(ck);
        return (
          <div key={di} style={{ marginBottom: 10, ...cd }}>
            <div onClick={() => toggleSec(ck)} style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: phase.color, fontFamily: f }}>{dy.emoji} {dy.sub}</span>
              <span style={{ fontSize: 12, color: "#D1D5DB" }}>{open ? "▲" : "▼"}</span>
            </div>
            {open && dy.sections.filter(s => s.type==="strength").flatMap(s => s.exercises).map(ex => {
              const allIds = [ex.id, ...(ex.alts||[]).map(a => a.id)];
              const allHist = allIds.flatMap(id => getHist(id));
              const bestW = allHist.length > 0 ? Math.max(...allHist.map(x => x.weight)) : 0;
              return (
                <div key={ex.id} style={{ padding: "10px 16px", borderTop: "1px solid #F3F4F6" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#1F2937", fontFamily: f }}>{COACH[ex.id]?.icon} {ex.name} {ex.locked ? "🔒" : ""}</div>
                      <div style={{ fontSize: 10, color: "#9CA3AF", fontFamily: f }}>{ex.sets} | {ex.muscle}</div>
                    </div>
                    <div><span style={{ fontSize: 20, fontWeight: 800, color: bestW > 0 ? phase.color : "#D1D5DB", fontFamily: f }}>{bestW > 0 ? bestW : "--"}</span><span style={{ fontSize: 10, color: "#9CA3AF", fontFamily: f, marginLeft: 2 }}>kg</span></div>
                  </div>
                  {allHist.length > 1 && <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 20, marginTop: 8 }}>{allHist.map((x, i) => <div key={i} style={{ flex: 1, borderRadius: 3, minHeight: 3, height: `${(x.weight/(bestW||1))*100}%`, background: i===allHist.length-1 ? phase.color : `${phase.color}40` }} />)}</div>}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );

  return (
    <div style={{ background: "#F8F7F4", minHeight: "100vh", maxWidth: 480, margin: "0 auto", paddingBottom: 80 }} onClick={() => swapSlot && setSwapSlot(null)}>


      <div style={{ padding: "24px 20px 16px", background: "#fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: 8, fontSize: 11, fontWeight: 700, fontFamily: f, letterSpacing: 1, background: `${phase.color}15`, color: phase.color }}>{phase.name.toUpperCase()}</span>
            <h1 style={{ fontSize: 22, fontWeight: 900, color: "#1F2937", fontFamily: f, margin: "6px 0 2px", letterSpacing: -0.5 }}>S&C Tracker</h1>
            <div style={{ fontSize: 12, color: "#9CA3AF", fontFamily: f }}>{phase.sub}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 32, fontWeight: 900, color: phase.color, fontFamily: f, lineHeight: 1 }}>S{week}</div>
            <div style={{ fontSize: 10, color: "#9CA3AF", fontFamily: f, letterSpacing: 1 }}>SEMAINE</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 4, marginTop: 14, overflowX: "auto" }}>
          {[1,2,3,4,5,6,7,8,9,10,11,12].map(w => { const p = getPhase(w); return <button key={w} onClick={() => setWeek(w)} style={{ minWidth: 30, height: 30, borderRadius: 10, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: f, background: w===week ? p.color : "#F3F4F6", color: w===week ? "#fff" : "#9CA3AF" }}>{w}</button>; })}
        </div>
      </div>

      {tab === "session" && (
        <div style={{ display: "flex", gap: 6, padding: "12px 20px 0" }}>
          {DAYS.map((d, i) => (
            <button key={i} onClick={() => { setDayIdx(i); setOpenEx(null); setSwapSlot(null); }} style={{ flex: 1, padding: "10px 8px", borderRadius: 12, border: "none", cursor: "pointer", textAlign: "center", background: i===dayIdx ? "#fff" : "transparent", boxShadow: i===dayIdx ? "0 2px 8px rgba(0,0,0,0.06)" : "none" }}>
              <div style={{ fontSize: 18, marginBottom: 2 }}>{d.emoji}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: i===dayIdx ? "#1F2937" : "#9CA3AF", fontFamily: f }}>{d.label}</div>
              <div style={{ fontSize: 10, color: i===dayIdx ? "#9CA3AF" : "#D1D5DB", fontFamily: f }}>{d.sub}</div>
            </button>
          ))}
        </div>
      )}

      <div style={{ height: 12 }} />
      {tab === "session" && renderSession()}
      {tab === "progress" && renderProgress()}
      {tab === "charges" && renderCharges()}

      {timer !== null && (
        <div style={{ position: "fixed", bottom: 72, left: "50%", transform: "translateX(-50%)", zIndex: 99, background: "#fff", borderRadius: 20, padding: "10px 24px", display: "flex", alignItems: "center", gap: 14, boxShadow: "0 8px 30px rgba(0,0,0,0.12)", border: `2px solid ${phase.color}` }}>
          <div>
            <div style={{ fontSize: 10, color: "#9CA3AF", fontFamily: f, fontWeight: 600 }}>{timerLabel}</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: phase.color, fontFamily: f }}>{fmt(timerVal)}</div>
          </div>
          <button onClick={stopT} style={{ padding: "8px 16px", borderRadius: 10, border: "none", background: "#FEF2F2", color: "#EF4444", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: f }}>Stop</button>
        </div>
      )}

      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, display: "flex", background: "#fff", borderTop: "1px solid #F3F4F6", zIndex: 100, padding: "6px 0 env(safe-area-inset-bottom, 8px)" }}>
        {[{ id: "session", icon: "🏋️", label: "Seance" },{ id: "progress", icon: "📊", label: "Progres" },{ id: "charges", icon: "💪", label: "Charges" }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "8px 0", background: "transparent", border: "none", cursor: "pointer" }}>
            <span style={{ fontSize: 18 }}>{t.icon}</span>
            <span style={{ fontSize: 10, fontWeight: 700, fontFamily: f, color: tab===t.id ? phase.color : "#D1D5DB", letterSpacing: 0.5 }}>{t.label.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
