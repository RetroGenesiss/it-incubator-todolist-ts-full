import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import AddItemForm, {AddItemFormPropsType} from "./AddItemForm";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,
    tags: ['autodocs'],
    argTypes: {
        addItem: {
            description: 'Button clicked inside the form',
            //action: 'clicked'
        }
    },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;


export const AddItemFormStory: Story = {
    args: {
        addItem: action('Button clicked inside the form')
    }
};

export const AddItemFormWitchErrorStory = (args: AddItemFormPropsType) => {

        let [title, setTitle] = useState("")
        let [error, setError] = useState<string | null>("Title is required")

        const addTask = () => {
            if (title.trim() !== "") {
                args.addItem(title);
                setTitle("");
            } else {
                setError("Title is required");
            }
        }

        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value)
        }

        const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            if (error !== null) {
                setError(null)
            }
            if (e.charCode === 13) {
                addTask();
            }
        }

        const buttonSettings = {
            maxWidth: '38px',
            maxHeight: '38px',
            minWidth: '38px',
            minHeight: '38px',
            backgroundColor: 'darkmagenta'
        }

        return (
            <div>
                <TextField
                    value={title}
                    id="outlined-basic"
                    label={error ? "Title is required" : "Please type out..."}
                    variant="outlined"
                    size='small'
                    color={"secondary"}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    error={!!error}
                />
                <Button
                    variant={"contained"}
                    size={"small"}
                    style={buttonSettings}
                    onClick={addTask}>+</Button>
            </div>
        );
}

