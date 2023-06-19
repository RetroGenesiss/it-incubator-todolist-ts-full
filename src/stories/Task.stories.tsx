import type {Meta, StoryObj} from '@storybook/react';
import React from "react";
import {Task} from "./Task";
import {ReduxStoreProviderDecorator} from "../../../../app/ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootState} from "../../../../app/store";

const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof Task>;

const NewTask = () => {
    const taskCopy = useSelector<AppRootState>(state => state.tasks['todolistId1'][0])
    // @ts-ignore
    return <Task todolistId={'todolistId1'} task={taskCopy}/>
}

export const TaskWithReduxStory: Story = {
    render: () => <NewTask/>
};