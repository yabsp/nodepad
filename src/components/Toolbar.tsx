import React from "react"
import type { Editor } from "@tiptap/react"
import { buttonStyle, uiStyles } from "./uiStyles"

/** Hold Tiptap editor instance */
export type ToolbarProps = {
    editor: Editor | null
}

/**
 * Re-render on editor transactions/selection updates so active marks are reflected in the UI
 * @param ToolbarProps - React props
 * @param ToolbarProps.editor {Editor | null} - Tiptap editor instance used to execute formatting commands
 * @returns JSX toolbar element
 */
export function Toolbar({ editor }: ToolbarProps) {
    const [, forceRender] = React.useReducer((x) => x + 1, 0)

    React.useEffect(() => {
        if (!editor) return

        // Any change that affects marks/selection should trigger a re-render
        const rerender = () => forceRender()

        editor.on("transaction", rerender)
        editor.on("selectionUpdate", rerender)

        return () => {
            editor.off("transaction", rerender)
            editor.off("selectionUpdate", rerender)
        }
    }, [editor])

    if (!editor) return null

    return (
        <div id="toolbar" style={uiStyles.toolbarRow}>
            <button
                className="ui-btn ui-btn--light"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                style={buttonStyle({ active: editor.isActive("bold") })}
                title="Bold"
            >
                B
            </button>

            <button
                className="ui-btn ui-btn--light"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                style={buttonStyle({ active: editor.isActive("italic") })}
                title="Italic"
            >
                I
            </button>

            <button
                className="ui-btn ui-btn--light"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                disabled={!editor.can().chain().focus().toggleUnderline().run()}
                style={buttonStyle({ active: editor.isActive("underline") })}
                title="Underline"
            >
                U
            </button>

            <button
                className="ui-btn ui-btn--light"
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                style={buttonStyle({ active: editor.isActive("highlight") })}
                title="Highlight"
            >
                H
            </button>
        </div>
    )
}
