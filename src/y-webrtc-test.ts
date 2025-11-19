import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';

const doc = new Y.Doc();

export const yText = doc.getText('shared-text');

export const provider = new WebrtcProvider('vite-yjs-webrtc-test-room', doc, {});

provider.on('status', (event: { status: string }) => {
  console.log('WebRTC status:', event.status);
});
