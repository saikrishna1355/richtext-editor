## React Text Editor

A customizable and user-friendly React text editor component, supporting rich text editing, HTML code editing, and the ability to toggle between the two. This editor allows users to format text, create headings, add links, and more, directly from the UI or HTML code.

## Features

- **Rich Text Formatting**: Bold, italic, unordered lists, headings, and more.
- **HTML Code Editing**: Toggle between the rich text editor and raw HTML code view.
- **Customizable**: Easily style and customize the component by targeting class names.
- **Clipboard Handling**: Prevents cursor jumping during paste actions.
- **Lightweight and Easy to Integrate**: Can be used in any React project.

---

## Installation

You can install the package via npm or yarn:

```bash
npm install react-text-editor
```

or

```bash
yarn add react-text-editor
```

---

## Usage

### Basic Usage

```tsx
import React, { useState } from "react";
import Editor from "custom-rich-text-editor/dist/Editor";

const App = () => {
  const [content, setContent] = useState("");

  const handleChange = (html: string) => {
    setContent(html);
  };

  return (
    <div>
      <Editor initialContent={content} onChange={handleChange} />
    </div>
  );
};

export default App;
```

### Props

- **`initialContent`**: Initial HTML content to display in the editor (optional).
- **`onChange`**: A callback function that fires when the content of the editor changes. The updated HTML is passed as an argument to this callback.

---

## Available Commands

- **Bold**
- **Italic**
- **Unordered List**
- **Heading 1**
- **Heading 2**
- **Paragraph**
- **Create Link**

---

## Customizing Styles

You can customize the editor by modifying the class names in the component. Below are the main class names used:

- **`main_layout`**: The outermost wrapper for the editor.
- **`text_editor`**: The container for all text editor elements (including the toolbar and editor).
- **`icon_bar`**: The toolbar containing buttons for formatting options.
- **`html_code_editor`**: The area for HTML code editing when toggled.

---

## Demo

You can view a live demo of the editor (https://text-editor-react-lovat.vercel.app/).

---

## GitHub Repository

The source code is hosted on GitHub. You can find it (https://github.com/saikrishna1355/richtext-editor).

---

## License

This project is licensed under the MIT License.

---

## Contribution

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## Issues and Updates

If you encounter any issues or have suggestions for improvements, feel free to open an issue in the GitHub repository. We welcome contributions and feedback to make this package even better!
