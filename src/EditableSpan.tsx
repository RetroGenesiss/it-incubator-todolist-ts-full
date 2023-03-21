import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    oldTitle: string
    callBack: (title: string) => void
}

const EditableSpan = (props: PropsType) => {
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(props.oldTitle)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const addTask = () => {
        props.callBack(newTitle)
    }

    const editHandler = () => {
        setEdit(!edit) // верни мне не edit
        addTask()
    }

    return (
        // скобки не требует, так как нет div
        edit
            ? <input value={newTitle}
                     onBlur={editHandler}
                     onChange={onChangeHandler}
                     autoFocus
            />
            : <span onDoubleClick={editHandler}>{props.oldTitle}</span>
    );
};

export default EditableSpan;