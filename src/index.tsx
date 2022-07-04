import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import * as firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyCYB6Wbqws9qPIi7H-mGPcWC90mUz_9AS0",
  authDomain: "aniwhale-e575a.firebaseapp.com",
  projectId: "aniwhale-e575a",
  storageBucket: "aniwhale-e575a.appspot.com",
  messagingSenderId: "243382861993",
  appId: "1:243382861993:web:c23a1372701dd49cc6e9b8"
};

firebase.initializeApp(firebaseConfig);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <div>
    <div className='bg'></div>
    <Provider store={store}>
      <App />
    </Provider>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
