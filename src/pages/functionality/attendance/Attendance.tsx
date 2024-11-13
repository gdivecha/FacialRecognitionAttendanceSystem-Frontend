import { Paper, Typography } from "@mui/material";

function Attendance() {

    return (
        <Paper sx={{ p: 2, width: '100%' }}>
            <Typography variant="h5" fontWeight={1000} gutterBottom>
                Attendance Tracking 
            </Typography>
            <Typography variant="body1" gutterBottom>
                Record attendance for your students here by capturing live snapshots of their faces
            </Typography>

        </Paper>
    );
}

export default Attendance;