import { Box, Divider, Grid, Paper, TextField, Typography } from "@mui/material";
import WebcamCapture from "../../../components/WebcamCapture";
import { useState } from "react";

function Attendance() {
  const [studentID, setStudentID] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [isStudentIDValid, setIsStudentIDValid] = useState(false);

  const handleStudentIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const isValid = /^\d{9}$/.test(input); // Check if it's a 9-digit number
    setStudentID(input);
    setIsStudentIDValid(isValid);
  };

  const resetFields = () => {
    setStudentID('');
    setCourseCode('');
    setIsStudentIDValid(false);
  };

  return (
    <Paper sx={{ p: 2, width: '100%' }}>
      <Typography variant="h5" fontWeight={1000} gutterBottom>
        Attendance Tracking 
      </Typography>
      <Typography variant="body1" gutterBottom>
        Record attendance for your students here by capturing live snapshots of their faces
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Box mb={4} p={2} sx={{ backgroundColor: '#f9f9f9', borderRadius: '8px', width: '100%' }}>
        <Typography variant="h6" fontWeight="bold" mb={1}>
          How to Record Attendance
        </Typography>
        <Typography variant="body1" color="textSecondary" mb={1}>
          Follow the steps below to successfully record attendance for a student:
        </Typography>
        <ol style={{ marginLeft: '20px' }}>
          <li>Enter the <strong>Student Number</strong> (must be a 9-digit number).</li>
          <li>Enter the <strong>Course Code</strong>.</li>
          <li>Ensure the student is visible in the live video feed with proper lighting.</li>
          <li>Click <strong>Capture Photo</strong> to take a snapshot.</li>
          <li>Click <strong>Process Photo</strong> to validate and record attendance.</li>
        </ol>
      </Box>

      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Student Number" 
              variant="outlined" 
              value={studentID}
              fullWidth 
              onChange={handleStudentIDChange}
              error={!isStudentIDValid && studentID.length > 0}
              helperText={!isStudentIDValid && studentID.length > 0 ? "Student Number must be a 9-digit number" : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Course Code" 
              variant="outlined" 
              value={courseCode}
              fullWidth 
              onChange={(e) => setCourseCode(e.target.value)}
            />
          </Grid>
        </Grid>
      </form>
      <WebcamCapture
        studentID={studentID}
        courseCode={courseCode}
        resetFields={resetFields}
        isStudentIDValid={isStudentIDValid} // Pass validation status to child
      />
    </Paper>
  );
}

export default Attendance;