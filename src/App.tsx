import * as esbuild from "esbuild-wasm";

import { useEffect, useRef, useState } from "react";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

let initializePromise: Promise<void> | null = null;

function App() {
  const iframeRef = useRef<any>();

  const [input, setInput] = useState<string>("");

  const [code, setCode] = useState<string>("");

  const startService = async () => {
    if (!initializePromise) {
      initializePromise = esbuild.initialize({
        worker: true,
        wasmURL: "https://unpkg.com/esbuild-wasm@latest/esbuild.wasm",
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
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });

    // setCode(result.outputFiles[0].text);
    iframeRef.current.contentWindow.postMessage(
      result.outputFiles[0].text,
      "*",
    );
  };

  const html = `
    <html>
      <head></head>
      <body>
        <div id='root'></div>
        <script>
          window.addEventListener('message', (e)=>{
            eval(e.data);
          }, false)
        </script>
      </body>
    </html>
`;

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
      <iframe ref={iframeRef} sandbox="allow-scripts" srcDoc={html}></iframe>
    </div>
  );
}

export default App;
