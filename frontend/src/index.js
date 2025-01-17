import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import store from './store/store';
import { Auth0Provider } from '@auth0/auth0-react';
import {createRoot} from 'react-dom/client'
import { Provider } from 'react-redux';


const rootelement = document.getElementById('root')

const root = createRoot(rootelement)

root.render(
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