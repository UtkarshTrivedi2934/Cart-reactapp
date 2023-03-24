import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as firebase from 'firebase';

// import * as firebase 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfsGASxAK9QYsuSeaMdnx1J1z-UEadm2A",
  authDomain: "cart-4733f.firebaseapp.com",
  projectId: "cart-4733f",
  storageBucket: "cart-4733f.appspot.com",
  messagingSenderId: "1068856506144",
  appId: "1:1068856506144:web:d2747cdde2f0b61fc84945"
};

// Initialize Firebase
firebase.default.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
