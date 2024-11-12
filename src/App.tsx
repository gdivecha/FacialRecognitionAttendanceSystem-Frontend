import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Home from "./pages/functionality/Home";
import { Pages } from "./configurations/HomeConfigs";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/students" element={<Home page={Pages.STUDENTS} />} />
        <Route path="/records" element={<Home page={Pages.RECORDS} />} />
        <Route path="/attendance" element={<Home page={Pages.ATTENDANCE} />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
