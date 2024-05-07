import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import {createRoot} from 'react-dom/client'

const rootelement = document.getElementById('root')

const root = createRoot(rootelement)

root.render(
            <Router>
            <App />
            </Router>
            )