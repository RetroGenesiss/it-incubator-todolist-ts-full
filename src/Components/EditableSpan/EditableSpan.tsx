import React, {ChangeEvent, memo, useState} from 'react';

type PropsType = {
    oldTitle: string
    callBack: (title: string) => void
}

const EditableSpan = memo((props: PropsType) => {
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const editHandler = () => {
        setEdit(!edit) // верни мне не edit
        props.callBack(newTitle)
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
});

export default EditableSpan;