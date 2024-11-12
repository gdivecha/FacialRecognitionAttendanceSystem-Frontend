import { useContext } from "react";
import { AuthContext } from "../../firebase/context/AuthContext";
import { Button, Navbar } from "react-bootstrap";
import { auth } from "../../firebase/firebaseSetup";
import { Navigate } from "react-router-dom";

const signOut = async () => {
    await auth.signOut();
};
  
function Home() {
    const user = useContext(AuthContext);

    return (
        <>
            <Navbar className="justify-content-between" bg="dark" variant="dark">
                <Navbar.Brand>A.I.Tend</Navbar.Brand>
                {user
                    ? <Button onClick={signOut}>Sign Out</Button>
                    : <Navigate to={'/login'}></Navigate>
                }
            </Navbar>
            <h2 className="mt-4 text-center">Welcome {user?.email}</h2>
        </>
    );
}

export default Home;