// import { FirebaseApp, initializeApp } from "firebase/app";
// import {
//   getFirestore,
//   collection,
//   getDocs,
//   Firestore,
//   doc,
//   getDoc
// } from "firebase/firestore/lite";
// import { query, where } from "firebase/firestore";

// interface ICreatorsLocations {
//   id: string;
//   latitude: number;
//   longitude: number;
// }

// const firebaseConfig = {
//   apiKey: "AIzaSyCW2NI3OUhrOIBuxHCZWz6Ryfq7fPaH0QM",
//   authDomain: "bookfab-375ca.firebaseapp.com",
//   projectId: "bookfab-375ca",
//   storageBucket: "bookfab-375ca.appspot.com",
//   messagingSenderId: "568655225452",
//   appId: "1:568655225452:web:3c89ac0e36fafb6f356e49",
//   measurementId: "G-KRMDE34KDL",
// };

// let app: FirebaseApp;
// let db: Firestore;

// export const fbInit = () => {
//   app = initializeApp(firebaseConfig);
//   db = getFirestore(app);
// };
// export const fetchDataFromFS = async () => {
//   const query = collection(db, "creatorData");
//   const dataSnapshot = await getDocs(query);
//   const dataList = dataSnapshot.docs.map((doc) => doc.data());

//   if (dataList) {
//     return dataList;
//   } else {
//     return null;
//   };
// };

import { initializeApp, FirebaseApp } from "firebase/app";
import { collection, getDocs, setDoc, doc, getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyCW2NI3OUhrOIBuxHCZWz6Ryfq7fPaH0QM",
  authDomain: "bookfab-375ca.firebaseapp.com",
  projectId: "bookfab-375ca",
  storageBucket: "bookfab-375ca.appspot.com",
  messagingSenderId: "568655225452",
  appId: "1:568655225452:web:3c89ac0e36fafb6f356e49",
  measurementId: "G-KRMDE34KDL",
};

let app: FirebaseApp;

export const fbInit = () => {
  app = initializeApp(firebaseConfig);
};

export const fetchDataFromFS = async (userId: string) => {
  const db = getFirestore();
  const query = collection(db, "creatorData", '17ep4DmrBPS7OsfcTjLd');
  const dataSnapshot = await getDocs(query);
  const dataList = dataSnapshot.docs.map((doc) => doc.data());
  console.log('Data from fs: ', dataList);
  
  

  if (dataList) {
    return dataList;
  } else {
    return null;
  };
};