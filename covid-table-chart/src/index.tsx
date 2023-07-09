import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';

import App from './components/App/App';
import { Covid19ServiceProvider } from './contexts/Covid19ServiceProvider';

import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Covid19ServiceProvider>
        <App />
      </Covid19ServiceProvider>
    </Provider>
  </React.StrictMode>
);
