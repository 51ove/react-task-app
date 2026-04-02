// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCfrz4-5oa4RLAlDbdK4XwC4tBTe68GQAc",
    authDomain: "react-tset-firebase.firebaseapp.com",
    projectId: "react-tset-firebase",
    storageBucket: "react-tset-firebase.firebasestorage.app",
    messagingSenderId: "108196839739",
    appId: "1:108196839739:web:ebcb8d049dcd17a3d1371e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);