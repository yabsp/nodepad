import * as Y from "yjs"
import {WebrtcProvider} from "y-webrtc"
import React from "react"
import { IndexeddbPersistence } from "y-indexeddb"

/**
 * Collaborative file metadata stored in the shared Y.Doc.
 */
export type FileInfo = { name: string; createdAt: number }

/**
 * Bundle a shared CRDT document (Y.Doc), a network transport (WebrtcProvider) and a shared index of files (Y.Map)
 */
export type CollabRoom = {
    roomName: string
    yDoc: Y.Doc
    provider: WebrtcProvider
    persistence: IndexeddbPersistence
    files: Y.Map<FileInfo>
}

/**
 * A Signaling server is used to exchange WebRTC offers/answers/candidates, the data flows peer-to-peer once connected.
 */
const domain = import.meta.env.VITE_SIGNALING_SERVER_DOMAIN;
const SIGNALING = [domain]
/**
 * Prevent deadlock in empty rooms and races where multiple peers create different first file
 */
const DEFAULT_FILE_ID = "default"

// TODO Add custom Hook to delete a room
// TODO Add custom Hook to rename a room

/**
 * Create the provider and doc and provides lifecycle up to and with cleanups
 * @param {string} roomName - name (also the identifier) of the room to connect to
 */
export function useCollabRoom(roomName: string) {
    const [room, setRoom] = React.useState<CollabRoom | null>(null)

    React.useEffect(() => {
        // Create a new Y.Doc and hold file index map and per-file editor states for this room
        const yDoc = new Y.Doc()
        // Connect peers who share the same roomName and synchronize the Y.Doc updates over WebRTC
        const provider = new WebrtcProvider(roomName, yDoc, {signaling: SIGNALING})

        // indexeddb persistence
        const persistence = new IndexeddbPersistence(roomName, yDoc)

        // Get the file list from the shared yDoc
        const files = yDoc.getMap<FileInfo>("files")

        persistence.on('synced', () => {
            // Only create default file if database is truly empty
            if (!files.has(DEFAULT_FILE_ID)) {
                files.set(DEFAULT_FILE_ID, {name: "Untitled", createdAt: Date.now()})
            }

            // Publish the room primitives to consumers now that data is loaded
            setRoom({roomName, yDoc, provider, persistence, files})
        })

        // Cleanup
        return () => {
            provider.destroy()
            persistence.destroy()
            yDoc.destroy()
        }
    }, [roomName])

    return room
}

export const DEFAULT_FILE = DEFAULT_FILE_ID
