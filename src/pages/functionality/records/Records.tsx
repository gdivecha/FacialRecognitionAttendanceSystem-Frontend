import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Paper, Typography, Divider } from "@mui/material";
import { useEffect, useState } from 'react';
import backendApiClient from "../../../axios/backendApiClient";

interface Record {
    id: number;
    firstName: string;
    lastName: string;
    studentID: string;
    timestamp: string;
}

const paginationModel = { page: 0, pageSize: 5 };

function Records() {
    const [records, setRecords] = useState<Record[]>([]);

    const columns: GridColDef[] = [
        { field: 'courseCode', headerName: 'Course Code', flex: 1, minWidth: 150 },
        { field: 'studentID', headerName: 'Student ID', flex: 1, minWidth: 120 },
        { field: 'firstName', headerName: 'First Name', flex: 1, minWidth: 150 },
        { field: 'lastName', headerName: 'Last Name', flex: 1, minWidth: 150 },
        { field: 'timeStamp', headerName: 'Timestamp', flex: 1, minWidth: 180 },
    ];

    const fetchRecords = async () => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                throw new Error("Auth token not found in localStorage");
            }
            const response = await backendApiClient.get("/api/attendance/getRecords", {
                headers: {
                    Authorization: `Bearer ${token}`, // Use the retrieved token
                },
                params: { professorEmail: localStorage.getItem("profEmail") },
            });
            const recordsWithId = response.data.map((record: any, index: number) => ({
                ...record,
                id: index + 1,
            }));
            setRecords(recordsWithId);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

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