import { useContext, useState } from "react";
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Grid,
} from '@mui/material';
import { AuthContext } from "../../firebase/context/AuthContext";
import { auth } from "../../firebase/firebaseSetup";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { Link, Navigate } from "react-router-dom";

function Signup() {
  const user = useContext(AuthContext);

  const [firstName, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const createAccount = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      localStorage.setItem("authToken", "bc724d94a763cd5946ec36286d9c102d006cba4505cf38cb5f5142733ba490b3");
      localStorage.setItem("profEmail", email);
    } catch (error) {
      console.error(error);
    }
  };
  
  return ( 
    !user ? (
        <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
            <Box textAlign="center" mb={2}>
                <Typography variant="h4" component="h1" gutterBottom>
                Sign Up
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                Get started for free
                </Typography>
            </Box>
            <form>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            label="First Name" 
                            variant="outlined" 
                            value={firstName}
                            fullWidth 
                            onChange={(e) => { setFirstName(e.target.value)}}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            label="Last Name" 
                            variant="outlined" 
                            value={lastname}
                            fullWidth 
                            onChange={(e) => { setLastName(e.target.value)}}
                        />
                    </Grid>
                </Grid>
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
                    onClick={createAccount}
                    type="button"
                >
                    SIGN UP
                </Button>
                <Box textAlign="center" mt={2}>
                    Have an account already? <Link to={'/login'}>Log in</Link>
                </Box>
            </form>
        </Container>
    ) : <Navigate to={'/home'}></Navigate>
  );
}

export default Signup;
