import { useState } from "react";
import "./code-cell.css";
// import bundle from "../bundler";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";

const CodeCell = () => {
  const [code, setCode] = useState<string>("");
  // const [input, setInput] = useState<string>("");

  // useEffect(() => {
  //   const timer = setTimeout(async () => {
  //     const output = await bundle(input);

  //     setCode(output);
  //   }, 500);
  //   return clearTimeout(timer);
  // }, [input]);

  return (
    <Resizable direction="vertical">
      <div className="code-cell-container">
        <CodeEditor
          initialValue=""
          onChange={(value) => {
            setInput(value);
          }}
        />

        {/* <article> */}
        <Preview code={code} />
        {/* </article> */}
      </div>
    </Resizable>
  );
};

export default CodeCell;
