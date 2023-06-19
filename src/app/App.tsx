import React, {memo, useCallback, useEffect} from 'react';
import './App.css';
import AddItemForm from "../Components/AddItemForm/AddItemForm";
import ButtonAppBar from "../ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
    changeFilterAC, changeTodolistTitleTC, createTodolistTC, deleteTodolistTC,
    FilterValuesType,
    getTodosTC
} from "../store/todolists-reducer";
import {useAppDispatch, useAppSelector} from "../store/store";
import {TodolistWithRedux} from "../TodolistWithRedux";
import {TodolistDomainType} from "../store/todolists-reducer";
import {
    createTasksTC,
    deleteTasksTC,
    updateTasksTC,
} from "../store/tasks-reducer";
import {TaskStatuses, TaskType} from "../api/todolists-api";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const AppWithRedux = memo(() => {


    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    );
})

type TodolistsListPropsType = {}
const TodolistsList: React.FC<TodolistsListPropsType> = (props) => {

    const dispatch = useAppDispatch()
    const todolists = useAppSelector<Array<TodolistDomainType>>((state => state.todolists))
    const tasks = useAppSelector<TasksStateType>(state => state.tasks)

    useEffect(() => {
        dispatch(getTodosTC())
    }, [])

    const removeTask = useCallback(function (taskId: string, todolistId: string) {
        dispatch(deleteTasksTC(todolistId, taskId))
    }, []);

    const addTask = useCallback(function (title: string, todolistId: string) {
        dispatch(createTasksTC(todolistId, title));
    }, []);

    const changeStatus = useCallback(function (taskId: string, status: TaskStatuses, todolistId: string) {
        // @ts-ignore
        dispatch(updateTasksTC(todolistId, taskId, {status}))
    }, []);
    // const changeStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string):
    //     ThunkAction<void, AppRootState, null, AnyAction> => {
    //         return dispatch => {
    //             dispatch(updateTasksTC(todolistId, taskId, {status}));
    //         };
    //     }, []);

    const changeTaskTitle = useCallback(function (taskId: string, newTitle: string, todolistId: string) {
        // @ts-ignore
        dispatch(updateTasksTC(todolistId, taskId, {title: newTitle}))
    }, []);
    // const changeTaskTitle = useCallback((taskId: string, newTitle: string, todolistId: string):
    // ThunkAction<void, AppRootState, null, AnyAction> => {
    //     return dispatch => {
    //         dispatch(updateTasksTC(todolistId, taskId, {title: newTitle}));
    //     };
    // }, []);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeFilterAC(value, todolistId);
        dispatch(action);
    }, []);

    const removeTodolist = useCallback(function (id: string) {
        dispatch(deleteTodolistTC(id));
    }, []);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        dispatch(changeTodolistTitleTC(id, title));
    }, []);

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title));
    }, [dispatch]);

    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todolists.map(tl => {
                        return <Grid key={tl.id} item>
                            <Paper style={{padding: '10px'}} elevation={3}>
                                <TodolistWithRedux
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={tasks[tl.id]}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
            {props.todolists.map(tl => {
                return <Grid key={tl.id} item>
                    <Paper style={{padding: '10px'}} elevation={3}>
                        <TodolistWithRedux
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={tasks[tl.id]}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={tl.filter}
                            removeTodolist={removeTodolist}
                            changeTaskTitle={changeTaskTitle}
                            changeTodolistTitle={changeTodolistTitle}
                        />
                    </Paper>
                </Grid>
            })}
        </>
    )
}
export default AppWithRedux;
