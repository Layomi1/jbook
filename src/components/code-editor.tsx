import { useRef, type FC } from "react";
import "./code-editor.css";
import "./syntax.css";

import Editor, { loader, type OnMount } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import prettier from "prettier/standalone";
import parserBabel from "prettier/plugins/babel";

import parserEstree from "prettier/plugins/estree";
import traverse from "@babel/traverse";
import { parse } from "@babel/parser";
import MonacoJSXHighlighter from "monaco-jsx-highlighter";

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
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const onEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.onDidChangeModelContent(() => {
      const value = editor.getValue();
      onChange(value);
    });

    editor.getModel()?.updateOptions({ tabSize: 2 });
    const model = editor.getModel();
    if (!model) return;

    const babelParse = (code: string) => {
      return parse(code, {
        sourceType: "module",
        plugins: ["jsx", "typescript"],
        errorRecovery: true,
      });
    };

    const highlighter = new MonacoJSXHighlighter(
      // @ts-expect-error: monaco is injected globally by loader
      window.monaco,
      babelParse,
      traverse,
      editor,
    );

    highlighter.highlightOnDidChangeModelContent(100);
    //  Activate JSX commenting
    highlighter.addJSXCommentCommand();
  };

  const handleFormat = async () => {
    if (!editorRef.current) return;
    // get current value form editor

    const currentValue = editorRef.current.getValue();

    //format the given value
    try {
      const formattedValue = await prettier.format(currentValue, {
        parser: "babel",
        plugins: [parserBabel, parserEstree],
        useTabs: false,
        semi: true,
        singleQuote: true,
      });
      const cleanedFormattedValue = formattedValue.replace(/\n$/, "");

      //set the formatted value back to editor
      editorRef.current.setValue(cleanedFormattedValue);
      onChange(cleanedFormattedValue);
    } catch (error) {
      console.error("Formatting error:", error);
      console.warn("Code is not valid yet — skipping format.");
    }
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={handleFormat}
      >
        Format
      </button>
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
    </div>
  );
};

export default CodeEditor;
