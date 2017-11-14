import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCrcX4fW_UnAJEcYXTq6w4aOeB2rrPT8ug",
  authDomain: "twitteur-project.firebaseapp.com",
  databaseURL: "https://twitteur-project.firebaseio.com",
  projectId: "twitteur-project",
  storageBucket: "twitteur-project.appspot.com",
  messagingSenderId: "398171072764"
}

firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;

export const usersTweetsExpirationLength = 100000;
export const userExpirationLength = 100000;
export const repliesExpirationLength = 300000;
