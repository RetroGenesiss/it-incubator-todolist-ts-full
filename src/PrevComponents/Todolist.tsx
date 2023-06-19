import React, {ChangeEvent} from 'react';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import {Checkbox} from "@mui/material";
import {TaskStatuses, TaskType} from "./api/todolists-api";
import {FilterValuesType} from "./store/todolists-reducer";

// export type TaskType = {
//     id: string
//     title: string
//     status: TaskStatuses
// }
type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistID: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, status: TaskStatuses) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
    updateTask: (todolistID: string, taskId: string, newTitle: string) => void
    updateTodolistTitle: (todolistID: string, newTitle: string) => void
}


export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter("all", props.todolistID);
    const onActiveClickHandler = () => props.changeFilter("active", props.todolistID);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.todolistID);

    const addTaskHandler = (title: string) => props.addTask(title, props.todolistID)
    const removeTodolistHandler = () => props.removeTodolist(props.todolistID);

    const updateTaskHandler = (newTitle: string, taskID: string) => {
        props.updateTask(props.todolistID, taskID, newTitle)
    }
    const updateTodolistTitle = (newTitle: string) => {
        props.updateTodolistTitle(props.todolistID, newTitle)
    }


    let task = props.tasks.map(t => {
        const onClickHandler = () => props.removeTask(t.id, props.todolistID)
        // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        //     props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked);
        // }
        const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIdDoneValue = e.currentTarget.checked
            props.changeTaskStatus(props.todolistID, t.id, newIdDoneValue
                ? TaskStatuses.Completed : TaskStatuses.New)
        }

        return <div key={t.id} className={t.status ? "is-done" : ""}>
            {/*<Checkbox onChange={onChangeHandler}
                        checked={t.isDone}
                        style={ {color: 'darkmagenta'} }/>*/}
            <Checkbox checked={t.status === TaskStatuses.Completed}
                      onChange={changeStatusHandler}/>

            <EditableSpan oldTitle={t.title} callBack={(newTitle) =>
                updateTaskHandler(t.id, newTitle)}/>

            <IconButton aria-label="delete" onClick={onClickHandler}>
                <DeleteIcon/>
            </IconButton>
        </div>
    })

    return <div>
        <h3>
            <EditableSpan oldTitle={props.title} callBack={updateTodolistTitle}/>
            <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                <DeleteIcon/>
            </IconButton>
        </h3>

        <AddItemForm addItem={addTaskHandler}/>

        <div>{task}</div>

        <div>
            <Button variant={props.filter === 'all' ? "outlined" : "contained"} color={"success"}
                    onClick={onAllClickHandler}>All</Button>
            <Button variant={props.filter === 'active' ? "outlined" : "contained"} color={"error"}
                    onClick={onActiveClickHandler}>Active</Button>
            <Button variant={props.filter === 'completed' ? "outlined" : "contained"} color={"secondary"}
                    onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////

// let [title, setTitle] = useState("")
// let [error, setError] = useState<string | null>(null)

// const addTask = () => {
//     if (title.trim() !== "") {
//         props.addTask(props.todolistID, title.trim());
//         setTitle("");
//     } else {
//         setError("Title is required");
//     }
// }

// const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
//     setTitle(e.currentTarget.value)
// }
//
// const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
//     setError(null);
//     if (e.charCode === 13) {
//         addTask();
//     }
// }

// <div>
//     <input value={title}
//            onChange={onChangeHandler}
//            onKeyPress={onKeyPressHandler}
//            className={error ? "error" : ""}
//     />
//     <button onClick={addTask}>+</button>
//     {error && <div className="error-message">{error}</div>}
// </div>