// firebaseConfig.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {  //Original ↓
  
  // apiKey: "AIzaSyA4HJu4LMSt-gsssGUVMp9SIkgBmZk7YNI",
  // authDomain: "marmita-466d4.firebaseapp.com",
  // projectId: "marmita-466d4",
  // storageBucket: "marmita-466d4.appspot.com",
  // messagingSenderId: "787439999151",
  // appId: "1:787439999151:web:54f23ae57fc06068145c5a",
  // measurementId: "G-J6G5NQNGX0"

  apiKey: "AIzaSyC4GO6DcmxqoaYZeuF-VDnAa_kj2711KLc",
  authDomain: "marmita2-f9706.firebaseapp.com",
  projectId: "marmita2-f9706",
  storageBucket: "marmita2-f9706.appspot.com",
  messagingSenderId: "488247347327",
  appId: "1:488247347327:web:972b64eda532aac0eed74a",
  measurementId: "G-X4H86B3T5J"

  // apiKey: "AIzaSyCCcBYaKA64jkRF8Xr5Xy7-UJilekPqOs8",
  // authDomain: "marmita3-6ffd7.firebaseapp.com",
  // projectId: "marmita3-6ffd7",
  // storageBucket: "marmita3-6ffd7.appspot.com",
  // messagingSenderId: "719709886701",
  // appId: "1:719709886701:web:e23f4cab9c1ed1853a54e4"

  // apiKey: "AIzaSyDVv35BsHra00Qq5_1pXb21dNDOp91d2kE",
  // authDomain: "marmita-4-d366b.firebaseapp.com",
  // projectId: "marmita-4-d366b",
  // storageBucket: "marmita-4-d366b.appspot.com",
  // messagingSenderId: "1063151514200",
  // appId: "1:1063151514200:web:03bbf5cbf3d4f0a3d9902d"

   };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };