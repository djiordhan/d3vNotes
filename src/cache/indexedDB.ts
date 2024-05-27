import { openDB } from 'idb';

const DB_NAME = 'd3vNotesDB';
const STORE_NAME = 'markdownStore';

export const initDB = async () => {
    return openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        }
    });
};

export const saveMarkdownData = async (data: any) => {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    await store.put(data, 'markdownData');
    await tx.done;
};

export const getMarkdownData = async () => {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const data = await store.get('markdownData');
    await tx.done;
    return data;
};
