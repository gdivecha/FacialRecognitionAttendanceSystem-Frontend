import { useContext, useState } from "react";
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Alert,
} from '@mui/material';
import { AuthContext } from "../../firebase/context/AuthContext";
import { auth } from "../../firebase/firebaseSetup";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Link, Navigate } from "react-router-dom";

function Login() {
  const user = useContext(AuthContext);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userNotFoundAlert, setUserNotFoundAlert] = useState(false);

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (error) {
      setUserNotFoundAlert(true);
      console.error(error);
    }
  };

  return (
    !user ? (
        <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
            <Box textAlign="center" mb={2}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Log In
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    Log into an existing account
                </Typography>
            </Box>
            <form>
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
                    label="Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                    autoComplete='current-password'
                    required
                    value={password} 
                    onChange={(e) => { setPassword(e.target.value) }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: '1rem' }}
                    onClick={signIn}
                    type="button"
                >
                    LOG IN
                </Button>
                <Box textAlign="center" mt={2}>
                    Don't have an account? <Link to={'/register'}>Sign up</Link>
                </Box>
            </form>
            {userNotFoundAlert && 
                <Alert 
                    severity="error"
                    style={{ marginTop: '2rem' }}
                >
                    User cannot be logged in! Please make sure your account is registered
                </Alert>
            }
        </Container>
    ) : <Navigate to={'/students'}></Navigate>
  );
}

export default Login;
