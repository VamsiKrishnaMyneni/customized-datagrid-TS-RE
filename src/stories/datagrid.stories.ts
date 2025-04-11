import type { Meta, StoryObj } from '@storybook/react';

import DataGrid, { Column } from '../datagrid';
import { fn } from '@storybook/test';

// Example type for the row data
type User = {
    id: number;
    name: string;
    email: string;
    age: number;
    role: string;
    category?: string;
};
const mockData: User[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com', age: 28, role: 'Admin', category: 'A' },
    { id: 2, name: 'Bob', email: 'bob@example.com', age: 34, role: 'Editor', category: 'B' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', age: 22, role: 'Viewer', category: 'A' },
];

const columns: Column<User>[] = [
    { key: 'name', label: 'Name', sort: true },
    { key: 'email', label: 'Email' },
    { key: 'age', label: 'Age', sort: true },
    { key: 'role', label: 'Role' },
];


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Example/datagrid',
    component: DataGrid,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {

    },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: {
        onRowClick: fn()
    },
} satisfies Meta<typeof DataGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Grid: Story = {
    args: {
        data: mockData,
        columns: columns as Column<Record<string, any>>[],
        height: 400,
        cellStyles: (key: string, value: any, category: string) => ({})
    },
};
