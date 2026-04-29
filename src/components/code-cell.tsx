import { useState, useEffect, type FC } from "react";
import "./code-cell.css";
import bundle from "../bundler";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";
import type { Cell } from "../state/cell";
import { useActions } from "../hooks/use-actions";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: FC<CodeCellProps> = ({ cell }) => {
  const { updateCell } = useActions();
  const [code, setCode] = useState<string>("");
  const [err, setErr] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(cell.content);

      setCode(output.code);
      setErr(output.err);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <Resizable direction="vertical">
      <div className="code-cell-container">
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => {
              updateCell(cell.id, value);
            }}
          />
        </Resizable>

        <Preview code={code} bundlingError={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
