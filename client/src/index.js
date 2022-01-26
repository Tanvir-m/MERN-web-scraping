import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ContextCom from './context/Context';

ReactDOM.render(
  <React.StrictMode>
    <ContextCom>
      <App />
    </ContextCom>
  </React.StrictMode>,
  document.getElementById('root')
);
