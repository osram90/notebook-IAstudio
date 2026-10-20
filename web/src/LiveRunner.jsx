import { useEffect, useRef, useState } from "react";

// Python en el navegador (Pyodide 0.26.4, versión fija)
const PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/";

const EXAMPLE = `import numpy as np

rng = np.random.default_rng(42)
N, n = 10_000, 30          # muestras y tamaño de cada muestra

medias = rng.uniform(0, 1, size=(N, n)).mean(axis=1)
print(f"media de las medias: {medias.mean():.4f}   (teórico 0.5)")
print(f"desviación:          {medias.std():.4f}   (teórico {np.sqrt(1/12/n):.4f})")

conteo, bordes = np.histogram(medias, bins=12, range=(0.3, 0.7))
for c, b in zip(conteo, bordes):
    print(f"{b:.3f} │ " + "█" * (c // 100))
`;

let pyodidePromise = null;

function loadPyodideOnce() {
  if (!pyodidePromise) {
    pyodidePromise = (async () => {
      await new Promise((ok, fail) => {
        if (window.loadPyodide) return ok();
        const s = document.createElement("script");
        s.src = PYODIDE_URL + "pyodide.js";
        s.onload = ok;
        s.onerror = () => fail(new Error("no se pudo cargar Pyodide"));
        document.head.appendChild(s);
      });
      const py = await window.loadPyodide({ indexURL: PYODIDE_URL });
      await py.loadPackage("numpy");
      return py;
    })();
    pyodidePromise.catch(() => { pyodidePromise = null; });
  }
  return pyodidePromise;
}

export default function LiveRunner() {
  const [code, setCode] = useState(EXAMPLE);
  const [status, setStatus] = useState("idle"); // idle | loading | ready | running | error
  const [output, setOutput] = useState("");
  const [took, setTook] = useState(null);
  const pyRef = useRef(null);

  useEffect(() => {
    let alive = true;
    setStatus("loading");
    loadPyodideOnce()
      .then((py) => { if (alive) { pyRef.current = py; setStatus("ready"); } })
      .catch(() => { if (alive) setStatus("error"); });
    return () => { alive = false; };
  }, []);

  async function run() {
    const py = pyRef.current;
    if (!py) return;
    const lines = [];
    py.setStdout({ batched: (l) => lines.push(l) });
    py.setStderr({ batched: (l) => lines.push(l) });
    setStatus("running");
    const t0 = performance.now();
    try {
      await py.runPythonAsync(code);
      setTook(((performance.now() - t0) / 1000).toFixed(2));
      setStatus("ready");
    } catch (e) {
      lines.push(String(e));
      setTook(null);
      setStatus("ready");
    }
    setOutput(lines.join("\n") || "(sin salida)");
  }

  const label = {
    idle: "Preparando…",
    loading: "Cargando Python y NumPy (primera vez, unos segundos)…",
    ready: took ? `Ejecutado en ${took} s` : "Listo",
    running: "Ejecutando…",
    error: "No se pudo cargar Python. Revisa tu conexión.",
  }[status];

  return (
    <div className="runner">
      <div className="runner-bar">
        <div className="runner-dots" aria-hidden="true"><i /><i /><i /></div>
        <span className="runner-title">teorema-central-limite.py</span>
        <span className={`runner-state s-${status}`}>{label}</span>
        <button className="btn btn-run" onClick={run} disabled={status !== "ready"}>
          Ejecutar
        </button>
      </div>
      <textarea
        className="runner-code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        aria-label="Código Python"
      />
      <pre className="runner-out" aria-live="polite">
        {output || "La salida aparece aquí. Puedes editar el código y volver a ejecutarlo."}
      </pre>
    </div>
  );
}
