import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Button, Box, Grid, Typography } from '@mui/material';

function WebcamCapture() {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const capturePhoto = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
    }
  }, [webcamRef]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2} marginTop='1rem'>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" align="center" gutterBottom>
            Live Video Feed
          </Typography>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={400}
            height={280}
            style={{
              borderRadius: '8px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
              maxWidth: '100%',
              maxHeight: 300,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" align="center" gutterBottom>
            Captured Image
          </Typography>
          {capturedImage ? (
            <Box>
              <img 
                src={capturedImage} 
                alt="Captured" 
                style={{
                  borderRadius: '8px',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                  maxWidth: '100%',
                  maxHeight: 300,
                }}
              />
            </Box>
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                borderRadius: '8px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                height: 280,
                backgroundColor: '#f5f5f5',
              }}
            >
              <Typography variant="body2" color="textSecondary" align="center">
                The captured image will appear here after you take a photo.
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
      <Button variant="contained" onClick={capturePhoto} sx={{ mt: 2, fontWeight: 'bold' }}>
        Capture Photo
      </Button>
    </Box>
  );
}

export default WebcamCapture;