import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'

const ydoc = new Y.Doc()

export const yText = ydoc.getText('shared-text')

const provider = new WebrtcProvider('your-room-name', ydoc, 
    { signaling: ['ws://localhost:4444'] }) // TODO Change localhost to ip-address of signaling server 

localStorage.log = 'true'