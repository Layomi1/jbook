import { useState } from "react";
import bundle from "../bundler";
import CodeEditor from "./code-editor";
import Preview from "./preview";

const CodeCell = () => {
  const [code, setCode] = useState<string>("");
  const [input, setInput] = useState<string>("");

  const handleSubmit = async () => {
    const output = await bundle(input);

    setCode(output);
  };

  return (
    <div>
      <CodeEditor
        initialValue=""
        onChange={(value) => {
          setInput(value);
        }}
      />

      <article>
        <button onClick={handleSubmit}>Submit</button>
      </article>

      <Preview code={code} />
    </div>
  );
};

export default CodeCell;
