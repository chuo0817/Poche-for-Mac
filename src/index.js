import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './containers/catalog/App';
import Detail from './containers/detail/detail'
// import { Router, Route } from 'react-router'
// import { Link } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    // <Router>
    //   <Route path="/" component={App}>
    //     <Route path="detail" component={Detail} />
    //   </Route>
    // </Router>
    <App />
  ) ,document.getElementById('root'));
registerServiceWorker();
