import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, Table, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AssignmentBankStudent = () => {
  const [assignments, setAssignments] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    BankBooksId: '',
    StudentId: '',
    StateAssignBank: 'Entregado',
    Deadline: '',
    ReceptionDate: '',
    observation: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/assignmentbankstudent');
      setAssignments(response.data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const handleShow = (assignment = null) => {
    if (assignment) {
      setFormData({
        BankBooksId: assignment.BankBooksId,
        StudentId: assignment.StudentId,
        StateAssignBank: assignment.StateAssignBank,
        Deadline: assignment.Deadline,
        ReceptionDate: assignment.ReceptionDate,
        observation: assignment.observation
      });
      setCurrentId(`${assignment.BankBooksId}-${assignment.StudentId}`);
      setEditing(true);
    } else {
      setFormData({
        BankBooksId: '',
        StudentId: '',
        StateAssignBank: 'Entregado',
        Deadline: '',
        ReceptionDate: '',
        observation: ''
      });
      setCurrentId(null);
      setEditing(false);
    }
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setErrors({});
    setSuccess('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateDateFormat = (date) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar formato de fechas
    if (!validateDateFormat(formData.Deadline) || !validateDateFormat(formData.ReceptionDate)) {
      setErrors({ ...errors, global: 'Las fechas deben estar en formato YYYY-MM-DD' });
      return;
    }

    try {
      if (editing && currentId) {
        await axios.put(`http://localhost:8000/api/assignmentbankstudent/${currentId}`, formData);
      } else {
        await axios.post('http://localhost:8000/api/assignmentbankstudent', formData);
      }
      fetchAssignments();
      handleClose();
      setSuccess('Asignación guardada exitosamente');
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ global: 'Error al guardar la asignación' });
      }
      setSuccess('');
    }
  };

  const handleDelete = async (BankBooksId, StudentId) => {
    try {
      await axios.delete(`http://localhost:8000/api/assignmentbankstudent/${BankBooksId}-${StudentId}`);
      fetchAssignments();
    } catch (error) {
      console.error('Error deleting assignment:', error);
    }
  };

  return (
    <Container>
      <h2>Gestión de Asignaciones de Banco de Libros Estudianntes</h2>
      {success && <Alert variant="success">{success}</Alert>}
      {errors.global && <Alert variant="danger">{errors.global}</Alert>}

      <Button variant="primary" onClick={() => handleShow()}>Agregar Asignación</Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID del Libro de Banco</th>
            <th>ID del Estudiante</th>
            <th>Estado</th>
            <th>Fecha Límite</th>
            <th>Fecha de Recepción</th>
            <th>Observación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment, index) => (
            <tr key={`${assignment.BankBooksId}-${assignment.StudentId}-${index}`}>  {/* Clave única combinando BankBooksId y StudentId */}
              <td>{assignment.BankBooksId}</td>
              <td>{assignment.StudentId}</td>
              <td>{assignment.StateAssignBank}</td>
              <td>{assignment.Deadline}</td>
              <td>{assignment.ReceptionDate}</td>
              <td>{assignment.observation}</td>
              <td>
                <Button variant="info" onClick={() => handleShow(assignment)}>Editar</Button>
                <Button variant="danger" onClick={() => handleDelete(assignment.BankBooksId, assignment.StudentId)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editing ? 'Editar Asignación' : 'Agregar Asignación'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBankBooksId">
              <Form.Label>ID del Libro de Banco</Form.Label>
              <Form.Control
                type="text"
                name="BankBooksId"
                value={formData.BankBooksId}
                onChange={handleChange}
                required
              />
              {errors.BankBooksId && <Form.Text className="text-danger">{errors.BankBooksId}</Form.Text>}
            </Form.Group>

            <Form.Group controlId="formStudentId">
              <Form.Label>ID del Estudiante</Form.Label>
              <Form.Control
                type="text"
                name="StudentId"
                value={formData.StudentId}
                onChange={handleChange}
                required
              />
              {errors.StudentId && <Form.Text className="text-danger">{errors.StudentId}</Form.Text>}
            </Form.Group>

            <Form.Group controlId="formStateAssignBank">
              <Form.Label>Estado de Asignación</Form.Label>
              <Form.Control
                as="select"
                name="StateAssignBank"
                value={formData.StateAssignBank}
                onChange={handleChange}
                required
              >
                <option value="Entregado">Entregado</option>
                <option value="Devuelto">Devuelto</option>
                <option value="Observado">Observado</option>
              </Form.Control>
              {errors.StateAssignBank && <Form.Text className="text-danger">{errors.StateAssignBank}</Form.Text>}
            </Form.Group>

            <Form.Group controlId="formDeadline">
              <Form.Label>Fecha Límite</Form.Label>
              <Form.Control
                type="date"
                name="Deadline"
                value={formData.Deadline}
                onChange={handleChange}
                required
              />
              {errors.Deadline && <Form.Text className="text-danger">{errors.Deadline}</Form.Text>}
            </Form.Group>

            <Form.Group controlId="formReceptionDate">
              <Form.Label>Fecha de Recepción</Form.Label>
              <Form.Control
                type="date"
                name="ReceptionDate"
                value={formData.ReceptionDate}
                onChange={handleChange}
                required
              />
              {errors.ReceptionDate && <Form.Text className="text-danger">{errors.ReceptionDate}</Form.Text>}
            </Form.Group>

            <Form.Group controlId="formObservation">
              <Form.Label>Observación</Form.Label>
              <Form.Control
                as="textarea"
                name="observation"
                value={formData.observation}
                onChange={handleChange}
                rows={3}
              />
              {errors.observation && <Form.Text className="text-danger">{errors.observation}</Form.Text>}
            </Form.Group>

            <Button variant="primary" type="submit">
              {editing ? 'Actualizar' : 'Agregar'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AssignmentBankStudent;