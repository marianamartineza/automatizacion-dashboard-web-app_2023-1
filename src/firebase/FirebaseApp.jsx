/* eslint-disable prettier/prettier */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getDatabase, onValue, ref, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB-O3kB8Y4sREuc28oFr061XVI4V3QvVD8',
  authDomain: 'automatizacion-web-app-2023-1.firebaseapp.com',
  databaseURL: 'https://automatizacion-web-app-2023-1-default-rtdb.firebaseio.com',
  projectId: 'automatizacion-web-app-2023-1',
  storageBucket: 'automatizacion-web-app-2023-1.appspot.com',
  messagingSenderId: '957223053454',
  appId: '1:957223053454:web:45cf99b036c782ce81c1df',
  measurementId: 'G-722GLHK95N',
}

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig)

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(FirebaseApp);

function writeUserData(userId, name, email, imageUrl) {
  const db = getDatabase(FirebaseApp);
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}

const db = getDatabase();
let postId
const starCountRef = ref(db, 'posts/' + postId + '/starCount');
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  //updateStarCount(postElement, data);
});