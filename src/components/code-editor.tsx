import Editor, { loader, type OnMount } from "@monaco-editor/react";

import type { FC } from "react";

loader.config({
  paths: {
    vs: "/node_modules/monaco-editor/min/vs",
  },
});

type CodeEditorProps = {
  initialValue: string;
  onChange: (value: string) => void;
};
const CodeEditor: FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const onEditorDidMount: OnMount = (editor, monaco) => {
    editor.onDidChangeModelContent(() => {
      onChange(initialValue);
    });
    editor.getModel()?.updateOptions({ tabSize: 2 });
  };

  return (
    <Editor
      height="500px"
      language="javascript"
      theme="vs-dark"
      value={initialValue}
      onChange={(value) => onChange(value || "")}
      onMount={onEditorDidMount}
      options={{
        minimap: { enabled: false },
        wordWrap: "on",
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  );
};

export default CodeEditor;
