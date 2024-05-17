import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { doc, setDoc, getFirestore, getDoc } from "firebase/firestore"; 

// WARNING: DO NOT COMMIT THESE TO PUBLIC GITHUB REPOSITORY
// IF YOU ACCIDENTALLY COMMITTED, MAKE YOUR REPO PRIVATE
const firebaseConfig = {
  // apiKey: "replace this",
  // authDomain: "replace this",
  // projectId: "replace this",
  // storageBucket: "replace this",
  // messagingSenderId: "replace this",
  // appId: "replace this",
  // measurementId: "replace this"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const logoutUser = () => signOut(auth);

const db = getFirestore(app);

// NOTE: SAVE ALL AS AN ARRAY, TO LESSEN FIREBASE READ COUNT WHEN FETCHED
export const saveData = async (userId: string, data: any) => {
    await setDoc(doc(db, 'docs', userId), data);
};

export const getData = async (userId: string) => {
    const docRef = doc(db, 'docs', userId);
    return  (await getDoc(docRef)).data();
};

export default app;