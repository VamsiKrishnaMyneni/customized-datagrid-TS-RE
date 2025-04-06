## Running Application

# Prerequisites

Before running the application, ensure you have:

Node.js installed (Download from Node.js official site) 
Node version 22.12.0(goood to have)

npm (comes with Node.js)
npm version 10.9.0(goood to have)

A code editor (e.g., Visual Studio Code)

# Steps to Run the App

1. Clone the Repository

If the React project is hosted on a repository (e.g., GitHub), clone it using:

git clone [<repository-url>](https://github.com/VamsiKrishnaMyneni/products-comparison.git)
 
2. Navigate to the Project Directory

Move into the cloned project folder:
cd products-comparison

3. Install Dependencies

Run the following command to install required dependencies:

npm install
  
4. Start the Development Server

Run the app in development mode:

npm start

This will launch the app at http://localhost:3000/.
 
5. Running Tests (If Applicable)

To execute test cases in the project:

npm test
  
6. Running Tests coverage (If Applicable)

To execute test coverage in the project:

npm run test:coverage
  



Here is the documentation for the `DataGrid` component with a clear structure using tables, headers, and bullets:

---

# `DataGrid` Component Documentation

## Overview
The `DataGrid` is a flexible and customizable table component for rendering tabular data in React. It provides support for sorting, custom cell rendering, and dynamic styling, among other features. It is highly reusable and can handle data updates and user interactions seamlessly.

---

## Table of Contents
- [Props](#props)
  - [Column Interface](#column-interface)
  - [DataGridProps Interface](#datagridprops-interface)
- [Features](#features)
  - [Sorting](#sorting)
  - [Dynamic Data Rendering](#dynamic-data-rendering)
  - [Custom Cell Styles](#custom-cell-styles)
  - [Row Click Handler](#row-click-handler)
  - [Table Responsiveness](#table-responsiveness)
- [Usage Example](#usage-example)
- [Customization](#customization)
  - [Column Width](#column-width)
  - [Cell Rendering](#cell-rendering)
  - [Sorting Customization](#sorting-customization)
- [Performance and Optimization](#performance-and-optimization)

---

## Props

### `Column` Interface

The `Column` interface defines the structure of each column in the grid. It supports customizable behavior such as sorting and rendering.

| Field     | Type                 | Description                                         |
|-----------|----------------------|-----------------------------------------------------|
| `key`     | `string`             | A unique identifier for the column. Used for accessing data and sorting. |
| `label`   | `string`             | The display name for the column header. |
| `width`   | `number` (optional)  | The width of the column in pixels. Defaults to `200` if not provided. |
| `sort`    | `boolean` (optional) | Indicates if the column is sortable. Defaults to `false` if not provided. |
| `render`  | `(row: T, value: any) => React.ReactNode` (optional) | A custom render function to format the cell content. |

### `DataGridProps` Interface

The `DataGridProps` interface defines the overall structure of the `DataGrid` component.

| Field         | Type                    | Description                                                                 |
|---------------|-------------------------|-----------------------------------------------------------------------------|
| `columns`     | `Column<T>[]`            | An array of `Column` objects defining the columns for the table.            |
| `data`        | `T[]`                    | The data to be displayed in the table, where `T` is a generic type for row data. |
| `height`      | `number` (optional)      | The height of the table in pixels. Defaults to `400`.                        |
| `onRowClick`  | `(row: T) => void` (optional) | A callback function triggered when a row is clicked.                         |
| `cellStyles`  | `(key: string, value: any, category: string) => React.CSSProperties` (optional) | A function to apply custom styles to individual cells. |

---

## Features

### Sorting

- Columns marked with `sort: true` can be clicked to sort the data.
- Sorting alternates between ascending and descending order when clicked.
- The current sorting state is tracked using `sortConfig`, which includes the `key` (column name) and `direction` (`asc` or `desc`).
  
### Dynamic Data Rendering

- The table dynamically renders data based on the provided `columns` and `data`.
- Each row is rendered based on the values from the `data` array, with each cell displaying the corresponding value or using a custom `render` function if provided.

### Custom Cell Styles

- The `cellStyles` prop allows users to define custom styles for each cell.
- The `cellStyles` function receives three arguments: the column key, the cell value, and the category (optional).
  
### Row Click Handler

- The `onRowClick` prop provides a callback that is triggered when a row is clicked.
- It passes the entire row data to the callback function for further handling.

### Table Responsiveness

- The table adjusts its width based on the sum of individual column widths.
- By default, the height of the table is `400px`, but it can be customized via the `height` prop.

---

## Usage Example

```tsx
<DataGrid
  columns={[
    { key: 'name', label: 'Name', width: 150, sort: true },
    { key: 'age', label: 'Age', width: 100, sort: true },
    { key: 'email', label: 'Email', width: 200 },
  ]}
  data={[
    { name: 'John Doe', age: 30, email: 'john@example.com' },
    { name: 'Jane Smith', age: 25, email: 'jane@example.com' },
  ]}
  height={500}
  onRowClick={(row) => console.log(row)}
  cellStyles={(key, value) => ({
    color: value === 'John Doe' ? 'blue' : 'black'
  })}
/>
```

In the example:
- The table will render three columns: "Name", "Age", and "Email".
- The "Name" and "Age" columns are sortable.
- Clicking a row will log the row data.
- Custom styling is applied to the "Name" column where `John Doe` will appear in blue text.

---

## Customization

### Column Width

- Column widths are defined in the `columns` array using the `width` property.
- If no width is provided, a default of `200px` is used for that column.

### Cell Rendering

- The `render` function allows custom formatting of cell content.
- Example: Formatting a date or currency value can be done through the `render` function for that specific column.

### Sorting Customization

- Sorting is performed based on the column's `key`.
- Custom sorting logic can be implemented by passing a custom sorting function to the `Column` interface if needed.

---

## Performance and Optimization

### Virtualization
For large datasets, consider using a virtualization technique to only render visible rows (e.g., `react-window` or `react-virtualized`).

### Sorting Optimization
Currently, sorting involves a full array re-sort, which may impact performance for very large datasets. Optimizations like memoization or lazy loading can improve performance.

### Re-rendering Optimization
To avoid unnecessary re-renders, ensure that data updates are minimal, and consider using React's `memo` or `useMemo` hooks to prevent re-sorting when data hasn't changed.

--- 

This documentation covers the key aspects of the `DataGrid` component. It should provide enough information to understand, implement, and customize the component in your React projects.
 
