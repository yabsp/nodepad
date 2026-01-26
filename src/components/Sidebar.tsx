import React from "react"
import { buttonStyle, dividerStyle, sidebarFileButtonStyle, uiStyles } from "./uiStyles.ts"

/** Hold id as a key and a human-readable file name */
export type SidebarFile = {
    id: string
    name: string
}

/**
 * Hold name of collaboration room, array of available files, string of current opened file id and callback functions
 */
export type SidebarProps = {
    roomName: string
    files: SidebarFile[]
    activeFileId: string
    onAddFile: () => void
    onSelectFile: (fileId: string) => void
    onRenameFile: (fileId: string, newName: string) => void
    onDeleteFile: (fileId: string) => void
    onLeave: () => void
    users: string[]
}

/**
 * Left navigation panel showing the connected room and a list of collaborative files.
 * @param SidebarProps - React props
 * @param SidebarProps.roomName {string} - Collaboration room name shown at the top of the sidebar
 * @param SidebarProps.files {SidebarFile[]} - Files to render (from Yjs shared map)
 * @param SidebarProps.activeFileId {string} - File id currently open in the editor
 * @param SidebarProps.onAddFile {() => void} - Handler to create a new file
 * @param SidebarProps.onSelectFile {(fileId: string) => void} - Handler to switch the active file
 * @returns JSX sidebar element
 */
export function Sidebar({
                            roomName,
                            files,
                            activeFileId,
                            onAddFile,
                            onSelectFile,
                            onRenameFile,
                            onDeleteFile,
                            onLeave,
                            users,
                        }: SidebarProps) {
    const [editingId, setEditingId] = React.useState<string | null>(null)
    const [draftName, setDraftName] = React.useState("")

    return (
        <aside id="sidebar" style={uiStyles.sidebar}>
            <div id="sidebar-header" style={uiStyles.sidebarHeader}>
                <div id="room-label" style={uiStyles.mutedLabel}>
                    Connected Room
                </div>
                <div id="room-name" style={uiStyles.strongText}>
                    {roomName}
                </div>
            </div>

            {/* Leave room */}
            <button style={buttonStyle({ fullWidth: true })} onClick={onLeave}>
                ← Leave Room
            </button>

            <hr style={dividerStyle()} />

            {/* Connected users */}
            <div>
                <div style={uiStyles.mutedLabel}>Connected Users</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {users.map((name, i) => (
                        <li key={i}>{name}</li>
                    ))}
                </ul>
            </div>

            <hr style={dividerStyle()} />

            {/* Create file */}
            <button
                id="create-file-button"
                onClick={onAddFile}
                style={buttonStyle({ fullWidth: true })}
            >
                Create New File
            </button>

            {/* File list */}
            <div id="file-list" style={uiStyles.fileList}>
                {files.map((f) => {
                    const isActive = f.id === activeFileId

                    return (
                        <div
                            key={f.id}
                            style={{
                                display: "flex",
                                gap: 6,
                                alignItems: "center",
                            }}
                        >
                            {/* Rename input OR button */}
                            {editingId === f.id ? (
                                <input
                                    autoFocus
                                    value={draftName}
                                    onChange={(e) => setDraftName(e.target.value)}
                                    onBlur={() => {
                                        onRenameFile(f.id, draftName.trim() || f.name)
                                        setEditingId(null)
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            onRenameFile(f.id, draftName.trim() || f.name)
                                            setEditingId(null)
                                        }
                                        if (e.key === "Escape") {
                                            setEditingId(null)
                                        }
                                    }}
                                    style={{
                                        flex: 1,
                                        padding: "6px 8px",
                                        borderRadius: 6,
                                    }}
                                />
                            ) : (
                                <button
                                    style={{
                                        ...sidebarFileButtonStyle(isActive),
                                        flex: 1,
                                    }}
                                    onClick={() => onSelectFile(f.id)}
                                    onDoubleClick={() => {
                                        setEditingId(f.id)
                                        setDraftName(f.name)
                                    }}
                                >
                                    {f.name}
                                </button>
                            )}

                            {/* Delete */}
                            <button
                                title="Delete file"
                                onClick={() => onDeleteFile(f.id)}
                                style={{
                                    background: "transparent",
                                    border: "none",
                                    color: "#aaa",
                                    cursor: "pointer",
                                }}
                            >
                                ✕
                            </button>
                        </div>
                    )
                })}
            </div>
        </aside>
    )
}
