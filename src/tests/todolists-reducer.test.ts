import {
    addTodolistAC,
    changeFilterAC, FilterValuesType,
    removeTodolistAC, TodolistDomainType,
    TodolistsReducer,
    updateTodolistTitleAC
} from './todolists-reducer';
import {v1} from 'uuid';


let todolistId1: string;
let todolistId2: string;

let startState: TodolistDomainType[]

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0}
    ]
})

test('correct todolist should be removed', () => {
    // const endState = TodolistsReducer(startState, { type: 'REMOVE-TODOLIST', id: todolistId1})
    const endState = TodolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let newTodo = {
        id: v1(),
        title: 'JS',
        addedDate: '',
        order: 0
    }

    const endState = TodolistsReducer(startState, addTodolistAC(newTodo))

    expect(endState.length).toBe(3);

});

test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";

    const endState = TodolistsReducer(startState, updateTodolistTitleAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";

    const endState = TodolistsReducer(startState, changeFilterAC(newFilter, todolistId2));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});