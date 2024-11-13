import { DataGrid } from '@mui/x-data-grid';
import { Box, Paper, Typography } from "@mui/material";
import { columnMetadata, students } from '../../../configurations/StudentsConfigs';
import Divider from '@mui/material/Divider';
import AddStudentPopup from './AddStudentPopup';
import { useState } from 'react';

const paginationModel = { page: 0, pageSize: 5 };

export interface Student {
    course: string;
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    photos?: string; // Assuming photos is a URL or path, make it optional if not always provided
}

function Students() {

    const [studentsConfigs, setStudentsConfigs] = useState(students);

    const handleAddStudent = (newStudent: Student) => {
        setStudentsConfigs((prevConfigs) => [...prevConfigs, newStudent]);
    };

    return (
        <Paper sx={{ p: 2, width: '100%' }}>
            <Typography variant="h5" fontWeight={1000} gutterBottom>
                Student Management 
            </Typography>
            <Typography variant="body1" mb={'1rem'} gutterBottom>
                    Manage all your students and their information here 
            </Typography>
            <Divider />
            <Box display="flex" justifyContent="flex-start" mt='1.3rem' mb='1rem' >
                <AddStudentPopup onAddStudent={handleAddStudent}  /> 
            </Box>
            <DataGrid
                rows={studentsConfigs}
                columns={columnMetadata}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10, 20, 50]}
                checkboxSelection
                sx={{ border: 0 }}
            />
        </Paper>
    );
}

export default Students;