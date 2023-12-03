// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjUpT_gVsy4hg-h4FPWXiCAUyyRr1anLI",
  authDomain: "fod-blog.firebaseapp.com",
  projectId: "fod-blog",
  storageBucket: "fod-blog.appspot.com",
  messagingSenderId: "779486631195",
  appId: "1:779486631195:web:fd078aac0648218bc02fbe",
  measurementId: "G-SG0TW021DQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
module.exports = {
  auth,
};