import type {Editor} from "@tiptap/react"
import {EditorContent} from "@tiptap/react"
import {Toolbar} from "./Toolbar"
import {uiStyles} from "./uiStyles.ts"

/** Hold Tiptap editor instance */
export type EditorPanelProps = {
    editor: Editor | null
    onExport: (format: "txt" | "md") => void
}

/**
 * Render the formatting toolbar and the Tiptap editor surface
 * @param EditorPanelProps - React props
 * @param EditorPanelProps.editor {Editor | null} - Tiptap editor instance
 * @returns JSX element containing toolbar + editor content
 */
export function EditorPanel({ editor, onExport }: EditorPanelProps) {
    return (
        <main id="editor-panel" style={uiStyles.editorPanel}>
            <div id="editor-container" style={uiStyles.editorContainer}>
                <Toolbar editor={editor} onExport={onExport} />
                <EditorContent editor={editor} />
            </div>
        </main>
    )
}
