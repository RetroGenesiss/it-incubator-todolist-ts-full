import {TasksStateType} from "../../PrevComponents/FirstApp";
import {addTaskAC, updateTaskAC, removeTaskAC, TaskReducer} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";

let startState: TasksStateType

beforeEach(() => {
    startState = {
        'todoListId1': [
            {id: '1', title: "CSS", status: TaskStatuses.New, todolistId: 'todoListId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: '2', title: "JS", status: TaskStatuses.Completed, todolistId: 'todoListId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: '3', title: "ReactJS", status: TaskStatuses.New, todolistId: 'todoListId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
        ],
        'todoListId2': [
            {id: '1', title: "CSS", status: TaskStatuses.New, todolistId: 'todoListId2', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: '2', title: "JS", status: TaskStatuses.Completed, todolistId: 'todoListId2', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: '3', title: "ReactJS", status: TaskStatuses.New, todolistId: 'todoListId2', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
        ]
    }
})

test('correct task should be removed from correct array', () => {

    const endState = TaskReducer(startState, removeTaskAC('2', 'todoListId2'))

    expect(endState['todoListId1'].length).toBe(3)
    expect(endState['todoListId2'].length).toBe(2)
    expect(endState['todoListId2'].every(t => t.id != '2')).toBeTruthy()
})

// test('correct task should be added to correct array', () => {
//
//     const endState = TaskReducer(startState, addTaskAC('Juice'))
//
//     expect(endState['todoListId1'].length).toBe(3)
//     expect(endState['todoListId2'].length).toBe(4)
//     expect(endState['todoListId2'][0].id).toBeDefined()
//     expect(endState['todoListId2'][0].title).toBe('Juice')
//     expect(endState['todoListId2'][0].status).toBe(TaskStatuses.New)
// })

// test('status of specified task should be changed', () => {
//
//     const endState = TaskReducer(startState, changeTaskStatusAC('2', 'todoListId2', TaskStatuses.New))
//
//     expect(endState['todoListId2'][2].status).toBeFalsy()
//     expect(endState['todoListId1'][1].status).toBeTruthy()
// })

// test('title of specified task should be changed', () => {
//
//     const endState = TaskReducer(startState, updateTaskTitleAC('2', 'Milkyway', 'todoListId2'))
//
//     expect(endState['todoListId2'][1].title).toBe('Milkyway')
//     expect(endState['todoListId1'][1].title).toBe("JS")
// })

// test('new property should be added in added todolist', () => {
//
//     const endState = TaskReducer(startState, addTodolistAC('new todolist',))
//
//     const keys = Object.keys(endState)
//     const newKey = keys.find(k => k != 'todoListId1' && k != 'todoListId2')
//     if (!newKey) {
//         throw Error('new key should be added')
//     }
//
//     expect(keys.length).toBe(3)
//     expect(endState[newKey]).toEqual([])
// })


test('property with todolistId should be deleted', () => {

    const endState = TaskReducer(startState, removeTodolistAC('todoListId2'))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todoListId2']).not.toBeDefined()
})