import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAGSX-WpJPhL5wyShTW6gGs4BD-JFwp8z8",
  authDomain: "karmatech-a382c.firebaseapp.com",
  projectId: "karmatech-a382c",
  storageBucket: "karmatech-a382c.appspot.com",
  messagingSenderId: "86156335959",
  appId: "1:86156335959:web:1a6cf6d411b2583e11bc12",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}