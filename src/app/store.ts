import {AnyAction, applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";
import {TodolistsReducer} from "./todolists-reducer";
import {TaskReducer} from "./tasks-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}


const rootReducer = combineReducers({
    todolists: TodolistsReducer,
    tasks: TaskReducer
})

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppDispatchType = ThunkDispatch<AppDispatchType, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector
// кастомные хуки лучше хранить в отдельном файле и папке

export type AppRootState = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store

// {
//     state: {
//         tasks: {}
//         TodolistsList: []
//     }
//     getState()
//     dispatch()
//     subscribe()
// }