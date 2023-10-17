import React from 'react';
import ReactDOM from 'react-dom/client';
import { JornalApp } from './JornalApp';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';
import { Provider } from 'react-redux';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <JornalApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
