import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let items = localStorage.getItem("rect1");

items = items ?? [];

ReactDOM.render(
  <React.StrictMode>
    <App items={items} />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
