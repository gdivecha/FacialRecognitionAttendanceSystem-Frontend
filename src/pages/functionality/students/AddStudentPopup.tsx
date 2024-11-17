import Button from '@mui/material/Button';
import { Alert, Modal, Paper, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Student } from './Students';

interface AddStudentPopupProps {
  onAddStudent: (newStudent: Student) => void;
}

function AddStudentPopup(props: AddStudentPopupProps) {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [studentID, setStudentID] = useState('');
  const [isStudentIDValid, setIsStudentIDValid] = useState(true); // New state for validation
  const [email, setEmail] = useState('');
  const [courseCode, setCourseCode] = useState('');

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleStudentIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const isValid = /^\d{9}$/.test(input); // Check if it's a 9-digit number
    setStudentID(input);
    setIsStudentIDValid(isValid); // Update validation state
  };

  const addNewStudent = () => {
    if (courseCode && studentID && firstName && lastName && email && isStudentIDValid) {
      props.onAddStudent({
        course: courseCode,
        id: studentID,
        firstName: firstName,
        lastName: lastName,
        email: email,
      });
      setOpen(false);
    }
  };

  useEffect(() => {
    if (!open) {
      setFirstName('');
      setLastName('');
      setStudentID('');
      setEmail('');
      setCourseCode('');
      setIsStudentIDValid(true); // Reset validation on close
    }
  }, [open]);

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Add New Student
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Paper sx={{ p: 2, width: '50%', maxWidth: '500px' }}>
          <Typography variant="h5" fontWeight={1000} gutterBottom>
            Add New Student
          </Typography>
          <Typography variant="body1" gutterBottom>
            Please fill in the following information to add the student to your database
          </Typography>
          <form>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <TextField
              label="Student ID"
              variant="outlined"
              fullWidth
              margin="normal"
              value={studentID}
              onChange={handleStudentIDChange} // Update the handler
              error={!isStudentIDValid} // Show error if invalid
              helperText={!isStudentIDValid && "Student ID must be a 9-digit number"} // Error message
              required
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Course Code"
              variant="outlined"
              fullWidth
              margin="normal"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              required
            />
            <Alert
              style={{ marginTop: '1rem', marginBottom: '1.5rem' }}
              severity="info"
            >
              Please be aware that you will be able to add their images separately once you add their basic information here.
            </Alert>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={addNewStudent}
              type="button"
              disabled={!isStudentIDValid} // Disable button if ID is invalid
            >
              ADD STUDENT
            </Button>
          </form>
        </Paper>
      </Modal>
    </div>
  );
}

export default AddStudentPopup;