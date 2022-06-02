import { initializeApp, FirebaseApp } from "firebase/app";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  getFirestore,
  getDoc,
} from "firebase/firestore/lite";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateCurrentUser,
  User,
  UserCredential,
} from "firebase/auth";

import { ICreatorsData } from "../screens/HomeScreen";

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

export const fetchDataFromFS = async () => {
  const db = getFirestore();
  const query = collection(db, "creatorData");
  const dataSnapshot = await getDocs(query);
  const dataList = dataSnapshot.docs.map((doc) => doc.data());

  if (dataList) {
    return dataList;
  } else {
    return null;
  }
};

export const getCurrentLogedInUser = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    return user;
  } else {
    return user;
  }
};

export const registerUserInFirebase = async (
  displayName: string,
  email: string,
  password: string
): Promise<UserCredential> => {
  const auth = getAuth();
  const createUserResponse = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const newUser: User = {
    ...createUserResponse.user,
    displayName: displayName,
  };

  newUser.email;

  await updateCurrentUser(auth, newUser);
  return createUserResponse;
};

export const logInToFirebase = async (
  email: string,
  password: string
): Promise<UserCredential | undefined> => {
  const auth = getAuth();

  try {
    const credentialUser = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return credentialUser;
  } catch (error) {
    console.log("TAG error: ", error);

    return undefined;
  }
};

export const signOutUser = async () => {
  const auth = getAuth();
  return await auth.signOut();
};

export const getCurrentUserData = async (fsDocumentName: any) => {
  const db = getFirestore();
  const docRefQuestions = doc(db, "creatorData", fsDocumentName);
  const docSnap = await getDoc(docRefQuestions);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return docSnap.data();
  }
};

export const setUserData = (userId: string, data: ICreatorsData) => {
  const db = getFirestore();
  setDoc(doc(db, "creatorData", userId), data);
};
