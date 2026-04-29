import { useEffect, useRef, useState, type FC } from "react";
import "./text-editor.css";
import MDEditor from "@uiw/react-md-editor";
import type { Cell } from "../../state/cell";

import { useActions } from "../../hooks/use-actions";

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: FC<TextEditorProps> = ({ cell }) => {
  const { updateCell } = useActions();
  const [editing, setEditing] = useState<boolean>(false);

  const editorRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const listener = (event: PointerEvent) => {
      if (
        editorRef.current &&
        event.target &&
        editorRef.current.contains(event.target as Node)
      )
        return;
      setEditing(false);
    };

    document.addEventListener("click", listener, { capture: true });
    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <section className="text-editor" ref={editorRef}>
        <MDEditor
          value={cell.content}
          onChange={(v) => updateCell(cell.id, v || "")}
        />
      </section>
    );
  }
  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown
          source={cell.content || "Click to edit"}
          style={{ whiteSpace: "pre-wrap" }}
        />
      </div>
    </div>
  );
};

export default TextEditor;
