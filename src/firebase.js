import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD0lKkbpvO8EgOULI85CY457-nBuQx4QtE",
    authDomain: "cloninstagram-a4bef.firebaseapp.com",
    projectId: "cloninstagram-a4bef",
    storageBucket: "cloninstagram-a4bef.appspot.com",
    messagingSenderId: "350507949987",
    appId: "1:350507949987:web:c426a4844eaf2bc5f44416"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app)