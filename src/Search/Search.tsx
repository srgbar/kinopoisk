import React from 'react';
import {Button, TextField} from "@mui/material";

export const Search = () => {
    return (
        <div className="search">
            <TextField style={{margin: 20, width: 400}} id="outlined-basic" label="Title film" variant="outlined" type="search"/>
            <Button style={{background: "Background"}} variant="contained" onClick={() => alert("SEARCH")}>Search</Button>
        </div>
    );
};