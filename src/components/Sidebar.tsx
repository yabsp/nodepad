import {buttonStyle, dividerStyle, sidebarFileButtonStyle, uiStyles} from "./uiStyles.ts"

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
                            onLeave,
                            users,
                        }: SidebarProps) {
    return (
        <aside id="sidebar" style={uiStyles.sidebar}>
            <div id="sidebar-header" style={uiStyles.sidebarHeader}>
                <div id="room-label" style={uiStyles.mutedLabel}>
                    Connected room
                </div>
                <div id="room-name" style={uiStyles.strongText}>
                    {roomName}
                </div>
            </div>

            {/* Back / Home button */}
            <button
                style={buttonStyle({ fullWidth: true })}
                onClick={onLeave}
            >
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

            <hr id="sidebar-divider" style={dividerStyle()} />

            <button id="create-file-button" onClick={onAddFile} style={buttonStyle({ fullWidth: true })}>
                Create New File
            </button>

            <div id="file-list" style={uiStyles.fileList}>
                {files.map((f) => {
                    const isActive = f.id === activeFileId
                    return (
                        <button
                            key={f.id}
                            data-file-id={f.id}
                            data-active={isActive ? "true" : "false"}
                            onClick={() => onSelectFile(f.id)}
                            style={sidebarFileButtonStyle(isActive)}
                            title={f.name}
                        >
                            {f.name}
                        </button>
                    )
                })}
            </div>
        </aside>
    )
}
