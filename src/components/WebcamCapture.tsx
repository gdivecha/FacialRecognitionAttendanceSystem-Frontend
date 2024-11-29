import { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Button, Box, Grid, Typography, CircularProgress, Snackbar, Alert, IconButton } from '@mui/material';
import {
  CameraAlt as CameraAltIcon,
  PhotoLibrary as PhotoLibraryIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import backendApiClient from '../axios/backendApiClient';

interface WebcamCaptureProps {
  studentID: string;
  courseCode: string;
  resetFields: () => void;
  isStudentIDValid: boolean;
}

function WebcamCapture({ studentID, courseCode, resetFields, isStudentIDValid }: WebcamCaptureProps) {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false); // Processing state
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const capturePhoto = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
    }
  }, [webcamRef]);

  const handleWebcamLoad = () => {
    setLoading(false);
  };

  const handleCloseSnackbar = () => {
    setShowAlert(false);
  };

  const discardCapturedImage = () => {
    setCapturedImage(null); // Discard the captured image
  };

  const processCapturedImage = async () => {
    if (!capturedImage || !studentID || !courseCode || !isStudentIDValid) return;

    setProcessing(true); // Start processing

    try {
      // Convert the base64 image to a Blob
      const byteString = atob(capturedImage.split(',')[1]);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uint8Array = new Uint8Array(arrayBuffer);

      for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
      }

      const imageBlob = new Blob([uint8Array], { type: 'image/jpeg' });

      // Create FormData to send the image and additional data
      const formData = new FormData();
      formData.append('studentID', studentID);
      formData.append('courseCode', courseCode);
      formData.append('imageFile', imageBlob);

      // Make the API call
      const token = localStorage.getItem("authToken");
      if (!token) {
          throw new Error("Auth token not found in localStorage");
      }
      const response = await backendApiClient.post('/api/student/processCapturedPhoto', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Use the retrieved token
        },
      });

      // Handle the response
      const { validMatch, message } = response.data;
      setAlertSeverity(validMatch ? 'success' : 'error');
      setAlertMessage(message);
      setShowAlert(true);

      // Reset after success or failure
      discardCapturedImage();
      resetFields();
    } catch (error: any) {
      console.error('Error processing captured photo:', error.response?.data || error.message);

      // Handle error case
      setAlertSeverity('error');
      setAlertMessage('Failed to process the photo. Please try again.');
      setShowAlert(true);
    } finally {
      setProcessing(false); // End processing
    }
  };

  const canProcessPhoto = capturedImage && studentID && courseCode && isStudentIDValid;

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2} mt={2}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" align="center" gutterBottom>
            Live Video Feed
          </Typography>
          <Box
            sx={{
              width: '100%',
              aspectRatio: '4 / 3', 
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            {loading && (
              <CircularProgress
                sx={{
                  position: 'absolute',
                  color: 'gray',
                }}
              />
            )}
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              onUserMedia={handleWebcamLoad} 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: loading ? 'none' : 'block', 
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" align="center" gutterBottom>
            Captured Image
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              width: '100%',
              aspectRatio: '4 / 3',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: capturedImage ? 'transparent' : '#f5f5f5',
              position: 'relative',
            }}
          >
            {capturedImage ? (
              <>
                <img
                  src={capturedImage}
                  alt="Captured"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <IconButton
                  onClick={discardCapturedImage}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  }}
                >
                  <CloseIcon color="error" />
                </IconButton>
                {processing && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      borderRadius: '8px',
                    }}
                  >
                    <CircularProgress sx={{ color: 'white' }} />
                  </Box>
                )}
              </>
            ) : (
              <Typography variant="body2" color="textSecondary" align="center" padding="20px">
                The captured image will appear here after you take a photo.
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
      {!loading && (
        <Box display="flex" gap={2} mt={2} justifyContent="center" width="100%">
          <Button
            variant="contained"
            onClick={capturePhoto}
            startIcon={<CameraAltIcon />}
            sx={{ fontWeight: 'bold', textTransform: 'none' }}
            fullWidth
          >
            Capture Photo
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={processCapturedImage}
            startIcon={<PhotoLibraryIcon />}
            sx={{ fontWeight: 'bold', textTransform: 'none' }}
            fullWidth
            disabled={!canProcessPhoto || processing} // Disable during processing
          >
            Process Photo
          </Button>
        </Box>
      )}
      <Snackbar
        open={showAlert}
        autoHideDuration={10000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default WebcamCapture;