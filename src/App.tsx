import * as esbuild from "esbuild-wasm";

import { useEffect, useRef, useState } from "react";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

let initializePromise: Promise<void> | undefined;

function App() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [input, setInput] = useState<string>("");

  const startService = async () => {
    if (!initializePromise) {
      initializePromise = esbuild.initialize({
        worker: true,
        wasmURL: "https://unpkg.com/esbuild-wasm@0.27.3/esbuild.wasm",
      });
    }

    await initializePromise;
  };

  useEffect(() => {
    startService();
  }, []);

  const handleSubmit = async () => {
    await startService();

    if (iframeRef.current) {
      iframeRef.current.srcdoc = html;
    }

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
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        result.outputFiles[0].text,
        "*",
      );
    }
  };

  const html = `
    <html>
      <head></head>
      <body>
        <div id='root'></div>
        <script>
          window.addEventListener('message', (e)=>{
            try{
                eval(e.data);
            }catch(err){
              const root = document.querySelector("#root");
              root.innerHTML = '<div style="color: red; "><h4>Runtime error:</h4>' + err + '</div>';
             console.err(err);
            }
          
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

      <iframe ref={iframeRef} sandbox="allow-scripts" srcDoc={html}></iframe>
    </div>
  );
}

export default App;
