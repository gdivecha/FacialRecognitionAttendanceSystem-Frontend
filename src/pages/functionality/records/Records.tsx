import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Paper, Typography, Divider, IconButton, Box } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh'; // Import the refresh icon
import { useEffect, useState } from 'react';
import backendApiClient from "../../../axios/backendApiClient";

interface Record {
    id: number;
    firstName: string;
    lastName: string;
    studentID: string;
    courseCode: string;
    timestamp: string; // ISO string from backend
}

const paginationModel = { page: 0, pageSize: 10 };

function Records() {
    const [records, setRecords] = useState<Record[]>([]);

    const formatTimestamp = (timestamp: string) => {
        if (!timestamp) return "N/A";
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
        };
        return new Intl.DateTimeFormat('en-US', options).format(new Date(timestamp));
    };

    const columns: GridColDef[] = [
        { field: 'courseCode', headerName: 'Course Code', flex: 1, minWidth: 100 },
        { field: 'studentID', headerName: 'Student ID', flex: 1, minWidth: 100 },
        { field: 'firstName', headerName: 'First Name', flex: 1, minWidth: 120 },
        { field: 'lastName', headerName: 'Last Name', flex: 1, minWidth: 120 },
        {
            field: 'timestamp',
            headerName: 'Timestamp',
            flex: 1,
            minWidth: 200,
            renderCell: (params) => <span>{formatTimestamp(params.row.timeStamp)}</span>, // Format here
        },
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
            <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", mb: 2 }}>
                <IconButton
                    color="primary"
                    onClick={fetchRecords}
                    sx={{
                        border: '1px solid #1876D2',
                        borderRadius: '5px',
                        padding: '5px',
                    }}
                >
                    <RefreshIcon />
                </IconButton>
            </Box>
            {records.length === 0 ? (
                <Typography sx={{ p: 2, textAlign: "center" }} variant="body1">
                    No records found.
                </Typography>
            ) : (
                <DataGrid
                    rows={records}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[10, 20, 50]}
                    sx={{ border: 0 }}
                    hideFooterSelectedRowCount={true}
                />
            )}
        </Paper>
    );
}

export default Records;