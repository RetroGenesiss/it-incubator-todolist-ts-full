import React, {useState} from 'react';
import '../app/App.css';
import {v1} from 'uuid';
import AddItemForm from "../Components/AddItemForm/AddItemForm";
import ButtonAppBar from "../ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {FilterValuesType, TodolistDomainType} from "../store/todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-api";
import {Todolist} from "./Todolist";


export type TasksStateType = {
    [key: string]: TaskType[]
}
function App() {

    let todolistID1 = v1()  //ключ
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<TodolistDomainType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all',  addedDate: '', order: 0},
        {id: todolistID2, title: 'What to buy', filter: 'all',  addedDate: '', order: 0},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: "CSS", status: TaskStatuses.Completed, todolistId: todolistID1, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: "ReactJS", status: TaskStatuses.New, todolistId: todolistID1, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
        ],
        [todolistID2]: [
            {id: v1(), title: "Book", status: TaskStatuses.New, todolistId: todolistID2, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: "Milk", status: TaskStatuses.Completed, todolistId: todolistID2, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
        ]
    })

    const updateTask = (taskId: string, newTitle: string, todolistID: string) => {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, title: newTitle} : el)
        })
    }
    const updateTodolistTitle = (newTitle: string, todolistID: string) => {
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, title: newTitle} : el))
    }

    function removeTodolist(todolistID: string) {
        setTodolists(todolists.filter(el => el.id !== todolistID))
        delete tasks[todolistID]  // обязательно прописать удаление "начинки", дабы не было "мертвых душ"
    }

    function removeTask(taskId: string, todolistID: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== taskId)});  // мы создает "старый-новый" ключ (todolistID)
    } // в этом новом ключе будут лежать старые таски. Туда пойдут все, кроме taskId

    function addTask(title: string, todolistID: string) {
        let newTask = {id: v1(), title: "Book", status: TaskStatuses.New, todolistId: todolistID, description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low};
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }

    function changeStatus(todolistID: string, taskId: string, newStatus: TaskStatuses) {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, status: newStatus} : el)
        })
    }

    function changeFilter(valueFilter: FilterValuesType, todolistID: string) {
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter: valueFilter} : el));  // это копия массива
    }

    const addTodolist = (newTitle: string) => {
        const newTodo: TodolistDomainType = {
            id: v1(),
            filter: 'all',
            title: newTitle,
            addedDate: '',
            order: 0
        }
        setTodolists([newTodo, ...todolists])
        setTasks({...tasks, [newTodo.id]: []})
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={ {padding: '20px'} }>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(el => {
                            let tasksForTodolist = tasks[el.id]; // в квадратных скобках, так как ключ также в квадратных, иначе получится строка

                            if (el.filter === "active") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New);
                            }
                            if (el.filter === "completed") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed);
                            }
                            return <Grid item>
                                <Paper style={ {padding: '10px'} } elevation={3}>
                                    <Todolist
                                        key={el.id}
                                        todolistID={el.id}
                                        title={el.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={el.filter}
                                        removeTodolist={removeTodolist}
                                        updateTask={updateTask}
                                        updateTodolistTitle={updateTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
