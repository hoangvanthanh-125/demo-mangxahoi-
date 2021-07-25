import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase'
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/configueStore';
var firebaseConfig = {
  apiKey: "AIzaSyALuFdQRd14Bc1yRtF0ONedFvY30tV4hsA",
  authDomain: "app-mang-xa-hoi.firebaseapp.com",
  projectId: "app-mang-xa-hoi",
  storageBucket: "app-mang-xa-hoi.appspot.com",
  messagingSenderId: "1030260257800",
  appId: "1:1030260257800:web:51801e7c8bd9b2f6b74dbd",
  measurementId: "G-FK2RP6HRN8",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); 
}

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
  <App />
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
