import { GridColDef } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";

export const columnMetadata: GridColDef[] = [
    { field: 'course', headerName: 'Course Code', width: 120},
    { field: 'id', headerName: 'Student ID' },
    { field: 'firstName', headerName: 'First name' },
    { field: 'lastName', headerName: 'Last name' },
    { field: 'email', headerName: 'Email', width: 250 },
    { 
        field: 'photos', 
        headerName: 'Photos', 
        width: 100, 
        renderCell: () => (
            <Button variant="outlined" fullWidth>VIEW</Button>
        ),
    },
    { 
        field: 'actions', 
        headerName: 'Actions', 
        width: 200, 
        renderCell: () => (
            <Box>
                <Button variant="outlined" color="error" >DELETE</Button>
                <Button variant="outlined" sx={{ ml: 2.4 }} color="secondary" >EDIT</Button>                
            </Box>
        ),
    }
];

export const students = [
    { course: 'CPS 843', id: '501034331', lastName: 'Divecha', firstName: 'Gaurav', email: 'gdivecha@torontomu.ca' },
    { course: 'CPS 843', id: '501112339', lastName: 'Wasay', firstName: 'Abdul', email: 'wasay.adil@torontomu.ca' },
    { course: 'CPS 843', id: '501026067', lastName: 'Al-Shalabi', firstName: 'Mohammad', email: 'malshalabi@torontomu.ca' },
    { course: 'CPS 843', id: '500967855', lastName: 'Singh', firstName: 'Jessica', email: 'j16singh@torontomu.ca' },
];