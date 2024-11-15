import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, Button, Paper, Typography } from "@mui/material";
import { students } from '../../../configurations/StudentsConfigs';
import Divider from '@mui/material/Divider';
import AddStudentPopup from './AddStudentPopup';
import { useState } from 'react';
import ViewImagesPopup from './ViewImagesPopup';

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

  const columnMetadata: GridColDef[] = [
      { field: 'course', headerName: 'Course Code', width: 130 },
      { field: 'id', headerName: 'Student ID', width: 130 },
      { field: 'firstName', headerName: 'First name', width: 150 },
      { field: 'lastName', headerName: 'Last name', width: 150 },
      { field: 'email', headerName: 'Email', width: 250 },
      { 
        field: 'photos', 
        headerName: 'Photos', 
        width: 90, 
        renderCell: (params: GridRenderCellParams) => (
            <ViewImagesPopup 
              course={params.row.course}
              fullName={`${params.row.firstName} ${params.row.lastName}`} 
              studentID={params.row.id}
              email={params.row.email}
            />
        ),
      },
      { 
        field: 'actions', 
        headerName: 'Actions', 
        width: 110, 
        renderCell: (params: GridRenderCellParams) => (
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        ),
      }
  ];

  const handleAddStudent = (newStudent: Student) => {
      setStudentsConfigs([...studentsConfigs, newStudent]);
  };
  
  const handleDelete = (id: string) => {
      setStudentsConfigs((prevConfigs) =>
        prevConfigs.filter((student) => student.id !== id)
      );
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
              sx={{ border: 0 }}
              hideFooterSelectedRowCount={true}
          />
      </Paper>
  );
}

export default Students;