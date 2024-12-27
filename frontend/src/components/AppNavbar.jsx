import { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { UserContext } from '../App';

export default function AppNavbar() {
  const {user, setUser} = useContext(UserContext)
  const [navOptions, setNavOptions] = useState([])

  useEffect(() => {
    let status = localStorage.getItem("login")
    if (status === "true") {
      setUser(true)
    } else {
      setUser(false)
    }
  }, [])

  useEffect(() => {
    if (user == true) {
      setNavOptions([
        <Nav.Link key={"Account"} href="/user">Account</Nav.Link>,
        <Nav.Link key={"Sign Out"} onClick={() => signOut({ setUser })}>Sign Out</Nav.Link>
      ])
    } else {
      setNavOptions([
        <Nav.Link key={"Sign Up"} href="/signup">Sign Up</Nav.Link>,
        <Nav.Link key={"Sign In"} href="/signin">Sign In</Nav.Link>
      ])
    }
  }, [user])

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary vh-0">
      <Container>
        <Navbar.Brand href="/">PasteBin</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            {navOptions}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function signOut({ setUser }) {
  console.log("signout")
  localStorage.removeItem("jwt")
  localStorage.setItem("login", false)
  setUser(false)
}
