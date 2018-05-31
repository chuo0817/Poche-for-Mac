import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Title from './Title'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />,document.getElementById('root'));
registerServiceWorker();
