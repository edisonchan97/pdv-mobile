import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import FastClick from 'fastclick';
import configureStore from '@/store';
import Routes from '@/routers';
import '@/utils/setRem';
import '@/style/base.css';
import registerServiceWorker from '@/registerServiceWorker';

const store = configureStore();

FastClick.attach(document.body);

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
