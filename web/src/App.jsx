import { motion, useReducedMotion } from "motion/react";
import LiveRunner from "./LiveRunner.jsx";

const RELEASE = "https://github.com/osram90/notebook-IAstudio/releases/latest";
const REPO = "https://github.com/osram90/notebook-IAstudio";
const APK = "https://github.com/osram90/notebook-IAstudio/releases/download/movil-v1.1.0/NotebookStudio-movil-1.1.0.apk";

const features = [
  {
    n: "01",
    title: "Kernel real, no un simulador",
    body: "Python y R corren en kernels de Jupyter. Cada lenguaje tiene su propio estado, así que una variable de R no pisa a una de Python.",
    detail: "Python 3.10 incluido · R 4.5 opcional",
  },
  {
    n: "02",
    title: "Un asistente que ve tu celda",
    body: "Pregunta sobre la celda activa y su salida. Las respuestas con código se insertan con un clic, y la corrección puede repetirse hasta tres veces si el error persiste.",
    detail: "Ver el código antes de insertarlo",
  },
  {
    n: "03",
    title: "IA local o en la nube, a tu elección",
    body: "Con Ollama, los modelos corren en tu computadora y tu código no sale de ella. En la nube usas tus propias claves; la app te muestra qué proveedor responde.",
    detail: "Modelos recomendados según tu RAM",
  },
  {
    n: "04",
    title: "Gráficas y visores interactivos",
    body: "Widgets de ipywidgets y estructuras moleculares con py3Dmol, rotables y con zoom, dentro del propio notebook.",
    detail: "Funciona sin conexión a internet",
  },
  {
    n: "05",
    title: "Publicación para alumnos",
    body: "Exporta el notebook a una página HTML con el código oculto o visible, un código QR y un enlace que puedes compartir o publicar en GitHub Pages.",
    detail: "Sin instalar nada para leerlo",
  },
  {
    n: "06",
    title: "Búsqueda bibliográfica verificable",
    body: "Consulta Crossref, OpenAlex, PubMed, arXiv y Europe PMC desde el chat. Cada cita trae su DOI, que puedes confirmar contra Crossref.",
    detail: "APA y BibTeX",
  },
];

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function Reveal({ children, delay = 0, className }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={fade}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav-in">
        <a href="#top" className="brand" aria-label="Notebook Studio, inicio">
          <span className="mark" aria-hidden="true" />
          Notebook Studio
        </a>
        <nav className="nav-links" aria-label="Principal">
          <a href="#funciones">Funciones</a>
          <a href="#ejemplo">Ejemplo</a>
          <a href="#capturas">Capturas</a>
          <a href="#instalar">Instalar</a>
        </nav>
        <a className="btn btn-small" href={RELEASE}>Descargar</a>
      </div>
    </header>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <motion.p
          className="eyebrow"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Para Windows · versión 1.0
        </motion.p>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Notebooks Python y R con un asistente que <em>lee tu código</em>.
        </motion.h1>
        <motion.p
          className="lead"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Escribe, ejecuta y corrige en tu computadora. Usa IA local con Ollama o tus propias claves
          en la nube, y publica el resultado como una página para tus alumnos.
        </motion.p>
        <motion.div
          className="cta"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <a className="btn btn-run-lg" href={RELEASE}>Descargar instalador</a>
          <a className="btn btn-ghost" href="#ejemplo">Ejecutar un ejemplo en el navegador</a>
        </motion.div>

        <motion.figure
          className="window"
          initial={reduce ? false : { opacity: 0, y: 40, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="window-bar" aria-hidden="true"><i /><i /><i /><span>teorema-central-limite.ipynb · Notebook Studio</span></div>
          <img src="img/ejemplo-resultado.png" alt="Notebook publicado con código, salidas y gráfica en texto" />
        </motion.figure>
      </div>
    </section>
  );
}

function Strip() {
  const items = ["Python 3.10", "R 4.5", "Jupyter", "Ollama", "Pyodide", "py3Dmol", "ipywidgets", "GitHub Pages"];
  return (
    <div className="strip" aria-label="Tecnologías">
      <div className="wrap strip-in">
        {items.map((t) => <span key={t}>{t}</span>)}
      </div>
    </div>
  );
}

function Features() {
  return (
    <section className="section" id="funciones">
      <div className="wrap">
        <Reveal>
          <p className="kicker">Funciones</p>
          <h2>Lo que hace, sin adornos.</h2>
        </Reveal>
        <div className="rows">
          {features.map((f, i) => (
            <Reveal key={f.n} delay={i * 0.04} className="row">
              <span className="row-n">{f.n}</span>
              <div className="row-main">
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
              <span className="row-detail">{f.detail}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Example() {
  return (
    <section className="section section-alt" id="ejemplo">
      <div className="wrap">
        <Reveal>
          <p className="kicker">Ejemplo en vivo</p>
          <h2>Ejecútalo aquí mismo.</h2>
          <p className="muted-lg">
            Este código corre en tu navegador con Pyodide. No se envía a ningún servidor. La primera
            ejecución tarda un poco porque descarga NumPy.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <LiveRunner />
        </Reveal>
        <Reveal delay={0.15}>
          <p className="fine">
            Ver el notebook completo con sus salidas: <a href="ejemplos/teorema-central-limite.html">versión publicada</a> ·{" "}
            <a href="ejemplos/teorema-central-limite.ipynb">archivo .ipynb</a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Shots() {
  return (
    <section className="section" id="capturas">
      <div className="wrap">
        <Reveal>
          <p className="kicker">Capturas</p>
          <h2>Del notebook a la página publicada.</h2>
        </Reveal>
        <div className="shots">
          <Reveal>
            <figure className="shot">
              <img src="img/ejemplo-resultado.png" alt="Notebook publicado con código, salidas y formato" loading="lazy" />
              <figcaption>Notebook publicado: código, salidas y formato listos para alumnos.</figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.1}>
            <figure className="shot">
              <img src="img/app-asistente.png" alt="Área de notebook con el asistente de IA" loading="lazy" />
              <figcaption>La app: notebook a la izquierda y asistente a la derecha.</figcaption>
            </figure>
          </Reveal>
          <Reveal>
            <figure className="shot">
              <img src="img/windows-escritorio.png" alt="Notebook Studio en Windows junto a la página publicada" loading="lazy" />
              <figcaption>Notebook Studio en Windows, con la terminal de desarrollo abierta.</figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.1}>
            <figure className="shot">
              <img src="img/android-notebook.png" alt="Notebook Studio en Android con una celda Python ejecutada" loading="lazy" />
              <figcaption>Versión Android: celda Python ejecutada en el teléfono.</figcaption>
            </figure>
          </Reveal>
          <Reveal>
            <figure className="shot">
              <img src="img/android-ia.png" alt="Versión Android: elegir una IA gratis entre varias opciones" loading="lazy" />
              <figcaption>Versión Android: elige una IA gratis (Groq, Gemini, Kilo y más) o Ollama en Termux.</figcaption>
            </figure>
          </Reveal>
          <Reveal>
            <figure className="shot">
              <img src="img/android-lista-modelos.png" alt="Versión Android: lista de modelos para reserva o combinar" loading="lazy" />
              <figcaption>Versión Android: varios modelos como reserva, o combinados en una misma pregunta.</figcaption>
            </figure>
          </Reveal>
          <Reveal>
            <figure className="shot">
              <img src="img/android-ajustes.png" alt="Pantalla de ajustes de la versión Android" loading="lazy" />
              <figcaption>Versión Android: ajustes del proveedor de IA con tu propia clave.</figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Install() {
  const steps = [
    { t: "Descarga el instalador", b: "Un solo archivo de unos 47 MB, desde la sección de releases del repositorio." },
    { t: "Ejecútalo", b: "No necesitas instalar Python. Si falta WebView2 (la ventana de la app), se instala solo." },
    { t: "Elige lo opcional", b: "Ollama para IA local y R con IRkernel. Ambos se pueden omitir y añadir después." },
  ];
  return (
    <section className="section section-alt" id="instalar">
      <div className="wrap install">
        <Reveal>
          <p className="kicker">Instalación</p>
          <h2>Tres pasos.</h2>
          <p className="muted-lg">
            Windows 10 u 11 de 64 bits. El instalador no está firmado todavía, así que SmartScreen
            puede mostrar una advertencia: elige “Más información” y luego “Ejecutar de todos modos”.
          </p>
          <div className="cta">
            <a className="btn btn-run-lg" href={RELEASE}>Descargar para Windows</a>
            <a className="btn btn-ghost" href={APK}>Descargar APK para Android</a>
          </div>
          <p className="fine">El APK es para Android 7 o superior. Tendrás que permitir la instalación desde “origen desconocido” la primera vez.</p>
        </Reveal>
        <ol className="steps">
          {steps.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.08}>
              <li>
                <span className="step-n">{i + 1}</span>
                <div>
                  <h3>{s.t}</h3>
                  <p>{s.b}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-in">
        <div>
          <div className="brand"><span className="mark" aria-hidden="true" />Notebook Studio</div>
          <p className="fine">Creado por Osuna-Ramos J.F.</p>
        </div>
        <nav className="footer-links" aria-label="Enlaces">
          <a href={REPO}>Repositorio</a>
          <a href={RELEASE}>Releases</a>
          <a href="ejemplos/teorema-central-limite.html">Ejemplo publicado</a>
        </nav>
        <p className="fine">© 2026 Osuna-Ramos J.F.</p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Strip />
        <Features />
        <Example />
        <Shots />
        <Install />
      </main>
      <Footer />
    </>
  );
}
