import * as esbuild from "esbuild-wasm";

import { useEffect, useState } from "react";

let isInitialized = false;
function App() {
  const [input, setInput] = useState<string>("");
  const [code] = useState<string>("");

  const startService = async () => {
    if (!isInitialized) {
      const service = await esbuild.initialize({
        worker: true,
        wasmURL: "/esbuild.wasm",
      });

      isInitialized = true;

      console.log(service);
    }
  };
  useEffect(() => {
    startService();
  }, []);

  const handleSubmit = () => {
    console.log(input);
  };

  return (
    <div>
      <textarea
        name="input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <article>
        <button onClick={handleSubmit}>Submit</button>
      </article>
      <pre>{code}</pre>
    </div>
  );
}

export default App;
