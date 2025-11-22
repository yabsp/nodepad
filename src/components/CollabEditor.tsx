import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCaret from '@tiptap/extension-collaboration-caret'
import { ydoc, provider } from '../y.js/y-webrtc-test'


const CollabEditor: React.FC = () => {
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

    if (!editor) {
        return null
    }

    return (
        <div style={{ padding: '1rem', maxWidth: 800, margin: '0 auto' }}>
            <h1>Nodepad – Collaborative Text Editor</h1>
            <div
                style={{
                    border: '1px solid #ddd',
                    borderRadius: 4,
                    padding: '0.75rem',
                    minHeight: '200px',
                }}
            >
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}

export default CollabEditor
