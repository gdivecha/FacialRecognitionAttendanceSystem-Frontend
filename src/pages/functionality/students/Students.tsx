import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, Button, IconButton, Paper, Typography, useMediaQuery, Divider } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh'; // Import refresh icon
import AddStudentPopup from './AddStudentPopup';
import { useEffect, useState } from 'react';
import ViewImagesPopup from './ViewImagesPopup';
import backendApiClient from '../../../axios/backendApiClient';

const paginationModel = { page: 0, pageSize: 10 };

export interface Student {
    courseCode: string;
    studentID: string;
    firstName: string;
    lastName: string;
    email: string;
}

function Students() {
  const [students, setStudents] = useState([]);
  const isSmallScreen = useMediaQuery('(max-width:600px)'); // Check for smaller screens

  const columnMetadata: GridColDef[] = [
    { field: 'courseID', headerName: 'Course Code', flex: isSmallScreen ? 0.5 : 1, minWidth: 100 },
    { field: 'studentID', headerName: 'Student ID', flex: isSmallScreen ? 0.8 : 1, minWidth: 120 },
    { field: 'firstName', headerName: 'First name', flex: isSmallScreen ? 1 : 1.2, minWidth: 150 },
    { field: 'lastName', headerName: 'Last name', flex: isSmallScreen ? 1 : 1.2, minWidth: 150 },
    { field: 'email', headerName: 'Email', flex: isSmallScreen ? 1.5 : 2, minWidth: 200 },
    {
      field: 'photos',
      headerName: 'Photos',
      flex: 0.6,
      minWidth: 80,
      renderCell: (params: GridRenderCellParams) => (
        <ViewImagesPopup
          course={params.row.courseID}
          fullName={`${params.row.firstName} ${params.row.lastName}`}
          studentID={params.row.studentID}
          email={params.row.email}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.6,
      minWidth: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          variant="outlined"
          color="error"
          onClick={() => handleDelete(params.row.courseID, params.row.studentID)}
        >
          Delete
        </Button>
      ),
    },
  ];

  const handleAddStudent = async (newStudent: Student) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error("Auth token not found in localStorage");
        }

        const studentData = {
            ...newStudent,
            professorEmail: localStorage.getItem("profEmail"),
        };

        await backendApiClient.post("/api/student/addStudent", studentData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchStudents();
    } catch (error) {
        console.error("Error adding student:", error);
    }
  };

  const handleDelete = async (courseID: string, studentID: string) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error("Auth token not found in localStorage");
        }

        await backendApiClient.delete("/api/student/deleteStudent", {
            headers: { Authorization: `Bearer ${token}` },
            params: { courseCode: courseID, studentID: studentID },
        });
        fetchStudents();
    } catch (error: any) {
        console.error("Error deleting student:", error.response?.data || error.message);
    }
  };

  const fetchStudents = async () => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error("Auth token not found in localStorage");
        }
        const response = await backendApiClient.get("/api/student/getAllStudents", {
            headers: { Authorization: `Bearer ${token}` },
            params: { professorEmail: localStorage.getItem("profEmail") },
        });
        const recordsWithId = response.data.map((record: any, index: number) => ({
            ...record,
            id: index + 1,
        }));
        setStudents(recordsWithId);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <Paper sx={{ p: 2, width: '100%' }}>
      <Typography variant="h5" fontWeight={1000} gutterBottom>
        Student Management
      </Typography>
      <Typography variant="body1" mb={'1rem'} gutterBottom>
        Manage all your students and their information here
      </Typography>
      <Divider />
      <Box display="flex" justifyContent="flex-start" alignItems="center" mt="1.3rem" mb="1rem">
        <IconButton
          color="primary"
          onClick={fetchStudents}
          sx={{
            border: '1px solid #1876D2',
            borderRadius: '5px',
            padding: '5px',
          }}
        >
          <RefreshIcon />
        </IconButton>
        <Box ml={2}>
          <AddStudentPopup onAddStudent={handleAddStudent} />
        </Box>
      </Box>
      {students.length === 0 ? (
            <Typography sx={{ p: 2, textAlign: "center" }} variant="body1">
                No students found.
            </Typography>
        ) : (
            <DataGrid
              rows={students}
              columns={columnMetadata}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[10, 20, 50]}
              sx={{ border: 0 }}
              hideFooterSelectedRowCount={true}
            />
        )
      }
    </Paper>
  );
}

export default Students;