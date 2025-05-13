"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState, useEffect } from "react";
import { FaBold, FaItalic, FaListUl, FaLink, FaParagraph, FaCode, } from "react-icons/fa";
import { LuHeading1, LuHeading2 } from "react-icons/lu";
const Editor = ({ initialContent = "", onChange }) => {
    const editorRef = useRef(null);
    const [showCode, setShowCode] = useState(true);
    const [htmlCode, setHtmlCode] = useState(initialContent);
    // Save selection position
    const saveSelection = () => {
        const selection = window.getSelection();
        return selection === null || selection === void 0 ? void 0 : selection.getRangeAt(0);
    };
    // Restore selection position
    const restoreSelection = (range) => {
        if (!range)
            return;
        const selection = window.getSelection();
        if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
        }
    };
    // Handle paste events to prevent cursor jumping
    const handlePaste = (event) => {
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
    const handleEditorInput = () => {
        if (editorRef.current) {
            const content = editorRef.current.innerHTML;
            if (content !== htmlCode) {
                setHtmlCode(content);
                onChange === null || onChange === void 0 ? void 0 : onChange(content);
            }
        }
    };
    const handleCodeInput = (e) => {
        const html = e.target.value;
        setHtmlCode(html);
        if (editorRef.current) {
            editorRef.current.innerHTML = html;
        }
        onChange === null || onChange === void 0 ? void 0 : onChange(html);
    };
    const format = (command, value) => {
        document.execCommand(command, false, value);
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
    return (_jsx("div", { className: "main_layout", children: _jsxs("div", { className: "text_editor", children: [_jsxs("div", { className: "icon_bar", style: {
                        marginBottom: "1rem",
                    }, children: [_jsx("button", { onClick: () => format("formatBlock", "<p>"), style: buttonStyle, children: _jsx(FaParagraph, {}) }), _jsx("button", { onClick: () => format("bold"), style: buttonStyle, children: _jsx(FaBold, {}) }), _jsx("button", { onClick: () => format("italic"), style: buttonStyle, children: _jsx(FaItalic, {}) }), _jsx("button", { onClick: () => format("insertUnorderedList"), style: buttonStyle, children: _jsx(FaListUl, {}) }), _jsx("button", { onClick: () => format("formatBlock", "<h1>"), style: buttonStyle, children: _jsx(LuHeading1, {}) }), _jsx("button", { onClick: () => format("formatBlock", "<h2>"), style: buttonStyle, children: _jsx(LuHeading2, {}) }), _jsx("button", { onClick: () => format("createLink", "https://www.example.com"), style: buttonStyle, children: _jsx(FaLink, {}) }), _jsx("button", { onClick: () => setShowCode(!showCode), style: buttonStyle, children: _jsx(FaCode, {}) })] }), _jsx("div", { ref: editorRef, contentEditable: true, suppressContentEditableWarning: true, onInput: handleEditorInput, onPaste: handlePaste, style: {
                        border: "1px solid #ccc",
                        minHeight: "200px",
                        padding: "1rem",
                        borderRadius: "8px",
                        outline: "none",
                        marginBottom: "1rem",
                    } }), showCode && (_jsx("div", { className: "html_code_editor", children: _jsx("textarea", { value: htmlCode, onChange: handleCodeInput, placeholder: "Write or paste HTML here...", style: {
                            width: "100%",
                            minHeight: "200px",
                            padding: "1rem",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            fontFamily: "monospace",
                            backgroundColor: "#fdfdfd",
                        } }) }))] }) }));
};
export default Editor;
