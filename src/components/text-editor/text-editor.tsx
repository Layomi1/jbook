import { useEffect, useRef, useState } from "react";
import "./text-editor.css";
import MDEditor from "@uiw/react-md-editor";

const TextEditor = () => {
  const [editing, setEditing] = useState<boolean>(false);
  const [value, setValue] = useState<string>("#Header");

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
        <MDEditor value={value} onChange={(v) => setValue(v || "")} />
      </section>
    );
  }
  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} />
      </div>
    </div>
  );
};

export default TextEditor;
