# Y-IndexedDB Persistence Guide

This project uses `y-indexeddb` to provide offline-first capabilities. This means that document updates are saved immediately to the user's local browser database (IndexedDB).

## How It Works

When a user edits a document:
1. **Local Save:** The change is written to `IndexedDB` immediately.
2. **Sync:** If connected, the change is broadcast via WebRTC to other peers.
3. **Offline:** If offline, changes accumulate locally. When the connection is restored, `y-webrtc` syncs the local history with remote peers.

Because of this, refreshing the page does not lose data, even if the user has no internet connection.

---

## Managing the Database (Browser DevTools)

As a developer, you often need to wipe the database to test "fresh" user scenarios. You cannot just use `localStorage.clear()` because Y.js uses **IndexedDB**, which is separate.

### Chrome / Edge / Brave
1. Open **Developer Tools** (`F12` or Right Click -> Inspect).
2. Go to the **Application** tab in the top bar.
3. In the left sidebar, expand **Storage** -> **IndexedDB**.
4. You will see a database named after your room (e.g., `Test-Room-01`) or simply `IndexedDB`.
5. **To Delete:**
    * Click the database name.
    * Click the **"Delete Database"** button (trash icon or button near the top).
    * **Refresh the page** immediately.

### Firefox
1. Open **Developer Tools** (`F12`).
2. Go to the **Storage** tab.
3. Expand **IndexedDB**.
4. Right-click the database name (e.g., `Test-Room-01`).
5. Select **Delete "Test-Room-01"**.
6. **Refresh the page**.

### Safari
1. Enable the **Develop** menu in Preferences -> Advanced.
2. Go to **Develop** -> **Show Web Inspector**.
3. Go to the **Storage** tab.
4. Expand **IndexedDB**.
5. Select the database and click the trash icon.

---

##Programmatic Control

You can also manage the database via code, which is useful for "Reset Document" buttons in your UI.

### Clearing Data
You can clear the locally stored data for the current room. This forces the client to re-download the document from peers (if online) or start fresh (if offline).

```typescript
// Assuming you have access to the persistence instance from your hook/provider
const resetLocalDatabase = async (persistenceInstance) => {
  await persistenceInstance.clearData()
  console.log('Local cache cleared.')
  window.location.reload() // Reload is required to reset the in-memory Y.Doc
}
```