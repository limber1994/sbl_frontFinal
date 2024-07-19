import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const BankbookTable = () => {
    const [bankbooks, setBankbooks] = useState([]);
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        quantity: '',
        observation: '',
        state: 'Completo'
    });

    const handleClose = () => setShow(false);
    const handleShow = (bankbook) => {
        setFormData(bankbook ? bankbook : { id: '', quantity: '', observation: '', state: 'Completo' });
        setShow(true);
    };

    useEffect(() => {
        fetchBankbooks();
    }, []);

    const fetchBankbooks = async () => {
        const response = await axios.get('http://localhost:8000/api/bankbooks');
        setBankbooks(response.data);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.id) {
            await axios.put(`http://localhost:8000/api/bankbooks/${formData.id}`, formData);
        } else {
            await axios.post('http://localhost:8000/api/bankbooks', formData);
        }
        handleClose();
        fetchBankbooks();
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8000/api/bankbooks/${id}`);
        fetchBankbooks();
    };

    return (
        <>
            <Button variant="primary" onClick={() => handleShow(null)}>Add Bankbook</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Quantity</th>
                        <th>Observation</th>
                        <th>State</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bankbooks.map((bankbook) => (
                        <tr key={bankbook.id}>
                            <td>{bankbook.id}</td>
                            <td>{bankbook.quantity}</td>
                            <td>{bankbook.observation}</td>
                            <td>{bankbook.state}</td>
                            <td>
                                <Button variant="info" onClick={() => handleShow(bankbook)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(bankbook.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{formData.id ? 'Edit Bankbook' : 'Add Bankbook'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formQuantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formObservation">
                            <Form.Label>Observation</Form.Label>
                            <Form.Control
                                type="text"
                                name="observation"
                                value={formData.observation}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formState">
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                as="select"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                required
                            >
                                <option value="Completo">Completo</option>
                                <option value="Incompleto">Incompleto</option>
                                <option value="Observado">Observado</option>
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            {formData.id ? 'Update' : 'Add'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default BankbookTable;
