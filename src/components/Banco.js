// Banco.js
import React from 'react';
import { Navbar, Nav, Container, Button, Col, Row } from 'react-bootstrap';
import Books from './Books'; // Importa el componente Books

const Banco = () => {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Mi Aplicación</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/books">Banco</Nav.Link>
              <Nav.Link href="#/assignmentbankstudent">Asignaciones</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid>
        <Row>
          <Col md={2} className="bg-light">
            <nav className="flex-column">
              <Button variant="link" href="Books">Libros</Button>
              <Button variant="link" href="Samplebooks">Ejemplares de libros</Button>
              <Button variant="link" href="BankbookTable">Bancos</Button>
              <Button variant="link" href="ContentBankPage">Contenido de bancos</Button>
              <Button variant="link" href="AssignmentBankStudent">Asignaciones de Bancos Estudianntes</Button>
              <Button variant="link" href="AssignmentBankTeachers">Asignaciones de Bancos Docentes</Button>
            </nav>
          </Col>
          <Col md={10}>
            <Books /> 
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Banco;
