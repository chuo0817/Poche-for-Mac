import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './containers/catalog/App';
import Detail from './containers/detail/detail'
import { Router, Route } from 'react-router'
import { Link, HashRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
  <HashRouter>
    <div>
      <Route path="/" component={App} />
      <Route path="detail" component={Detail} />
    </div>

  </HashRouter>
), document.getElementById('root'));
registerServiceWorker();
