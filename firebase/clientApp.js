import firebase from "firebase";
import "firebase/firestore";

const clientCredentials = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGIINGSENDERID,
  appId: process.env.FIREBASE_APPID,
  measurementId: process.env.FIREBASE_MEASUREMENTID,
};
if (!firebase.app.length) {
  firebase.initializeApp(clientCredentials);
}
export default firebase;
