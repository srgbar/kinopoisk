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
    const totalResults = useSelector<RootStoreType, number | null>(state => state.movies.totalResults)
    const title = useSelector<RootStoreType, string | null>(state => state.app.findData.title)

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

            {
                status === 'succeeded'
                    ? <div>
                        <div style={{display: "flex", justifyContent: "center", margin: 10}}>
                            <b>You searched for: {JSON.stringify(title)}, {totalResults} results found</b>
                        </div>
                        <div className="itemContainer">
                            <Movies/>
                        </div>
                    </div>
                    : null
            }

            <footer className="footer">
                <p>Used by<a href="http://www.omdbapi.com/" target={'blank'}> OMDB API</a></p>
            </footer>

        </div>
    </>
}

export default App;
