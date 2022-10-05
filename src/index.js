import './index.css';
import ReactDOM from 'react-dom/client';
import {App} from './components/app/app.js';

const appRoot = ReactDOM.createRoot(document.getElementById('app-root'));
export const modalRoot = document.getElementById('modal-root');

appRoot.render(
    <App/>
);
