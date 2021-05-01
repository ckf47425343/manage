import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'lib-flexible'
import './assets/css/index.css'
import 'font-awesome/css/font-awesome.min.css';
import {HashRouter} from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
    <App />
    </HashRouter>
  
  </React.StrictMode>,
  document.getElementById('root')
);


