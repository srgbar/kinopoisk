import React, {useState} from 'react';
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    useMediaQuery
} from "@mui/material";
import {thunkSetMovies} from "../../redux/movies-reducer";
import {useDispatch} from "react-redux";
import s from "./Search.module.css";
import {ErrorAlert} from "../ErrorSnackbar/ErrorAlert";

export const Search = () => {

    const dispatch = useDispatch()
    const size = useMediaQuery('(min-width: 500px)');

    const [searchName, setSearchName] = useState('');
    const [searchType, setSearchType] = useState('Movie');

    const searchFilm = () => {
        dispatch(thunkSetMovies({title: searchName, type: searchType}, 1))
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

            <FormControl variant="standard" sx={{ m: 1, minWidth: size ? 120 : 80}}>
                <InputLabel id="demo-simple-select-standard-label"> </InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={searchType}
                    onChange={(e: SelectChangeEvent<string>) => setSearchType(e.target.value)}
                    label="type"
                    name="type"
                >
                    <MenuItem value="Movie">Movie</MenuItem>
                    <MenuItem value="Series">Series</MenuItem>
                    <MenuItem value="Episode">Episode</MenuItem>
                </Select>
            </FormControl>

            <Button style={{background: "Background"}} variant="contained" onClick={searchFilm}>Search</Button>
            <ErrorAlert/>
        </div>
    )
}