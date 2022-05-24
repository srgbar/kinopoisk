import {Dispatch} from "redux";
import {setErrorStatusAC, setStatusGetFilms, setStatusLoadingAC} from "./app-reducer";
import API, {MoviesType} from "../api/API";

const initialState = [] as Array<MoviesType>

type ActionsType =
    | ReturnType<typeof setMoviesAC>

type DispatchType =
    | ReturnType<typeof setMoviesAC>
    | ReturnType<typeof setStatusLoadingAC>
    | ReturnType<typeof setErrorStatusAC>
    | ReturnType<typeof setStatusGetFilms>

export const moviesReducer = (state = initialState, actions: ActionsType): Array<MoviesType> => {
    switch (actions.type) {
        case "SET-MOVIES":
            return [...actions.movies]
        default:
            return state
    }
}

const setMoviesAC = (movies: Array<MoviesType>) => ({type: 'SET-MOVIES', movies} as const)

export const thunkSetMovies = (title: string) => (dispatch: Dispatch<DispatchType>) => {
    dispatch(setStatusLoadingAC(true))
    dispatch(setStatusGetFilms('loading'))
    API.searchFilmsByTitle(title)
        .then((res) => {
            const {Response, Search, Error} = res.data;
            if (Response === "True") {
                dispatch(setStatusGetFilms('succeeded'))
                dispatch(setMoviesAC(Search))
                dispatch(setStatusLoadingAC(false))

                console.log(Search)
            } else {
                dispatch(setStatusGetFilms('failed'))
                dispatch(setErrorStatusAC(Error))
                dispatch(setStatusLoadingAC(false))
            }
        })
        .catch(() => {
            dispatch(setStatusGetFilms('failed'))
            dispatch(setErrorStatusAC('Неизвестная ошибка'))
        })
}