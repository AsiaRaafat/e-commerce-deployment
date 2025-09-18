import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './App.scss';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { RecoilRoot } from 'recoil';


createRoot(document.getElementById('root')).render(
    <RecoilRoot>
        <App />
    </RecoilRoot>
)
