import './index.css';
import ReactDOM from 'react-dom/client';
import React from 'react';
import {App} from './components/app/app.js';
import {configureStore} from '@reduxjs/toolkit'
import {Provider} from 'react-redux'; 
import {rootReducer} from './services/reducers/index.js';

const appRoot = ReactDOM.createRoot(document.getElementById('app-root'));
export const modalRoot = document.getElementById('modal-root');

const store = configureStore({
    reducer: rootReducer
});

appRoot.render(
    <React.StrictMode>
      <Provider store={store}>
        <App/>
      </Provider>
    </React.StrictMode>
);
