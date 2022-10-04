import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'name', headerName: '商品名', width: 300 },
    { field: 'size', headerName: 'サイズ', width: 130 },
    { field: 'color', headerName: 'カラー', width: 130 },
    {
        field: 'amount',
        headerName: '数',
        type: 'number',
        width: 90,
    },
    {
        field: 'price',
        headerName: '金額',
        type: 'number',
        width: 120,
    },
];

const rows = [
    {
        id: '0',
        name: 'SKIRT [BLACK] 鳥籠 ❖ 囚',
        size: "M",
        color: "Black",
        amount: 1,
        price: 22000
    },
    {
        id: '1',
        name: 'SKIRT [BLACK] 鳥籠 ❖ 囚',
        size: "L",
        color: "Black",
        amount: 1,
        price: 22000
    },
    {
        id: '2',
        name: 'SKIRT [BLACK] 鳥籠 ❖ 囚',
        size: "S",
        color: "While",
        amount: 1,
        price: 22000
    },
];

export default function DataTable() {
    return (
        <div style={{ height: 600, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    );
}