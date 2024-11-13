import { Paper, Typography } from "@mui/material";

function Records() {

    return (
        <Paper sx={{ p: 2, width: '100%' }}>
            <Typography variant="h5" fontWeight={1000} gutterBottom>
                Records & Logs 
            </Typography>
            <Typography variant="body1" gutterBottom>
                Track your students' attendance records and logs here
            </Typography>

        </Paper>
    );
}

export default Records;