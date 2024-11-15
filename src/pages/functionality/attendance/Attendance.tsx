import { Box, Divider, Grid, Paper, TextField, Typography } from "@mui/material";
import WebcamCapture from "../../../components/WebcamCapture";

function Attendance() {

    return (
        <Paper sx={{ p: 2, width: '100%' }}>
            <Typography variant="h5" fontWeight={1000} gutterBottom>
                Attendance Tracking 
            </Typography>
            <Typography variant="body1" gutterBottom>
                Record attendance for your students here by capturing live snapshots of their faces
            </Typography>
            <Divider sx={{ my: 2 }} />
            <form>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            label="Student Number" 
                            variant="outlined" 
                            // value={firstName}
                            fullWidth 
                            // onChange={(e) => { setFirstName(e.target.value)}}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            label="Course Code" 
                            variant="outlined" 
                            // value={lastname}
                            fullWidth 
                            // onChange={(e) => { setLastName(e.target.value)}}
                        />
                    </Grid>
                </Grid>
            </form>
            <WebcamCapture />
        </Paper>
    );
}

export default Attendance;