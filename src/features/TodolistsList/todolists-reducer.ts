import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";

const initialState: TodolistDomainType[] = []

export const TodolistsReducer = (state = initialState, action: TsarType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.id ? {...el, title: action.newTodolistTitle} : el)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el => el.id === action.id ? {...el, filter: action.newFilter} : el)
        case "SET-TODOLISTS":
            return action.todos.map((tl) => ({...tl, filter: 'all'}))
        default:
            return state
    }
};

// actions
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const updateTodolistTitleAC = (id: string, newTodolistTitle: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', id, newTodolistTitle} as const)
export const changeFilterAC = (newFilter: FilterValuesType, id: string) =>
    ({type: 'CHANGE-TODOLIST-FILTER', newFilter, id} as const)
export const setTodolistsAC = (todos: TodolistType[]) => ({type: 'SET-TODOLISTS', todos} as const)

// thunks
export const getTodosTC = () => (dispatch: Dispatch<TsarType>) => {
    todolistsAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
        })
}
export const deleteTodolistTC = (id: string) => (dispatch: Dispatch<TsarType>) => {
    todolistsAPI.deleteTodolist(id)
        .then((res) => {
            dispatch(removeTodolistAC(id))
        })
}
export const createTodolistTC = (title: string) => (dispatch: Dispatch<TsarType>) => {
    todolistsAPI.createTodolist(title)
        .then((res) => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}
export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch<TsarType>) => {
    todolistsAPI.updateTodolist(id, title)
        .then((res) => {
            dispatch(updateTodolistTitleAC(id, title))
        })

}
// export const changeFilterTC = (value: FilterValuesType, todolistId: string) => (dispatch: Dispatch) => {
//     todolistsAPI.updateTodolist(value, todolistId)
//         .then((res) => {
//             dispatch(changeFilterAC(value, todolistId))
//         })
//
// }

// types
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export type RemoveTodolistACTypeType = ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>

type TsarType = RemoveTodolistACTypeType
    | AddTodolistACType
    | ReturnType<typeof updateTodolistTitleAC>
    | ReturnType<typeof changeFilterAC>
    | SetTodolistsACType