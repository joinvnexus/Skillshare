// src/firebase.js
 import { initializeApp } from 'firebase/app'
import {
       getAuth,
       createUserWithEmailAndPassword,
       signInWithEmailAndPassword,
       signOut
    } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAawZVqmwPokKFP5BnJfwu43mDTtAEn6dM",
  authDomain: "times-course.firebaseapp.com",
  projectId: "times-course",
  storageBucket: "times-course.firebasestorage.app",
  messagingSenderId: "845498003640",
  appId: "1:845498003640:web:e41c9cf7425f6bb9f7044d",
  measurementId: "G-4ML8YCJXM5"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication
const auth = getAuth(app)

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut }