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
        <div style={uiStyles.editorPanel}>
            <div style={uiStyles.editorContainer}>
                <Toolbar editor={editor} onExport={onExport} />

                <div
                    style={{
                        flex: 1,
                        overflowY: "auto",
                        padding: 16,
                        boxSizing: "border-box",
                    }}
                >
                    <EditorContent editor={editor} />
                </div>

            </div>
        </div>
    )
}
