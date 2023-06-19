import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import EditableSpan from "./EditableSpan";

const meta: Meta<typeof EditableSpan> = {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
    tags: ['autodocs'],
    args: {
        oldTitle: 'hello',
        callBack: action('callBack')
    },
    argTypes: {}
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;


export const EditableSpanStory: Story = {
    args: {}
};