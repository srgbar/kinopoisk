import {Button, Card, CardActions, CardContent, CircularProgress, Typography,} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useSelector} from "react-redux";
import {RootStoreType} from "../redux/state";
import s from "./Movie.module.css";
import st from "../App.module.css";
import '../App.module.css';
import {CurrentMovieType} from "../api/API";
import {Theaters} from "@mui/icons-material";
import React from "react";

export const Movie = () => {

    const navigate = useNavigate();
    const backPage = -1;
    const onReturnHandler = () => navigate(backPage);
    const status = useSelector<RootStoreType, string>(state => state.app.statusGetFilms);
    const {
        Title,
        Year,
        imdbRating,
        Awards,
        Country,
        Genre,
        Language,
        Metascore,
        Plot,
        Poster,
        Rated,
        Writer,
        Actors,
    } = useSelector<RootStoreType, CurrentMovieType>(state => state.movies.currentMovie);
    return (
        <div className={s.main}>
            <header className={s.header}>
                <Theaters style={{color: "white", marginRight: 10}}/>
                <h1>Kino Poisk</h1>
            </header>

            {status === 'loading' ? (
                <div
                    style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}
                >
                    <CircularProgress/>
                </div>
            ) : (
                <Card sx={{width: 800, backgroundColor: "#e9e9f3"}}
                >
                    <div
                        style={{
                            backgroundPosition: 'center',
                            backgroundImage: `url(${Poster})`,
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            height: '500px',
                            margin: 20
                        }}
                    />
                    <div>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                <b>Title:</b> {Title}
                            </Typography>
                            {Year !== 'N/A' && (
                                <Typography variant="h6" component="div">
                                    <b>Year:</b> {Year}
                                </Typography>
                            )}
                            {imdbRating !== 'N/A' && (
                                <Typography variant="subtitle1" component="div">
                                    <b>Imdb Rating:</b> {imdbRating}
                                </Typography>
                            )}
                            {Awards !== 'N/A' && (
                                <Typography variant="subtitle1" component="div">
                                    <b>Awards:</b> {Awards}
                                </Typography>
                            )}
                            {Country !== 'N/A' && (
                                <Typography variant="subtitle1" component="div">
                                    <b>Country:</b> {Country}
                                </Typography>
                            )}
                            {Genre !== 'N/A' && (
                                <Typography variant="subtitle1" component="div">
                                    <b>Genre:</b> {Genre}
                                </Typography>
                            )}
                            {Plot !== 'N/A' && (
                                <Typography variant="subtitle1" component="div">
                                    <b>Plot:</b> {Plot}
                                </Typography>
                            )}
                            {Language !== 'N/A' && (
                                <Typography variant="subtitle1" component="div">
                                    <b>Language:</b> {Language}
                                </Typography>
                            )}
                            {Rated !== 'N/A' && (
                                <Typography variant="subtitle1" component="div">
                                    <b>Rated:</b> {Rated}
                                </Typography>
                            )}
                            {Metascore !== 'N/A' && (
                                <Typography variant="subtitle1" component="div">
                                    <b>Metascore:</b> {Metascore}
                                </Typography>
                            )}
                            {Writer !== 'N/A' && (
                                <Typography variant="subtitle1" component="div">
                                    <b>Writter:</b> {Writer}
                                </Typography>
                            )}
                            {Actors !== 'N/A' && (
                                <Typography variant="subtitle1" component="div">
                                    <b>Actors:</b> {Actors}
                                </Typography>
                            )}
                        </CardContent>

                        <CardActions sx={{justifyContent: 'center'}}>
                            <Button onClick={onReturnHandler} size="large">
                                Back to list
                            </Button>
                        </CardActions>
                    </div>

                </Card>
            )}

            <footer className={st.footer}>
                <p>Used by<a href="http://www.omdbapi.com/" target={'blank'}> OMDB API</a></p>
            </footer>

        </div>
    );
};
