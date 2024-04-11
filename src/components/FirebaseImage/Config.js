// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyB-sxY58gdNn-Wje85InWuNM2RUMPAzBHA",
  authDomain: "capstone-project-5362d.firebaseapp.com",
  projectId: "capstone-project-5362d",
  storageBucket: "capstone-project-5362d.appspot.com",
  messagingSenderId: "980584491873",
  appId: "1:980584491873:web:c5a6d1b719de8aed957320",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const imageAvt = getStorage(app);
