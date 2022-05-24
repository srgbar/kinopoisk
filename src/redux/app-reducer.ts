type InitialStateType = {
    isLoading: boolean
    isError: string | null
    statusGetFilms: 'idle' | 'loading' | 'succeeded' | 'failed'
}

const initialState: InitialStateType = {
    isLoading: false,
    isError: null,
    statusGetFilms: "idle"
}

type ActionsType =
    | ReturnType<typeof setStatusLoadingAC>
    | ReturnType<typeof setErrorStatusAC>
    | ReturnType<typeof setStatusGetFilms>

export const appReducer = (state = initialState, actions: ActionsType): InitialStateType => {
    switch (actions.type) {
        case "STATUS-LOADING":
            return {...state, isLoading: actions.isLoad}
        case "STATUS-ERROR":
            return {...state, isError: actions.isError}
        case "SET-STATUS-GET-FILMS":
            return {...state, statusGetFilms: actions.statusResponse}
        default:
            return state
    }
}

export const setStatusLoadingAC = (isLoad: boolean) => ({type: 'STATUS-LOADING', isLoad} as const)
export const setErrorStatusAC = (isError: string | null) => ({type: 'STATUS-ERROR', isError} as const)
export const setStatusGetFilms = (statusResponse: 'idle' | 'loading' | 'succeeded' | 'failed') => ({
    type: 'SET-STATUS-GET-FILMS',
    statusResponse
} as const)