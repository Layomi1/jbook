import { useEffect, useRef, type FunctionComponent } from "react";
import "./preview.css";

type PreviewProps = {
  code: string;
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

const Preview: FunctionComponent<PreviewProps> = ({ code }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = html;
    }

    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(code, "*");
    }
  }, [code]);

  return (
    <section className="preview-wrapper">
      <iframe
        title="preview"
        ref={iframeRef}
        sandbox="allow-scripts"
        srcDoc={html}
      />
    </section>
  );
};

export default Preview;
