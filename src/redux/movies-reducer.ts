import {Dispatch} from "redux";
import {
    setErrorStatusAC,
    setFormValuesAC,
    setStatusGetFilmsAC,
    setStatusLoadingAC
} from "./app-reducer";
import {API, CurrentMovieType, FindMoviesDataType, MoviesType} from "../api/API";

export type InitialStateType = {
    films: Array<MoviesType>
    totalResults: number | null
    page: number
    currentMovie: CurrentMovieType
}

const initialState: InitialStateType = {
    films: [] as Array<MoviesType>,
    totalResults: null,
    page: 1,
    currentMovie: {} as CurrentMovieType
}

type ActionsType =
    | ReturnType<typeof setMoviesAC>
    | ReturnType<typeof setCurrentMovieAC>

type DispatchType =
    | ReturnType<typeof setMoviesAC>
    | ReturnType<typeof setCurrentMovieAC>
    | ReturnType<typeof setFormValuesAC>
    | ReturnType<typeof setStatusLoadingAC>
    | ReturnType<typeof setErrorStatusAC>
    | ReturnType<typeof setStatusGetFilmsAC>

export const moviesReducer = (state = initialState, actions: ActionsType): InitialStateType => {
    switch (actions.type) {
        case "SET-MOVIES":
            return {...state, films: [...actions.movies], page: actions.page, totalResults: actions.totalResults}
        case "SET-CURRENT-MOVIE":
            return {...state, currentMovie: actions.currentMovie}
        default:
            return state
    }
}

const setMoviesAC = (movies: Array<MoviesType>, page: number, totalResults: number | null) => ({
    type: 'SET-MOVIES',
    movies,
    totalResults,
    page
} as const)

const setCurrentMovieAC = (currentMovie: CurrentMovieType) => ({
    type: 'SET-CURRENT-MOVIE',
    currentMovie,
} as const)

export const thunkSetMovies = (findData: FindMoviesDataType, page: number) => (dispatch: Dispatch<DispatchType>) => {
    dispatch(setStatusLoadingAC(true))
    dispatch(setStatusGetFilmsAC('loading'))
    API.searchFilmsByTitle(findData, page)
        .then((res) => {
            const {Response, Search, Error, totalResults} = res.data;
            if (Response === "True") {
                dispatch(setStatusGetFilmsAC('succeeded'))
                dispatch(setMoviesAC(Search, page, JSON.parse(totalResults)))
                dispatch(setFormValuesAC(findData));
                dispatch(setStatusLoadingAC(false))
                console.log(res.data)
            } else {
                dispatch(setStatusGetFilmsAC('failed'))
                dispatch(setErrorStatusAC(Error))
                dispatch(setStatusLoadingAC(false))
            }
        })
        .catch(() => {
            dispatch(setStatusGetFilmsAC('failed'))
            dispatch(setErrorStatusAC('Unknown error'))
        })
}

export const thunkOpenMovie = (title: string) => (dispatch: Dispatch<DispatchType>) => {
    dispatch(setStatusLoadingAC(true))
    dispatch(setStatusGetFilmsAC('loading'))
    API.getCurrentMovie(title)
        .then((res) => {
            if (res.data.Response === "True") {
                dispatch(setStatusGetFilmsAC('succeeded'))
                dispatch(setCurrentMovieAC(res.data))
                dispatch(setStatusLoadingAC(false))
                console.log(res.data)
            } else {
                dispatch(setStatusGetFilmsAC('failed'))
                // dispatch(setErrorStatusAC(Error))
                dispatch(setStatusLoadingAC(false))
            }
        })
        .catch(() => {
            dispatch(setStatusGetFilmsAC('failed'))
            dispatch(setErrorStatusAC('Unknown error'))
        })
}