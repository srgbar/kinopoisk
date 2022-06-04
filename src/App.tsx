import React from 'react';
import s from "./App.module.css";
import {useSelector} from "react-redux";
import {RootStoreType} from "./redux/state";
import {CircularProgress} from "@mui/material";
import {Search} from "./components/Search/Search";
import {Movies} from "./components/Movies/Movies";
import {Theaters} from '@mui/icons-material';
import {MoviesType} from "./api/API";
import {Pagination_2} from "./components/Pagination/Pagination_2";
import defaultPoster from './assets/image/default-poster.jpg';

function App() {

    const isLoading = useSelector<RootStoreType, boolean>(state => state.app.isLoading)
    const status = useSelector<RootStoreType, string>(state => state.app.statusGetFilms)
    const totalResults = useSelector<RootStoreType, number | null>(state => state.movies.totalResults)
    const title = useSelector<RootStoreType, string | null>(state => state.app.findData.title)

    const movies = useSelector<RootStoreType, Array<MoviesType>>(state => state.movies.films)
    const type = useSelector<RootStoreType, string | null>(state => state.app.findData.type)

    const mappedItems = movies.map(({Poster, Title, Year, imdbID, Type}) => (
        <>
            <Movies
                Poster={Poster !== 'N/A' ? Poster : defaultPoster}
                Title={Title}
                Year={Year}
                Type={Type}
                key={imdbID}
                imdbID={imdbID}
            />
        </>
    ))

    return <>
        {isLoading
            ? <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
                <CircularProgress color="secondary"/>
            </div>
            : null
        }

        <div>

            <header className={s.header}>
                <Theaters style={{color: "white", marginRight: 10}}/>
                <h1>Kino Poisk</h1>
            </header>

            <Search/>

            {status === 'succeeded'

                ? <div>
                    <div style={{display: "flex", justifyContent: "center", margin: 10}}>
                        <b>You searched for: <span className={s.span}>{JSON.stringify(title)}</span>,
                            total results found: <span className={s.span}>{totalResults}</span></b>
                    </div>
                    <div className={s.itemContainer}>
                        {mappedItems}
                        <Pagination_2 title={title!} type={type!}/>
                    </div>
                </div>

                : null
            }

            <footer className={s.footer}>
                <p>Used by<a href="http://www.omdbapi.com/" target={'blank'}> OMDB API</a></p>
            </footer>

        </div>
    </>
}

export default App;
