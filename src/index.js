import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './containers/catalog/App.jsx';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
	<div>
		<App></App>
	</div>
), document.getElementById('root'));
registerServiceWorker();
