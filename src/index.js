import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import ContextShares from './Context/ContextShares';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <GoogleOAuthProvider clientId='434816966372-s4jc6o3785to7ql59aa58ktjrbph3aih.apps.googleusercontent.com'>
  <React.StrictMode>
    <ContextShares>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContextShares>
  </React.StrictMode>
  // </GoogleOAuthProvider>
)
