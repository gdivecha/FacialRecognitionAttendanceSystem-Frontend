import { useContext, useState } from "react";
import { Button, Container, Form, Navbar } from "react-bootstrap";
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

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar className="justify-content-between" bg="dark" variant="dark">
        <Navbar.Brand>A.I.Tend</Navbar.Brand>
      </Navbar>
      {!user ? (
        <Container style={{ maxWidth: "500px" }} fluid>
          <Form className="mt-4">
            <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <input
                    type="email"
                    autoComplete='email'
                    required
                    value={email} onChange={(e) => { setEmail(e.target.value) }}
                />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <input
                    type="password"
                    autoComplete='current-password'
                    required
                    value={password} onChange={(e) => { setPassword(e.target.value) }}
                />
            </Form.Group>
            <Button
                onClick={signIn}
                type="button"
                variant="secondary"
            >
                Sign In
            </Button>
            <p>Don't have an account? <Link to={'/register'}>Sign up</Link></p>
          </Form>
        </Container>
      ) : (
        <Navigate to={'/home'}></Navigate>
      )}
    </>
  );
}

export default Login;
