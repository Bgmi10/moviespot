import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import store from './utils/Store';
import {createRoot} from 'react-dom/client'
import { Provider } from 'react-redux';

const rootelement = document.getElementById('root')

const root = createRoot(rootelement)

root.render(
            <Router>
            <Provider store={store}>
            <App />
            </Provider>
    
            </Router>
            )