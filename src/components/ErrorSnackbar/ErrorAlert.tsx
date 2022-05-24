import React, {useEffect} from 'react';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useDispatch, useSelector} from "react-redux";
import {RootStoreType} from "../../redux/state";
import {setErrorStatusAC} from "../../redux/app-reducer";
import {Stack} from "@mui/material";
import s from "./ErrorAlert.module.css"

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorAlert() {
    const error = useSelector<RootStoreType, string | null>(state => state.app.isError)

    const dispatch = useDispatch()

    useEffect(() => {
        const timerId = setTimeout(() => {
            dispatch(setErrorStatusAC(null));
        }, 4000);
        return () => clearTimeout(timerId);
    }, [error]);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setErrorStatusAC(null))
    };


    const errorClassName = `${s.alert} ${error ? s.hidden : ''}`;

    return (
        <div className={errorClassName}>
            <Stack sx={{width: '100%'}} spacing={2}>
                <Alert variant="filled"
                       severity="error"
                       onClose={handleClose}
                       style={{backgroundColor: "#f5d5d5", color: "black"}}
                >
                    {error}
                </Alert>
            </Stack>
        </div>
    )
}
