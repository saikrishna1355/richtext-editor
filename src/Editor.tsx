"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  FaBold,
  FaItalic,
  FaListUl,
  FaLink,
  FaParagraph,
  FaCode,
} from "react-icons/fa";
import { LuHeading1, LuHeading2 } from "react-icons/lu";

interface EditorProps {
  initialContent?: string;
  onChange?: (html: string) => void;
}

const Editor: React.FC<EditorProps> = ({ initialContent = "", onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [htmlCode, setHtmlCode] = useState<string>(initialContent);
  const [showCode, setShowCode] = useState(true);

  // Initialize content on mount or when initialContent changes
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = initialContent;
    }
    setHtmlCode(initialContent);
  }, [initialContent]);

  const handleEditorInput = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      setHtmlCode(content);
      onChange?.(content);
    }
  };

  const handleCodeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const html = e.target.value;
    setHtmlCode(html);
    if (editorRef.current) {
      editorRef.current.innerHTML = html;
    }
    onChange?.(html);
  };

  const format = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  return (
    <div>
      {/* Main Grid */}
      <div
        className="main_layout"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
        }}
      >
        {/* Rendered HTML */}

        <div className="text_editor">
          <div
            className="icon_bar"
            style={{
              marginBottom: "1rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <button
              onClick={() => format("formatBlock", "<p>")}
              style={buttonStyle}
            >
              <FaParagraph />
            </button>
            <button onClick={() => format("bold")} style={buttonStyle}>
              <FaBold />
            </button>
            <button onClick={() => format("italic")} style={buttonStyle}>
              <FaItalic />
            </button>
            <button
              onClick={() => format("insertUnorderedList")}
              style={buttonStyle}
            >
              <FaListUl />
            </button>
            <button
              onClick={() => format("formatBlock", "<h1>")}
              style={buttonStyle}
            >
              <LuHeading1 />
            </button>
            <button
              onClick={() => format("formatBlock", "<h2>")}
              style={buttonStyle}
            >
              <LuHeading2 />
            </button>
            <button
              onClick={() => format("createLink", "https://www.example.com")}
              style={buttonStyle}
            >
              <FaLink />
            </button>
            <button onClick={() => setShowCode(!showCode)} style={buttonStyle}>
              <FaCode />
            </button>
          </div>
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={handleEditorInput}
            style={{
              border: "1px solid #ccc",
              minHeight: "200px",
              padding: "1rem",
              borderRadius: "8px",
            }}
          />
        </div>

        {/* HTML Code Editor */}
        {showCode && (
          <div className="html_code_editor">
            <textarea
              value={htmlCode}
              onChange={handleCodeInput}
              placeholder="Write or paste HTML here..."
              style={{
                width: "100%",
                minHeight: "200px",
                padding: "1rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontFamily: "monospace",
                backgroundColor: "#fdfdfd",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const buttonStyle = {
  backgroundColor: "#f4f4f4",
  border: "none",
  borderRadius: "8px",
  padding: "10px",
  margin: "5px",
  cursor: "pointer",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
};

export default Editor;
