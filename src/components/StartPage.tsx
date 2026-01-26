import React from "react"

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

    const canJoin = userName && roomName

    return (
        <div style={{ padding: 40 }}>
            <h1>Join a room</h1>

            <div>
                <label>Name</label><br />
                <input value={userName} onChange={e => setUserName(e.target.value)} />
            </div>

            <div>
                <label>Room name</label><br />
                <input value={roomName} onChange={e => setRoomName(e.target.value)} />
            </div>

            <div>
                <label>Password</label><br />
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>

            <button
                disabled={!canJoin}
                onClick={() => onJoin({ userName, roomName, password })}
            >
                Join room
            </button>
        </div>
    )
}
