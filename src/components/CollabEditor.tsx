import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCaret from '@tiptap/extension-collaboration-caret'
import { ydoc, provider } from '../y.js/y-webrtc-test'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'




const CollabEditor: React.FC = () => {
    const [, setVersion] = React.useState(0)
    /**
     * Initialize the Tiptap editor instance.
     * - StarterKit: basic rich-text nodes & marks (paragraph, bold, …)
     * - Collaboration: binds the editor to the shared Y.Doc
     * - CollaborationCaret: shows remote user cursors
     */
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                undoRedo: false,
                // Disable default undo/redo because collaboration
                // provides its own synchronized version.
            }),
            Underline,
            Highlight,
            // Enables collaborative content syncing using Yjs
            Collaboration.configure({
                document: ydoc,
                field: 'default',
            }),
            // Shows cursors inside the editor
            CollaborationCaret.configure({
                provider,
                user: {
                    name: 'User',
                    color: '#4c6fff',
                },
                // Custom render function for cursors
                render: user => {
                    const cursor = document.createElement('span')
                    cursor.classList.add('collaboration-cursor__caret')
                    cursor.style.borderLeft = `2px solid ${user.color || '#4c6fff'}`
                    cursor.style.marginLeft = '-1px'
                    cursor.style.marginRight = '-1px'
                    cursor.style.position = 'relative'
                    cursor.style.pointerEvents = 'none'
                    cursor.style.height = '1em'
                    return cursor
                },
            }),
        ],
    })

    React.useEffect(() => {
        if (!editor) return

        const update = () => setVersion(v => v + 1)

        editor.on('selectionUpdate', update)
        editor.on('transaction', update)

        return () => {
            editor.off('selectionUpdate', update)
            editor.off('transaction', update)
        }
    }, [editor])

    if (!editor) {
        return null
    }
    return (
        <div style={{ padding: '1rem', maxWidth: 800, margin: '0 auto' }}>
            <h1>Nodepad</h1>

            {/* Toolbar */}
            <div style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                <button
                    className={editor.isActive('bold') ? 'active' : ''}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    style={{ fontWeight: 'bold' }}
                >
                    B
                </button>

                <button
                    className={editor.isActive('italic') ? 'active' : ''}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    style={{ fontStyle: 'italic' }}
                >
                    I
                </button>

                <button
                    className={editor.isActive('underline') ? 'active' : ''}
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    style={{ textDecoration: 'underline' }}
                >
                    U
                </button>

                <button
                    className={editor.isActive('strike') ? 'active' : ''}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    style={{ textDecoration: 'line-through' }}
                >
                    S
                </button>

                <button
                    className={editor.isActive('highlight') ? 'active' : ''}
                    onClick={() => editor.chain().focus().toggleHighlight().run()}
                >
                    H
                </button>

                <button onClick={() => editor.chain().focus().undo().run()}>
                    ⟲
                </button>

                <button onClick={() => editor.chain().focus().redo().run()}>
                    ⟳
                </button>
            </div>


            {/* The editor */}
            <EditorContent editor={editor} />
        </div>
    )
}

export default CollabEditor
