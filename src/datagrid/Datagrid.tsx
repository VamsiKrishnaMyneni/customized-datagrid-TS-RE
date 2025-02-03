import React, { useEffect } from 'react'
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

    useEffect(() => {
        render();
    })

    const getValue = (row: any, key: string) => {
        const keyArr = key.split('.');
        return keyArr.reduce((acc, val) => acc[val], row) || '-';
    }
    const render = () => {
        const container = document.getElementById("datagrid-container")!;
        const tableContainer = document.createElement("div");
        tableContainer.className = "table-container";
        tableContainer.style.height = `${height.toString()}px`;

        const table = document.createElement("table");
        table.className = "table";
        table.style.width = `max(100%, ${columns.reduce(
            (acc, col) => acc + (col.width || 200),
            0
        )}px)`;

        // Create table header
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        columns.forEach((col) => {
            const th = document.createElement("th");
            th.style.width = `${col.width || 200}px`;
            th.textContent = col.label;
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create table body
        const tbody = document.createElement("tbody");

        if (data.length > 0) {
            data.forEach((row, rowIndex) => {
                const tr = document.createElement("tr");
                tr.className = rowIndex % 2 === 0 ? "bg-white" : "bg-neutral-50";
                tr.addEventListener("click", () => {
                    if (onRowClick) onRowClick(row);
                });

                columns.forEach((col) => {
                    const td = document.createElement("td");
                    const cellData = getValue(row, col.key) || "-";

                    td.innerHTML = col.render ? col.render(cellData, row) || "-" : cellData;
                    tr.appendChild(td);
                });

                tbody.appendChild(tr);
            });
        } else {
            const noDataRow = document.createElement("tr");
            const noDataCell = document.createElement("td");
            noDataCell.colSpan = columns.length;
            noDataCell.className = "no-data";
            noDataCell.textContent = "No rows to display";
            noDataRow.appendChild(noDataCell);
            tbody.appendChild(noDataRow);
        }

        table.appendChild(tbody);
        tableContainer.appendChild(table);
        container.innerHTML = "";
        container.appendChild(tableContainer);
    }
    return (
        <div id="datagrid-container"></div>
    )
}

export default Datagrid
