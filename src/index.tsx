import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {state} from "./redux/state";
import {HashRouter, Route, Routes} from "react-router-dom";
import {Movie} from "./Movie/Movie";

ReactDOM.render(
    <HashRouter>
        <Provider store={state}>
            <Routes>
                <Route path="movie/:title" element={<Movie/>}/>
                <Route path="/" element={<App/>}/>
            </Routes>
        </Provider>
    </HashRouter>,
    document.getElementById('root')
)
