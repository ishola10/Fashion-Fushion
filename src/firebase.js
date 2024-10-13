import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAwSYHKzHIuMr43WnnH61C9j-zgOB0HJwg",
  authDomain: "burgerbite-4c5eb.firebaseapp.com",
  projectId: "burgerbite-4c5eb",
  storageBucket: "burgerbite-4c5eb.appspot.com",
  messagingSenderId: "266547322175",
  appId: "1:266547322175:web:cdd89cd9280faaed7c478a",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { app, db, auth, storage, analytics };
