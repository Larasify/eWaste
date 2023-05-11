/**
 * Index Page
 * @version 1
 * @author [Samar Musthafa](https://git.shefcompsci.org.uk/act22sm)
 * 
 */

/* Module Imports
React library Components */
import React from 'react';
import ReactDOM from 'react-dom/client';

/* File imports */
import App from './App';
import './styles.css'

/* App wrapper */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
