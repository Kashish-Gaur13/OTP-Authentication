import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

var firebaseConfig = {
    apiKey: "AIzaSyBUXA2VUs0mxHyyZleDXMlZLZ1gnJ12TQo",
    authDomain: "otp-app-demo-4f82a.firebaseapp.com",
    projectId: "otp-app-demo-4f82a",
    storageBucket: "otp-app-demo-4f82a.appspot.com",
    messagingSenderId: "1006235963839",
    appId: "1:1006235963839:web:cbaa628fd6863a7eb5910a"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase //accessible from outside of the app