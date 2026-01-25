import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import { SIGNALING } from "../config/signaling"

export const ydoc = new Y.Doc()

export const provider = new WebrtcProvider('your-room-name', ydoc,
    { signaling: SIGNALING })

export const awareness = provider.awareness

localStorage.log = 'true'