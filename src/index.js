import React    from 'react';
import ReactDOM from 'react-dom';
import Auth0    from './Auth0';
import { BrowserRouter as Router }   from "react-router-dom";
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Auth0/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);