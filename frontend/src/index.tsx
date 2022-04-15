import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { DataStoreProvider } from './components/DataStoreContext/DataStoreContext';
import reportWebVitals from './reportWebVitals';

const AppWrapper: React.FC = (): React.ReactElement => <App />;

ReactDOM.render(
  <React.StrictMode>
    <DataStoreProvider>
      <AppWrapper />
    </DataStoreProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
