import * as firebase from 'firebase';
require('@firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyDNb4iIVfn5vc5Dq_N46tyZvSoLW2uHto8",
    authDomain: "bedstory-5ccd0.firebaseapp.com",
    databaseURL: "https://bedstory-5ccd0.firebaseio.com",
    projectId: "bedstory-5ccd0",
    storageBucket: "bedstory-5ccd0.appspot.com",
    messagingSenderId: "464413806453",
    appId: "1:464413806453:web:9d6acaa48bb89bdc750d3c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();