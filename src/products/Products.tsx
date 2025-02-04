import useProductsFetch from './useProductsFetch';
import './products.css'
import DataGrid from '../datagrid';
import { useState } from 'react';

function Products() {
    const { data, loading, error } = useProductsFetch();
    const [selectedRows, setSelectedRows] = useState<any[]>([]);


    const handleRowSelect = (row: any) => {
        setSelectedRows((prevSelectedRows) => {
            if (prevSelectedRows.find((selectedRow) => selectedRow.id === row.id)) {
                return prevSelectedRows.filter((selectedRow) => selectedRow.id !== row.id);
            } else {
                return [...prevSelectedRows, row];
            }
        });
    };

    const getValue = (row: any, key: any) => {
        return key.split(".").reduce((acc: any, val: any) => acc[val], row) || null;
    };
    // Get the difference in values between selected rows for comparison
    const getComparisonDifference = (columnKey: string) => {
        if (selectedRows.length < 2) return;

        const values = selectedRows.map((row: any) => getValue(row, columnKey));
        const min = Math.min(...values);
        const max = Math.max(...values);

        return (min && max) ? { min, max } : {};
    };

    const getCellStyle = (columnKey: string, value: any) => {
        if (selectedRows.length < 2) return {};

        const differences = getComparisonDifference(columnKey);
        if (!differences) return {};

        // Color the cells based on the difference
        const isHigher = value === differences.max;
        const isLower = value === differences.min;

        return {
            backgroundColor: isHigher ? "lightgreen" : isLower ? "lightcoral" : "",
            fontWeight: isHigher || isLower ? "bold" : "normal",
        };
    };



    // Usage example
    const columns = [
        {
            label: "", key: "", width: 10, render: (rowData: any) => {
                return <input type="checkbox" className='product-select' onChange={() => handleRowSelect(rowData)} />
            }
        },
        {
            label: "Image", key: "image", width: 40, render: (rowData: any) => {
                return <img src={rowData.image} alt={rowData.title} className="product-image" />
            }
        },
        { label: "Title", key: "title", width: 180, render: (rowData: any) => <div className="product-title" title={rowData.title}>{rowData.title}</div> },
        { label: "Price", key: "price", width: 40, sort: true },
        {
            label: "Rating", key: "rating.rate", width: 70, sort: true, render: (rowData: any) => <><div className="star-rating" style={{ "--rating": `${rowData.rating.rate}` } as React.CSSProperties} aria-label="Rating of this product is 2.3 out of 5."></div>
                <div className='ratings-count'>{rowData.rating.count} ratings</div></>
        },
        {
            label: "Description", key: "description", width: 200, render: (rowData: any) => <div className="product-description" title={rowData.description}>
                {rowData.description.length > 100 ? `${rowData.description.slice(0, 100)}...` : rowData.description} </div>
        },
        { label: "Category", key: "category", width: 80 }
    ];


    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <><h2>{error}</h2>
                <button className='btn-refresh' onClick={() => window.location.reload()}>Try again</button></>}
            {!loading && !error && data.length === 0 && <p>No products found.</p>}

            {data && data.length > 0 && (
                <div className='products-container'>
                    <h2>Products Comparison</h2>
                    <DataGrid data={data} columns={columns} cellStyles={getCellStyle} />
                </div>
            )}
        </>
    )
}
export default Products;
