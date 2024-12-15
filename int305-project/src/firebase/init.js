// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCe7Pu8N0FCtJADnOfoRY5MilVQG3zIteU",
  authDomain: "int305fb095-cf0af.firebaseapp.com",
  projectId: "int305fb095-cf0af",
  storageBucket: "int305fb095-cf0af.firebasestorage.app",
  messagingSenderId: "996253502217",
  appId: "1:996253502217:web:f8695be5ea7391c12561d8",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// init firestore service
const db = getFirestore()

export default db
