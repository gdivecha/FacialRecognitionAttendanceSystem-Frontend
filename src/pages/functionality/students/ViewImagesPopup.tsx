import Button from '@mui/material/Button';
import { Box, Divider, Modal, Paper, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import FileUpload from '../../../components/ImageUpload';
import {
  CloudUpload as CloudUploadIcon,
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

// Define UploadedFile type to match the one used in ImageUpload.tsx
interface UploadedFile {
  file: File;
  preview: string;
}

interface ViewImagesPopupProps {
  course: string;
  fullName: string;
  studentID: string;
  email: string;
}

function ViewImagesPopup(props: ViewImagesPopupProps) {
  const [open, setOpen] = useState(false);
  const [uploadPhotos, setUploadPhotos] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  useEffect(() => {
    if (!open) {
      setUploadPhotos(false);
      setUploadedFiles([]);
    }
  }, [open]);

  const handleUpload = () => {
    console.log("Uploading files...");
    setOpen(false);
  };

  return (
    <div>
      <Button variant='outlined' onClick={() => setOpen(true)}>VIEW</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
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
          <Divider />
          <Stack spacing={2}>
            <Box display="flex" gap={2} mt={2} justifyContent="center">
              {uploadPhotos ? (
                <>
                  <Button
                    variant="contained"
                    onClick={() => setUploadPhotos(false)}
                    startIcon={<CancelIcon />}
                    color="error"
                    fullWidth
                  >
                    Cancel Upload
                  </Button>
                  {uploadedFiles.length > 0 && (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={handleUpload}
                      startIcon={<CheckCircleIcon />}
                      fullWidth
                    >
                      Upload Images
                    </Button>
                  )}
                </>
              ) : (
                <Button
                  component="label"
                  variant="contained"
                  onClick={() => setUploadPhotos(true)}
                  startIcon={<CloudUploadIcon />}
                  fullWidth
                >
                  Upload
                </Button>
              )}
            </Box>
            {uploadPhotos && <FileUpload onFilesChange={setUploadedFiles} />}
          </Stack>
        </Paper>
      </Modal>
    </div>
  );
}

export default ViewImagesPopup;