import React from 'react';
import './App.css';
import {useSelector} from "react-redux";
import {RootStoreType} from "./redux/state";
import {CircularProgress} from "@mui/material";
import {Search} from "./components/Search/Search";
import {Movies} from "./components/Movies/Movies";
import {Theaters} from '@mui/icons-material';

function App() {

    const isLoading = useSelector<RootStoreType, boolean>(state => state.app.isLoading)
    const status = useSelector<RootStoreType, string>(state => state.app.statusGetFilms)

    return <>
        {isLoading
            ? <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
                <CircularProgress color="secondary"/>
            </div>
            : null
        }
        <div className="App">

            <header>
                <Theaters style={{color: "white", marginRight: 10}}/>
                <h1>Kino Poisk</h1>
            </header>

            <Search/>

            <div className="itemContainer">
                {status === 'succeeded'
                    ? <Movies/>
                    : null}
            </div>

            <footer className="footer">
                <p>Used by<a href="http://www.omdbapi.com/" target={'blank'}> OMDB API</a></p>
            </footer>

        </div>
    </>
}

export default App;
