import React, {useState} from 'react';
import {Button, TextField} from "@mui/material";
import {thunkSetMovies} from "../../redux/movies-reducer";
import {useDispatch} from "react-redux";
import s from "./Search.module.css";
import {ErrorAlert} from "../ErrorSnackbar/ErrorAlert";

export const Search = () => {
    const dispatch = useDispatch()

    const [searchName, setSearchName] = useState('');

    const searchFilm = () => {
        dispatch(thunkSetMovies(searchName))
    }

    return (
        <div className={s.search}>
            <TextField style={{margin: 20, width: 400}}
                       id="outlined-basic"
                       label="Title film"
                       variant="standard"
                       type="search"
                       value={searchName}
                       onChange={(e) => setSearchName(e.currentTarget.value)}
            />
            <Button style={{background: "Background"}} variant="contained" onClick={searchFilm}>Search</Button>
            <ErrorAlert/>
        </div>
    )
}