import type {Meta, StoryObj} from '@storybook/react';
import React from "react";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import App from './App';

const meta: Meta<typeof App> = {
    title: 'TODOLISTS/App',
    component: App,
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof App>;


export const AppWithReduxStory: Story = {
    render: () => <App/>
};
