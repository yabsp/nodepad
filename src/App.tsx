import React from "react"
import { StartPage } from "./components/StartPage"
import CollabEditor from "./components/CollabEditor"
import { uiStyles } from "./components/uiStyles"

type Session = {
    userName: string
    roomName: string
    password: string
}

function App() {
    const [session, setSession] = React.useState<Session | null>(null)

    return (
        <div style={uiStyles.appShell}>
            {!session ? (
                <StartPage onJoin={setSession} />
            ) : (
                <CollabEditor
                    roomName={session.roomName}
                    password={session.password}
                    userName={session.userName}
                />
            )}
        </div>
    )
}

export default App
