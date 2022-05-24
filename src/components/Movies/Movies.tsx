import React from 'react';
import {useSelector} from "react-redux";
import {RootStoreType} from "../../redux/state";
import {MoviesType} from "../../api/API";
import {Button, Card, CardActions, CardContent, Typography, useMediaQuery} from "@mui/material";
import {NavLink} from "react-router-dom";
import defaultPoster from '../../assets/image/default-poster.jpg';

export const Movies = () => {

    const movies = useSelector<RootStoreType, Array<MoviesType>>(state => state.movies)

    const matches = useMediaQuery('(max-width: 500px)');

    const mappedItems = movies.map(({Poster, Title, Year, imdbID}, i) => (
            <Card
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '20px',
                    width: matches ? 260 : 400,
                    backgroundColor: "#e9e9f3",
                    margin: 3,
                }}
                key={i}
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
                            gutterBottom
                            variant="h5"
                            component="div"
                        >
                            {`${Title}, ${Year}`}
                        </Typography>
                    </CardContent>
                </div>
                <CardActions sx={{justifyContent: 'center'}}>
                    <NavLink style={{textDecoration: 'none'}} to={`movie/${Title}`}>
                        <Button onClick={() => alert("open film card")} size="large">
                            Learn More
                        </Button>
                    </NavLink>
                </CardActions>
            </Card>
        )
    )

    return <>
        {mappedItems}
    </>
}