# TFG Villanueva · Diagnóstico y elección de línea

Cuestionario inicial para los alumnos de TFG del **Doble Grado en ADE y Análisis de Negocios** de la Universidad Villanueva, con un panel privado para el tutor que recomienda la línea de trabajo más adecuada para cada alumno y genera la documentación del proyecto.

**Alumnos:** https://gvalverd.github.io/tfg-villanueva/
**Tutor:** https://gvalverd.github.io/tfg-villanueva/tutor.html

---

## Qué hace

### Para el alumno
- Rellena el cuestionario de diagnóstico: asignaturas y notas, competencias reales, intereses y disponibilidad.
- Mientras escribe, se guarda un borrador en su navegador.
- Al enviar recibe un **enlace personal** para cambiar sus respuestas desde otro dispositivo.
- Solo ve sus propias respuestas. No ve las de sus compañeros ni la recomendación.

### Para el tutor
- **Alumnos:** todas las respuestas en un único panel, con buscador.
- **Línea recomendada:** propone una de las seis líneas de TFG según el interés, el nivel técnico, el tipo de TFG preferido, el sector y la dedicación del alumno, y explica por qué.
- **Propuesta de trabajo:** alcance, entregable, señales de riesgo y título provisional.
- **Descripción del proyecto:** problema, objetivos, métodos y fases, datos y alcance, editable y descargable en Word.
- **Hoja de aceptación de tutela:** rellena y descargable en Word.
- **Preguntas y textos:** edita el cuestionario sin tocar código (secciones, preguntas, tipos de respuesta, opciones y textos de la página del alumno).
- **Aviso por correo** cada vez que un alumno envía o cambia sus respuestas.
- Exportación a CSV, importación de respuestas desde Microsoft Forms (Excel) e interruptor para abrir o cerrar el cuestionario.

## Las seis líneas de TFG

| Línea | Pregunta de partida | Entregable |
|---|---|---|
| IA generativa y productividad | ¿Cuánto mejora la IA el tiempo y la calidad de una tarea de empresa? | Experimento con y sin IA y rúbrica |
| Ventas y abandono de clientes | ¿Qué clientes se irán y cuánto vale retenerlos? | Modelo predictivo y valor de la retención |
| Sentimiento y reputación | ¿Qué dicen las reseñas y cómo afectan a la marca? | Análisis de texto e insights |
| BI para pymes | ¿Qué indicadores debería mirar una pyme? | Dashboard, KPI y recomendaciones |
| Fraude y anomalías | ¿Cómo detectar casos raros sin ahogarse en falsas alarmas? | Detector y análisis coste-beneficio |
| Sistemas de recomendación | ¿Qué ofrecer a cada cliente para vender más? | Recomendador y métricas de negocio |

## Cómo está hecho

```
Navegador (GitHub Pages)            Supabase (UE)
┌────────────────────────┐          ┌──────────────────────────────┐
│ index.html  · alumno   │ ──RPC──▶ │ tfg_guardar_respuesta         │
│ tutor.html  · tutor    │ ──auth─▶ │ tfg_respuestas  (RLS: tutor)  │
│ shared.js   · lógica   │          │ tfg_cuestionario (editable)   │
└────────────────────────┘          │ pg_net + Vault ─▶ Resend      │
                                    └──────────────────────────────┘
```

- **Frontend estático:** HTML, CSS y JavaScript sin compilación. Supabase JS, JSZip y SheetJS se cargan desde CDN.
- **Datos y login:** Supabase (Postgres) con seguridad a nivel de fila.
  - El alumno no accede a la tabla de respuestas. Guarda y lee solo la suya mediante funciones y un identificador aleatorio que genera su navegador.
  - Solo la cuenta registrada como tutor puede leer y editar las respuestas.
- **Avisos:** la base de datos envía el correo directamente a través de Resend. La clave se guarda cifrada en Supabase Vault.
- **Estilo:** colores y botones inspirados en villanueva.edu.

La clave `anon` de `config.js` es pública por diseño: sin sesión de tutor no da acceso a ninguna respuesta.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Cuestionario del alumno |
| `tutor.html` | Panel del tutor |
| `tutor-editor.js` | Pestaña «Preguntas y textos» |
| `tutor-propuesta.js` | Descripción del proyecto y Word de la propuesta |
| `shared.js` | Preguntas por defecto, líneas de TFG y motor de recomendación |
| `tutela.js` | Plantilla en blanco de la hoja de aceptación de tutela |
| `styles.css` | Estilos |
| `config.js` | Dirección y clave pública de Supabase |

## Cómo se usa

1. Comparte el enlace de alumnos por Teams.
2. Entra en `tutor.html` con tu usuario de tutor.
3. Revisa cada ficha, acuerda la línea en la entrevista y ajusta el título provisional.
4. Descarga la hoja de tutela y la propuesta de TFG.
5. Cierra el cuestionario desde el panel cuando termine el plazo.

## Privacidad

Las respuestas contienen datos académicos de los alumnos:
- Se guardan en un proyecto de Supabase alojado en la UE.
- Solo son accesibles para el tutor.
- Este repositorio contiene únicamente el código. **Nunca subas aquí respuestas, exportaciones CSV ni documentos con datos de alumnos.**

---

Universidad Villanueva · Área de Análisis de Negocios · TFG 2026/27
