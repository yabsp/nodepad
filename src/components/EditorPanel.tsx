import type {Editor} from "@tiptap/react"
import {EditorContent} from "@tiptap/react"
import {Toolbar} from "./Toolbar"
import {uiStyles} from "./uiStyles.ts"

/** Hold Tiptap editor instance */
export type EditorPanelProps = {
    editor: Editor | null
}

/**
 * Render the formatting toolbar and the Tiptap editor surface
 * @param EditorPanelProps - React props
 * @param EditorPanelProps.editor {Editor | null} - Tiptap editor instance
 * @returns JSX element containing toolbar + editor content
 */
export function EditorPanel({editor}: EditorPanelProps) {
    return (
        <main id="editor-panel" style={uiStyles.editorPanel}>
            <div id="editor-container" style={uiStyles.editorContainer}>
                <Toolbar editor={editor}/>
                <EditorContent editor={editor}/>
            </div>
        </main>
    )
}
