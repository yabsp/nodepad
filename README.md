![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Tiptap](https://img.shields.io/badge/tiptap-000000?style=for-the-badge&logo=tiptap&logoColor=white)
![Y.js](https://img.shields.io/badge/y.js-orange?style=for-the-badge&logo=y.js&logoColor=white)
# Nodepad

Nodepad is a collaborative text editor built on a peer-to-peer architecture using Y.js and WebRTC. Multiple users can edit a shared document in real time directly from their browsers.

---

## Tech Stack

- [Y.js](https://github.com/yjs/yjs) – CRDT-based shared document model
- [y-webrtc](https://github.com/yjs/y-webrtc) – WebRTC-based peer-to-peer provider for y.js
- [y-indexeddb](https://github.com/yjs/y-indexeddb) - Database adapter to store data persistently, see [the quick guide regarding persistency](/docs/persistency.md).
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
- Peer-to-peer synchronization (no central document server, using signaling server)

---

## Getting Started

### 1. Install Dependencies
This installs all dependencies needed.

```bash
npm install
# or
yarn install
```
### 2. Start a signaling server

This starts the WebSocket-based signaling server that y-webrtc uses to establish connections between peers.

```bash
npm run server
# or
yarn server
```

#### 2.1 Signaling server domain
You will have to create a .env file in the project root. Add the following line to the .env file:
```.env
VITE_SIGNALING_SERVER_DOMAIN=wss://<domain>
```
If you for example use a signaling server on your current device on port 4444 - which is default when using ```npm run server``` - you add:

```.env
VITE_SIGNALING_SERVER_DOMAIN=ws://localhost:4444
```
Since we use Vite, the domain is finally loaded from the .env file in [collabRoom.ts](/src/y.js/collabRoom.ts) using ```const domain = import.meta.env.VITE_SIGNALING_SERVER_DOMAIN;```


### 3. Start Clients
The following code starts a preview of the website and connects to one document via the signaling server. 

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

Contributions are not allowed since this is a graded project for the seminar "New Trends for Local and Global Interconnects for P2P Applications" by Christian Tschudin at University of Basel.

---

## License

Nodepad is licensed under the MIT License.