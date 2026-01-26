import React from "react"
import { StartPage } from "./components/StartPage"
import CollabEditor from "./components/CollabEditor"

type Session = {
    userName: string
    roomName: string
    password: string
}

function App() {
    const [session, setSession] = React.useState<Session | null>(null)

    if (!session) {
        return <StartPage onJoin={setSession} />
    }

    return (
        <CollabEditor
            roomName={session.roomName}
            password={session.password}
            userName={session.userName}
        />
    )
}

export default App
