import { FirebaseApp, initializeApp } from "firebase/app";
import { setDoc, getDoc, doc, getFirestore, Unsubscribe as UnsubscribeFS, onSnapshot} from 'firebase/firestore';

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

  export const getDataFromFS = async () => {
    const db = getFirestore();
    const docRefQuestions = doc(db, "creatorData", '17ep4DmrBPS7OsfcTjLd');
    const docSnap = await getDoc(docRefQuestions);


    if (docSnap.exists()) {
        console.log("Firebase services data firebase Firestore: ", docSnap.data());

        return docSnap.data();
    } else {
        console.log("NO SUCH DATA firebase Firestore!!");

        return docSnap.data()
    }
}