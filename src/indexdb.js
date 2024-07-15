import Dexie from "dexie";

export const db =new Dexie('bingo');
db.version(1).stores({
    audio:'key,name,stream,filename'
});

db.open().catch(err => {
    console.error(err.stack || err);
  });