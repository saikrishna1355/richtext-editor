"use client";

import { useRef, useState, useEffect } from "react";
import {
  FaBold,
  FaItalic,
  FaListUl,
  FaListOl,
  FaLink,
  FaParagraph,
  FaCode,
  FaUnderline,
  FaCaretDown,
  FaCircle,
  FaRegCircle,
  FaSquare,
} from "react-icons/fa";
import { LuHeading1, LuHeading2 } from "react-icons/lu";

interface EditorProps {
  initialContent?: string;
  onChange?: (html: string) => void;
}

const Editor: React.FC<EditorProps> = ({ initialContent = "", onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showCode, setShowCode] = useState(false);
  const [htmlCode, setHtmlCode] = useState<string>(initialContent);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkText, setLinkText] = useState("");
  const [linkUrl, setLinkUrl] = useState("https://");
  const linkUrlInputRef = useRef<HTMLInputElement>(null);
  const selectionRef = useRef<Range | null>(null);
  const [showListMenu, setShowListMenu] = useState(false);
  const listMenuRef = useRef<HTMLDivElement>(null);
  const listButtonRef = useRef<HTMLButtonElement>(null);

  // Save selection position
  const saveSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return null;
    return selection.getRangeAt(0);
  };

  // Restore selection position
  const restoreSelection = (range: Range | null) => {
    if (!range) return;
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  // Handle paste events to prevent cursor jumping
  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const range = saveSelection();
    const text = event.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
    if (range) {
      restoreSelection(range);
    }
  };

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== initialContent) {
      editorRef.current.innerHTML = initialContent;
    }
    setHtmlCode(initialContent);
  }, [initialContent]);

  useEffect(() => {
    if (showLinkDialog) {
      linkUrlInputRef.current?.focus();
      linkUrlInputRef.current?.select();
    }
  }, [showLinkDialog]);

  useEffect(() => {
    if (!showListMenu) return;
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (listMenuRef.current?.contains(target)) return;
      if (listButtonRef.current?.contains(target)) return;
      setShowListMenu(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showListMenu]);

  const handleEditorInput = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      if (content !== htmlCode) {
        setHtmlCode(content);
        onChange?.(content);
      }
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

  const createLinkHtml = (url: string, text: string) => {
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.textContent = text;
    return anchor.outerHTML;
  };

  const openLinkDialog = () => {
    const selection = window.getSelection();
    const range =
      selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
    selectionRef.current = range;
    setLinkText(selection?.toString() ?? "");
    setLinkUrl("https://");
    setShowLinkDialog(true);
  };

  const closeLinkDialog = () => {
    setShowLinkDialog(false);
  };

  const handleInsertLink = () => {
    const url = linkUrl.trim();
    if (!url) return;
    if (editorRef.current) {
      editorRef.current.focus();
    }
    const range = selectionRef.current;
    if (range) {
      restoreSelection(range);
    }
    const selectedText = range ? range.toString() : "";
    const finalText = linkText.trim() || selectedText || url;
    if (range && selectedText && linkText.trim() === "") {
      format("createLink", url);
    } else {
      format("insertHTML", createLinkHtml(url, finalText));
    }
    setShowLinkDialog(false);
    setLinkText("");
    setLinkUrl("https://");
    handleEditorInput();
  };

  const getClosestUnorderedList = () => {
    const selection = window.getSelection();
    const anchorNode = selection?.anchorNode ?? selection?.focusNode ?? null;
    const element =
      anchorNode instanceof Element ? anchorNode : anchorNode?.parentElement;
    return element?.closest("ul");
  };

  const applyUnorderedListStyle = (style: string) => {
    let list = getClosestUnorderedList();
    if (!list) {
      format("insertUnorderedList");
      list = getClosestUnorderedList();
    }
    if (!list) {
      setShowListMenu(false);
      return;
    }
    if (style === ">>") {
      list.style.listStyleType = '">> "';
    } else if (style === "->") {
      list.style.listStyleType = '"-> "';
    } else {
      list.style.listStyleType = style;
    }
    setShowListMenu(false);
    handleEditorInput();
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

  const listMenuWrapperStyle = {
    position: "relative" as const,
    display: "inline-flex",
  };

  const listDropdownButtonStyle = {
    ...buttonStyle,
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
  };

  const listCaretStyle = {
    fontSize: "0.65rem",
  };

  const listMenuStyle = {
    position: "absolute" as const,
    top: "44px",
    left: "0",
    backgroundColor: "#fff",
    borderRadius: "8px",
    border: "1px solid #d0d7de",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.18)",
    padding: "8px",
    display: "grid",
    gridTemplateColumns: "repeat(3, 32px)",
    gap: "6px",
    zIndex: 200,
  };

  const listMenuButtonStyle = {
    width: "32px",
    height: "32px",
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  };

  const listMenuTextStyle = {
    fontSize: "12px",
    fontWeight: 600,
  };

  const linkDialogOverlayStyle = {
    position: "fixed" as const,
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.06)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: "70px",
    zIndex: 1000,
  };

  const linkDialogStyle = {
    width: "320px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    border: "1px solid #d0d7de",
    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.18)",
    overflow: "hidden",
  };

  const linkDialogHeaderStyle = {
    padding: "10px 12px",
    fontWeight: 600,
    fontSize: "14px",
    borderBottom: "1px solid #e5e7eb",
  };

  const linkDialogBodyStyle = {
    padding: "12px",
    display: "grid",
    gap: "8px",
  };

  const linkLabelStyle = {
    fontSize: "11px",
    color: "#6b7280",
    textTransform: "uppercase" as const,
    letterSpacing: "0.04em",
  };

  const linkInputStyle = {
    padding: "8px 10px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    outline: "none",
  };

  const linkRowStyle = {
    display: "flex",
    gap: "8px",
    alignItems: "center",
  };

  const linkInsertButtonStyle = {
    backgroundColor: "#2e7d32",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "8px 12px",
    fontWeight: 600,
    cursor: "pointer",
  };

  return (
    <div className="main_layout">
      <div className="text_editor">
        <div
          className="icon_bar"
          style={{
            marginBottom: "1rem",
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
          <button onClick={() => format("underline")} style={buttonStyle}>
            <FaUnderline />
          </button>
          <button onClick={() => format("italic")} style={buttonStyle}>
            <FaItalic />
          </button>
          <div style={listMenuWrapperStyle}>
            <button
              onClick={() => setShowListMenu((prev) => !prev)}
              style={listDropdownButtonStyle}
              ref={listButtonRef}
            >
              <FaListUl />
              <FaCaretDown style={listCaretStyle} />
            </button>
            {showListMenu && (
              <div style={listMenuStyle} ref={listMenuRef}>
                <button
                  type="button"
                  onClick={() => applyUnorderedListStyle("disc")}
                  style={listMenuButtonStyle}
                  aria-label="Disc bullets"
                >
                  <FaCircle size={12} />
                </button>
                <button
                  type="button"
                  onClick={() => applyUnorderedListStyle("circle")}
                  style={listMenuButtonStyle}
                  aria-label="Hollow bullets"
                >
                  <FaRegCircle size={12} />
                </button>
                <button
                  type="button"
                  onClick={() => applyUnorderedListStyle("square")}
                  style={listMenuButtonStyle}
                  aria-label="Square bullets"
                >
                  <FaSquare size={12} />
                </button>
                <button
                  type="button"
                  onClick={() => applyUnorderedListStyle(">>")}
                  style={listMenuButtonStyle}
                  aria-label="Double angle bullets"
                >
                  <span style={listMenuTextStyle}>{">>"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => applyUnorderedListStyle("->")}
                  style={listMenuButtonStyle}
                  aria-label="Arrow bullets"
                >
                  <span style={listMenuTextStyle}>{"->"}</span>
                </button>
              </div>
            )}
          </div>
          <button
            onClick={() => format("insertOrderedList")}
            style={buttonStyle}
          >
            <FaListOl />
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
          <button onClick={openLinkDialog} style={buttonStyle}>
            <FaLink />
          </button>
          <button onClick={() => setShowCode(!showCode)} style={buttonStyle}>
            <FaCode />
          </button>
        </div>

        {showLinkDialog && (
          <div style={linkDialogOverlayStyle} onClick={closeLinkDialog}>
            <div
              style={linkDialogStyle}
              onClick={(event) => event.stopPropagation()}
            >
              <div style={linkDialogHeaderStyle}>Link</div>
              <div style={linkDialogBodyStyle}>
                <label style={linkLabelStyle} htmlFor="link-display-text">
                  Display text
                </label>
                <input
                  id="link-display-text"
                  type="text"
                  value={linkText}
                  onChange={(event) => setLinkText(event.target.value)}
                  style={linkInputStyle}
                />
                <label style={linkLabelStyle} htmlFor="link-url">
                  Link URL
                </label>
                <div style={linkRowStyle}>
                  <input
                    id="link-url"
                    type="text"
                    value={linkUrl}
                    ref={linkUrlInputRef}
                    onChange={(event) => setLinkUrl(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        handleInsertLink();
                      }
                    }}
                    style={linkInputStyle}
                  />
                  <button
                    type="button"
                    onClick={handleInsertLink}
                    style={linkInsertButtonStyle}
                  >
                    Insert
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleEditorInput}
          onPaste={handlePaste}
          style={{
            border: "1px solid #ccc",
            minHeight: "200px",
            padding: "1rem",
            borderRadius: "8px",
            outline: "none",
            marginBottom: "1rem",
          }}
        />

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

export default Editor;
