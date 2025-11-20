# Nodepad

Nodepad is a collaborative text editor built on a peer-to-peer architecture using Y.js and WebRTC. Multiple users can edit a shared document in real time directly from their browsers.

---

## Tech Stack

- [Y.js](https://github.com/yjs/yjs) – CRDT-based shared document model
- [y-webrtc](https://github.com/yjs/y-webrtc) – WebRTC-based peer-to-peer provider for y.js
- [Tiptap](https://tiptap.dev/) – Headless, framework-agnostic rich-text editor built on ProseMirror
- [React](https://react.dev/) – Component-based UI library
- [Vite](https://vitejs.dev/) – Fast development bundler and dev server
- [Node.js](https://nodejs.org/) – JavaScript runtime

---

## Prerequisites

- Node.js (LTS recommended)
- npm or yarn
- Modern browser with WebRTC support

---

## Architecture

Nodepad uses Y.js for conflict-free collaborative editing. Synchronisation between peers happens via WebRTC data channels provided by y.webrtc. A signaling server is required only to help peers discover each other and establish the WebRTC connections – it does not store or manage document content.

Because we could not reliably use the public Y.js signaling servers for this project, you are required to run your own signaling server locally.

---

## Functionalities
- Single shared document
- Real-time collaborative editing via Y.js and WebRTC
- Peer-to-peer synchronisation (no central document server, using signaling server)

---

## Getting Started

### 1. Install Dependencies
This installes all of the dependencies for nodepad.

```bash
npm install
# or
yarn install
```
### 2. Start signaling server

This starts the WebSocket-based signaling server that y-webrtc uses to establish connections between peers.

```bash
npm run server
# or
yarn server
```

### 3. Start Clients

If the client is on a different machine you will need to change localhost to the ip-address of the signaling server in ```src/y-webrtc-test.ts```:

 ```js
 // [LINE 8] 
 const provider = new WebrtcProvider('your-room-name', ydoc, { signaling: ['ws://localhost:4444'] }) // TODO Change localhost to ip-address of signaling server
 ```

This starts a preview of the website and connects to one document via the signaling server. 

```bash
npm run dev
# or
yarn dev
```

Then open the website (default:http://localhost:5173). 

---

## Known Problems

Some modern browsers like Zen Browser (Firefox Fork) seem to have trouble connecting due to ICE-candidates. Try Safari or Google Chrome if you having troubles with ICE (check browser logs).

---

## Roadmap

- Visible shared cursors
- Editor Toolbar 
  - Bold
  - Italic
  - Underlined
  - Superscript
  - Subscript
- UI built with Tiptap
- Client awareness list

---

## Contributing

Contributions are not allowed since this is a graded project for the seminar "New Trends for Local and Global Interconnects for P2P Applications" of Christian Tschudin at University of Basel.

---

## License

Nodepad is licensed under the MIT License.