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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    console.log('putDb, content, 18', content);
    // const contentJSON = JSON.stringify(content);
    const db = await initdb();
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const request = store.put({ content });
    await request;
    console.log('putDb done', content);
  }
  catch (err) {
    console.error('putDb not implemented', err);
  }
};


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    const db = await initdb();
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const allContent = await store.getAll();
    await tx.done;
    console.log('getDb done, allContent, 41', allContent);
    return allContent;

  } catch (error) {
    console.error('getDb not implemented', err);
  }
}

initdb();
