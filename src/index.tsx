import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import * as firebase from 'firebase/app'
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCtwQdBUo1zn_U9utp0XfVQdrDo9DBNtZY",
  authDomain: "aniwhaletest.firebaseapp.com",
  projectId: "aniwhaletest",
  storageBucket: "aniwhaletest.appspot.com",
  messagingSenderId: "217976668367",
  appId: "1:217976668367:web:6aac610deb453891f277ba"
};

export const app = initializeApp(firebaseConfig);

// export const db = initializeFirestore(app, {
//   experimentalForceLongPolling: true,
// });

export const db = getFirestore(app);


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
