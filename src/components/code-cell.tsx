import { useState, useEffect } from "react";
import "./code-cell.css";
import bundle from "../bundler";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";

const CodeCell = () => {
  const [code, setCode] = useState<string>("");
  const [err, setErr] = useState<string>("");
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);

      setCode(output.code);
      setErr(output.err);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div className="code-cell-container">
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue=""
            onChange={(value) => {
              setInput(value);
            }}
          />
        </Resizable>

        <Preview code={code} bundlingError={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
