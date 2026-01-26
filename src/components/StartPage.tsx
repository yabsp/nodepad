import React from "react"
import { startPageStyles } from "./uiStyles"
import { buttonStyle } from "./uiStyles"

type StartPageProps = {
    onJoin: (data: {
        userName: string
        roomName: string
        password: string
    }) => void
}

export function StartPage({ onJoin }: StartPageProps) {
    const [userName, setUserName] = React.useState("")
    const [roomName, setRoomName] = React.useState("")
    const [password, setPassword] = React.useState("")

    const canJoin = Boolean(userName && roomName)

    return (
        <div style={startPageStyles.wrapper}>
            <div style={startPageStyles.card}>
                {/* Project title */}
                <div>
                    <div style={startPageStyles.title}>Nodepad</div>
                </div>

                <div style={startPageStyles.sectionLabel}>
                    Join or create a room
                </div>

                {/* Name */}
                <input
                    style={startPageStyles.input}
                    placeholder="Your name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />

                {/* Room name */}
                <input
                    style={startPageStyles.input}
                    placeholder="Room name"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                />

                {/* Password */}
                <input
                    style={startPageStyles.input}
                    type="password"
                    placeholder="Password (optional)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div style={startPageStyles.buttonRow}>
                    <button
                        style={buttonStyle({ fullWidth: true })}
                        disabled={!canJoin}
                        onClick={() => onJoin({ userName, roomName, password })}
                    >
                        Join room
                    </button>
                </div>
            </div>
        </div>
    )
}
