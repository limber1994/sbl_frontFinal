import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Home = () => {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Mi Aplicación</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="banco">Banco</Nav.Link>
              <Nav.Link href="#asignaciones">Asignaciones</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Home;
