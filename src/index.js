import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './containers/catalog/App';
import { Router, Route } from 'react-router'
import { Link } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App /> ,document.getElementById('root'));
registerServiceWorker();
