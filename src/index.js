import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './containers/catalog/App.jsx';
import { Route } from 'react-router'
import { HashRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
	<HashRouter>
		<div>
	        <Route exact path="/" component={App} />
    </div>
	</HashRouter>
), document.getElementById('root'));
registerServiceWorker();
