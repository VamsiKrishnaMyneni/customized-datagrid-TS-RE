import { useEffect, useState } from 'react'
import './datagrid.css'

interface datagridProps {
    columns: any[],
    data: any[],
    height?: number,
    onRowClick?: (row: any) => {}
}

function Datagrid(props: datagridProps) {
    const {
        columns = [],
        data = [],
        height = 400,
        onRowClick
    } = props
    const [tableData, setTableData] = useState(data || []);

    useEffect(() => {
        setTableData(tableData)
    }, [])


    const getValue = (row: any, key: any) => {
        return key.split(".").reduce((acc: any, val: any) => acc[val], row) || "-";
    };

    return (
        <div id="datagrid-container" className="table-container" style={{ height: `${height}px` }}>
            <table className="table" style={{ width: `max(100%, ${columns.reduce((acc, col) => acc + (col.width || 200), 0)}px)` }}>
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key} style={{ width: col.width || 200 }}>
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {tableData.length > 0 ? (
                        tableData.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className={rowIndex % 2 === 0 ? "bg-white" : "bg-neutral-50"}
                                onClick={() => onRowClick && onRowClick(row)}
                            >
                                {columns.map((col) => (
                                    <td key={col.key}>
                                        {col.render ? col.render(row, getValue(row, col.key)) : getValue(row, col.key)}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="no-data">
                                No rows to display
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Datagrid
