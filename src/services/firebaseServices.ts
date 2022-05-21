import { FirebaseApp, initializeApp } from "firebase/app";

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
  console.log(app);
};
