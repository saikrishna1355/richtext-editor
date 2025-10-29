## React Text Editor

[![npm version](https://img.shields.io/npm/v/custom-rich-text-editor.svg)](https://www.npmjs.com/package/custom-rich-text-editor)
[![npm downloads](https://img.shields.io/npm/dm/custom-rich-text-editor.svg)](https://www.npmjs.com/package/custom-rich-text-editor)
[![license: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

A customizable and user-friendly WYSIWYG React text editor that lets you switch seamlessly between formatted content and raw HTML. Ideal for dashboards, CMS integrations, documentation tools, or any React app that needs rich text capabilities with full HTML control.

- **Keywords**: React rich text editor, WYSIWYG, HTML editor, content management, TypeScript ready, customizable toolbar.

---

## Table of Contents

1. [Features at a Glance](#features-at-a-glance)
2. [Quick Start](#quick-start)
3. [Usage](#usage)
4. [API](#api)
5. [Styling Guide](#styling-guide)
6. [FAQ](#faq)
7. [Demo](#demo)
8. [Contributing](#contributing)
9. [License](#license)

---

## Features at a Glance

- **Rich Text Formatting**: Apply bold, italic, headings, lists, and links without leaving the editor.
- **HTML Code Editing**: Toggle to view or edit the underlying HTML markup instantly.
- **TypeScript Support**: Fully typed props for safer integrations in TypeScript projects.
- **Clipboard Handling**: Smart paste support that prevents cursor jumps and keeps formatting consistent.
- **Customizable UI**: Swap icons, change layouts, or override styles via CSS class hooks.
- **Framework Friendly**: Lightweight bundle that drops into existing React, Next.js, or Vite projects.

---

## Quick Start

Install the package using your preferred package manager:

```bash
npm install custom-rich-text-editor
# or
yarn add custom-rich-text-editor
```

---

## Usage

### Basic Example

```tsx
import React, { useState } from "react";
import Editor from "custom-rich-text-editor/dist/Editor";

const App = () => {
  const [content, setContent] = useState("<p>Hello world!</p>");

  return (
    <Editor
      initialContent={content}
      onChange={(html: string) => setContent(html)}
    />
  );
};

export default App;
```

### Controlled Mode

The editor works in controlled mode, so you can persist content to a database or reuse it elsewhere in your app:

```tsx
const handleSubmit = async () => {
  await api.savePost({ body: content }); // store HTML
};
```

---

## API

| Prop             | Type                     | Default | Description                                                                 |
| ---------------- | ------------------------ | ------- | --------------------------------------------------------------------------- |
| `initialContent` | `string`                 | `""`    | Optional starting HTML content.                                             |
| `onChange`       | `(html: string) => void` | —       | Fired whenever the editor content changes. Receives the latest HTML string. |

---

## Styling Guide

Override the provided class names to match your design system:

- `main_layout`: Wraps the entire editor instance.
- `text_editor`: Contains the toolbar and editable area.
- `icon_bar`: Toolbar that hosts the formatting controls.
- `html_code_editor`: `<textarea>` that appears in HTML mode.

All controls use semantic buttons, so you can safely theme them with Tailwind, CSS Modules, or Styled Components.

---

## FAQ

- **Can I extend the toolbar?** Yes. Fork the component or wrap it to inject additional buttons that target the same contenteditable area.
- **Is server-side rendering supported?** The editor is safe to import in Next.js. Gate rendering behind a dynamic import if you rely on browser-only APIs.
- **Does it support custom fonts?** Absolutely. Apply project fonts via CSS; the contenteditable area respects inherited styles.

---

## Demo

Explore the live sandbox at [text-editor-react-lovat.vercel.app](https://text-editor-react-lovat.vercel.app/).

## Contributing

We welcome enhancements, bug fixes, and new features. Open an issue to discuss ideas or submit a pull request.

---

## License

Released under the [MIT License](LICENSE).
