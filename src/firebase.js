import firebase from 'firebase/app'

import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCGiUIHVh1rpWUH04V8XG133huIIUyR5gc",
  authDomain: "fir-6d9b4.firebaseapp.com",
  projectId: "fir-6d9b4",
  storageBucket: "fir-6d9b4.appspot.com",
  messagingSenderId: "641003010971",
  appId: "1:641003010971:web:2951d7b94e566caca83f3e"
};

firebase.initializeApp(firebaseConfig)

export default firebase.auth()