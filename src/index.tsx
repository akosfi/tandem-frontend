import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from "./store";
import {Provider} from "react-redux";
import {Router, Route} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import * as socket from './socket'


ReactDOM.render(
    <Provider store={configureStore()}>
        <App />
    </Provider>
    ,
    document.getElementById('root')
);

serviceWorker.unregister();
