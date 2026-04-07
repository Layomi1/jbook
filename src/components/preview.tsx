import { useEffect, useRef, type FunctionComponent } from "react";
import "./preview.css";

type PreviewProps = {
  code: string;
  bundlingError: string;
};

const html = `
    <html>
      <head></head>
      <body>
        <div id='root'></div>
        <script>
        const handleError = (err) => {
          const root = document.querySelector("#root");
              root.innerHTML = '<div style="color: red; "><h4>Runtime error:</h4>' + err + '</div>';
             console.err(err);
        }

          window.addEventListener('error',(event) => { 
            event.preventDefault();
            handleError(event.error)
          });

          window.addEventListener('message', (e)=>{
            try{
                eval(e.data);
            }catch(err){
              handleError(err)
            }
          }, false)
        </script>
      </body>
    </html>
`;

const Preview: FunctionComponent<PreviewProps> = ({ code, bundlingError }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = html;
    }

    setTimeout(() => {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(code, "*");
      }
    }, 50);
  }, [code]);

  console.log(bundlingError);
  return (
    <section className="preview-wrapper">
      <iframe
        title="preview"
        ref={iframeRef}
        sandbox="allow-scripts"
        srcDoc={html}
      />
      {bundlingError && (
        <article className="preview-error">{bundlingError}</article>
      )}
    </section>
  );
};

export default Preview;
