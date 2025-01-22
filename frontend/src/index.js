import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import store from './redux/store';
import { Auth0Provider } from '@auth0/auth0-react';
import  ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';

const root = document.getElementById('root');

if (root) {
   const reactRoot = ReactDOM.createRoot(root);

   reactRoot.render(
      <Auth0Provider
         domain="moviesspot.au.auth0.com"
         clientId="0HS51AbFWHJWt7hdsFEJlCR21aFGuM6K"
         authorizationParams={{
         redirect_uri: window.location.origin,
         }}
      >
        <Router>              
           <Provider store={store}>
              <App />
           </Provider>
        </Router>
      </Auth0Provider>
   )
}