import React from "react"
import type { Editor } from "@tiptap/react"
import { buttonStyle, uiStyles } from "./uiStyles"

/** Hold Tiptap editor instance */
export type ToolbarProps = {
    editor: Editor | null
    onExport: (format: "txt" | "md") => void
}

/**
 * Re-render on editor transactions/selection updates so active marks are reflected in the UI
 * @param ToolbarProps - React props
 * @param ToolbarProps.editor {Editor | null} - Tiptap editor instance used to execute formatting commands
 * @returns JSX toolbar element
 */
export function Toolbar({ editor, onExport }: ToolbarProps) {
    const [, forceRender] = React.useReducer((x) => x + 1, 0)
    const [styleOpen, setStyleOpen] = React.useState(false)

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

    // Close dropdown when clicking outside
    React.useEffect(() => {
        if (!styleOpen) return
        const onDown = () => setStyleOpen(false)
        window.addEventListener("mousedown", onDown)
        return () => window.removeEventListener("mousedown", onDown)
    }, [styleOpen])

    if (!editor) return null

    const currentBlockLabel = () => {
        if (editor.isActive("heading", { level: 1 })) return "Heading 1"
        if (editor.isActive("heading", { level: 2 })) return "Heading 2"
        if (editor.isActive("heading", { level: 3 })) return "Heading 3"
        return "Normal text"
    }

    return (
        <div id="toolbar" style={uiStyles.toolbarRow}>
            {/* Undo / Redo */}
            <button
                className="ui-btn ui-btn--light"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
                style={{
                    ...buttonStyle({}),
                    fontSize: "16px",
                }}
                title="Undo (Ctrl/Cmd + Z)"
            >
                ⟲
            </button>

            <button
                className="ui-btn ui-btn--light"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
                style={{
                    ...buttonStyle({}),
                    fontSize: "16px",
                }}
                title="Redo (Ctrl/Cmd + Shift + Z)"
            >
                ⟳
            </button>


            {/* Text style dropdown */}
            <div style={{ position: "relative" }}>
                <button
                    style={buttonStyle({})}
                    onClick={(e) => {
                        e.stopPropagation()
                        setStyleOpen((o) => !o)
                    }}
                    title="Text style"
                >
                    {currentBlockLabel()} ▼
                </button>

                {styleOpen && (
                    <div
                        onMouseDown={(e) => e.stopPropagation()}
                        style={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            background: "#222",
                            borderRadius: 6,
                            padding: 4,
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            zIndex: 100,
                            minWidth: 160,
                        }}
                    >
                        <button
                            style={buttonStyle({})}
                            onClick={() => {
                                editor.chain().focus().setParagraph().run()
                                setStyleOpen(false)
                            }}
                        >
                            Normal text
                        </button>

                        <button
                            style={buttonStyle({})}
                            onClick={() => {
                                editor.chain().focus().toggleHeading({ level: 1 }).run()
                                setStyleOpen(false)
                            }}
                        >
                            Heading 1
                        </button>

                        <button
                            style={buttonStyle({})}
                            onClick={() => {
                                editor.chain().focus().toggleHeading({ level: 2 }).run()
                                setStyleOpen(false)
                            }}
                        >
                            Heading 2
                        </button>

                        <button
                            style={buttonStyle({})}
                            onClick={() => {
                                editor.chain().focus().toggleHeading({ level: 3 }).run()
                                setStyleOpen(false)
                            }}
                        >
                            Heading 3
                        </button>
                    </div>
                )}
            </div>

            {/* Lists */}
            <button
                className="ui-btn ui-btn--light"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                style={buttonStyle({ active: editor.isActive("bulletList") })}
                title="Bullet list"
            >
                •
            </button>

            <button
                className="ui-btn ui-btn--light"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                style={buttonStyle({ active: editor.isActive("orderedList") })}
                title="Numbered list"
            >
                1.
            </button>


            {/* Inline formatting */}
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

            {/* URL */}
            <button
                className="ui-btn ui-btn--light"
                onMouseDown={(e) => e.preventDefault()} // ✅ keeps selection in editor
                onClick={() => {
                    const prev = editor.getAttributes("link").href as string | undefined

                    const url = window.prompt("Enter URL", prev ?? "https://")
                    if (url === null) return // cancelled

                    const trimmed = url.trim()
                    if (trimmed === "") {
                        // If user clears, remove link
                        editor.chain().focus().unsetLink().run()
                        return
                    }

                    const { from, to, empty } = editor.state.selection

                    if (empty) {
                        // No selection: insert the URL text as a clickable link
                        editor
                            .chain()
                            .focus()
                            .insertContent([
                                {
                                    type: "text",
                                    text: trimmed,
                                    marks: [{ type: "link", attrs: { href: trimmed } }],
                                },
                            ])
                            .run()
                        return
                    }

                    // Selection exists: apply link to selected text
                    editor
                        .chain()
                        .focus()
                        .extendMarkRange("link")
                        .setLink({ href: trimmed })
                        .run()
                }}
                style={buttonStyle({ active: editor.isActive("link") })}
                title="Insert / edit link"
            >
                🔗
            </button>


            {/* Export buttons */}
            <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                <button
                    style={buttonStyle({})}
                    onClick={() => onExport("txt")}
                    title="Export as TXT"
                >
                    Export TXT
                </button>

                <button
                    style={buttonStyle({})}
                    onClick={() => onExport("md")}
                    title="Export as Markdown"
                >
                    Export MD
                </button>
            </div>
        </div>
    )
}