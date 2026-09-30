const d = window.draw;
const c = d.colors();

// Three simple conceptual symbols, drawn as SVG in the project's theme colors.
document.getElementById("icon-create").innerHTML = d.svg(120, 120,
  `<path d="M22 81h76M22 61h55M22 41h38" fill="none" stroke="${c.gray}" stroke-width="5" stroke-linecap="round"/>`,
  `<path d="M88 15v35M70 32.5h35" fill="none" stroke="${c.blue}" stroke-width="6" stroke-linecap="round"/>`);

document.getElementById("icon-recommend").innerHTML = d.svg(120, 120,
  `<path d="M20 61h43V29h27M63 61v31h27" fill="none" stroke="${c.gray}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>`,
  `<path d="M88 18l12 11-12 11M88 81l12 11-12 11" fill="none" stroke="${c.blue}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>`);

document.getElementById("icon-check").innerHTML = d.svg(120, 120,
  `<circle cx="51" cy="51" r="31" fill="none" stroke="${c.gray}" stroke-width="5"/>`,
  `<path d="M73 75l28 28" fill="none" stroke="${c.gray}" stroke-width="6" stroke-linecap="round"/>`,
  `<path d="M37 51l10 10 20-22" fill="none" stroke="${c.blue}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`);

// Folie 4: four distinct scopes, with connectors behind the boxes.
const actionBoxes = [
  [60, "Informieren"],
  [480, "Empfehlen"],
  [900, "Ausführen"],
  [1320, "Weitere Schritte\nsteuern"]
];
document.getElementById("fig-action-scope").innerHTML = d.svg(1680, 620,
  d.label(840, 92, "Handlungsspielraum des Systems", { size: 32, color: c.gray, anchor: "middle" }),
  ...actionBoxes.slice(0, -1).map(([x]) => d.arrow(x + 310, 320, x + 410, 320, { color: c.gray, width: 4 })),
  ...actionBoxes.map(([x, label], i) => d.box(x, 230, 310, 180, label, {
    border: i === 3 ? c.blue : c.light, size: 32, color: c.white
  }))
);

// Folie 5: three main parts, with agents and transfer inside the latter two.
const journey = [
  ["Entscheidung", "Ziele · Unsicherheit"],
  ["KI", "Sprachmodelle · Agenten"],
  ["Mensch und KI", "Verantwortung · Transfer"]
];
document.getElementById("fig-learning-journey").innerHTML = d.svg(1680, 620,
  ...journey.slice(0, -1).map((_, i) => d.arrow(510 + i * 575, 310, 605 + i * 575, 310, { color: c.gray, width: 4 })),
  ...journey.map(([label, detail], i) => [
    d.label(275 + i * 575, 130, String(i + 1), { size: 32, color: c.blue, mono: true, anchor: "middle" }),
    d.box(40 + i * 575, 210, 470, 200, label, { border: c.light, size: 48 }),
    d.label(275 + i * 575, 475, detail, { size: 32, color: c.gray, anchor: "middle" })
  ]).flat()
);

// Folien 6 und 7: identical geometry. Yellow marks the currently chosen path.
function choiceFigure(selected) {
  return d.svg(760, 660,
    d.line(160, 330, 320, 330, { color: c.light, width: 5 }),
    d.line(320, 140, 320, 520, { color: c.light, width: 5 }),
    d.line(320, 140, 610, 140, { color: c.light, width: 5 }),
    d.line(320, 330, 610, 330, { color: selected ? c.yellow : c.light, width: 5 }),
    d.line(320, 520, 610, 520, { color: c.light, width: 5 }),
    selected ? d.line(160, 330, 320, 330, { color: c.yellow, width: 5 }) : "",
    d.box(30, 270, 130, 120, "?", { border: c.blue, size: 80 }),
    `<circle cx="660" cy="140" r="50" fill="${c.bg}" stroke="${c.white}" stroke-width="5"/>`,
    `<circle cx="660" cy="330" r="50" fill="${c.bg}" stroke="${selected ? c.yellow : c.white}" stroke-width="5"/>`,
    `<circle cx="660" cy="520" r="50" fill="${c.bg}" stroke="${c.white}" stroke-width="5"/>`
  );
}
document.getElementById("fig-choice").innerHTML = choiceFigure(false);
document.getElementById("fig-choice-selected").innerHTML = choiceFigure(true);

// Folie 8: objectives surrounding the decision point.
document.getElementById("fig-goals").innerHTML = d.svg(1680, 650,
  d.line(840, 145, 840, 505, { color: c.gray, width: 4 }),
  d.line(490, 325, 1190, 325, { color: c.gray, width: 4 }),
  d.box(620, 255, 440, 140, "Ziel", { border: c.blue, size: 48 }),
  d.box(585, 0, 510, 145, "Produktqualität\nsichern", { border: c.light, size: 32 }),
  d.box(0, 255, 490, 140, "Lieferfähigkeit\nerhalten", { border: c.light, size: 32 }),
  d.box(1190, 255, 490, 140, "Kosten begrenzen", { border: c.light, size: 32 }),
  d.box(560, 505, 560, 145, "Gesetzliche Anforderungen\nerfüllen", { border: c.light, size: 32 })
);

// Folie 9: equally presented actions; no verdict is implied.
const alternatives = ["Freigeben", "Nachprüfen", "Sperren"];
function alternativeFigure(selectedIndex) {
  return d.svg(1680, 620,
  ...alternatives.map((label, i) => [
    d.label(280 + i * 560, 155, String.fromCharCode(65 + i), { size: 32, color: c.blue, mono: true, anchor: "middle" }),
    d.box(60 + i * 560, 205, 440, 240, label, { border: i === selectedIndex ? c.yellow : c.light, size: 48 })
  ]).flat()
  );
}
document.getElementById("fig-alternatives").innerHTML = alternativeFigure(-1);
document.getElementById("fig-decision").innerHTML = alternativeFigure(2);

// Folie 10: an observed value leaves the choice of action open.
document.getElementById("fig-information").innerHTML = d.svg(1680, 620,
  d.label(500, 150, "Beobachtung", { size: 32, color: c.gray, anchor: "middle" }),
  d.label(1320, 150, "Handlung", { size: 32, color: c.gray, anchor: "middle" }),
  d.box(100, 225, 800, 210, "Der Messwert liegt knapp außerhalb\ndes internen Zielbereichs.", { border: c.light, size: 32 }),
  d.box(1190, 225, 260, 210, "?", { border: c.blue, size: 80 })
);

// Folie 11: 20 percent is an invented teaching value, not a measured rate.
document.getElementById("fig-prediction").innerHTML = d.svg(1680, 500,
  d.label(180, 110, "Fiktives Beispiel", { size: 32, color: c.gray }),
  `<rect x="180" y="190" width="1320" height="130" rx="8" fill="${c.dark}"/>`,
  `<rect x="180" y="190" width="264" height="130" rx="8" fill="${c.blue}"/>`,
  `<rect x="180" y="190" width="1320" height="130" rx="8" fill="none" stroke="${c.light}" stroke-width="3"/>`,
  d.label(312, 275, "20 %", { size: 48, color: c.white, anchor: "middle" }),
  d.label(972, 275, "80 %", { size: 48, color: c.white, anchor: "middle" }),
  d.label(312, 390, "Qualitätsmangel", { size: 32, color: c.gray, anchor: "middle" }),
  d.label(972, 390, "kein Qualitätsmangel", { size: 32, color: c.gray, anchor: "middle" })
);

// Folie 12: the tilt represents a value judgment, not a measured mass.
document.getElementById("fig-judgment").innerHTML = d.svg(1680, 650,
  d.line(360, 250, 1320, 170, { color: c.light, width: 6 }),
  d.line(360, 250, 360, 300, { color: c.light, width: 5 }),
  d.line(1320, 170, 1320, 220, { color: c.light, width: 5 }),
  d.line(840, 210, 840, 535, { color: c.light, width: 5 }),
  `<path d="M760 570 L840 500 L920 570 Z" fill="${c.bg}" stroke="${c.light}" stroke-width="5"/>`,
  d.box(120, 300, 480, 170, "Möglicher\nGesundheitsschaden", { border: c.white, size: 32 }),
  d.box(1080, 220, 480, 170, "Zusätzliche\nLagerkosten", { border: c.white, size: 32 })
);

// Folie 14: three different questions in the same case.
const distinction = [
  ["Prognose", "Was ist wahrscheinlich\nder Fall?"],
  ["Bewertung", "Wie schwer wiegen\ndie Folgen?"],
  ["Entscheidung", "Was tun wir?"]
];
document.getElementById("fig-distinction").innerHTML = d.svg(1680, 620,
  ...[0, 1].map(i => d.arrow(500 + i * 560, 305, 600 + i * 560, 305, { color: c.gray, width: 4 })),
  ...distinction.map(([name, question], i) => [
    d.box(40 + i * 560, 205, 460, 190, name, { border: c.light, size: 48 }),
    d.label(270 + i * 560, 460, question, { size: 32, color: c.gray, anchor: "middle" })
  ]).flat()
);

// Folie 15: two rows preserve the conceptual order; the loop returns to the next decision.
const anatomyTop = ["Ziel", "Optionen", "Informationen", "Prognose"];
const anatomyBottom = ["Ergebnis /\nFeedback", "Handlung", "Entscheidung", "Bewertung"];
const anatomyX = [50, 465, 880, 1295];
function anatomyFigure(marked = false) {
  return d.svg(1680, 690,
  ...[0, 1, 2].map(i => d.arrow(anatomyX[i] + 335, 225, anatomyX[i + 1] - 10, 225, { color: c.gray, width: 4 })),
  d.line(1462, 300, 1462, 410, { color: c.gray, width: 4 }),
  d.arrow(1462, 410, 1462, 425, { color: c.gray, width: 4 }),
  ...[3, 2, 1].map(i => d.arrow(anatomyX[i] - 10, 500, anatomyX[i - 1] + 335, 500, { color: c.gray, width: 4 })),
  d.line(218, 575, 218, 630, { color: c.gray, width: 4 }),
  d.line(218, 630, 25, 630, { color: c.gray, width: 4 }),
  d.line(25, 630, 25, 225, { color: c.gray, width: 4 }),
  d.arrow(25, 225, 50, 225, { color: c.gray, width: 4 }),
  d.line(25, 225, 25, 95, { color: c.gray, width: 3, dashed: true }),
  d.line(25, 95, 1047, 95, { color: c.gray, width: 3, dashed: true }),
  d.arrow(1047, 95, 1047, 150, { color: c.gray, width: 3 }),
  ...anatomyTop.map((label, i) => d.box(anatomyX[i], 150, 335, 150, label, { border: marked && (i === 2 || i === 3) ? c.blue : c.light, size: 32 })),
  ...anatomyBottom.map((label, i) => d.box(anatomyX[i], 425, 335, 150, label, { border: marked && (i === 0 || i === 3) ? c.blue : i === 0 ? c.blue : c.light, size: 32 }))
  );
}
document.getElementById("fig-anatomy").innerHTML = anatomyFigure();
document.getElementById("fig-debrief").innerHTML = anatomyFigure(true);

// Folie 16: categories, not a gradient of certainty.
const certainty = [
  ["Sicherheit", "Ausgang bekannt"],
  ["Risiko", "Wahrscheinlichkeiten\nabschätzbar"],
  ["Unsicherheit", "Wahrscheinlichkeiten\nnicht verlässlich bekannt"]
];
document.getElementById("fig-certainty").innerHTML = d.svg(1680, 620,
  ...certainty.map(([term, meaning], i) => [
    d.box(40 + i * 560, 175, 480, 270, term, { border: c.light, size: 48 }),
    d.label(280 + i * 560, 525, meaning, { size: 32, color: c.gray, anchor: "middle" })
  ]).flat()
);

// Folie 17: limits surround the decision situation without judging the person.
document.getElementById("fig-bounded").innerHTML = d.svg(1680, 620,
  d.line(840, 160, 840, 230, { color: c.gray, width: 4 }),
  d.line(840, 390, 840, 460, { color: c.gray, width: 4 }),
  d.line(525, 310, 650, 310, { color: c.gray, width: 4 }),
  d.line(1030, 310, 1155, 310, { color: c.gray, width: 4 }),
  d.box(650, 230, 380, 160, "Entscheidung", { border: c.blue, size: 48 }),
  d.box(625, 0, 430, 160, "Zeit", { border: c.light, size: 48 }),
  d.box(0, 230, 525, 160, "Information", { border: c.light, size: 48 }),
  d.box(1155, 230, 525, 160, "Aufmerksamkeit", { border: c.light, size: 48 }),
  d.box(590, 460, 500, 160, "Rechenkapazität", { border: c.light, size: 48 })
);

// Folie 18: the third examined option is the first to clear the minimum.
const satisficingOptions = [
  ["A", 105, c.gray], ["B", 160, c.gray], ["C", 270, c.yellow], ["…", 0, c.gray]
];
document.getElementById("fig-satisficing").innerHTML = d.svg(1680, 600,
  d.line(90, 285, 1590, 285, { color: c.blue, width: 4, dashed: true }),
  d.label(1590, 260, "Mindestniveau", { size: 32, color: c.blue, anchor: "end" }),
  ...satisficingOptions.map(([name, height, color], i) => [
    height ? `<rect x="${170 + i * 370}" y="${475 - height}" width="190" height="${height}" fill="none" stroke="${color}" stroke-width="5"/>` : "",
    d.label(265 + i * 370, 540, name, { size: 48, color, anchor: "middle" })
  ]).flat(),
  d.label(1005, 105, "Suche endet", { size: 32, color: c.yellow, anchor: "middle" })
);

// Folie 19: many branches are replaced by one deliberately simple rule.
document.getElementById("fig-heuristic").innerHTML = d.svg(1680, 620,
  d.line(175, 285, 295, 285, { color: c.gray, width: 4 }),
  ...[180, 285, 390].map(y => d.line(295, 285, 295, y, { color: c.gray, width: 4 })),
  ...[180, 285, 390].map(y => d.line(295, y, 470, y, { color: c.gray, width: 4 })),
  ...[150, 210, 255, 315, 360, 420].map((y, i) => d.line(470, i < 2 ? 180 : i < 4 ? 285 : 390, 650, y, { color: c.gray, width: 4 })),
  ...[150, 210, 255, 315, 360, 420].map(y => `<circle cx="650" cy="${y}" r="11" fill="${c.light}"/>`),
  d.arrow(760, 285, 990, 285, { color: c.blue, width: 5 }),
  d.box(1000, 180, 570, 210, "Faustregel", { border: c.blue, size: 48 }),
  d.label(420, 515, "Viele Prüfpfade", { size: 32, color: c.gray, anchor: "middle" }),
  d.label(1285, 515, "Eine einfache Regel", { size: 32, color: c.gray, anchor: "middle" })
);

// Folie 20: repeated estimates are on the same optimistic side of the observed value.
const biasPoints = [[840, 200], [1000, 285], [920, 370], [1070, 455]];
document.getElementById("fig-bias").innerHTML = d.svg(1680, 620,
  d.line(220, 520, 1470, 520, { color: c.light, width: 4 }),
  d.line(700, 135, 700, 520, { color: c.blue, width: 4 }),
  d.label(700, 105, "Beobachtete Nachfrage", { size: 32, color: c.blue, anchor: "middle" }),
  ...biasPoints.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="18" fill="${c.yellow}"/>`),
  d.label(1050, 575, "Schätzungen", { size: 32, color: c.gray, anchor: "middle" }),
  d.label(1470, 575, "höher", { size: 32, color: c.gray, anchor: "end" })
);

// Folie 21: spread in comparable judgments needs no known true value.
const noisePoints = [[350, 265], [680, 265], [1020, 265], [1330, 265]];
document.getElementById("fig-noise").innerHTML = d.svg(1680, 620,
  d.box(610, 0, 460, 120, "Dieselbe Charge", { border: c.blue, size: 48 }),
  ...noisePoints.map(([x]) => d.line(840, 120, x, 230, { color: c.gray, width: 3 })),
  ...noisePoints.map(([x], i) => d.label(x, 335, `Person ${i + 1}`, { size: 32, color: c.gray, anchor: "middle" })),
  ...noisePoints.map(([x], i) => d.line(x, 355, [280, 610, 1110, 1410][i], 455, { color: c.gray, width: 3 })),
  d.line(190, 480, 1490, 480, { color: c.light, width: 4 }),
  ...[280, 610, 1110, 1410].map(x => `<circle cx="${x}" cy="480" r="20" fill="${c.white}"/>`),
  d.label(190, 555, "Urteil A", { size: 32, color: c.gray }),
  d.label(1490, 555, "Urteil B", { size: 32, color: c.gray, anchor: "end" })
);

// Folie 24: visibility can make an event easier to recall than quieter cases.
document.getElementById("fig-availability").innerHTML = d.svg(1680, 620,
  d.arrow(510, 315, 620, 315, { color: c.gray, width: 4 }),
  d.arrow(1060, 315, 1170, 315, { color: c.gray, width: 4 }),
  d.box(60, 205, 450, 220, "Sichtbarer\nRückruf", { border: c.blue, size: 48 }),
  d.box(620, 205, 440, 220, "Leicht\nerinnerbar", { border: c.light, size: 48 }),
  d.box(1170, 205, 450, 220, "Wirkt\nwahrscheinlicher", { border: c.light, size: 48 }),
  d.label(840, 530, "Sichtbarkeit ist nicht dasselbe wie Häufigkeit.", { size: 32, color: c.gray, anchor: "middle" })
);

// Folie 25: an initial number pulls later estimates toward it.
document.getElementById("fig-anchoring").innerHTML = d.svg(1680, 620,
  d.line(250, 430, 1430, 430, { color: c.light, width: 4 }),
  d.line(560, 365, 560, 495, { color: c.blue, width: 5 }),
  d.line(1010, 365, 1010, 495, { color: c.yellow, width: 5 }),
  d.arrow(575, 430, 995, 430, { color: c.gray, width: 4 }),
  d.box(160, 90, 600, 200, "Erste Preisnennung", { border: c.blue, size: 48 }),
  d.box(920, 90, 600, 200, "Spätere Einschätzung", { border: c.light, size: 48 }),
  d.label(560, 555, "Anker", { size: 32, color: c.blue, anchor: "middle" }),
  d.label(1010, 555, "Schätzung", { size: 32, color: c.yellow, anchor: "middle" })
);

// Folien 26 und 27: identical decision geometry; only the retrospective labels change.
function processOutcomeFigure(showJudgment) {
  return d.svg(1680, 660,
    d.line(840, 155, 840, 195, { color: c.gray, width: 4 }),
    d.line(450, 195, 1230, 195, { color: c.gray, width: 4 }),
    d.arrow(450, 195, 450, 220, { color: c.gray, width: 4 }),
    d.arrow(1230, 195, 1230, 220, { color: c.gray, width: 4 }),
    d.arrow(450, 365, 450, 425, { color: c.gray, width: 4 }),
    d.arrow(1230, 365, 1230, 425, { color: c.gray, width: 4 }),
    d.box(530, 20, 620, 135, "Gleicher Informationsstand", { border: c.blue, size: 32 }),
    d.box(180, 220, 540, 145, "Charge sperren", { border: c.light, size: 48 }),
    d.box(960, 220, 540, 145, "Charge sperren", { border: c.light, size: 48 }),
    d.box(180, 425, 540, 140, "Mangel festgestellt", { border: c.light, size: 32 }),
    d.box(960, 425, 540, 140, "Kein Mangel", { border: c.light, size: 32 }),
    showJudgment ? d.label(450, 635, "Rückblick: umsichtig", { size: 32, color: c.yellow, anchor: "middle" }) : "",
    showJudgment ? d.label(1230, 635, "Rückblick: übervorsichtig", { size: 32, color: c.yellow, anchor: "middle" }) : ""
  );
}
document.getElementById("fig-process-outcome").innerHTML = processOutcomeFigure(false);
document.getElementById("fig-outcome-bias").innerHTML = processOutcomeFigure(true);

// Folie 31: a quiet recap of the main decision stages.
const takeawayParts = ["Ziel", "Information", "Bewertung", "Entscheidung", "Handlung"];
document.getElementById("fig-block-one-takeaway").innerHTML = d.svg(1680, 190,
  ...[0, 1, 2, 3].map(i => d.arrow(25 + i * 330 + 290, 95, 25 + (i + 1) * 330, 95, { color: c.gray, width: 3 })),
  ...takeawayParts.map((label, i) => d.box(25 + i * 330, 30, 290, 130, label, { border: c.light, size: 32 }))
);

// Folie 34: three principles, presented without an implied ranking.
document.getElementById("fig-tech-divider").innerHTML = d.svg(760, 620,
  d.arrow(380, 178, 380, 230, { color: c.gray, width: 4 }),
  d.arrow(380, 388, 380, 440, { color: c.gray, width: 4 }),
  d.box(70, 38, 620, 140, "Regeln", { border: c.light, size: 48 }),
  d.box(70, 248, 620, 140, "Lernen", { border: c.blue, size: 48 }),
  d.box(70, 458, 620, 140, "Generieren", { border: c.yellow, size: 48 })
);

// Folie 37: the same four questions can describe very different systems.
document.getElementById("fig-ai-questions").innerHTML = d.svg(1680, 650,
  d.line(840, 325, 390, 175, { color: c.gray, width: 3 }),
  d.line(840, 325, 1290, 175, { color: c.gray, width: 3 }),
  d.line(840, 325, 390, 475, { color: c.gray, width: 3 }),
  d.line(840, 325, 1290, 475, { color: c.gray, width: 3 }),
  d.box(645, 255, 390, 140, "KI-System", { border: c.blue, size: 48 }),
  d.box(60, 55, 660, 180, "Welche Aufgabe?", { border: c.light, size: 48 }),
  d.box(960, 55, 660, 180, "Welche Daten?", { border: c.light, size: 48 }),
  d.box(60, 415, 660, 180, "Welche Logik?", { border: c.light, size: 48 }),
  d.box(960, 415, 660, 180, "Welche Handlungs-\nmöglichkeiten?", { border: c.light, size: 48 })
);

// Folie 38: an explicit condition maps a measurement to a prescribed action.
document.getElementById("fig-rules").innerHTML = d.svg(1680, 580,
  d.arrow(505, 290, 595, 290, { color: c.gray, width: 4 }),
  d.arrow(1085, 290, 1175, 290, { color: c.gray, width: 4 }),
  d.label(1130, 250, "Ja", { size: 32, color: c.blue, anchor: "middle" }),
  d.box(45, 180, 460, 220, "Messwert", { border: c.light, size: 48 }),
  d.box(595, 180, 490, 220, "Grenzwert\nüberschritten?", { border: c.blue, size: 48 }),
  d.box(1175, 180, 460, 220, "Charge sperren", { border: c.light, size: 48 })
);

// Folie 40: training and application are two separate phases.
document.getElementById("fig-ml").innerHTML = d.svg(1680, 580,
  d.label(60, 65, "Training", { size: 32, color: c.gray }),
  d.label(60, 350, "Anwendung", { size: 32, color: c.gray }),
  d.line(60, 295, 1620, 295, { color: c.dark, width: 3, dashed: true }),
  d.arrow(520, 170, 650, 170, { color: c.gray, width: 4 }),
  d.arrow(900, 245, 900, 385, { color: c.blue, width: 4 }),
  d.arrow(520, 465, 650, 465, { color: c.gray, width: 4 }),
  d.arrow(1150, 465, 1270, 465, { color: c.gray, width: 4 }),
  d.box(60, 95, 460, 150, "Historische\nVerkaufsdaten", { border: c.light, size: 32 }),
  d.box(650, 95, 500, 150, "Training", { border: c.blue, size: 48 }),
  d.box(60, 385, 460, 160, "Neue Daten", { border: c.light, size: 48 }),
  d.box(650, 385, 500, 160, "Trainiertes Modell", { border: c.blue, size: 32 }),
  d.box(1270, 385, 350, 160, "Prognose", { border: c.light, size: 48 })
);

// Folie 42: the same model interface can produce different types of drafts.
document.getElementById("fig-generative").innerHTML = d.svg(1680, 580,
  d.arrow(460, 290, 610, 290, { color: c.gray, width: 4 }),
  d.line(1060, 290, 1190, 290, { color: c.gray, width: 4 }),
  d.line(1190, 145, 1190, 435, { color: c.gray, width: 4 }),
  ...[145, 245, 345, 445].map(y => d.arrow(1190, y, 1280, y, { color: c.gray, width: 4 })),
  d.box(60, 200, 400, 180, "Eingabe", { border: c.light, size: 48 }),
  d.box(610, 200, 450, 180, "Generatives\nModell", { border: c.blue, size: 48 }),
  ...["Text", "Bild", "Audio", "Code"].map((label, i) => d.box(1280, 95 + i * 100, 340, 90, label, { border: c.light, size: 32 }))
);

// Folie 44: one broadly trained base can support several downstream tasks.
const foundationTasks = ["Zusammenfassen", "Klassifizieren", "Extrahieren", "Schreiben", "Code"];
document.getElementById("fig-foundation").innerHTML = d.svg(1680, 600,
  ...foundationTasks.map((_, i) => d.arrow(840, 230, 170 + i * 335, 430, { color: c.gray, width: 3 })),
  d.box(540, 65, 600, 165, "Basismodell", { border: c.blue, size: 48 }),
  ...foundationTasks.map((label, i) => d.box(15 + i * 335, 430, 315, 125, label, { border: c.light, size: 32 }))
);

// Folie 45: a language model maps provided text and context to generated text.
document.getElementById("fig-llm").innerHTML = d.svg(1680, 550,
  d.arrow(490, 270, 640, 270, { color: c.gray, width: 4 }),
  d.arrow(1040, 270, 1190, 270, { color: c.gray, width: 4 }),
  d.box(45, 175, 445, 190, "Text und\nKontext", { border: c.light, size: 48 }),
  d.box(640, 175, 400, 190, "Sprachmodell", { border: c.blue, size: 48 }),
  d.box(1190, 175, 445, 190, "Text", { border: c.light, size: 48 })
);

// Folie 47: only sources supplied in the current call enter the model context.
const contextSources = ["Anweisungen", "Chatverlauf", "Nutzerfrage", "Dokumente\nfalls bereitgestellt", "Tool-Ergebnisse\nfalls bereitgestellt"];
document.getElementById("fig-context").innerHTML = d.svg(1680, 660,
  ...contextSources.map((_, i) => d.arrow(450, 50 + i * 125, 625, 330, { color: c.gray, width: 3 })),
  d.arrow(1075, 330, 1215, 330, { color: c.gray, width: 4 }),
  ...contextSources.map((label, i) => d.box(30, 4 + i * 125, 420, 95, label, { border: i > 2 ? c.yellow : c.light, size: 32 })),
  d.box(625, 190, 450, 280, "Kontextfenster", { border: c.blue, size: 48 }),
  d.box(1215, 230, 405, 200, "Sprachmodell", { border: c.light, size: 48 })
);

// Folie 48: invented percentages illustrate a distribution, not a real model run.
const nextExamples = [
  ["geprüft", 400, "55 %"],
  ["freigegeben", 218, "30 %"],
  ["gesperrt", 109, "15 %"]
];
document.getElementById("fig-next-token").innerHTML = d.svg(1680, 565,
  d.arrow(600, 285, 725, 285, { color: c.gray, width: 4 }),
  d.box(45, 180, 555, 210, "Die Charge wird …", { border: c.blue, size: 48 }),
  ...nextExamples.flatMap(([word, width, pct], i) => {
    const y = 100 + i * 165;
    return [
      d.label(745, y + 42, word, { size: 32 }),
      `<rect x="1055" y="${y}" width="${width}" height="55" rx="6" fill="${i === 0 ? c.blue : c.gray}"/>`,
      d.label(1565, y + 42, pct, { size: 32, color: c.gray, anchor: "end" })
    ];
  })
);

// Folie 49: the selected token becomes part of the next context.
document.getElementById("fig-generation").innerHTML = d.svg(1680, 620,
  d.arrow(1075, 125, 1210, 225, { color: c.gray, width: 4 }),
  d.arrow(1445, 355, 1075, 480, { color: c.gray, width: 4 }),
  d.arrow(605, 505, 455, 360, { color: c.gray, width: 4 }),
  d.arrow(245, 225, 605, 125, { color: c.gray, width: 4 }),
  d.box(605, 40, 470, 170, "Kontext", { border: c.blue, size: 48 }),
  d.box(1210, 225, 420, 160, "Wahrscheinlich-\nkeiten", { border: c.light, size: 32 }),
  d.box(605, 425, 470, 170, "nächstes Token", { border: c.yellow, size: 48 }),
  d.box(50, 225, 405, 160, "erweiterter\nKontext", { border: c.light, size: 32 })
);

// Folie 50: several plausible continuations from one prompt.
const variants = ["Erneut prüfen.", "Auslieferung stoppen.", "Schnellprüfung nutzen."];
document.getElementById("fig-variation").innerHTML = d.svg(1680, 570,
  ...variants.map((_, i) => d.arrow(600, 285, 970, 95 + i * 180, { color: c.gray, width: 3 })),
  d.box(50, 190, 550, 190, "Was tun mit\nder Charge?", { border: c.blue, size: 48 }),
  ...variants.map((label, i) => d.box(970, 25 + i * 180, 640, 140, label, { border: c.light, size: 32 })),
  d.label(785, 45, "Sampling", { size: 32, color: c.yellow, anchor: "middle" })
);

// Folie 51: illustrative dependencies; these are not attention weights.
const attentionWords = [
  [25, 130, "Die"], [175, 230, "Charge"], [425, 170, "wird"],
  [615, 250, "geprüft,"], [885, 160, "weil"],
  [1065, 310, "der Messwert"], [1395, 260, "auffällt."]
];
document.getElementById("fig-attention").innerHTML = d.svg(1680, 540,
  `<path d="M290 310 C420 80 1170 80 1220 310" fill="none" stroke="${c.blue}" stroke-width="4"/>`,
  `<path d="M740 310 C900 150 1430 150 1525 310" fill="none" stroke="${c.yellow}" stroke-width="4"/>`,
  ...attentionWords.map(([x, w, word]) => d.box(x, 310, w, 130, word, { border: c.light, size: 32 }))
);

// Folie 52: a schematic route through the interactive GPT-2 small explainer.
document.getElementById("fig-transformer-explainer").innerHTML = d.svg(1680, 520,
  d.label(160, 70, "Eingabetokens", { size: 32, color: c.gray, anchor: "middle" }),
  d.label(520, 70, "Einbettungen", { size: 32, color: c.gray, anchor: "middle" }),
  d.label(1000, 70, "Transformer-Block", { size: 32, color: c.gray, anchor: "middle" }),
  d.label(1500, 70, "Nächstes Token", { size: 32, color: c.gray, anchor: "middle" }),
  d.arrow(330, 285, 385, 285, { color: c.gray, width: 4 }),
  d.arrow(680, 285, 745, 285, { color: c.gray, width: 4 }),
  d.arrow(1255, 285, 1320, 285, { color: c.gray, width: 4 }),
  d.box(20, 205, 90, 150, "1", { border: c.light, size: 48 }),
  d.box(120, 205, 90, 150, "2", { border: c.light, size: 48 }),
  d.box(220, 205, 90, 150, "3", { border: c.light, size: 48 }),
  ...[0, 1, 2].flatMap(i => [0, 1, 2, 3, 4, 5].map(j =>
    `<rect x="${410 + i * 86}" y="${189 + j * 34}" width="${30 + ((i + j * 2) % 3) * 11}" height="19" rx="5" fill="${(i + j) % 3 === 0 ? c.blue : c.gray}" opacity="${(i + j) % 3 === 0 ? 0.9 : 0.55}"/>`
  )),
  d.box(765, 130, 480, 325, "", { border: c.blue }),
  d.box(800, 165, 410, 105, "Self-Attention", { border: c.blue, size: 32 }),
  d.arrow(1005, 273, 1005, 307, { color: c.gray, width: 3 }),
  d.box(800, 310, 410, 105, "MLP", { border: c.light, size: 32 }),
  d.label(1005, 500, "mehrfach gestapelt", { size: 32, color: c.gray, anchor: "middle" }),
  ...[0, 1, 2].flatMap((i) => [
    d.label(1330, 235 + i * 88, `T${i + 1}`, { size: 32, color: c.gray }),
    `<rect x="1390" y="212" width="235" height="24" rx="8" fill="none" stroke="${c.gray}" stroke-width="2" transform="translate(0 ${i * 88})"/>`,
    `<rect x="1390" y="212" width="${[190, 105, 55][i]}" height="24" rx="8" fill="${i === 0 ? c.yellow : c.blue}" transform="translate(0 ${i * 88})"/>`
  ])
);

// Folien 52–53: repeated geometry makes the second training stage comparable.
function trainingFlow(input, process, output, documentInput) {
  return d.svg(1680, 580,
    d.arrow(550, 290, 650, 290, { color: c.gray, width: 4 }),
    d.arrow(1080, 290, 1190, 290, { color: c.gray, width: 4 }),
    ...(documentInput ? [
      d.box(50, 180, 500, 220, "", { border: c.light }),
      ...[0, 1, 2, 3, 4].map(i => `<rect x="${115 + i * 75}" y="220" width="55" height="77" rx="3" fill="none" stroke="${c.gray}" stroke-width="2"/>`),
      ...[0, 1, 2, 3, 4].flatMap(i => [0, 1, 2].map(j => d.line(126 + i * 75, 239 + j * 16, 158 + i * 75, 239 + j * 16, { color: c.gray, width: 2 }))),
      d.label(300, 356, input, { size: 32, anchor: "middle" })
    ] : [d.box(50, 180, 500, 220, input, { border: c.light, size: 32 })]),
    d.box(650, 180, 430, 220, process, { border: c.blue, size: 48 }),
    d.box(1190, 180, 440, 220, output, { border: c.yellow, size: 48 })
  );
}
document.getElementById("fig-pretraining").innerHTML = trainingFlow("Viele Dokumente", "Training", "Basismodell", true);
document.getElementById("fig-tuning").innerHTML = trainingFlow("Anweisung +\ngute Antwort", "Zusätzliches\nTraining", "Angepasstes\nModell", false);

// Folie 54: a preference produces feedback; it does not certify correctness.
document.getElementById("fig-preference").innerHTML = d.svg(1680, 570,
  d.arrow(395, 285, 545, 165, { color: c.gray, width: 3 }),
  d.arrow(395, 285, 545, 405, { color: c.gray, width: 3 }),
  d.arrow(990, 165, 1135, 165, { color: c.yellow, width: 4 }),
  d.arrow(990, 405, 1135, 165, { color: c.gray, width: 3 }),
  d.arrow(1360, 245, 1360, 335, { color: c.yellow, width: 4 }),
  d.box(35, 205, 360, 160, "Prompt", { border: c.blue, size: 48 }),
  d.box(545, 80, 445, 170, "Antwort A", { border: c.yellow, size: 48 }),
  d.box(545, 325, 445, 170, "Antwort B", { border: c.light, size: 48 }),
  d.box(1135, 80, 450, 165, "Menschliche\nPräferenz: A", { border: c.yellow, size: 32 }),
  d.box(1135, 335, 450, 165, "Trainingssignal", { border: c.light, size: 32 })
);

// Folie 55: the broad training sequence closes the introductory LLM block.
const assistantStages = ["Pretraining", "Instruction\nTuning", "Präferenz-\nFeedback", "Assistent"];
document.getElementById("fig-assistant").innerHTML = d.svg(1680, 530,
  ...[0, 1, 2].map(i => d.arrow(380 + i * 420, 265, 450 + i * 420, 265, { color: c.gray, width: 4 })),
  ...assistantStages.map((label, i) => d.box(30 + i * 420, 170, 350, 190, label, { border: i === 3 ? c.yellow : i === 0 ? c.blue : c.light, size: 32 }))
);

// Folien 58–60: three distinct useful tasks; source and review stay visible.
document.getElementById("fig-structure").innerHTML = d.svg(1680, 570,
  d.arrow(670, 285, 800, 285, { color: c.gray, width: 4 }),
  d.box(40, 135, 630, 300, "„Bei Joghurt X war die\nKonsistenz heute Morgen\nungewöhnlich dünn.\nWas sollen wir prüfen?“", { border: c.light, size: 32 }),
  ...["Produkt: Joghurt X", "Abweichung: Konsistenz", "Zeitpunkt: heute Morgen", "Offene Frage: Prüfung"].map((v, i) => d.box(800, 25 + 137 * i, 825, 110, v, { border: i === 3 ? c.blue : c.light, size: 32 }))
);

document.getElementById("fig-condense").innerHTML = d.svg(1680, 570,
  ...[0, 1, 2].map(i => d.arrow(475, 100 + i * 180, 720, 285, { color: c.gray, width: 3 })),
  d.arrow(1070, 285, 1195, 285, { color: c.gray, width: 4 }),
  ...["Bericht A", "Bericht B", "Bericht C"].map((v, i) => d.box(35, 25 + i * 180, 440, 145, v, { border: c.light, size: 32 })),
  d.box(720, 190, 350, 190, "LLM", { border: c.blue, size: 48 }),
  d.box(1195, 120, 435, 330, "Kurzfassung\nmit Verweisen\nauf A · B · C", { border: c.yellow, size: 32 })
);

const optionLabels = ["Schnellprüfung", "Warten", "Ausliefern"];
document.getElementById("fig-options").innerHTML = d.svg(1680, 590,
  ...optionLabels.map((_, i) => d.arrow(480, 290, 620, 105 + i * 185, { color: c.gray, width: 3 })),
  ...optionLabels.map((_, i) => d.arrow(1060, 105 + i * 185, 1205, 290, { color: c.gray, width: 3 })),
  d.box(25, 195, 455, 190, "Was tun mit der\nJoghurtcharge?", { border: c.blue, size: 32 }),
  ...optionLabels.map((v, i) => d.box(620, 30 + i * 185, 440, 150, v, { border: c.light, size: 32 })),
  d.box(1205, 170, 440, 240, "Bewertung:\nzulässig?\npraktikabel?", { border: c.yellow, size: 32 })
);

// Folie 64: the important passage sits in the middle of a long document.
document.getElementById("fig-long-context").innerHTML = d.svg(1680, 570,
  d.box(120, 35, 1440, 505, "", { border: c.light }),
  ...Array.from({length: 10}, (_, i) => `<rect x="190" y="85" width="1280" height="27" rx="6" fill="${i === 5 ? c.yellow : c.dark}" transform="translate(0 ${i * 41})"/>`),
  d.label(840, 70, "Beginn", { size: 32, color: c.gray, anchor: "middle" }),
  d.label(840, 565, "Ende", { size: 32, color: c.gray, anchor: "middle" }),
  d.label(1500, 70, "Gelb: relevante Passage", { size: 32, color: c.yellow, anchor: "end" })
);

document.getElementById("fig-verify").innerHTML = d.svg(1680, 550,
  ...[0, 1, 2].map(i => d.arrow(510, 275, 690, 95 + i * 175, { color: c.gray, width: 3 })),
  ...[0, 1, 2].map(i => d.arrow(1070, 95 + i * 175, 1220, 275, { color: c.gray, width: 3 })),
  d.box(35, 165, 475, 220, "LLM-Ausgabe", { border: c.blue, size: 48 }),
  ...["Quelle", "Daten", "Fachwissen"].map((v, i) => d.box(690, 25 + i * 175, 380, 140, v, { border: c.light, size: 32 })),
  d.box(1220, 165, 425, 220, "Nutzung", { border: c.yellow, size: 48 })
);

// Folien 66–70: stable prompt-card geometry; only the newly discussed component changes color.
const promptParts = ["Aufgabe", "Kontext", "Kriterien", "Ausgabeformat", "Unsicherheit\nund Prüfung"];
document.querySelectorAll(".prompt-card").forEach(card => {
  const active = Number(card.dataset.active);
  card.innerHTML = promptParts.map((part, i) => `<div class="prompt-segment ${i + 1 === active ? "is-active" : i + 1 < active ? "is-done" : ""}"><span>0${i + 1}</span><div>${part.replace("\n", "<br>")}</div></div>`).join("");
});

document.getElementById("fig-retrieval").innerHTML = d.svg(1680, 540,
  ...[290, 620, 950, 1280].map(x => d.arrow(x, 265, x + 60, 265, { color: c.gray, width: 4 })),
  ...[
    ["Frage", c.blue], ["Suche", c.light], ["ausgewählte\nPassagen", c.yellow], ["LLM", c.light], ["Antwort", c.light]
  ].map(([v, color], i) => d.box(20 + 330 * i, 170, 270, 190, v, { border: color, size: 32 }))
);

document.getElementById("fig-tools").innerHTML = d.svg(1680, 580,
  ...[[260, 85], [1360, 85], [260, 375], [1360, 375]].map(([x, y]) => d.arrow(840, 290, x, y + 82, { color: c.gray, width: 3 })),
  d.box(640, 195, 400, 190, "LLM im System", { border: c.blue, size: 48 }),
  ...[[260, 85, "Rechner"], [1360, 85, "Dokumenten-\nsuche"], [260, 375, "Datenbank"], [1360, 375, "betriebliche\nAnwendung"]].map(([x, y, label]) => d.box(x - 145, y, 290, 165, label, { border: c.light, size: 32 }))
);

document.getElementById("fig-tool-result").innerHTML = d.svg(1680, 540,
  d.arrow(490, 270, 620, 270, { color: c.gray, width: 4 }),
  d.arrow(1090, 270, 1220, 270, { color: c.yellow, width: 4 }),
  d.box(30, 165, 460, 210, "Tool-Ergebnis\nkorrekt", { border: c.green, size: 32 }),
  d.box(620, 165, 470, 210, "Interpretation", { border: c.yellow, size: 48 }),
  d.box(1220, 165, 430, 210, "Empfehlung", { border: c.light, size: 32 }),
  d.label(855, 135, "Prüfstelle", { size: 32, color: c.yellow, anchor: "middle" })
);

const routineSteps = ["Aufgabe\nklären", "Kontext\ngeben", "Ausgabe\nstrukturieren", "Unsicherheit\nbenennen", "Aussagen\nprüfen"];
document.getElementById("fig-routine").innerHTML = d.svg(1680, 620,
  ...[0, 1, 2, 3].map(i => d.arrow(300 + i * 330, 275, 365 + i * 330, 275, { color: c.gray, width: 4 })),
  d.line(1500, 400, 1500, 510, { color: c.yellow, width: 4 }),
  d.line(1500, 510, 160, 510, { color: c.yellow, width: 4 }),
  d.arrow(160, 510, 160, 400, { color: c.yellow, width: 4 }),
  ...routineSteps.map((v, i) => d.box(20 + i * 330, 165, 280, 235, v, { border: i === 4 ? c.yellow : i === 0 ? c.blue : c.light, size: 32 }))
);

// Teil 10: Workflows have fixed transitions; the agent chooses a next step after observation.
document.getElementById("fig-agent-divider").innerHTML = d.svg(760, 620,
  d.arrow(380, 154, 380, 220, { color: c.gray, width: 4 }),
  d.arrow(380, 378, 380, 444, { color: c.yellow, width: 4 }),
  d.box(70, 20, 620, 135, "Frage → Antwort", { border: c.light, size: 48 }),
  d.box(70, 220, 620, 160, "Ziel → mehrere Schritte", { border: c.blue, size: 32 }),
  d.box(70, 445, 620, 135, "Wirkung außerhalb\ndes Modells", { border: c.yellow, size: 32 })
);

document.getElementById("fig-chatbot").innerHTML = d.svg(1680, 570,
  d.arrow(450, 285, 625, 285, { color: c.gray, width: 4 }),
  d.arrow(1055, 285, 1230, 285, { color: c.gray, width: 4 }),
  d.box(30, 190, 420, 190, "Anfrage", { border: c.blue, size: 48 }),
  d.box(625, 190, 430, 190, "Sprachmodell", { border: c.light, size: 48 }),
  d.box(1230, 190, 420, 190, "Antwort", { border: c.yellow, size: 48 })
);

const agentWorkflowSteps = ["Dokument\nerkennen", "Angaben\nextrahieren", "ERP-\nAbgleich", "Entwurf\nvorlegen"];
document.getElementById("fig-agent-workflow").innerHTML = d.svg(1680, 580,
  ...[380, 800, 1220].map(x => d.arrow(x, 290, x + 60, 290, { color: c.gray, width: 4 })),
  ...agentWorkflowSteps.map((label, i) => d.box(20 + i * 420, 195, 360, 190, label, { border: i === 0 ? c.blue : i === 3 ? c.yellow : c.light, size: 32 }))
);

document.getElementById("fig-agent-dynamic").innerHTML = d.svg(1680, 580,
  d.arrow(390, 290, 610, 290, { color: c.gray, width: 4 }),
  d.arrow(1010, 290, 1210, 125, { color: c.yellow, width: 4 }),
  d.arrow(1010, 290, 1210, 455, { color: c.gray, width: 4 }),
  d.box(25, 195, 365, 190, "Ziel", { border: c.blue, size: 48 }),
  d.box(610, 180, 400, 220, "Zwischenergebnis\nbeobachten", { border: c.light, size: 32 }),
  d.box(1210, 45, 435, 160, "weiter prüfen", { border: c.yellow, size: 32 }),
  d.box(1210, 375, 435, 160, "eskalieren", { border: c.light, size: 32 })
);

// Reused architecture on slides 83 and 97. Connectors remain behind every box.
function agentArchitecture(risk) {
  const top = [[40, "Auftrag"], [600, "Kontext"], [1160, "Zustand"]];
  const bottom = [[25, "Tools"], [445, "Steuerung"], [865, "Berechtigungen"], [1285, "Kontrollen"]];
  return d.svg(1680, 610,
    ...top.map(([x]) => d.arrow(x + 240, 150, 840, 220, { color: c.gray, width: 3 })),
    ...bottom.map(([x]) => d.arrow(840, 385, x + 185, 480, { color: c.gray, width: 3 })),
    ...top.map(([x, label]) => d.box(x, 30, 480, 120, label, { border: risk && label === "Zustand" ? c.red : c.light, size: 32 })),
    d.box(590, 220, 500, 165, "Sprachmodell", { border: c.blue, size: 48 }),
    ...bottom.map(([x, label]) => d.box(x, 480, 370, 110, label, { border: risk && (label === "Berechtigungen" || label === "Kontrollen") ? c.red : c.light, size: 32 }))
  );
}
document.getElementById("fig-agent-system").innerHTML = agentArchitecture(false);
document.getElementById("fig-agent-debrief").innerHTML = agentArchitecture(true);

document.getElementById("fig-agent-goal").innerHTML = d.svg(1680, 590,
  ...[110, 290, 470].map(y => d.arrow(620, 290, 1000, y, { color: c.gray, width: 3 })),
  d.box(35, 175, 585, 230, "Ziel:\nRohstoff für morgen klären", { border: c.blue, size: 32 }),
  d.box(1000, 25, 610, 170, "Bestand prüfen", { border: c.light, size: 32 }),
  d.box(1000, 210, 610, 170, "Lieferdaten abfragen", { border: c.light, size: 32 }),
  d.box(1000, 395, 610, 170, "nächsten Schritt wählen", { border: c.yellow, size: 32 })
);

document.getElementById("fig-agent-state").innerHTML = d.svg(1680, 590,
  d.arrow(450, 130, 650, 285, { color: c.gray, width: 3 }),
  d.arrow(450, 460, 650, 285, { color: c.gray, width: 3 }),
  d.arrow(1080, 285, 1230, 285, { color: c.yellow, width: 4 }),
  d.box(30, 45, 420, 170, "ERP geprüft", { border: c.light, size: 32 }),
  d.box(30, 375, 420, 170, "Lieferant angefragt", { border: c.light, size: 32 }),
  d.box(650, 180, 430, 210, "aktueller Zustand", { border: c.blue, size: 48 }),
  d.box(1230, 180, 415, 210, "nächster Schritt", { border: c.yellow, size: 32 })
);

document.getElementById("fig-agent-tools").innerHTML = d.svg(1680, 600,
  d.arrow(430, 280, 610, 280, { color: c.gray, width: 4 }),
  d.arrow(1000, 280, 1200, 140, { color: c.gray, width: 4 }),
  d.arrow(1000, 280, 1200, 440, { color: c.yellow, width: 4 }),
  d.line(805, 375, 805, 465, { color: c.gray, width: 3 }),
  d.line(805, 465, 230, 465, { color: c.gray, width: 3 }),
  d.arrow(230, 465, 230, 375, { color: c.gray, width: 3 }),
  d.box(30, 185, 400, 190, "Agent", { border: c.blue, size: 48 }),
  d.box(610, 185, 390, 190, "Tool-Aufruf", { border: c.light, size: 48 }),
  d.box(1200, 45, 430, 180, "ERP lesen", { border: c.light, size: 32 }),
  d.box(1200, 365, 430, 180, "E-Mail senden", { border: c.yellow, size: 32 }),
  d.label(520, 540, "Tool-Ergebnis zurück zum Agenten", { size: 32, color: c.gray, anchor: "middle" })
);

document.getElementById("fig-agent-control").innerHTML = d.svg(1680, 610,
  ...[[1130, 75], [1130, 215], [1130, 355], [1130, 495]].map(([x, y]) => d.arrow(935, 305, x, y + 55, { color: c.gray, width: 3 })),
  d.box(470, 195, 465, 220, "Zustand prüfen", { border: c.blue, size: 48 }),
  ...[[1130, 75, "weiter"], [1130, 215, "fertig"], [1130, 355, "Mensch übernehmen"], [1130, 495, "abbrechen"]].map(([x, y, label], i) => d.box(x, y, 490, 110, label, { border: i === 2 ? c.yellow : i === 3 ? c.red : c.light, size: 32 }))
);

document.getElementById("fig-agent-loop").innerHTML = d.svg(1680, 610,
  d.arrow(375, 290, 440, 290, { color: c.gray, width: 4 }),
  d.arrow(795, 290, 860, 290, { color: c.gray, width: 4 }),
  d.arrow(1215, 290, 1280, 290, { color: c.gray, width: 4 }),
  d.line(1460, 380, 1460, 510, { color: c.yellow, width: 4 }),
  d.line(1460, 510, 195, 510, { color: c.yellow, width: 4 }),
  d.arrow(195, 510, 195, 380, { color: c.yellow, width: 4 }),
  ...["Plan", "Handlung", "Beobachtung", "Zustand\naktualisieren"].map((v, i) => d.box(20 + i * 420, 190, 355, 190, v, { border: i === 0 ? c.blue : i === 3 ? c.yellow : c.light, size: 32 }))
);

document.getElementById("fig-agent-gate").innerHTML = d.svg(1680, 470,
  d.arrow(480, 235, 625, 235, { color: c.gray, width: 4 }),
  d.arrow(1030, 235, 1180, 235, { color: c.yellow, width: 4 }),
  d.box(30, 140, 450, 190, "Modellvorschlag", { border: c.blue, size: 32 }),
  d.box(625, 120, 405, 230, "Prüfpunkt", { border: c.yellow, size: 48 }),
  d.box(1180, 140, 470, 190, "Tool ausführen", { border: c.light, size: 32 })
);

document.getElementById("fig-agent-error").innerHTML = d.svg(1680, 590,
  ...[390, 810, 1230].map(x => d.arrow(x, 290, x + 35, 290, { color: c.gray, width: 4 })),
  ...["falsche\nBestandsangabe", "falsches\nZwischenziel", "unpassendes\nTool", "Folgeaktion"].map((v, i) => d.box(20 + i * 420, 185, 370, 210, v, { border: i === 0 ? c.red : c.light, size: 32 })),
  d.label(840, 500, "Hier prüfen: Stimmen ERP und Lieferdaten überein?", { size: 32, color: c.yellow, anchor: "middle" })
);

document.getElementById("fig-agent-fit").innerHTML = d.svg(1680, 590,
  d.box(60, 90, 700, 260, "Workflow\nA → B → C → D", { border: c.blue, size: 48 }),
  d.box(920, 90, 700, 260, "Agent\nbeobachten → wählen → handeln", { border: c.yellow, size: 32 }),
  d.label(410, 455, "stabiler Prozess", { size: 32, color: c.gray, anchor: "middle" }),
  d.label(1270, 455, "offene, wechselnde Schritte", { size: 32, color: c.gray, anchor: "middle" })
);

// Teil 11: Die sieben Phasen bleiben geometrisch gleich; nur der Fokus wechselt.
const decisionPhases = ["Information", "Prognose", "Bewertung", "Optionen", "Entscheidung", "Handlung", "Feedback"];
function decisionChain(active, lower = []) {
  return d.svg(1680, 590,
    `<g transform="scale(${1680 / 1880} 1)">`,
    ...decisionPhases.slice(0, -1).map((_, i) => d.arrow(265 + i * 265, 190, 290 + i * 265, 190, { color: c.gray, width: 3, head: 13 })),
    ...decisionPhases.map((label, i) => d.box(25 + i * 265, 115, 240, 150, label, { border: active === -1 ? c.blue : i === active ? c.yellow : c.gray, size: 32 })),
    ...lower,
    `</g>`
  );
}
document.getElementById("fig-human-divider").innerHTML = d.svg(760, 610,
  d.arrow(195, 185, 310, 400, { color: c.yellow, width: 4 }),
  d.arrow(565, 185, 450, 400, { color: c.yellow, width: 4 }),
  d.box(55, 65, 280, 120, "Mensch", { border: c.light, size: 32 }),
  d.box(425, 65, 280, 120, "KI", { border: c.blue, size: 32 }),
  d.box(195, 400, 370, 140, "Entscheidung", { border: c.yellow, size: 48 })
);
document.getElementById("fig-human-chain-all").innerHTML = decisionChain(-1,
  [d.label(940, 455, "Wer übernimmt welche Funktion – und unter welchen Bedingungen?", { size: 32, color: c.gray, anchor: "middle" })]);
document.getElementById("fig-human-chain-info").innerHTML = decisionChain(0,
  [d.arrow(680, 395, 895, 395, { color: c.gray, width: 3 }), d.arrow(1125, 395, 1340, 395, { color: c.gray, width: 3 }),
   d.box(220, 325, 460, 140, "Dokumente + Daten", { border: c.light, size: 32 }),
   d.box(895, 325, 230, 140, "KI", { border: c.blue, size: 48 }),
   d.box(1340, 325, 350, 140, "relevante Stellen", { border: c.yellow, size: 32 })]);
document.getElementById("fig-human-chain-analysis").innerHTML = decisionChain(1,
  [d.arrow(655, 395, 790, 395, { color: c.gray, width: 3 }), d.arrow(1120, 395, 1250, 395, { color: c.gray, width: 3 }),
   d.box(230, 325, 425, 140, "Produktionsdaten", { border: c.light, size: 32 }),
   d.box(790, 325, 330, 140, "Modell", { border: c.blue, size: 48 }),
   d.box(1250, 325, 420, 140, "Prognose", { border: c.yellow, size: 48 })]);
document.getElementById("fig-human-chain-value").innerHTML = decisionChain(2,
  [d.arrow(680, 395, 780, 395, { color: c.gray, width: 3 }), d.arrow(1190, 395, 1090, 395, { color: c.gray, width: 3 }),
   d.box(250, 325, 430, 140, "Mehrkosten", { border: c.light, size: 32 }),
   d.box(780, 325, 310, 140, "abwägen", { border: c.yellow, size: 32 }),
   d.box(1190, 325, 450, 140, "Qualitätsrisiko", { border: c.light, size: 32 })]);
document.getElementById("fig-human-chain-options").innerHTML = decisionChain(3,
  [d.box(70, 330, 390, 130, "abwarten", { border: c.light, size: 32 }),
   d.box(510, 330, 390, 130, "eilig bestellen", { border: c.yellow, size: 32 }),
   d.box(950, 330, 390, 130, "umplanen", { border: c.light, size: 32 }),
   d.box(1390, 330, 390, 130, "Ersatz prüfen", { border: c.light, size: 32 })]);
document.getElementById("fig-human-chain-select").innerHTML = decisionChain(4,
  [d.arrow(630, 395, 740, 395, { color: c.gray, width: 3 }), d.arrow(1110, 395, 1220, 395, { color: c.gray, width: 3 }),
   d.box(180, 325, 450, 140, "Alternativen", { border: c.light, size: 32 }),
   d.box(740, 325, 370, 140, "Kriterien", { border: c.yellow, size: 48 }),
   d.box(1220, 325, 450, 140, "Empfehlung", { border: c.blue, size: 32 })]);
document.getElementById("fig-human-chain-action").innerHTML = decisionChain(5,
  [d.arrow(600, 395, 710, 395, { color: c.gray, width: 3 }), d.arrow(1150, 395, 1260, 395, { color: c.gray, width: 3 }),
   d.box(150, 325, 450, 140, "Empfehlung", { border: c.light, size: 32 }),
   d.box(710, 325, 440, 140, "Freigabe / Grenze", { border: c.yellow, size: 32 }),
   d.box(1260, 325, 450, 140, "Bestellung", { border: c.blue, size: 32 })]);

document.getElementById("fig-human-study-baseline").innerHTML = d.svg(1680, 570,
  d.box(40, 130, 440, 220, "Mensch\nallein", { border: c.light, size: 48 }),
  d.box(620, 130, 440, 220, "KI\nallein", { border: c.blue, size: 48 }),
  d.box(1200, 130, 440, 220, "Mensch + KI", { border: c.yellow, size: 48 }),
  d.label(840, 475, "Messlatte: der jeweils bessere Einzelbeitrag", { size: 32, color: c.gray, anchor: "middle" })
);
document.getElementById("fig-human-study-split").innerHTML = d.svg(1680, 600,
  d.arrow(680, 185, 970, 185, { color: c.gray, width: 4 }),
  d.arrow(680, 425, 970, 425, { color: c.yellow, width: 4 }),
  d.box(70, 105, 610, 160, "Mensch allein > KI allein", { border: c.light, size: 32 }),
  d.box(970, 105, 640, 160, "Team > beide", { border: c.light, size: 48 }),
  d.box(70, 345, 610, 160, "KI allein > Mensch allein", { border: c.yellow, size: 32 }),
  d.box(970, 345, 640, 160, "Team < KI allein", { border: c.yellow, size: 48 })
);
document.getElementById("fig-human-complement").innerHTML = d.svg(1680, 590,
  `<ellipse cx="680" cy="270" rx="450" ry="205" fill="none" stroke="${c.light}" stroke-width="3"/>`,
  `<ellipse cx="1000" cy="270" rx="450" ry="205" fill="none" stroke="${c.blue}" stroke-width="3"/>`,
  d.label(490, 260, "Mensch", { size: 48, color: c.light, anchor: "middle" }),
  d.label(1190, 260, "KI", { size: 48, color: c.blue, anchor: "middle" }),
  d.label(840, 275, "Übergabe", { size: 32, color: c.yellow, anchor: "middle" }),
  d.label(840, 540, "Informations- und Fähigkeitsunterschiede sinnvoll nutzen", { size: 32, color: c.gray, anchor: "middle" })
);

document.getElementById("fig-human-trust").innerHTML = d.svg(1680, 590,
  `<path d="M300 400 C650 355 1040 265 1450 130 L1450 210 C1040 345 650 435 300 480 Z" fill="${c.yellow}" fill-opacity="0.12"/>`,
  d.arrow(250, 475, 1510, 475, { color: c.gray, width: 3 }),
  d.arrow(250, 475, 250, 95, { color: c.gray, width: 3 }),
  `<path d="M300 440 C650 395 1040 305 1450 170" fill="none" stroke="${c.yellow}" stroke-width="5" stroke-dasharray="14 10"/>`,
  d.label(250, 55, "Nutzung der KI-Empfehlung", { size: 32, color: c.gray }),
  d.label(215, 145, "hoch", { size: 20, color: c.gray, anchor: "end" }),
  d.label(215, 465, "gering", { size: 20, color: c.gray, anchor: "end" }),
  d.label(325, 520, "gering", { size: 20, color: c.gray }),
  d.label(1490, 520, "hoch", { size: 20, color: c.gray, anchor: "end" }),
  d.label(875, 565, "Zuverlässigkeit der KI für diese Aufgabe", { size: 32, color: c.gray, anchor: "middle" }),
  d.label(520, 175, "zu viel Nutzung", { size: 32, color: c.light, anchor: "middle" }),
  d.label(955, 245, "angemessene Nutzung", { size: 32, color: c.yellow, anchor: "middle" }),
  d.label(1230, 410, "zu wenig Nutzung", { size: 32, color: c.light, anchor: "middle" })
);
document.getElementById("fig-human-overreliance").innerHTML = d.svg(1680, 580,
  d.arrow(485, 280, 620, 280, { color: c.gray, width: 4 }),
  d.arrow(1060, 280, 1190, 280, { color: c.red, width: 4 }),
  d.box(45, 170, 440, 220, "falsche\nKI-Empfehlung", { border: c.red, size: 32 }),
  d.box(620, 170, 440, 220, "keine Prüfung", { border: c.yellow, size: 48 }),
  d.box(1190, 170, 440, 220, "ungeprüft\nübernommen", { border: c.red, size: 32 })
);
document.getElementById("fig-human-aversion").innerHTML = d.svg(1680, 580,
  d.arrow(240, 460, 1500, 460, { color: c.gray, width: 3 }),
  d.arrow(240, 460, 240, 90, { color: c.gray, width: 3 }),
  `<path d="M240 180 H760 L900 385 H1500" fill="none" stroke="${c.yellow}" stroke-width="5"/>`,
  d.line(760, 150, 760, 460, { color: c.red, width: 3, dashed: true }),
  d.label(240, 55, "Nutzung der KI-Empfehlung", { size: 32, color: c.gray }),
  d.label(205, 180, "hoch", { size: 20, color: c.gray, anchor: "end" }),
  d.label(205, 445, "gering", { size: 20, color: c.gray, anchor: "end" }),
  d.label(760, 120, "sichtbarer Fehler", { size: 32, color: c.red, anchor: "middle" }),
  d.label(475, 540, "vor dem Fehler", { size: 32, color: c.gray, anchor: "middle" }),
  d.label(1170, 540, "danach", { size: 32, color: c.gray, anchor: "middle" })
);
document.getElementById("fig-human-appreciation").innerHTML = d.svg(1680, 580,
  d.box(95, 130, 620, 270, "Empfehlung\nvon einer Person", { border: c.light, size: 32 }),
  d.box(965, 130, 620, 270, "gleiche Empfehlung\nvon einem Algorithmus", { border: c.blue, size: 32 }),
  d.label(840, 505, "Der wahrgenommene Absender kann die Gewichtung verändern.", { size: 32, color: c.gray, anchor: "middle" })
);
document.getElementById("fig-human-explain").innerHTML = d.svg(1680, 580,
  d.arrow(720, 285, 960, 285, { color: c.gray, width: 4 }),
  d.box(120, 155, 600, 260, "plausible\nErklärung", { border: c.blue, size: 48 }),
  d.box(960, 155, 600, 260, "Prüfung an\nDaten und Quellen", { border: c.yellow, size: 32 }),
  d.label(840, 505, "Verstehen → noch nicht: bewiesen", { size: 32, color: c.gray, anchor: "middle" })
);
document.getElementById("fig-human-false-explain").innerHTML = d.svg(1680, 580,
  d.arrow(690, 285, 850, 285, { color: c.gray, width: 4 }),
  d.arrow(1180, 285, 1310, 285, { color: c.yellow, width: 4 }),
  d.box(40, 155, 650, 260, "falsche Empfehlung\n+ plausible Erklärung", { border: c.red, size: 32 }),
  d.box(850, 155, 330, 260, "prüfen", { border: c.yellow, size: 48 }),
  d.box(1310, 155, 330, 260, "Fakten", { border: c.blue, size: 48 })
);
document.getElementById("fig-human-first").innerHTML = d.svg(1680, 580,
  ...[360, 780, 1200].map(x => d.arrow(x, 290, x + 60, 290, { color: c.gray, width: 4 })),
  ...["eigenes\nErsturteil", "KI-Vorschlag", "Unterschiede\nprüfen", "Entscheidung"].map((label, i) =>
    d.box(20 + i * 420, 195, 340, 190, label, { border: i === 0 ? c.blue : i === 2 ? c.yellow : c.light, size: 32 }))
);
document.getElementById("fig-human-counter").innerHTML = d.svg(1680, 580,
  d.arrow(480, 280, 620, 280, { color: c.gray, width: 4 }),
  d.arrow(1050, 280, 1190, 280, { color: c.gray, width: 4 }),
  d.box(40, 165, 440, 230, "Empfehlung", { border: c.blue, size: 48 }),
  d.box(620, 165, 430, 230, "Was würde\nsie kippen?", { border: c.yellow, size: 32 }),
  d.box(1190, 165, 440, 230, "gezielte\nNachfrage", { border: c.light, size: 32 })
);
document.getElementById("fig-human-approve").innerHTML = d.svg(1680, 580,
  d.box(570, 180, 540, 200, "Freigeben", { border: c.yellow, size: 48 }),
  d.label(300, 120, "Information fehlt", { size: 32, color: c.red, anchor: "middle" }),
  d.label(1380, 120, "Zeit fehlt", { size: 32, color: c.red, anchor: "middle" }),
  d.label(840, 505, "Kein Eingriff ohne echte Alternative", { size: 32, color: c.gray, anchor: "middle" })
);
document.getElementById("fig-human-irony").innerHTML = d.svg(1680, 580,
  d.arrow(700, 195, 960, 195, { color: c.gray, width: 4 }),
  d.arrow(700, 415, 960, 415, { color: c.yellow, width: 4 }),
  d.box(80, 115, 620, 160, "viele Routinefälle", { border: c.light, size: 32 }),
  d.box(960, 115, 620, 160, "Automation", { border: c.blue, size: 48 }),
  d.box(80, 335, 620, 160, "wenige schwierige Ausnahmen", { border: c.yellow, size: 32 }),
  d.box(960, 335, 620, 160, "Mensch übernimmt", { border: c.yellow, size: 32 })
);
document.getElementById("fig-human-workshift").innerHTML = d.svg(1680, 580,
  d.label(40, 70, "Bisher: Fachperson erstellt selbst", { size: 32, color: c.gray }),
  d.label(40, 315, "Mit KI: Fachperson prüft und steuert", { size: 32, color: c.blue }),
  ...[505, 1080].map(x => d.arrow(x, 188, x + 95, 188, { color: c.gray, width: 4 })),
  ...[505, 1080].map(x => d.arrow(x, 433, x + 95, 433, { color: c.gray, width: 4 })),
  d.box(25, 110, 480, 155, "Informationen\nsammeln", { border: c.light, size: 32 }),
  d.box(600, 110, 480, 155, "Zusammenfassung\nformulieren", { border: c.light, size: 32 }),
  d.box(1175, 110, 480, 155, "Ergebnis\nprüfen", { border: c.light, size: 32 }),
  d.box(25, 355, 480, 155, "KI erstellt\nErstentwurf", { border: c.blue, size: 32 }),
  d.box(600, 355, 480, 155, "Mensch prüft\nQuellen", { border: c.yellow, size: 32 }),
  d.box(1175, 355, 480, 155, "Mensch ordnet ein\nund entscheidet", { border: c.yellow, size: 32 })
);
document.getElementById("fig-human-reviewload").innerHTML = d.svg(1680, 580,
  d.label(295, 78, "KI-Ausgaben", { size: 32, color: c.gray, anchor: "middle" }),
  ...Array.from({ length: 8 }, (_, i) => {
    const x = 48 + (i % 4) * 135, y = 125 + Math.floor(i / 4) * 150;
    return [
      `<rect x="${x}" y="${y}" width="110" height="118" rx="6" fill="none" stroke="${c.light}" stroke-width="2"/>`,
      `<line x1="${x + 16}" y1="${y + 30}" x2="${x + 94}" y2="${y + 30}" stroke="${c.gray}" stroke-width="3"/>`,
      `<line x1="${x + 16}" y1="${y + 58}" x2="${x + 82}" y2="${y + 58}" stroke="${c.gray}" stroke-width="3"/>`,
      `<line x1="${x + 16}" y1="${y + 86}" x2="${x + 91}" y2="${y + 86}" stroke="${c.gray}" stroke-width="3"/>`
    ];
  }).flat(),
  d.arrow(595, 300, 710, 300, { color: c.gray, width: 4 }),
  d.arrow(1140, 300, 1280, 300, { color: c.gray, width: 4 }),
  d.box(710, 180, 430, 240, "fachlich\nprüfen", { border: c.yellow, size: 48 }),
  d.box(1280, 195, 345, 210, "freigeben\noder eskalieren", { border: c.blue, size: 32 }),
  d.label(295, 465, "Fehler erst an der Quelle erkennbar", { size: 32, color: c.yellow, anchor: "middle" }),
  d.box(710, 465, 280, 85, "Fallzahl", { border: c.gray, size: 32 }),
  d.box(1005, 465, 280, 85, "Prüfzeit", { border: c.yellow, size: 32 }),
  d.box(1300, 465, 325, 85, "Quellenzugang", { border: c.gray, size: 32 })
);

document.getElementById("fig-human-risk-harm").innerHTML = d.svg(1680, 580,
  d.box(80, 145, 650, 250, "E-Mail-Entwurf\nvorlegen", { border: c.blue, size: 48 }),
  d.box(950, 145, 650, 250, "Bestellung\nauslösen", { border: c.yellow, size: 48 }),
  d.label(405, 480, "zunächst intern", { size: 32, color: c.gray, anchor: "middle" }),
  d.label(1275, 480, "Wirkung nach außen", { size: 32, color: c.gray, anchor: "middle" })
);
document.getElementById("fig-human-risk-reverse").innerHTML = d.svg(1680, 580,
  d.line(190, 315, 1490, 315, { color: c.gray, width: 4 }),
  d.box(175, 175, 510, 230, "Entwurf ändern", { border: c.blue, size: 48 }),
  d.box(995, 175, 510, 230, "Bestellung stornieren", { border: c.yellow, size: 32 }),
  d.label(430, 505, "leicht korrigierbar", { size: 32, color: c.gray, anchor: "middle" }),
  d.label(1250, 505, "Zeitfenster und Kosten", { size: 32, color: c.gray, anchor: "middle" })
);
document.getElementById("fig-human-risk-detect").innerHTML = d.svg(1680, 580,
  d.arrow(680, 180, 900, 180, { color: c.blue, width: 4 }),
  d.arrow(680, 410, 900, 410, { color: c.yellow, width: 4 }),
  d.box(90, 105, 590, 150, "Fehler", { border: c.light, size: 48 }),
  d.box(900, 105, 690, 150, "sofort sichtbar", { border: c.blue, size: 32 }),
  d.box(90, 335, 590, 150, "Fehler", { border: c.light, size: 48 }),
  d.box(900, 335, 690, 150, "erst nach Auslieferung", { border: c.yellow, size: 32 })
);
document.getElementById("fig-human-risk-uncertain").innerHTML = d.svg(1680, 580,
  d.arrow(710, 290, 950, 290, { color: c.gray, width: 4 }),
  d.box(85, 155, 625, 270, "fehlende\nStatusdaten", { border: c.red, size: 48 }),
  d.box(950, 155, 645, 270, "präzise wirkende\nPrognosezahl", { border: c.yellow, size: 32 }),
  d.label(840, 520, "Zahl und Datenqualität getrennt prüfen", { size: 32, color: c.gray, anchor: "middle" })
);
document.getElementById("fig-human-responsibility").innerHTML = d.svg(1680, 580,
  ...[330, 660, 990, 1320].map(x => d.arrow(x, 295, x + 20, 295, { color: c.gray, width: 3, head: 12 })),
  ...["Ziel", "System\ngestalten", "nutzen", "handeln", "überprüfen"].map((label, i) =>
    d.box(20 + i * 330, 190, 310, 210, label, { border: i === 1 ? c.yellow : i === 3 ? c.blue : c.light, size: 32 }))
);
document.getElementById("fig-human-position").innerHTML = d.svg(1680, 350,
  d.line(220, 135, 1460, 135, { color: c.gray, width: 5 }),
  d.box(20, 200, 590, 130, "KI darf selbst ausführen", { border: c.blue, size: 32 }),
  d.box(1070, 200, 590, 130, "Mensch gibt jedes Mal frei", { border: c.yellow, size: 32 }),
  d.label(840, 90, "Welche Bedingung bestimmt eure Position?", { size: 32, color: c.gray, anchor: "middle" })
);

document.getElementById("fig-closing-questions").innerHTML = d.svg(1680, 715,
  ...[
    "Was ist hier eigentlich die Entscheidung?",
    "Wobei kann KI konkret helfen?",
    "Wo kann das System irren oder scheitern?",
    "Was müssen Menschen beurteilen oder verantworten?",
    "Welche Kontrolle liegt vor der realen Handlung?"
  ].flatMap((question, i) => [
    `<rect x="80" y="${20 + i * 132}" width="1520" height="106" rx="9" fill="none" stroke="${i === 4 ? c.yellow : c.gray}" stroke-width="2"/>`,
    d.label(125, 88 + i * 132, String(i + 1).padStart(2, "0"), { size: 32, color: c.blue }),
    d.label(245, 88 + i * 132, question, { size: 32, color: i === 4 ? c.yellow : c.light })
  ])
);
