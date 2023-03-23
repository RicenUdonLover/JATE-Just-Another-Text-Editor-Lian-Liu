import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Store content in the database
  export const putDb = async (content) => {
  try {
    console.log('putDb, content, 18', content);
    // const contentJSON = JSON.stringify(content);
    const db = await initdb();
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const request = store.put({ content });
    await request;
    console.log('after putDb, content, 25', content);
  }
  catch (error) {
    console.log('putDb not implemented', error);
  }
};

// Get content from the database
export const getDb = async () => {
  try {
    const db = await initdb();
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const allContent = await store.getAll();
    console.log('getDb done, allContent, 42', allContent);
    await tx.done;
    return allContent.content;
  } catch (error) {
    console.log('getDb not implemented', error);
  }
}

initdb();
