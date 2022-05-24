import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {state} from "./redux/state";
import {HashRouter} from "react-router-dom";

ReactDOM.render(
    <HashRouter>
        <Provider store={state}>
            <App/>
        </Provider>
    </HashRouter>,
    document.getElementById('root')
)
