import {TasksStateType} from "../PrevComponents/FirstApp";
import {AddTodolistACType, RemoveTodolistACTypeType, SetTodolistsACType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootState} from "./store";

const initialState: TasksStateType = {}

export const TaskReducer = (state = initialState, action: TsarType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todoListId]: state[action.todoListId].filter(el => el.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todolistId]: [action.task, ...state[action.task.todolistId]]}
        case 'UPDATE-TASK':
            return {...state, [action.todoListId]: state[action.todoListId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)}
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case "SET-TODOLISTS": {
            const copyState = {...state}
            action.todos.forEach((tl) => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case "SET-TASKS":
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
};

// actions
export const removeTaskAC = (taskId: string, todoListId: string) => ({type: 'REMOVE-TASK', taskId, todoListId} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskId: string, todoListId: string, model: UpdateTaskModelType) =>
    ({type: 'UPDATE-TASK', taskId, todoListId, model} as const)
export const setTasksAC = (tasks: TaskType[], todolistId: string) => ({type: 'SET-TASKS', tasks, todolistId} as const)

// thunks
export const getTasksTC = (todolistId: string) => (dispatch: Dispatch<TsarType>) => {
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(res.data.items, todolistId))
        })
}
export const deleteTasksTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<TsarType>) => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            dispatch(removeTaskAC(taskId, todolistId))
        })
}
export const createTasksTC = (todolistId: string, title: string) => (dispatch: Dispatch<TsarType>) => {
    todolistsAPI.createTask(todolistId, title)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item))
        })
}
export const updateTasksTC = (todolistId: string, taskId: string, data: FlexType) =>
    (dispatch: Dispatch<TsarType>, getState: () => AppRootState) => {

        const task = getState().tasks[todolistId].find((t) => t.id === taskId)
        // фильтр остановится на первом найденном, но не факт, что это не будет undefined

        if (task) {
            const model = {
                // title: task!.title // это утверждение, что найденная таска ТОЧНО не будет undefined
                title: task.title,
                deadline: task.deadline,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                status: task.status,
                ...data
            }

            todolistsAPI.updateTask(todolistId, taskId, model)
                .then((res) => {
                    dispatch(updateTaskAC(taskId, todolistId, model))
                })
        }
    }

// types
interface FlexType {
    title?: string
    deadline?: string
    startDate?: string
    priority?: TaskPriorities
    description?: string
    status?: TaskStatuses
}

type TsarType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistACType
    | RemoveTodolistACTypeType
    | SetTodolistsACType
    | ReturnType<typeof setTasksAC>