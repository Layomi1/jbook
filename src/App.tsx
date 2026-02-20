import * as esbuild from "esbuild-wasm";

import { useEffect, useState } from "react";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";

let initializePromise: Promise<void> | null = null;

function App() {
  const [input, setInput] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const startService = async () => {
    if (!initializePromise) {
      initializePromise = esbuild.initialize({
        worker: true,
        wasmURL: "/esbuild.wasm",
      });
    }

    return initializePromise;
  };

  useEffect(() => {
    startService();
  }, []);

  const handleSubmit = async () => {
    await startService();
    const result = await esbuild.build({
      entryPoints: ["index.tsx"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin()],
    });

    setCode(result.outputFiles[0].text);
  };

  return (
    <div>
      <textarea
        name="input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <article>
        <button onClick={handleSubmit}>Submit</button>
      </article>
      <pre>{code}</pre>
    </div>
  );
}

export default App;
