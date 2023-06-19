import React from 'react'
import {Provider} from "react-redux";
import {combineReducers, createStore} from 'redux';
import {AppRootState, store} from "../app/store";
import {TaskReducer} from "../features/TodolistsList/tasks-reducer";
import {TodolistsReducer} from "../features/TodolistsList/todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

const rootReducer = combineReducers({
    tasks: TaskReducer,
    todolists: TodolistsReducer
})

const initialGlobalState: AppRootState = {
    app: {status: 'loading', errors: ''},
    todolists: [
        {id: 'todolistID1', title: 'What to learn', filter: 'all',  addedDate: '', order: 0, entityStatus: 'idle'},
        {id: 'todolistID2', title: 'What to buy', filter: 'all',  addedDate: '', order: 0, entityStatus: 'idle'}
    ] ,
    tasks: {
        ['todolistID1']: [
            {id: v1(), title: "CSS", status: TaskStatuses.Completed, todolistId: 'todolistID1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, entityStatus: 'idle'},
            {id: v1(), title: "ReactJS", status: TaskStatuses.New, todolistId: 'todolistID1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, entityStatus: 'idle'},
        ],
        ['todolistID2']: [
            {id: v1(), title: "Book", status: TaskStatuses.New, todolistId: 'todolistID2', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, entityStatus: 'idle'},
            {id: v1(), title: "Milk", status: TaskStatuses.Completed, todolistId: 'todolistID2', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, entityStatus: 'idle'},
        ]
    },
    auth: { isLoggedIn: true }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (storyFn: ()=> React.ReactNode) => {
    return <Provider store={store}>{storyFn()}</Provider>
}