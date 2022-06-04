import React from 'react';
import {useDispatch} from "react-redux";
import {Button, Card, CardActions, CardContent, Typography, useMediaQuery} from "@mui/material";
import {NavLink} from "react-router-dom";
import defaultPoster from '../../assets/image/default-poster.jpg';
import {thunkOpenMovie} from "../../redux/movies-reducer";
import {MoviesType} from "../../api/API";

export const Movies = ({Poster, Title, Year, Type}: MoviesType) => {

    const matches = useMediaQuery('(max-width: 500px)')
    const dispatch = useDispatch()

    const fetchMovie = () => {
        dispatch(thunkOpenMovie(Title));
    }

    return <>
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '15px',
                width: matches ? 260 : 300,
                backgroundColor: "#e9e9f3",
                margin: 3,
            }}
            // key={i}
        >
            <div>
                <div
                    style={{
                        backgroundPosition: 'center',
                        backgroundImage: `url(${Poster !== 'N/A' ? Poster : defaultPoster})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        height: matches ? '240' : '300px',
                    }}
                />
                <CardContent>
                    <Typography
                        sx={{textAlign: 'center'}}
                        variant="h5"
                        component="div"
                    >
                        {`${Title}, ${Year}`}
                        <div style={{margin: 15}}><b>Type: {Type}</b></div>
                    </Typography>
                </CardContent>
            </div>
            <CardActions sx={{justifyContent: 'center'}}>
                <NavLink style={{textDecoration: 'none'}} to={`movie/${Title}`}>
                    <Button onClick={fetchMovie} size="large">
                        Learn More
                    </Button>
                </NavLink>
            </CardActions>
        </Card>
    </>
}