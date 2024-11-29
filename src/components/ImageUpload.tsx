import { useEffect, useState, SyntheticEvent, MouseEvent } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, IconButton, Grid, Card, CardMedia, Snackbar, Alert, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface UploadedFile {
  file: File;
  preview: string;
}

interface FileUploadProps {
  onFilesChange: (files: UploadedFile[]) => void;
  resetDropzone: boolean; // New prop to reset the dropzone
}

function FileUpload({ onFilesChange, resetDropzone }: FileUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [duplicateFileError, setDuplicateFileError] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      const nonDuplicateFiles = acceptedFiles.filter((newFile) => {
        const isDuplicate = uploadedFiles.some((existingFile) => existingFile.file.name === newFile.name);
        if (isDuplicate) {
          setDuplicateFileError(true);
        }
        return !isDuplicate;
      });

      const newFiles = nonDuplicateFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    },
  });

  // Defer the `onFilesChange` call to avoid state updates during render
  useEffect(() => {
    onFilesChange(uploadedFiles);
  }, [uploadedFiles, onFilesChange]);

  const handleDelete = (fileName: string, event: MouseEvent) => {
    event.stopPropagation();
    setUploadedFiles((prevFiles) => prevFiles.filter((f) => f.file.name !== fileName));
  };

  const handleCloseSnackbar = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setDuplicateFileError(false);
  };

  useEffect(() => {
    setUploadedFiles([]);
  }, [resetDropzone]);

  useEffect(() => {
    return () => {
      uploadedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [uploadedFiles]);

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: '2px dashed #1976d2',
        borderRadius: '8px',
        padding: '16px',
        textAlign: 'center',
        cursor: 'pointer',
        backgroundColor: isDragActive ? '#e3f2fd' : '#fafafa',
        transition: 'background-color 0.3s ease',
      }}
    >
      <input {...getInputProps()} />
      <Typography variant="h6" color="textSecondary" fontSize={17} fontWeight={100} marginBottom={'1rem'}>
        {isDragActive ? 'Drop the files here ...' : 'Drag and drop files here, or click to select files'}
      </Typography>
      <Grid container spacing={2} marginBottom={'0.25rem'}>
        {uploadedFiles.map(({ file, preview }) => (
          <Grid item xs={12} sm={6} md={4} key={file.name}>
            <Card sx={{ position: 'relative', maxWidth: 200, textAlign: 'center' }}>
              <CardMedia
                component="img"
                height="140"
                image={preview}
                alt={file.name}
                sx={{
                  objectFit: 'contain',
                }}
              />
              <Tooltip title={file.name} arrow>
                <Typography
                  variant="body2"
                  noWrap
                  sx={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    maxWidth: '100%',
                  }}
                >
                  {file.name}
                </Typography>
              </Tooltip>
              <IconButton
                onClick={(event) => handleDelete(file.name, event)}
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
      <Snackbar
        open={duplicateFileError}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          Duplicate files are not allowed.
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default FileUpload;