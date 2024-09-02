import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter as Router } from 'react-router-dom';
import UserProvider from './Pages/Context';
import EmailProvider from './Pages/email';
import MyStringProvider from './Pages/MyStringProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    {/* <React.StrictMode> */}
      <MyStringProvider>
        <EmailProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </EmailProvider>
      </MyStringProvider>
    {/* </React.StrictMode> */}
  </Router>
);

reportWebVitals();