import { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Button, Box, Grid, Typography, CircularProgress, Snackbar, Alert } from '@mui/material';
import {
  CameraAlt as CameraAltIcon,
  PhotoLibrary as PhotoLibraryIcon
} from '@mui/icons-material';

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
  const [isMatch, setIsMatch] = useState<boolean>();
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

  const processCapturedImage = () => {
    setProcessing(true); // Start processing
    setTimeout(() => {
      // Simulate processing delay
      const matchResult = Math.random() > 0.5; // Simulate match result
      setIsMatch(matchResult);
      setShowAlert(true);
      setProcessing(false); // End processing
      setCapturedImage(null); // Clear captured image after processing
      resetFields(); // Reset studentID and courseCode fields
    }, 3000); // 3 seconds processing time
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
        <Alert onClose={handleCloseSnackbar} severity={isMatch ? 'success' : 'error'} sx={{ width: '100%' }}>
          {isMatch ? 'Photo matched successfully!' : 'No match found for the photo!'}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default WebcamCapture;