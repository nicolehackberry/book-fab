import { FirebaseApp, initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  Firestore,
} from "firebase/firestore/lite";
import { query, where } from "firebase/firestore";

interface ICreatorsLocations {
  id: string;
  latitude: number;
  longitude: number;
}

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
let db: Firestore;

export const fbInit = () => {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
};

export const getAllData = async () => {
  const query = collection(db, "creatorData");
  const dataSnapshot = await getDocs(query);
  const dataList = dataSnapshot.docs.map((doc) => doc.data());
  console.log("All data: ", dataList);
};

export const fetchLocations = async () => {
  await getDocs(collection(db, "creatorData")).then((snapshot) => {
    const locationData = [{}];
    snapshot.docs.forEach((doc) => {
      if (doc.exists()) {
        let data = doc.data();
        locationData.push({ ...data.userLocation });
        console.log("Loggar???: ", locationData);

        return locationData;
      } else {
        console.log("No such data: QUESTIONS2022!");

        return locationData;
      }
    });
  });
};
