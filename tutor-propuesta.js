"use strict";
/* ============ Propuesta de TFG (descripción del proyecto) ============ */
// Formato basado en las propuestas de TFM de la UCM y el anexo IV de CUNEF:
// curso, títulos (es/en), tipo, institución, tutor, estudiante, problema, objetivos, métodos y fases.
const PROP_TEMPLATES = {
  ia: {
    en: "Impact of Generative AI on Business Productivity and Work Quality: An Experimental Evaluation",
    problema: [
      "La IA generativa se está incorporando a tareas habituales de las empresas (redacción, análisis, atención al cliente), pero todavía hay poca evidencia cuantitativa sobre cuánto mejora realmente el tiempo y la calidad del trabajo, y en qué condiciones puede empeorarlos. En {sector}, la decisión afecta a la inversión en licencias, a la formación y al rediseño de procesos.",
      "Este TFG diseñará un experimento que compare una tarea de negocio realizada con y sin apoyo de IA generativa, medirá tiempo y calidad con una rúbrica y traducirá el resultado en una recomendación de adopción.",
    ],
    general: "Medir el efecto de la IA generativa sobre la productividad y la calidad en una tarea de negocio concreta y formular una recomendación de adopción basada en evidencia.",
    especificos: ["Revisar la literatura sobre IA generativa y productividad en la empresa.", "Diseñar el experimento: tarea, grupos, rúbrica de calidad y métricas.", "Recoger y analizar los resultados con contrastes estadísticos adecuados.", "Estimar el impacto económico y las condiciones de uso recomendadas."],
    fases: ["Delimitación de la tarea y de la pregunta de investigación.", "Estado del arte y diseño experimental.", "Preparación de materiales, rúbrica y prueba piloto.", "Ejecución del experimento y recogida de datos.", "Análisis estadístico e interpretación de negocio.", "Redacción de la memoria y preparación de la defensa."],
  },
  churn: {
    en: "Customer Churn Prediction and Economic Evaluation of a Retention Strategy",
    problema: [
      "Captar un cliente nuevo cuesta varias veces más que retener uno existente, y en {sector} la pérdida de clientes tiene un impacto directo en ingresos y márgenes. Sin embargo, muchas campañas de retención se dirigen a todos los clientes por igual, sin saber quién tiene más riesgo ni cuánto vale retenerlo.",
      "Este TFG construirá un modelo que estime la probabilidad de abandono de cada cliente y la combinará con su valor para decidir a quién dirigir la retención y con qué retorno esperado.",
    ],
    general: "Predecir el abandono de clientes y diseñar una estrategia de retención priorizada por valor económico.",
    especificos: ["Analizar y preparar los datos de clientes, uso y facturación.", "Entrenar un modelo base interpretable y un modelo mejorado, y compararlos con métricas adecuadas.", "Identificar los factores asociados al abandono.", "Estimar el retorno económico de distintas políticas de retención."],
    fases: ["Definición del problema, del KPI y de los datos disponibles.", "Revisión de la literatura sobre churn y valor del cliente.", "Limpieza, exploración y ingeniería de variables.", "Modelado: modelo base, modelo mejorado y validación.", "Simulación económica de la estrategia de retención.", "Redacción de la memoria y preparación de la defensa."],
  },
  sent: {
    en: "Sentiment Analysis of Customer Reviews and Digital Reputation: From Customer Opinion to Business Decisions",
    problema: [
      "Las reseñas y comentarios en línea influyen en la decisión de compra y en la reputación de las marcas, pero su volumen hace imposible analizarlas a mano. En {sector}, entender qué valoran y qué critican los clientes permite priorizar mejoras con impacto en ventas y fidelidad.",
      "Este TFG aplicará técnicas de procesamiento de lenguaje natural para clasificar el sentimiento y extraer los temas principales de las opiniones de clientes, y los relacionará con indicadores de negocio.",
    ],
    general: "Convertir las opiniones de los clientes en indicadores y recomendaciones de negocio mediante análisis de sentimiento y de temas.",
    especificos: ["Recopilar y depurar un corpus de reseñas u opiniones.", "Clasificar el sentimiento y comparar al menos dos enfoques.", "Identificar los temas que más pesan en las valoraciones positivas y negativas.", "Relacionar sentimiento y temas con indicadores de negocio y proponer acciones."],
    fases: ["Delimitación de la marca, el producto o el sector y de las fuentes.", "Estado del arte en análisis de sentimiento.", "Recogida y preparación del texto.", "Modelado de sentimiento y de temas, y validación.", "Interpretación de negocio y recomendaciones.", "Redacción de la memoria y preparación de la defensa."],
  },
  bi: {
    en: "Business Intelligence Dashboard for Decision-Making in SMEs: KPIs, Visualisation and Recommendations",
    problema: [
      "Muchas pequeñas y medianas empresas toman decisiones con información dispersa en hojas de cálculo y sin indicadores comunes. En {sector}, disponer de un cuadro de mando bien diseñado permite detectar a tiempo problemas de ventas, márgenes o stock.",
      "Este TFG diseñará el modelo de datos y un dashboard con los indicadores clave para la gerencia, y lo usará para extraer conclusiones y recomendaciones concretas.",
    ],
    general: "Diseñar e implantar un cuadro de mando que apoye la toma de decisiones de la dirección con indicadores fiables y accionables.",
    especificos: ["Identificar las decisiones clave y los KPI que las apoyan.", "Diseñar el modelo de datos e integrar las fuentes disponibles.", "Construir el dashboard siguiendo buenas prácticas de visualización.", "Analizar los resultados y formular recomendaciones de negocio."],
    fases: ["Entrevistas o análisis del negocio y definición de KPI.", "Revisión de buenas prácticas de BI y visualización.", "Preparación de datos y modelo dimensional.", "Construcción y validación del dashboard.", "Análisis de resultados y recomendaciones.", "Redacción de la memoria y preparación de la defensa."],
  },
  fraud: {
    en: "Anomaly and Fraud Detection: Alert Modelling and Cost-Benefit Analysis of False Alarms",
    problema: [
      "El fraude y las operaciones anómalas generan pérdidas económicas y de confianza, pero un sistema que alerta demasiado satura a los equipos de revisión. En {sector}, el reto es detectar los casos relevantes sin disparar los costes de las falsas alarmas.",
      "Este TFG desarrollará un modelo de detección de anomalías y elegirá el umbral de alerta a partir de un análisis coste-beneficio, no solo de métricas estadísticas.",
    ],
    general: "Detectar operaciones anómalas o fraudulentas y fijar una política de alertas que minimice el coste total para la empresa.",
    especificos: ["Preparar un conjunto de datos de operaciones con el desequilibrio de clases característico.", "Comparar técnicas supervisadas y no supervisadas de detección.", "Definir la matriz de costes y elegir el umbral óptimo.", "Evaluar el impacto económico frente a la situación actual."],
    fases: ["Definición del problema y de los costes de error.", "Estado del arte en detección de fraude y anomalías.", "Preparación de datos y tratamiento del desequilibrio.", "Modelado, validación y elección de umbral.", "Análisis coste-beneficio y recomendaciones.", "Redacción de la memoria y preparación de la defensa."],
  },
  reco: {
    en: "Recommender System for Personalised Offers and Its Expected Effect on Sales",
    problema: [
      "Ofrecer a cada cliente el producto adecuado aumenta la conversión y el valor del cliente, pero muchas empresas siguen usando reglas generales iguales para todos. En {sector}, la personalización es una palanca directa de ventas y fidelidad.",
      "Este TFG construirá y evaluará un sistema de recomendación a partir del historial de compras o interacciones y estimará su efecto esperado sobre las ventas.",
    ],
    general: "Diseñar y evaluar un sistema de recomendación que mejore la relevancia de las ofertas y estimar su impacto comercial.",
    especificos: ["Preparar los datos de interacciones entre clientes y productos.", "Implementar un recomendador base y al menos un enfoque más avanzado.", "Evaluar los modelos con métricas de ranking y de negocio.", "Estimar el impacto comercial y proponer un plan de puesta en marcha."],
    fases: ["Definición del caso de uso y de los datos.", "Estado del arte en sistemas de recomendación.", "Preparación de datos y análisis exploratorio.", "Modelado y evaluación offline.", "Estimación de impacto y recomendaciones.", "Redacción de la memoria y preparación de la defensa."],
  },
};

function sectorPhraseFor(a, lineId) {
  const s = sectorsOf(canonize(a))[0];
  if (!s) return { ia: "las empresas de servicios", churn: "las empresas de suscripción", sent: "las marcas de consumo", bi: "las pymes", fraud: "el sector financiero", reco: "el comercio electrónico" }[lineId];
  return s.k === "pyme" ? "las pymes" : `el sector de ${s.label}`;
}
function propuestaAuto(rec) {
  const r = recommend(rec.answers), lineId = rec.tutor.line || r.top.id, T = PROP_TEMPLATES[lineId];
  const sector = sectorPhraseFor(rec.answers, lineId);
  const problema = T.problema.map(p => p.replace("{sector}", sector));
  const q34 = (rec.answers.q34 || "").trim(), q33 = (rec.answers.q33 || "").trim();
  if (q34) problema.push(`Pregunta de negocio de partida propuesta por el estudiante: «${q34.replace(/[«»"]/g, "")}».`);
  const datos = q33 && !/^no\b/i.test(q33) ? `Fuente de datos indicada por el estudiante: ${q33}. Se verificará la autorización de uso y la confidencialidad antes de empezar.` : "Se trabajará con un conjunto de datos público adecuado a la pregunta, documentando su origen y licencia.";
  return {
    en: T.en, tipo: q33 && !/^no\b/i.test(q33) ? "Aplicado con empresa" : "Académico", institucion: "Universidad Villanueva",
    problema: problema.join("\n\n"), general: T.general, especificos: T.especificos.join("\n"), fases: T.fases.join("\n"),
    datos, alcance: r.scope,
  };
}
function getProp(rec) { if (!rec.tutor.propuesta) rec.tutor.propuesta = propuestaAuto(rec); return rec.tutor.propuesta; }

function propuestaBox(rec) {
  const p = getProp(rec);
  const f = (id, label, val, rows) => rows
    ? `<div class="q"><label for="pp-${id}">${label}</label><textarea id="pp-${id}" data-p="${id}" rows="${rows}">${esc(val)}</textarea></div>`
    : `<div class="q"><label for="pp-${id}">${label}</label><input id="pp-${id}" type="text" data-p="${id}" value="${esc(val)}"></div>`;
  return `
    <div class="box" id="prop-box"><h4>Descripción del proyecto</h4>
      <p style="margin:0;font-size:13px;color:var(--muted)">Se rellena con la línea, el título y las respuestas del alumno. Edítala y descárgala en Word.</p>
      ${f("en", "Título en inglés", p.en)}
      ${f("tipo", "Tipo", p.tipo)}
      ${f("institucion", "Institución o empresa colaboradora", p.institucion)}
      ${f("problema", "Problema a tratar", p.problema, 7)}
      ${f("general", "Objetivo general", p.general, 3)}
      ${f("especificos", "Objetivos específicos (uno por línea)", p.especificos, 5)}
      ${f("fases", "Métodos y fases de trabajo (una por línea)", p.fases, 6)}
      ${f("datos", "Datos", p.datos, 3)}
      ${f("alcance", "Alcance previsto", p.alcance, 2)}
      <div class="downloads">
        <button class="btn" type="button" id="dl-prop">Propuesta de TFG (.docx) ${chevSvg}</button>
        <button class="btn ghost small" type="button" id="prop-regen">Volver a generar la descripción</button>
      </div>
      <div class="msg" id="prop-msg" aria-live="polite"></div>
    </div>`;
}

document.addEventListener("input", e => {
  const el = e.target; if (!el.dataset || !el.dataset.p) return;
  const rec = students[currentId]; if (!rec) return;
  getProp(rec)[el.dataset.p] = el.value; scheduleSave();
});
document.addEventListener("click", async e => {
  const b = e.target.closest("button"); if (!b) return;
  const rec = students[currentId]; if (!rec) return;
  if (b.id === "prop-regen") {
    if (b.dataset.confirm !== "1") { b.dataset.confirm = "1"; b.textContent = "Pulsa otra vez: se sustituye lo que hayas editado"; setTimeout(() => { if (b.isConnected) { b.dataset.confirm = ""; b.textContent = "Volver a generar la descripción"; } }, 4000); return; }
    rec.tutor.propuesta = propuestaAuto(rec); scheduleSave(); renderReco(); $("#prop-msg").textContent = "Descripción generada de nuevo."; return;
  }
  if (b.id === "dl-prop") {
    if (typeof JSZip === "undefined") { $("#prop-msg").textContent = "No se pudo cargar el generador de Word. Recarga la página."; return; }
    const blob = await buildPropuestaDocx(rec);
    downloadBlob(`Propuesta_TFG_${fileName()}.docx`, blob);
    $("#prop-msg").textContent = "Propuesta descargada.";
  }
});

/* ---------- Generación del Word ---------- */
function xe(s) { return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
function run(text, o = {}) {
  const pr = `<w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/>${o.b ? "<w:b/>" : ""}${o.i ? "<w:i/>" : ""}<w:sz w:val="${o.sz || 24}"/></w:rPr>`;
  return `<w:r>${pr}<w:t xml:space="preserve">${xe(text)}</w:t></w:r>`;
}
function para(runs, o = {}) {
  const pPr = `<w:pPr>${o.center ? '<w:jc w:val="center"/>' : o.justify ? '<w:jc w:val="both"/>' : ""}<w:spacing w:before="${o.before ?? 0}" w:after="${o.after ?? 160}" w:line="276" w:lineRule="auto"/>${o.ind ? `<w:ind w:left="${o.ind}" w:hanging="360"/>` : ""}</w:pPr>`;
  return `<w:p>${pPr}${Array.isArray(runs) ? runs.join("") : runs}</w:p>`;
}
function field(label, value) { return para([run(label + ": ", { b: true }), run(value || "")], { after: 80 }); }
async function buildPropuestaDocx(rec) {
  const r = recommend(rec.answers), p = getProp(rec);
  const lineId = rec.tutor.line || r.top.id, L = LINES.find(l => l.id === lineId);
  const titulo = titleFor(rec, r).trim();
  const lines = s => String(s || "").split("\n").map(x => x.trim()).filter(Boolean);
  const body = [
    para(run("Universidad Villanueva · Área de Análisis de Negocios", { b: true, sz: 22 }), { center: true, after: 120 }),
    para(run("Propuesta de TFG (Trabajo de Fin de Grado)", { b: true, sz: 30 }), { center: true, after: 480 }),
    field("Curso académico", CURSO),
    field("Título", titulo),
    field("Título en inglés", p.en),
    field("Línea de trabajo", L ? L.name : ""),
    field("Tipo", p.tipo),
    field("Institución", p.institucion),
    field("Tutor", TUTOR),
    field("Estudiante", rec.answers.q1),
    para(run(""), { after: 80 }),
    para(run("Problema a tratar:", { b: true }), { before: 120 }),
    ...lines(p.problema).map(t => para(run(t), { justify: true })),
    para(run("Objetivos:", { b: true }), { before: 120 }),
    para(run(p.general), { justify: true }),
    para(run("Los objetivos específicos son:"), { justify: true }),
    ...lines(p.especificos).map((t, i) => para([run(`${i + 1}.\t`), run(t)], { justify: true, ind: 720, after: 80 })),
    para(run("Métodos y fases de trabajo:", { b: true }), { before: 200 }),
    ...lines(p.fases).map((t, i) => para([run(`${i + 1}.\t`), run(t)], { justify: true, ind: 720, after: 80 })),
    para(run("Datos:", { b: true }), { before: 200 }),
    para(run(p.datos), { justify: true }),
    para(run("Alcance previsto:", { b: true }), { before: 120 }),
    para(run(p.alcance), { justify: true }),
    para(run("Seguimiento:", { b: true }), { before: 120 }),
    para(run("Repositorio en GitHub con acceso del tutor, tablero de tareas y tutorías periódicas. Cada hito tendrá un entregable verificable en el repositorio."), { justify: true }),
  ].join("");
  const doc = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${body}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1417" w:right="1701" w:bottom="1417" w:left="1701" w:header="708" w:footer="708" w:gutter="0"/></w:sectPr></w:body></w:document>`;
  const zip = new JSZip();
  zip.file("[Content_Types].xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>`);
  zip.file("_rels/.rels", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`);
  zip.file("word/document.xml", doc);
  return zip.generateAsync({ type: "blob", mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
}
