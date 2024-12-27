import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/AppNavbar.jsx";
import Home from "./pages/Home";
import { Container, Row, Stack } from "react-bootstrap";
import './App.css'
import View from "./pages/View.jsx";
import Signup from "./pages/Signup.jsx";
import Signin from "./pages/Signin.jsx";
import { createContext, useState } from "react";
import User from "./pages/User.jsx";

export const UserContext = createContext(false)

export default function App() {
  const [user, setUser] = useState(false)

  return (
    <UserContext.Provider value = {{
      user,
      setUser
    }}>
      <Router>
        <Stack gap={3} className="h-100">
          <AppNavbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/:postUrl" element={<View />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/signin" element={<Signin />}></Route>
            <Route path="/user" element={<User />}></Route>
          </Routes>
        </Stack>
      </Router>
    </UserContext.Provider >
  )
}
