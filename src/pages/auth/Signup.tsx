import { useContext, useState } from "react";
import { Button, Container, Form, Navbar } from "react-bootstrap";
import { AuthContext } from "../../firebase/context/AuthContext";
import { auth } from "../../firebase/firebaseSetup";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { Link, Navigate } from "react-router-dom";

function Signup() {
  const user = useContext(AuthContext);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const createAccount = async () => {
    try {
      await createUserWithEmailAndPassword(
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
                    // className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <input
                    type="password"
                    autoComplete='current-password'
                    required
                    value={password} onChange={(e) => { setPassword(e.target.value) }}
                    // className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                />
            </Form.Group>
            <Button onClick={createAccount} type="button">
                Sign Up
            </Button>
            <p>Have an account already? <Link to={'/login'}>Sign in</Link></p>
          </Form>
        </Container>
      ) : (
        <Navigate to={'/home'}></Navigate>
      )}
    </>
  );
}

export default Signup;
