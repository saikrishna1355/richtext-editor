interface EditorProps {
    initialContent?: string;
    onChange?: (html: string) => void;
}
declare const Editor: React.FC<EditorProps>;
export default Editor;
