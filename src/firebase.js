import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDISYqhJB8b4O2lLCTJZZoTJaWaoOWNhOc",
  authDomain: "shreemanwhatsappclone.firebaseapp.com",
  projectId: "shreemanwhatsappclone",
  storageBucket: "shreemanwhatsappclone.appspot.com",
  messagingSenderId: "744253179344",
  appId: "1:744253179344:web:80ed89ee5a9e28f4fb65d5"
};
  
const firebaseApp =firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore();
const auth=firebase.auth();
const provider= new firebase.auth.GoogleAuthProvider();

export default db;
  export {auth,provider};
