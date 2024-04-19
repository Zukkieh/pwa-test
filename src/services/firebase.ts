// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { addDoc, collection, doc, getDocs, getFirestore, writeBatch } from "firebase/firestore";
import { Item } from "../types/list";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const itemCol = collection(db, "items");

const setItem = async (item: Item) => {
  await addDoc(itemCol, item);
}

const sync = async (items: Item[]) => {
  const batch = writeBatch(db);
  await items.map(async (item)=> {
    const collectionRef = await doc(itemCol);
    batch.set(collectionRef, item);
  });

  await batch.commit();
}

const getItems = async () => {
  const itemsSnapshot = await getDocs(itemCol);
  const itemsList = itemsSnapshot.docs.map(doc => doc.data() as Item);
  return itemsList;
}

export {
  setItem,
  getItems,
  sync
};