import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './Stores/GamesettingStore.js';
import { HashRouter,Route,Routes } from 'react-router-dom';
import Ticket from './ticket.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <HashRouter>
      <Routes>
          <Route path='/' Component={App}></Route>
          <Route path='/bingo' Component={App}></Route>
          <Route path='/ticket' Component={Ticket}></Route>
      </Routes>
    </HashRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
