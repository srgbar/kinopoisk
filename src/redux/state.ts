import {applyMiddleware, combineReducers, createStore} from "redux";
import {moviesReducer} from "./movies-reducer";
import {appReducer} from "./app-reducer";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({
    movies: moviesReducer,
    app: appReducer
})

export const state = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type RootStoreType = ReturnType<typeof rootReducer>