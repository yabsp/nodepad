import React from "react"
import * as Y from "yjs"
import { useEditor } from "@tiptap/react"
import Collaboration from "@tiptap/extension-collaboration"
import CollaborationCaret from "@tiptap/extension-collaboration-caret"
import Underline from "@tiptap/extension-underline"
import Highlight from "@tiptap/extension-highlight"
import Document from "@tiptap/extension-document"
import Paragraph from "@tiptap/extension-paragraph"
import Text from "@tiptap/extension-text"
import Bold from "@tiptap/extension-bold"
import Italic from "@tiptap/extension-italic"
import { useCollabRoom, DEFAULT_FILE } from "../y.js/collabRoom"
import type { FileInfo } from "../y.js/collabRoom"
import { Sidebar } from "./Sidebar"
import { EditorPanel } from "./EditorPanel.tsx"


type FileMeta = { id: string } & FileInfo

/**
 * Are provided by the StartPage
 */
type CollabEditorProps = {
    roomName: string
    password: string
    userName: string
    onLeave: () => void
}

/**
 * Observe a Y.Map and re-render whenever the map changes, then return a snapshot of its entries for rendering.
 * @param yMap {Y.Map<T> | null} - Yjs map to observe
 * @returns Array of entries in the map (key/value) for rendering
 */
function useYMapSnapshot<T>(yMap: Y.Map<T> | null): Array<{ key: string; value: T }> {
    // Force the component to refresh
    const [, force] = React.useReducer((x) => x + 1, 0)

    React.useEffect(() => {
        if (!yMap) return
        // Any Y.Map change (set/delete/update) triggers a refresh
        const onChange = () => force()
        yMap.observe(onChange)
        // Cleanup
        return () => yMap.unobserve(onChange)
    }, [yMap])

    if (!yMap) return []
    // Convert Y.Map into an array for rendering
    const out: Array<{ key: string; value: T }> = []
    yMap.forEach((value, key) => out.push({ key, value }))
    return out
}

/**
 * Main collaborative editor component.
 *
 * Responsibilities:
 * - Connect to a shared Yjs room
 * - Track connected users via awareness
 * - Manage shared files (create / rename / delete)
 * - Configure Tiptap collaboration + cursors
 * - Compose the Sidebar and EditorPanel UI
 * @returns JSX element for the collaborative editor experience
 */
export default function CollabEditor({
                                         roomName,
                                         password,
                                         userName,
                                         onLeave,
                                     }: CollabEditorProps) {
    /**
     * Combine room name and password into a single effective room identifier.
     * Peers must use the same effective name to join the same collaboration session.
     */
    const effectiveRoomName = React.useMemo(() => {
        return password ? `${roomName}::${password}` : roomName
    }, [roomName, password])

    const room = useCollabRoom(effectiveRoomName)

    /**
     * Track currently connected users via Yjs awareness.
     * This is used for displaying a participant list in the sidebar.
     */
    const [users, setUsers] = React.useState<string[]>([])

    React.useEffect(() => {
        if (!room) return
        const awareness = room.provider.awareness

        const updateUsers = () => {
            const names: string[] = []
            awareness.getStates().forEach((state: any) => {
                if (state.user?.name) {
                    names.push(state.user.name)
                }
            })
            setUsers(names)
        }

        updateUsers()
        awareness.on("change", updateUsers)
        return () => awareness.off("change", updateUsers)
    }, [room])

    /**
     * Derive a sorted list of shared files from the Yjs map.
     * Sorting is done locally for stable and predictable UI ordering.
     */
    const fileEntries = useYMapSnapshot(room?.files ?? null)
    const files: FileMeta[] = React.useMemo(
        () =>
            fileEntries
                .map(({ key, value }) => ({ id: key, ...value }))
                .sort((a, b) => a.createdAt - b.createdAt),
        [fileEntries]
    )

    // Track which file is open and open default
    const [activeFileId, setActiveFileId] = React.useState<string>(DEFAULT_FILE)

    // If activeFileId is not available use the default
    React.useEffect(() => {
        if (!room) return
        if (!room.files.has(activeFileId)) setActiveFileId(DEFAULT_FILE)
    }, [room, activeFileId])

    /** Create new collaborative file, add metadata and add to the file list of the room */
    const addFile = React.useCallback(() => {
        if (!room) return
        const id = crypto.randomUUID()
        room.files.set(id, { name: "New File", icon: "📄", createdAt: Date.now() })
        setActiveFileId(id)
    }, [room])

    /** Build TipTap extension list */
    const extensions = React.useMemo(() => {
        // Base schema + marks. Always present to avoid schema errors.
        const base = [Document, Paragraph, Text, Bold, Italic, Underline, Highlight]
        if (!room) return base

        return [
            ...base,
            Collaboration.configure({ document: room.yDoc, field: activeFileId }),

            // Shows remote cursors inside the editor
            CollaborationCaret.configure({
                provider: room.provider,
                user: { name: userName, color: "#4c6fff" },

                // Custom render function for a cursor
                render: user => {
                    const caret = document.createElement("span")
                    const offset = (user.clientId ?? 0) % 3

                    caret.style.borderLeft = `2px solid ${user.color || "#4c6fff"}`
                    caret.style.marginLeft = "-1px"
                    caret.style.marginRight = "-1px"
                    caret.style.height = "1em"
                    caret.style.position = "relative"
                    caret.style.pointerEvents = "none"

                    const label = document.createElement("div")
                    label.textContent = user.name || ""
                    label.style.position = "absolute"
                    label.style.top = `${-1.4 - offset * 1.1}em`
                    label.style.left = "0"
                    label.style.padding = "2px 6px"
                    label.style.fontSize = "0.7rem"
                    label.style.borderRadius = "4px"
                    label.style.background = user.color || "#4c6fff"
                    label.style.color = "white"
                    label.style.whiteSpace = "nowrap"
                    label.style.pointerEvents = "none"

                    caret.appendChild(label)

                    return caret
                },
            }),
        ]
    }, [room, activeFileId, userName])

    // Create the editor instance
    const editor = useEditor({ extensions }, [extensions])

    // Display loading screens to prevent crashes during loading
    if (!room) return <div>Connecting…</div>
    if (!editor) return <div>Loading editor…</div>

    return (
        <div style={{ display: "flex", width: "100%", height: "100%", overflow: "hidden" }}>
            <Sidebar
                roomName={roomName}
                files={files.map((f) => ({ id: f.id, name: f.name }))}
                activeFileId={activeFileId}
                onAddFile={addFile}
                onSelectFile={setActiveFileId}

                // Update shared file name in Yjs map
                onRenameFile={(id, name) => {
                    const file = room?.files.get(id)
                    if (!file) return
                    room.files.set(id, { ...file, name })
                }}
                // Remove file from shared state
                onDeleteFile={(id) => {
                    room?.files.delete(id)
                    if (activeFileId === id) {
                        setActiveFileId(DEFAULT_FILE)
                    }
                }}
                onLeave={onLeave}
                users={users}
            />

            {/* Editor area must stretch */}
            <div style={{ flex: 1, overflow: "hidden" }}>
                <EditorPanel editor={editor} />
            </div>
        </div>
    )
}
