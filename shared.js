"use strict";
/* ============ Datos del cuestionario (mismo texto que el Forms) ============ */
const CFG = window.TFG_CONFIG || {};
const TUTOR = CFG.TUTOR || "Gabriel Valverde Castilla";
const AREA = CFG.AREA || "Análisis de Negocios";
const CURSO = CFG.CURSO || "2026/27";
const LINES = [
  { id: "ia", name: "IA generativa y productividad empresarial", short: "IA generativa" },
  { id: "churn", name: "Predicción de ventas o abandono de clientes", short: "Ventas / abandono" },
  { id: "sent", name: "Sentimiento y reputación digital", short: "Sentimiento" },
  { id: "bi", name: "Business Intelligence para pymes", short: "BI para pymes" },
  { id: "fraud", name: "Detección de fraude o anomalías", short: "Fraude / anomalías" },
  { id: "reco", name: "Sistemas de recomendación", short: "Recomendadores" },
];
const LINE_NAMES = LINES.map(l => l.name);
const SECTIONS = [
  { k: "A", t: "Perfil y situación académica", q: [
    { id: "q1", t: "Nombre y apellidos", type: "text" },
    { id: "q2", t: "Correo universitario", type: "email" },
    { id: "q3", t: "¿En qué curso estás y qué asignaturas tienes pendientes?", type: "text" },
    { id: "q4", t: "¿Qué modalidad de TFG estás realizando y qué fechas de entrega conoces?", type: "text" },
    { id: "q5", t: "¿Cuál es tu nota media aproximada? (Si no la conoces, indícalo)", type: "text" },
  ]},
  { k: "B", t: "Asignaturas cursadas y calificaciones", q: [
    { id: "q6", t: "Programación I / introducción a la programación: nota y lenguaje utilizado (o no cursada)", type: "grade", dim: "prog" },
    { id: "q7", t: "Programación II / programación avanzada: nota, contenidos y si la has cursado", type: "grade", dim: "prog" },
    { id: "q8", t: "Estadística y probabilidad: nota y temas que mejor dominas", type: "grade", dim: "stats" },
    { id: "q9", t: "Bases de datos y SQL: nota y experiencia con consultas", type: "grade", dim: "prog" },
    { id: "q10", t: "Minería de datos / aprendizaje automático: nota, herramientas y proyectos", type: "grade", dim: "ml" },
    { id: "q11", t: "Inteligencia Artificial: nota, contenidos y aplicación realizada", type: "grade", dim: "ml" },
    { id: "q12", t: "Econometría / modelos cuantitativos: nota y capacidad para interpretar resultados", type: "grade", dim: "stats" },
    { id: "q13", t: "Dirección estratégica / marketing / finanzas: ¿en cuáles destacas y con qué notas?", type: "grade", dim: "biz" },
    { id: "q14", t: "¿Qué otras asignaturas del grado has cursado que sean relevantes para tu TFG? Indica sus notas.", type: "area" },
    { id: "q15", t: "¿Qué dos asignaturas te han gustado más y cuáles dos te han resultado más difíciles? ¿Por qué?", type: "area" },
  ]},
  { k: "C", t: "Competencias prácticas", q: [
    { id: "q16", t: "¿Cómo describirías tu nivel de Python?", type: "choice", o: ["No lo he utilizado", "Básico: variables, condicionales, bucles", "Intermedio: funciones, pandas y gráficos", "Avanzado: proyectos autónomos, paquetes y modelos"] },
    { id: "q17", t: "¿Qué puedes hacer con SQL sin ayuda?", type: "choice", o: ["Nada todavía", "SELECT y filtros", "JOIN, GROUP BY y subconsultas", "Consultas complejas y diseño de datos"] },
    { id: "q18", t: "¿Qué nivel de Excel y Power BI tienes? Explica por separado ejemplos reales.", type: "area" },
    { id: "q19", t: "¿Has entrenado modelos predictivos o estadísticos con datos reales? Describe uno y cómo lo evaluaste.", type: "area" },
    { id: "q20", t: "¿Podrías explicar con tus palabras la diferencia entre correlación y causalidad? Da un ejemplo empresarial.", type: "area" },
    { id: "q21", t: "¿Qué herramientas de IA generativa utilizas y para qué tareas académicas o técnicas?", type: "area" },
    { id: "q22", t: "En un proyecto de datos, ¿qué parte te gusta más?", type: "choice", o: ["Definir el problema de negocio", "Recopilar y limpiar datos", "Programar y modelizar", "Visualizar y comunicar resultados", "Diseñar recomendaciones empresariales"] },
  ]},
  { k: "D", t: "GitHub y gestión de proyectos", q: [
    { id: "q23", t: "¿Has utilizado Git y GitHub anteriormente?", type: "choice", o: ["Nunca", "Solo he descargado repositorios", "He hecho commits y push", "He trabajado con ramas y pull requests"] },
    { id: "q24", t: "¿Dispones de cuenta de GitHub? Si quieres, indica tu usuario.", type: "text" },
    { id: "q25", t: "¿Has utilizado alguna herramienta de organización de proyectos?", type: "choice", o: ["Ninguna", "Trello / Notion", "Planner / Teams", "Jira / GitHub Projects", "Otra"] },
    { id: "q26", t: "¿Has trabajado con tableros Kanban, tareas y entregas cortas? Describe tu experiencia.", type: "area" },
    { id: "q27", t: "¿Podrías dedicar 3-5 horas a la semana al TFG de forma sostenida?", type: "choice", o: ["Sí", "Depende de la semana", "No, necesito acordar otra dedicación"] },
    { id: "q28", t: "Para las tutorías, ¿prefieres revisión semanal o quincenal?", type: "choice", o: ["Semanal", "Quincenal", "Indiferente"] },
  ]},
  { k: "E", t: "Intereses y elección del TFG", q: [
    { id: "q29", t: "¿Qué línea de TFG te interesa más?", type: "choice", o: LINE_NAMES },
    { id: "q30", t: "¿Cuál sería tu segunda opción?", type: "choice", o: LINE_NAMES },
    { id: "q31", t: "¿Qué sector empresarial te motiva más (banca, retail, salud, deporte, energía, etc.) y por qué?", type: "area" },
    { id: "q32", t: "¿Prefieres un TFG aplicado con datos y prototipo o uno más orientado a análisis de negocio e investigación?", type: "choice", o: ["Aplicado con datos y código", "Mixto: análisis y pequeño prototipo", "Investigación y análisis empresarial"] },
    { id: "q33", t: "¿Tienes acceso a una empresa, un caso real o datos que puedan utilizarse legalmente y de forma autorizada?", type: "area" },
    { id: "q34", t: "Propón una pregunta de negocio que te gustaría responder con datos.", type: "area" },
  ]},
  { k: "F", t: "Organización y expectativas", q: [
    { id: "q35", t: "¿Qué esperas aprender al finalizar el TFG?", type: "area" },
    { id: "q36", t: "¿Qué dificultades anticipas (programación, estadística, tiempo, escritura académica, datos, otras)?", type: "area" },
    { id: "q37", t: "¿Cuántas horas reales por semana prevés dedicar al TFG?", type: "choice", o: ["Menos de 3", "Entre 3 y 5", "Entre 6 y 8", "Más de 8"] },
    { id: "q38", t: "¿Tienes alguna restricción de disponibilidad para tutorías?", type: "area" },
    { id: "q39", t: "¿Qué te gustaría contarme antes de nuestra primera reunión?", type: "area" },
  ]},
];
const QUESTIONS = SECTIONS.flatMap(s => s.q);
const QNUM = Object.fromEntries(QUESTIONS.map((q, i) => [q.id, i + 1]));

/* ============ Motor de recomendación (función pura) ============ */
const SECTORS = [
  { k: "banca", re: /banc|financ|fintech|inversi|bolsa|crédit|credit/i, label: "banca" },
  { k: "seguros", re: /segur|asegurad/i, label: "seguros" },
  { k: "retail", re: /retail|comerci|tienda|supermerc|distribuc|gran consumo|consumo/i, label: "retail" },
  { k: "ecommerce", re: /e-?commerce|comercio electr|online|marketplace/i, label: "comercio electrónico" },
  { k: "moda", re: /moda|textil|lujo|fashion/i, label: "moda" },
  { k: "salud", re: /salud|sanit|hospital|farma|clínic|clinic/i, label: "salud" },
  { k: "deporte", re: /deport|fútbol|futbol|gimnas|fitness|club/i, label: "deporte" },
  { k: "energia", re: /energ|eléctric|electric|utilit|renovab/i, label: "energía" },
  { k: "turismo", re: /turism|hotel|viaj|hostel|restaura|ocio/i, label: "turismo y hostelería" },
  { k: "telecom", re: /telec|telefon|operador/i, label: "telecomunicaciones" },
  { k: "tecnologia", re: /tecnolog|software|startup|digital|saas/i, label: "tecnología" },
  { k: "marketing", re: /marketing|publicid|marca|redes sociales/i, label: "marketing" },
  { k: "rrhh", re: /recursos humanos|rrhh|talento|empleo/i, label: "recursos humanos" },
  { k: "consultoria", re: /consultor|auditor/i, label: "consultoría" },
  { k: "musica", re: /música|musica|streaming|cine|entretenim|videojuego/i, label: "entretenimiento" },
  { k: "logistica", re: /logíst|logist|transporte|movilidad/i, label: "logística" },
  { k: "pyme", re: /pyme|pequeña empresa|negocio familiar|autónom/i, label: "pymes" },
  { k: "educacion", re: /educa|universidad|formaci/i, label: "educación" },
];
// Necesidades por línea: nivel de cada dimensión (0-1) y peso. dims: code, stats, ml, biz.
const PROFILE = {
  ia:    { need: { code: .30, stats: .45, ml: .25, biz: .55 }, w: { code: .5, stats: 1, ml: .6, biz: 1 }, fav: { "Definir el problema de negocio": 1, "Diseñar recomendaciones empresariales": .9, "Visualizar y comunicar resultados": .5 }, pref: { "Investigación y análisis empresarial": 1, "Mixto: análisis y pequeño prototipo": .8, "Aplicado con datos y código": .45 }, sectors: ["tecnologia", "consultoria", "educacion", "rrhh", "marketing"] },
  churn: { need: { code: .60, stats: .60, ml: .60, biz: .45 }, w: { code: 1, stats: 1, ml: 1, biz: .6 }, fav: { "Programar y modelizar": 1, "Recopilar y limpiar datos": .6, "Diseñar recomendaciones empresariales": .5 }, pref: { "Aplicado con datos y código": 1, "Mixto: análisis y pequeño prototipo": .75, "Investigación y análisis empresarial": .25 }, sectors: ["telecom", "banca", "seguros", "retail", "energia", "deporte", "ecommerce", "musica"] },
  sent:  { need: { code: .45, stats: .45, ml: .40, biz: .50 }, w: { code: .8, stats: .7, ml: .7, biz: .8 }, fav: { "Visualizar y comunicar resultados": 1, "Recopilar y limpiar datos": .7, "Definir el problema de negocio": .5 }, pref: { "Mixto: análisis y pequeño prototipo": 1, "Aplicado con datos y código": .8, "Investigación y análisis empresarial": .6 }, sectors: ["turismo", "moda", "retail", "marketing", "ecommerce", "musica", "deporte", "salud"] },
  bi:    { need: { code: .20, stats: .35, ml: .10, biz: .60 }, w: { code: .5, stats: .6, ml: .2, biz: 1 }, fav: { "Visualizar y comunicar resultados": 1, "Diseñar recomendaciones empresariales": .9, "Definir el problema de negocio": .8, "Recopilar y limpiar datos": .6 }, pref: { "Mixto: análisis y pequeño prototipo": 1, "Investigación y análisis empresarial": .75, "Aplicado con datos y código": .6 }, sectors: ["pyme", "retail", "turismo", "logistica", "moda", "salud", "deporte"] },
  fraud: { need: { code: .65, stats: .60, ml: .65, biz: .40 }, w: { code: 1, stats: 1, ml: 1, biz: .5 }, fav: { "Programar y modelizar": 1, "Recopilar y limpiar datos": .7 }, pref: { "Aplicado con datos y código": 1, "Mixto: análisis y pequeño prototipo": .6, "Investigación y análisis empresarial": .2 }, sectors: ["banca", "seguros", "ecommerce", "consultoria", "telecom", "energia"] },
  reco:  { need: { code: .65, stats: .50, ml: .60, biz: .45 }, w: { code: 1, stats: .8, ml: 1, biz: .6 }, fav: { "Programar y modelizar": 1, "Diseñar recomendaciones empresariales": .6, "Recopilar y limpiar datos": .5 }, pref: { "Aplicado con datos y código": 1, "Mixto: análisis y pequeño prototipo": .65, "Investigación y análisis empresarial": .2 }, sectors: ["retail", "ecommerce", "moda", "musica", "turismo", "deporte"] },
};
const TITLES = {
  ia: s => `Impacto de la IA generativa en la productividad y la calidad del trabajo en ${s}: diseño experimental y evaluación`,
  churn: s => `Predicción del abandono de clientes en ${s} y valoración económica de una estrategia de retención`,
  sent: s => `Análisis de sentimiento de reseñas y reputación digital en ${s}: de la opinión del cliente a la decisión comercial`,
  bi: s => `Diseño de un cuadro de mando para la toma de decisiones en ${s}: KPI, visualización y recomendaciones`,
  fraud: s => `Detección de anomalías y fraude en ${s}: modelo de alertas y análisis coste-beneficio de las falsas alarmas`,
  reco: s => `Sistema de recomendación para ${s}: personalización y efecto esperado sobre las ventas`,
};
const DELIVERABLE = {
  ia: "Experimento con y sin IA, rúbrica de calidad y análisis de resultados",
  churn: "Modelo base + modelo mejorado, métricas y valor económico de la retención",
  sent: "Clasificación de sentimiento, temas principales e insights para negocio",
  bi: "Modelo de datos, dashboard con KPI y recomendaciones para la gerencia",
  fraud: "Detector de anomalías, umbral óptimo y análisis coste-beneficio",
  reco: "Recomendador, evaluación offline y estimación de impacto comercial",
};
const DEFAULT_SECTOR = { ia: "una empresa de servicios", churn: "una empresa de suscripción", sent: "una marca de consumo", bi: "una pyme", fraud: "el sector financiero", reco: "el comercio electrónico" };

function parseGrade(v) {
  if (v === null || v === undefined || v === "") return null;
  if (typeof v === "number") return isFinite(v) ? Math.max(0, Math.min(10, v)) : null;
  const m = String(v).replace(",", ".").match(/(\d+(?:\.\d+)?)/);
  if (!m) return null;
  const n = parseFloat(m[1]);
  return n >= 0 && n <= 10 ? n : null;
}
const isNotTaken = s => /no\s*(la\s*)?(he\s*)?cursad|no\s*cursad|no la he hecho|^\s*-\s*$|^n\/?a$/i.test(String(s || ""));
const filled = s => typeof s === "string" ? s.trim().length > 0 : s !== null && s !== undefined;
const mean = arr => { const v = arr.filter(x => x !== null && x !== undefined && !isNaN(x)); return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null; };
const clamp01 = x => Math.max(0, Math.min(1, x));

function gradeOf(a, id) {
  const g = a[id];
  if (!g || g.notTaken) return null;
  return parseGrade(g.grade);
}
function sectorsOf(a) {
  const txt = [a.q31, a.q33, a.q34].filter(Boolean).join(" ");
  return SECTORS.filter(s => s.re.test(txt));
}

function recommend(a) {
  const idx = (id) => { const q = QUESTIONS.find(x => x.id === id); return a[id] ? q.o.indexOf(a[id]) : -1; };
  const py = idx("q16"), sql = idx("q17"), git = idx("q23");
  const gN = id => { const g = gradeOf(a, id); return g === null ? null : clamp01((g - 4) / 5.5); };
  const longTxt = (id, n) => filled(a[id]) && String(a[id]).trim().length >= n && !/^no\b|^nunca|^ninguno/i.test(String(a[id]).trim());

  const dims = {
    code: mean([py >= 0 ? py / 3 : null, sql >= 0 ? sql / 3 : null, gN("q6"), gN("q7"), gN("q9")]),
    stats: mean([gN("q8"), gN("q12"), longTxt("q20", 40) ? .75 : (filled(a.q20) ? .45 : null)]),
    ml: mean([gN("q10"), gN("q11"), longTxt("q19", 40) ? .85 : (filled(a.q19) ? .3 : null), py >= 2 ? .7 : (py >= 0 ? .25 : null)]),
    biz: mean([gN("q13"), ["Definir el problema de negocio", "Diseñar recomendaciones empresariales"].includes(a.q22) ? .85 : null, a.q32 === "Investigación y análisis empresarial" ? .7 : null]),
  };
  const known = Object.fromEntries(Object.entries(dims).map(([k, v]) => [k, v === null ? .5 : v]));
  const sectors = sectorsOf(a);
  const hoursLow = a.q37 === "Menos de 3" || a.q27 === "No, necesito acordar otra dedicación";
  const hoursHigh = a.q37 === "Entre 6 y 8" || a.q37 === "Más de 8";
  const hasData = longTxt("q33", 6);

  const scored = LINES.map(L => {
    const P = PROFILE[L.id];
    let wsum = 0, short = 0;
    for (const d of ["code", "stats", "ml", "biz"]) { wsum += P.w[d]; short += P.w[d] * Math.max(0, P.need[d] - known[d]); }
    const fit = clamp01(1 - (short / wsum) * 2.6);
    const interest = a.q29 === L.name ? 1 : a.q30 === L.name ? .55 : 0;
    const pref = a.q32 ? (P.pref[a.q32] ?? .5) : .5;
    const fav = a.q22 ? (P.fav[a.q22] ?? .2) : .4;
    const sec = sectors.some(s => P.sectors.includes(s.k)) ? 1 : 0;
    const techHeavy = P.need.code >= .6;
    const timePen = hoursLow && techHeavy ? .12 : 0;
    const raw = 0.34 * interest + 0.34 * fit + 0.12 * pref + 0.10 * fav + 0.10 * sec - timePen;
    return { ...L, score: Math.round(clamp01(raw) * 100), fit, interest, pref, fav, sec, P };
  }).sort((x, y) => y.score - x.score || y.fit - x.fit);

  const top = scored[0];
  const techLevel = known.code * .5 + known.ml * .3 + known.stats * .2;
  let scope;
  if (top.P.need.code >= .6) scope = techLevel >= .65 ? "Ambicioso: modelo base, modelo mejorado y evaluación económica" : techLevel >= .45 ? "Estándar: modelo interpretable y evaluación de negocio bien argumentada" : "Acotado: análisis descriptivo y modelo sencillo; reforzar Python en las primeras semanas";
  else scope = techLevel >= .55 ? "Estándar con prototipo funcional" : "Acotado con metodología sólida";
  if (hoursLow) scope += ". Dedicación baja: recortar alcance desde el principio";

  // Razones y huecos
  const why = [], gaps = [];
  if (top.interest === 1) why.push("Es su primera opción en el cuestionario.");
  else if (top.interest > 0) why.push("Es su segunda opción en el cuestionario.");
  else if (a.q29) why.push(`Su primera opción fue «${LINES.find(l => l.name === a.q29)?.short}», pero su perfil encaja mejor aquí.`);
  if (top.fit >= .8) why.push("Su nivel técnico cubre lo que pide esta línea.");
  else if (top.fit >= .55) why.push("Su nivel técnico es suficiente con un alcance ajustado.");
  const secHit = sectors.find(s => top.P.sectors.includes(s.k));
  if (secHit) why.push(`Le motiva el sector ${secHit.label}, que encaja con esta línea.`);
  if (a.q32 && top.pref >= .9) why.push(`Prefiere un TFG «${a.q32.split(":")[0].toLowerCase()}».`);
  if (a.q22 && top.fav >= .9) why.push(`Lo que más le gusta es «${a.q22.toLowerCase()}».`);
  for (const d of ["code", "stats", "ml", "biz"]) {
    if (dims[d] !== null && top.P.need[d] - dims[d] > .15) gaps.push({ code: "Programación y SQL por debajo de lo que pide la línea.", stats: "Base estadística justa para esta línea.", ml: "Poca experiencia entrenando modelos.", biz: "Perfil de negocio a reforzar en la parte de recomendaciones." }[d]);
  }

  const flags = [];
  if (hoursLow) flags.push({ t: "Dedicación prevista baja (menos de 3 h o no garantiza 3-5 h).", c: "bad" });
  else if (hoursHigh) flags.push({ t: "Dedicación alta: puede asumir un alcance más ambicioso.", c: "ok" });
  if (git === 0 || git === 1) flags.push({ t: "No ha trabajado con commits: dedicar la semana 1 a Git y GitHub.", c: "" });
  else if (git >= 2) flags.push({ t: "Ya usa Git: puede arrancar el repositorio sin formación previa.", c: "ok" });
  if (hasData) flags.push({ t: "Dice tener acceso a datos o a una empresa: verificar autorización y confidencialidad.", c: "ok" });
  else flags.push({ t: "Sin datos propios: usar un dataset público adecuado a la línea.", c: "" });
  if (!filled(a.q34)) flags.push({ t: "No ha propuesto pregunta de negocio: trabajarla en la primera tutoría.", c: "" });
  if (a.q28) flags.push({ t: `Prefiere tutorías: ${a.q28.toLowerCase()}.`, c: "ok" });

  const answered = QUESTIONS.filter(q => q.type === "grade" ? (a[q.id] && (a[q.id].notTaken || filled(String(a[q.id].grade ?? "")) || filled(a[q.id].comment))) : filled(a[q.id])).length;
  const sectorLabel = (secHit || sectors[0]) ? (secHit || sectors[0]).label : null;
  const sectorPhrase = sectorLabel ? (["banca", "seguros", "retail", "salud", "deporte", "marketing", "turismo y hostelería", "moda", "telecomunicaciones", "comercio electrónico", "logística", "educación", "consultoría", "energía", "tecnología", "entretenimiento", "recursos humanos"].includes(sectorLabel) ? `el sector de ${sectorLabel}` : sectorLabel) : DEFAULT_SECTOR[top.id];
  return {
    ranking: scored.map(({ id, name, short, score, fit }) => ({ id, name, short, score, fit })),
    top: { id: top.id, name: top.name, short: top.short, score: top.score },
    dims, scope, why, gaps, flags, answered, total: QUESTIONS.length,
    title: TITLES[top.id](sectorPhrase).replace(/^./, c => c.toUpperCase()),
    deliverable: DELIVERABLE[top.id],
    titleFor: (lineId) => TITLES[lineId](sectorLabel ? sectorPhrase : DEFAULT_SECTOR[lineId]),
  };
}

/* ============ Utilidades de interfaz compartidas ============ */
const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const chevSvg = '<svg class="chev" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 2l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.4"/></svg>';
const slug = s => (s || "alumno").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "alumno";
function blankAnswers() { const a = {}; for (const q of QUESTIONS) a[q.id] = q.type === "grade" ? { grade: "", notTaken: false, comment: "" } : ""; return a; }
function normalizeAnswers(a) { const b = blankAnswers(); for (const q of QUESTIONS) { const v = a ? a[q.id] : undefined; if (v === undefined || v === null) continue; if (q.type === "grade") b[q.id] = typeof v === "object" ? { grade: v.grade ?? "", notTaken: !!v.notTaken, comment: v.comment ?? "" } : { grade: "", notTaken: false, comment: String(v) }; else b[q.id] = typeof v === "string" ? v : String(v); } return b; }
function isAnswered(q, v) { return q.type === "grade" ? !!(v && (v.notTaken || String(v.grade ?? "") !== "" || filled(v.comment))) : filled(v); }
function secCount(sec, a) { return sec.q.filter(q => isAnswered(q, a[q.id])).length; }
function answeredCount(a) { return QUESTIONS.filter(q => isAnswered(q, a[q.id])).length; }
function answerText(q, v) {
  if (q.type === "grade") { if (!v) return ""; if (v.notTaken) return "No cursada" + (v.comment ? ` · ${v.comment}` : ""); return [v.grade !== "" && v.grade !== undefined ? `Nota ${v.grade}` : "", v.comment].filter(Boolean).join(" · "); }
  return v || "";
}
function qInput(q, val) {
  const n = `<span class="num">${QNUM[q.id]}.</span>`;
  if (q.type === "text" || q.type === "email") return `<div class="q"><label for="${q.id}">${n}${esc(q.t)}</label><input id="${q.id}" type="${q.type}" value="${esc(val)}" data-q="${q.id}"${q.id === "q1" || q.id === "q2" ? " required" : ""}></div>`;
  if (q.type === "area") return `<div class="q"><label for="${q.id}">${n}${esc(q.t)}</label><textarea id="${q.id}" data-q="${q.id}" rows="2">${esc(val)}</textarea></div>`;
  if (q.type === "grade") {
    const g = val || {};
    return `<div class="q"><div class="qlabel" id="${q.id}-l">${n}${esc(q.t)}</div>
      <div class="grade" role="group" aria-labelledby="${q.id}-l">
        <input id="${q.id}-g" type="number" min="0" max="10" step="0.1" placeholder="Nota" value="${esc(g.grade)}" data-q="${q.id}" data-f="grade" aria-label="Nota (0 a 10)" ${g.notTaken ? "disabled" : ""}>
        <label class="chk"><input id="${q.id}-nt" type="checkbox" data-q="${q.id}" data-f="notTaken" ${g.notTaken ? "checked" : ""}> No cursada</label>
        <input class="gcomment" id="${q.id}-c" type="text" placeholder="Comentario (lenguaje, temas, proyecto…)" value="${esc(g.comment)}" data-q="${q.id}" data-f="comment" aria-label="Comentario">
      </div></div>`;
  }
  if (q.type === "choice") {
    return `<div class="q" role="radiogroup" aria-labelledby="${q.id}-l"><div class="qlabel" id="${q.id}-l">${n}${esc(q.t)}</div><div class="opts">${q.o.map((o, i) =>
      `<label class="opt"><input type="radio" id="${q.id}-${i}" name="${q.id}" value="${esc(o)}" data-q="${q.id}" ${val === o ? "checked" : ""}><span>${esc(o)}</span></label>`).join("")}</div></div>`;
  }
}
// Aplica un evento de input del formulario a un objeto de respuestas. Devuelve el id de la pregunta o null.
function applyInput(a, el) {
  const id = el.dataset.q; if (!id) return null;
  const q = QUESTIONS.find(x => x.id === id); if (!q) return null;
  if (q.type === "grade") {
    const f = el.dataset.f;
    a[id] = a[id] || { grade: "", notTaken: false, comment: "" };
    a[id][f] = f === "notTaken" ? el.checked : el.value;
    if (f === "notTaken") { const g = document.getElementById(id + "-g"); if (g) g.disabled = el.checked; }
  } else a[id] = el.value;
  return id;
}
function configReady() { return CFG.SUPABASE_URL && !/TU-PROYECTO/.test(CFG.SUPABASE_URL) && CFG.SUPABASE_ANON_KEY && !/TU_CLAVE/.test(CFG.SUPABASE_ANON_KEY); }
function makeClient() { if (!configReady() || !window.supabase) return null; return window.supabase.createClient(CFG.SUPABASE_URL, CFG.SUPABASE_ANON_KEY); }
function downloadBlob(filename, data, type) {
  const blob = data instanceof Blob ? data : new Blob([data], { type: type || "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob); const a = document.createElement("a");
  a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
async function copyText(text, btn) {
  try { await navigator.clipboard.writeText(text); if (btn) { const o = btn.textContent; btn.textContent = "Copiado"; setTimeout(() => btn.textContent = o, 1500); } }
  catch (e) { const i = document.createElement("textarea"); i.value = text; document.body.appendChild(i); i.select(); try { document.execCommand("copy"); } catch (_) {} i.remove(); }
}
