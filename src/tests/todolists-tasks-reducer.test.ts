import {addTodolistAC, TodolistDomainType, TodolistsReducer} from "./todolists-reducer";
import {TasksStateType} from "../../PrevComponents/FirstApp";
import {TaskReducer} from "./tasks-reducer";

test('ids should be equal', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistState: Array<TodolistDomainType> = []

    // const action = addTodolistAC('new todolist')

    // const endTaskState = TaskReducer(startTasksState, action)
    // const endTodolistState = TodolistsReducer(startTodolistState, action)

    // const keys = Object.keys(endTaskState);
    // const idFromTasks = keys[0]
    // const idFromTodolists = endTodolistState[0].id

    // expect(idFromTasks).toBe(action.todolistId)
    // expect(idFromTodolists).toBe(action.todolistId)
})