import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCqmck61RrSNNJ-vC-uiyr-CiOZVzz3NY8',
  authDomain: 'vue-music-f59ed.firebaseapp.com',
  projectId: 'vue-music-f59ed',
  storageBucket: 'vue-music-f59ed.appspot.com',
  messagingSenderId: '615925794640',
  appId: '1:615925794640:web:b75bb81d7207e40e708e55',
  measurementId: 'G-H0ZZ3M5R3Q',
};
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const usersCollection = db.collection('users');
const songsCollection = db.collection('songs');

export {
  auth, 
  db, 
  usersCollection, 
  songsCollection,
  storage, 
};
