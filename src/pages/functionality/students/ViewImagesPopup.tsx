import Button from '@mui/material/Button';
import { Box, Modal, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { } from './Students';

interface ViewImagesPopupProps {
  course: string;
  fullName: string;
  studentID: string;
  email: string;
}

function ViewImagesPopup(props: ViewImagesPopupProps) {

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button variant='outlined' onClick={handleOpen}>VIEW</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Paper sx={{ p: 2, width: '50%', maxWidth: '500px' }}>
            <Typography variant="h5" fontWeight={1000} gutterBottom>
                Student Image Management 
            </Typography>
            <Typography variant="body1" gutterBottom>
                Use this page to add or remove images for {props.fullName} 
            </Typography>
            <Box display="flex" justifyContent="flex-start" mt='1.3rem' mb='1rem' gap={1.75}>
                <TextField
                    disabled
                    id="fullName"
                    label="Full Name"
                    fullWidth
                    defaultValue={props.fullName}
                    sx={{
                      color: 'black'
                    }}
                />
                <TextField
                    disabled
                    id="studentID"
                    label="Student ID"
                    fullWidth
                    defaultValue={props.studentID}
                />
            </Box>
            <Box display="flex" justifyContent="flex-start" mt='1.3rem' mb='1rem' gap={1.75}>
              <TextField
                  disabled
                  id="email"
                  label="Email"
                  defaultValue={props.email}
                  fullWidth
              />
              <TextField
                  disabled
                  id="course"
                  label="Course Code"
                  defaultValue={props.course}
                  fullWidth
              />
            </Box>
        </Paper>
      </Modal>
    </div>
  );
}

export default ViewImagesPopup;