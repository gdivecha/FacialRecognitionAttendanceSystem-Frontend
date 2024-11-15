import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Paper, Typography, Divider } from "@mui/material";
import { useState } from 'react';

interface Record {
    id: number;
    firstName: string;
    lastName: string;
    studentID: string;
    timestamp: string;
}

const paginationModel = { page: 0, pageSize: 5 };

const initialRecords: Record[] = [
    { id: 1, firstName: "Mohammad Al-Shalabi", lastName: "Al-Shalabi", studentID: "501036783", timestamp: "2024-01-01T08:00:00Z" },
    { id: 2, firstName: "Mohammad Al-Shalabi", lastName: "Al-Shalabi", studentID: "501036783", timestamp: "2023-29-12T08:00:00Z" },
    { id: 3, firstName: "Mohammad Al-Shalabi", lastName: "Al-Shalabi", studentID: "501036783", timestamp: "2023-22-12T08:00:00Z" },
    { id: 4, firstName: "Abdul", lastName: "Wasay", studentID: "501067290", timestamp: "2023-22-12T08:04:00Z" }
];

function Records() {
    const [records, setRecords] = useState<Record[]>(initialRecords);

    const columns: GridColDef[] = [
        { field: 'firstName', headerName: 'First Name', flex: 1, minWidth: 150 },
        { field: 'lastName', headerName: 'Last Name', flex: 1, minWidth: 150 },
        { field: 'studentID', headerName: 'Student ID', flex: 1, minWidth: 120 },
        { field: 'timestamp', headerName: 'Timestamp', flex: 1, minWidth: 180 },
    ];

    return (
        <Paper sx={{ p: 2, width: '100%' }}>
            <Typography variant="h5" fontWeight={1000} gutterBottom>
                Records & Logs 
            </Typography>
            <Typography variant="body1" gutterBottom>
                Track your students' attendance records and logs here
            </Typography>
            <Divider sx={{ my: 2 }} />
            <DataGrid
                rows={records}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10, 20, 50]}
                sx={{ border: 0 }}
                hideFooterSelectedRowCount={true}
            />
        </Paper>
    );
}

export default Records;