import {Dispatch} from "redux";
import {setErrorStatusAC, setFormValuesAC, setStatusGetFilmsAC, setStatusLoadingAC} from "./app-reducer";
import API, {FindMoviesDataType, MoviesType} from "../api/API";

export type InitialStateType = {
    films: Array<MoviesType>
    totalResults: number | null
    page: number
}

const initialState: InitialStateType = {
    films: [] as Array<MoviesType>,
    totalResults: null,
    page: 1
}

type ActionsType =
    | ReturnType<typeof setMoviesAC>

type DispatchType =
    | ReturnType<typeof setMoviesAC>
    | ReturnType<typeof setFormValuesAC>
    | ReturnType<typeof setStatusLoadingAC>
    | ReturnType<typeof setErrorStatusAC>
    | ReturnType<typeof setStatusGetFilmsAC>

export const moviesReducer = (state = initialState, actions: ActionsType): InitialStateType => {
    switch (actions.type) {
        case "SET-MOVIES":
            return {films: [...actions.movies], page: actions.page, totalResults: actions.totalResults}
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
            dispatch(setErrorStatusAC('Неизвестная ошибка'))
        })
}