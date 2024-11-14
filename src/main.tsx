import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(

    <BrowserRouter>
      <App />
    </BrowserRouter >

)
