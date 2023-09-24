import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore,doc,setDoc,collection,getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes} from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAtUQpm3RyD9I4AZ04o_bvXCAgwgkg_W28",
  authDomain: "todo-list-d8f30.firebaseapp.com",
  projectId: "todo-list-d8f30",
  storageBucket: "todo-list-d8f30.appspot.com",
  messagingSenderId: "246082112239",
  appId: "1:246082112239:web:e78c029b160d6e875b691a"
};

// Initialize Firebase
const   app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)



export{auth,app,db,createUserWithEmailAndPassword,signInWithEmailAndPassword,doc,setDoc,uploadBytes,ref,collection,getDocs}