import {FindMoviesDataType} from "../api/API";

type InitialStateType = {
    isLoading: boolean
    isError: string | null
    statusGetFilms: 'idle' | 'loading' | 'succeeded' | 'failed'

    findData: FindMoviesDataType
}

const initialState: InitialStateType = {
    isLoading: false,
    isError: null,
    statusGetFilms: "idle",

    findData: {} as FindMoviesDataType
}

type ActionsType =
    | ReturnType<typeof setStatusLoadingAC>
    | ReturnType<typeof setErrorStatusAC>
    | ReturnType<typeof setStatusGetFilmsAC>

    | ReturnType<typeof setFormValuesAC>

export const appReducer = (state = initialState, actions: ActionsType): InitialStateType => {
    switch (actions.type) {
        case "STATUS-LOADING":
            return {...state, isLoading: actions.isLoad}
        case "STATUS-ERROR":
            return {...state, isError: actions.isError}
        case "SET-STATUS-GET-FILMS":
            return {...state, statusGetFilms: actions.statusResponse}
        case "SET-FORM-VALUES":
            return {...state, findData: actions.findData}
        default:
            return state
    }
}

export const setStatusLoadingAC = (isLoad: boolean) =>
    ({type: 'STATUS-LOADING', isLoad} as const)
export const setErrorStatusAC = (isError: string | null) =>
    ({type: 'STATUS-ERROR', isError} as const)
export const setStatusGetFilmsAC = (statusResponse: 'idle' | 'loading' | 'succeeded' | 'failed') =>
    ({type: 'SET-STATUS-GET-FILMS', statusResponse} as const)

export const setFormValuesAC = (findData: FindMoviesDataType) =>
    ({type: 'SET-FORM-VALUES', findData} as const)