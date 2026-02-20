import * as esbuild from "esbuild-wasm";

import { useEffect, useState } from "react";

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
    const result = await esbuild.transform(input, {
      loader: "jsx",

      target: "es2015",
    });
    setCode(result.code);
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
