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
  const [email, setEmail] = useState('');
  const [courseCode, setCourseCode] = useState('');

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  function addNewStudent() {
    props.onAddStudent({
      course: courseCode,
      id: studentID,
      firstName: firstName,
      lastName: lastName,
      email: email,
      // photos?: '',
    });
    setOpen(false);
  }

  useEffect(() => {
    if(!open) {
      setFirstName('');
      setLastName('');
      setStudentID('');
      setEmail('');
      setCourseCode('');
    }
  }, [open])

  return (
    <div>
      <Button variant='contained' onClick={handleOpen}> Add New Student</Button>
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
                  type="firstName"
                  autoComplete='firstName'
                  value={firstName}
                  onChange={(e) => { setFirstName(e.target.value)}}
                  required
              />
              <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="lastName"
                  autoComplete='lastName'
                  value={lastName}
                  onChange={(e) => { setLastName(e.target.value)}}
                  required
              />
              <TextField
                  label="Student ID"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="id"
                  autoComplete='id'
                  value={studentID}
                  onChange={(e) => { setStudentID(e.target.value)}}
                  required
              />
              <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="email"
                  autoComplete='email'
                  value={email}
                  onChange={(e) => { setEmail(e.target.value)}}
                  required
              />
              <TextField
                  label="Course Code"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="courseCode"
                  autoComplete='courseCode'
                  value={courseCode}
                  onChange={(e) => { setCourseCode(e.target.value)}}
                  required
              />
              <Alert 
                style={{ marginTop:'1rem', marginBottom:'1.5rem' }} 
                severity="info"
              >
                Please be aware that you will be able to add their images separately once you add their basic information here
              </Alert>
              <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={addNewStudent}
                  type="button"
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