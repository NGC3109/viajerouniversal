import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCcq09UNB0cDcS__yMwMSB8o0PsBqlZBaE",
    authDomain: "viajeros-a267f.firebaseapp.com",
    databaseURL: "https://viajeros-a267f.firebaseio.com",
    projectId: "viajeros-a267f",
    storageBucket: "viajeros-a267f.appspot.com",
    messagingSenderId: "808689403034",
    appId: "1:808689403034:web:a700adccb8abcb2de34b23"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp
// import firebase from "firebase/app";
// import "firebase/auth";
// const config = {
//     apiKey: "AIzaSyAqQLOzdON0Z4cTDKDtldtSRYdXUCjpLhk",
//     authDomain: "insta-clone-3689c.firebaseapp.com",
//     databaseURL: "https://insta-clone-3689c.firebaseio.com",
//     projectId: "insta-clone-3689c",
//     storageBucket: "insta-clone-3689c.appspot.com",
//     messagingSenderId: "810864242270",
//     appId: "1:810864242270:web:ce6c7570a26fed09"
// };

// firebase.initializeApp(config)
// export const autenticacion = firebase.auth();
// export const baseDeDatos = firebase.database();
