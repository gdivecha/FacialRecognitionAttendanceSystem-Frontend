import Button from '@mui/material/Button';
import { Avatar, Box, Divider, Grid, Modal, Paper, Stack, Typography, Card, CardMedia, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import FileUpload from '../../../components/ImageUpload';
import {
  CloudUpload as CloudUploadIcon,
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
  School as SchoolIcon,
  Class as ClassIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import backendApiClient from '../../../axios/backendApiClient';

interface UploadedFile {
  file: File | null;
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
  const [submittedFiles, setSubmittedFiles] = useState<UploadedFile[]>([]); 
  const [resetDropzone, setResetDropzone] = useState(false);

  useEffect(() => {
    if (open) {
      fetchStudentImages();
    } else {
      setUploadPhotos(false);
      setUploadedFiles([]);
    }
  }, [open]);

  const fetchStudentImages = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Auth token not found in localStorage");
      }
  
      const response = await backendApiClient.get(`/api/student/getStudentImages`, {
        params: { studentID: props.studentID },
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the Authorization header
        },
      });
  
      const images = response.data.map((image: any) => {
        const blob = new Blob([Uint8Array.from(image.data.data)], { type: 'image/jpeg' });
        const preview = URL.createObjectURL(blob);
        return { file: blob, preview };
      });
  
      setSubmittedFiles(images); // Update state with fetched images
    } catch (error: any) {
      console.error("Error fetching student images:", error.response?.data || error.message);
    }
  };

  const handleUpload = async () => {
    try {
      // Retrieve the auth token from localStorage
      const token = localStorage.getItem("authToken");
  
      if (!token) {
        throw new Error("Auth token not found in localStorage");
      }
  
      // Create FormData to upload files
      const formData = new FormData();
      formData.append("studentID", props.studentID); // Append studentID
  
      // Filter out null or invalid files and append them to FormData
      uploadedFiles
        .filter((fileObj) => fileObj.file !== null) // Ensure the file is valid
        .forEach((fileObj) => {
          formData.append("images", fileObj.file as Blob); // Append each valid image file
        });
  
      // Make the API call
      const response = await backendApiClient.put(
        "/api/student/addStudentImages",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Authorization header
            "Content-Type": "multipart/form-data", // Set content type for form-data
          },
        }
      );

      setUploadedFiles([]);
      setUploadPhotos(false);
      setResetDropzone((prev) => !prev); // Reset the dropzone
    } catch (error: any) {
      console.error("Error uploading images:", error.response?.data || error.message);
    }
  };
  
  const handleDeleteImage = (preview: string) => {
    setSubmittedFiles((prevFiles) => prevFiles.filter((file) => file.preview !== preview));
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
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2} alignItems="center" paddingX='1rem' marginBottom='0.5rem'>
            <Grid item>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="subtitle1" fontWeight="bold">
                Full Name
              </Typography>
              <Typography variant="body2">{props.fullName}</Typography>
            </Grid>
            <Grid item>
              <Avatar>
                <SchoolIcon />
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="subtitle1" fontWeight="bold">
                Student ID
              </Typography>
              <Typography variant="body2">{props.studentID}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center" paddingX='1rem' marginTop='0.5rem'>
            <Grid item>
              <Avatar>
                <EmailIcon />
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="subtitle1" fontWeight="bold">
                Email
              </Typography>
              <Typography variant="body2">{props.email}</Typography>
            </Grid>
            <Grid item>
              <Avatar>
                <ClassIcon />
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="subtitle1" fontWeight="bold">
                Course Code
              </Typography>
              <Typography variant="body2">{props.course}</Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          {submittedFiles.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" fontWeight={500} gutterBottom>
                Previously Uploaded Images
              </Typography>
              <Grid container spacing={2}>
                {submittedFiles.map(({ preview }) => (
                  <Grid item xs={6} sm={4} key={preview}>
                    <Card sx={{ position: 'relative', maxWidth: 120, textAlign: 'center' }}>
                      <CardMedia
                        component="img"
                        height="100"
                        image={preview}
                        alt="Previously uploaded image"
                        sx={{
                          objectFit: 'cover',
                        }}
                      />
                      <IconButton
                        onClick={() => handleDeleteImage(preview)}
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          color: 'red',
                        }}
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
          <Stack spacing={2}>
            <Box display="flex" gap={2} mt={2} justifyContent="center">
              {uploadPhotos ? (
                <>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setUploadPhotos(false);
                      setUploadedFiles([]);
                    }}
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
                  Upload Face Images
                </Button>
              )}
            </Box>
            {uploadPhotos && <FileUpload onFilesChange={setUploadedFiles} resetDropzone={resetDropzone} />}
          </Stack>
        </Paper>
      </Modal>
    </div>
  );
}

export default ViewImagesPopup;