import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'

export const ydoc = new Y.Doc()

export const provider = new WebrtcProvider('your-room-name', ydoc,
    { signaling: ['xx'] }) // TODO Change localhost to ip-address of signaling server

export const awareness = provider.awareness

localStorage.log = 'true'