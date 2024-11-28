import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/AppNavbar.jsx";
import Home from "./pages/Home";
import { Container, Row, Stack } from "react-bootstrap";
import './App.css'
import View from "./pages/View.jsx";

export default function App() {
  return (
    <Router>
      <Stack gap={3} className="h-100">
        <AppNavbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:postUrl" element={<View/>}></Route>
        </Routes>
      </Stack>
    </Router>
  )
}
