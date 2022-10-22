import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Aos from "aos";

import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "aos/dist/aos.css";
import "react-status-alert/dist/status-alert.css";

import { Provider } from "react-redux";
import { createStore, applyMiddleware} from "redux";
import Reducers from "./redux/reducers/reducers";
import ReduxThunk from "redux-thunk";

const store = createStore(Reducers, applyMiddleware(ReduxThunk));

Aos.init({
  delay: 10,
  duration: 800,
  offset: 120,
  // mirror: true,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
