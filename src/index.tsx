import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './modules/App/App';

import './main.scss';
const entry = document.createElement('div');
entry.id = 'root';
document.body.append(entry);
const root = ReactDOM.createRoot(entry);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
