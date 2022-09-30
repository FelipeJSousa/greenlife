// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAVJmkXCNPhUgepnBKvWzXefBscsP4AbNQ',
  authDomain: 'greenlife-0808.firebaseapp.com',
  databaseURL: 'https://greenlife-0808-default-rtdb.firebaseio.com',
  projectId: 'greenlife-0808',
  storageBucket: 'greenlife-0808.appspot.com',
  messagingSenderId: '499556767157',
  // appId: "1:499556767157:web:63766148d680551e7e75fc",
  measurementId: 'G-WD3YJGV6YY',
};

// Initialize Firebase
if (!firebase.apps.length) {
  const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
}

export default firebase;
