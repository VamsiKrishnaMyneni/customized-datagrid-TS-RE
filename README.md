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
  



# DataGrid Component Architecture

## Overview
The **DataGrid** component is a reusable table component in React that supports dynamic data rendering, sorting, and row click events. It is designed to be flexible, accepting customizable columns, row data, and styling.

## Props
The component accepts the following props:

| Prop Name   | Type                                  | Description |
|------------|--------------------------------------|-------------|
| `columns`   | `any[]` | An array defining the column structure (label, key, width, sorting, etc.). |
| `data`      | `any[]` | An array of data objects to be displayed in the table. |
| `height`    | `number?` | Optional table height (default: 400px). |
| `onRowClick` | `(row: any) => void` | Optional callback triggered when a row is clicked. |
| `cellStyles` | `(row: any, key: string, category: string) => {}` | Optional function for custom cell styling based on row data. |

## Component Structure

### 1. **State Management**
- `tableData`: Stores the table's current data (initially set to the `data` prop).
- `sortConfig`: Stores sorting configuration (`key` and `direction`).

### 2. **Lifecycle Methods**
- `useEffect(() => { setTableData(data); }, [data]);`
  - Updates `tableData` when the `data` prop changes.

### 3. **Data Rendering**
- Uses a `table` element to structure the grid.
- Iterates over `columns` to generate table headers (`thead > tr > th`).
- Iterates over `tableData` to render rows (`tbody > tr > td`).

### 4. **Sorting Mechanism**
- `handleSort(key: string)` is triggered when a column header is clicked.
- Toggles sorting order (`asc` ⇄ `desc`).
- Uses `Array.prototype.sort()` to update `tableData`.
- Displays sorting icons (`fa-sort-up`, `fa-sort-down`).

### 5. **Row Click Handling**
- Calls `onRowClick(row)` when a row is clicked (if `onRowClick` is provided).

### 6. **Custom Cell Rendering & Styling**
- `getValue(row, key)`: Retrieves nested values using dot notation.
- `col.render ? col.render(row, getValue(row, col.key)) : getValue(row, col.key)` allows custom rendering per column.
- Applies `cellStyles()` if provided.

## Features & Enhancements
✅ Dynamic data rendering  
✅ Clickable rows with callback support  
✅ Column-based sorting  
✅ Customizable cell rendering and styling  
✅ Responsive table layout  

## Potential Improvements
🔹 Add pagination support for large datasets  
🔹 Implement multi-column sorting  
🔹 Improve accessibility (ARIA attributes)  

## Usage Example
```tsx
<DataGrid
  columns={[
         { label: "Select", key: "id", width: 10, render: (rowData: any) => {
                return <input type="checkbox" onChange={() => handleRowSelect(rowData)} />
     }
    },
    { label: "Name", key: "name", sort: true },
    { label: "Age", key: "age", sort: true },
    { label: "Country", key: "address.country" },
  ]}
  data={[
    { name: "Alice", age: 30, address: { country: "USA" } },
    { name: "Bob", age: 25, address: { country: "UK" } },
  ]}
  height={500}
  onRowClick={(row) => console.log("Clicked Row:", row)}
  cellStyles={(key, value, category) => ({ color: key === "age" && value > 28 ? "red" : "black" })}
/>
```

## Conclusion
The **DataGrid** component is a versatile table that provides sorting, row interaction, and customizable styles. It can be further extended with pagination, filtering, and advanced accessibility features to enhance usability.



# Products Component Architecture

## Overview
The **Products** component is responsible for fetching, displaying, and enabling comparison of products using the **DataGrid** component. It allows users to select multiple products and compare values within the same category, highlighting the differences.

## Props
This component does not accept any props.

## State Management
The component maintains the following state variables:

| State Variable   | Type        | Description |
|-----------------|------------|-------------|
| `selectedRows`  | `any[]` | Stores the list of selected products for comparison. |

## Data Fetching
- Uses the `useProductsFetch` custom hook to fetch product data.
- The `useEffect` hook triggers `fetchData()` on component mount to fetch the initial product list.

## Component Structure
### 1. **Fetching Data**
- The `useProductsFetch` hook returns:
  - `data`: The fetched product list.
  - `loading`: A boolean indicating if data is being fetched.
  - `error`: An error message if the fetch fails.
  - `fetchData()`: A function to manually trigger a refetch.
- If `loading` is true, a loading message is displayed.
- If `error` is present, an error message with a retry button is shown.

### 2. **Product Selection for Comparison**
- The `handleRowSelect(row: any)` function updates `selectedRows`:
  - If a row is already selected, it is removed from `selectedRows`.
  - Otherwise, it is added to the selection.
- Users select products via checkboxes rendered in the first column.

### 3. **Comparison Logic**
- `getComparisonDifference(columnKey: string)`: Calculates the min and max values within each category for the selected products.
- `getCellStyle(columnKey: string, value: any, category: string)`: Applies background color styling to highlight the highest and lowest values in the selected rows.

### 4. **DataGrid Integration**
- The component defines `columns` for the **DataGrid**:
  - Includes an image, title, price, rating, description, and category.
  - The first column contains a checkbox for selection.
  - Some columns include custom renderers (e.g., star ratings, truncated descriptions).
- The `DataGrid` receives:
  - `data`: The fetched product data.
  - `columns`: The column configuration.
  - `cellStyles`: The styling function for comparison highlighting.

## Features & Enhancements
✅ Fetches product data dynamically  
✅ Displays product list in a table format  
✅ Allows multi-product selection for comparison  
✅ Highlights differences in numeric values  
✅ Handles loading and error states  

## Potential Improvements
🔹 Implement pagination for large datasets  
🔹 Allow multi-column sorting  
🔹 Improve accessibility with ARIA attributes  
🔹 Add filters to refine product selection  

## Usage Example
```tsx
<Products />
```

## Conclusion
The **Products** component seamlessly integrates with the **DataGrid** to display and compare products. It enhances user experience by allowing dynamic selection and highlighting significant differences in product attributes.

