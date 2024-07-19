import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Form, Modal } from 'react-bootstrap';

const ContentBankPage = () => {
    const [contentBanks, setContentBanks] = useState([]);
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        BankId: '',
        SampleBookId: '',
        state: 'Incompleto'
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        fetchContentBanks();
    }, []);

    const fetchContentBanks = async () => {
        const response = await axios.get('http://localhost:8000/api/contentbank');
        setContentBanks(response.data);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.BankId && formData.SampleBookId) {
            await axios.post('http://localhost:8000/api/contentbank', formData);
        } else {
            // update the record
            await axios.put(`http://localhost:8000/api/contentbank/${formData.BankId}-${formData.SampleBookId}`, { state: formData.state });
        }
        fetchContentBanks();
        handleClose();
    };

    const handleEdit = (contentBank) => {
        setFormData(contentBank);
        handleShow();
    };

    const handleDelete = async (BankId, SampleBookId) => {
        await axios.delete(`http://localhost:8000/api/contentbank/${BankId}-${SampleBookId}`);
        fetchContentBanks();
    };

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>Add New</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>BankId</th>
                        <th>SampleBookId</th>
                        <th>State</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contentBanks.map((contentBank) => (
                        <tr key={`${contentBank.BankId}-${contentBank.SampleBookId}`}>
                            <td>{contentBank.BankId}</td>
                            <td>{contentBank.SampleBookId}</td>
                            <td>{contentBank.state}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEdit(contentBank)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(contentBank.BankId, contentBank.SampleBookId)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{formData.BankId && formData.SampleBookId ? 'Edit Content' : 'Add New Content'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="BankId">
                            <Form.Label>BankId</Form.Label>
                            <Form.Control
                                type="text"
                                name="BankId"
                                value={formData.BankId}
                                onChange={handleChange}
                                required
                                readOnly={formData.BankId && formData.SampleBookId}
                            />
                        </Form.Group>

                        <Form.Group controlId="SampleBookId">
                            <Form.Label>SampleBookId</Form.Label>
                            <Form.Control
                                type="text"
                                name="SampleBookId"
                                value={formData.SampleBookId}
                                onChange={handleChange}
                                required
                                readOnly={formData.BankId && formData.SampleBookId}
                            />
                        </Form.Group>

                        <Form.Group controlId="state">
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                as="select"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                            >
                                <option value="Observado">Observado</option>
                                <option value="Incompleto">Incompleto</option>
                                <option value="Completo">Completo</option>
                            </Form.Control>
                        </Form.Group>
                        
                        <Button variant="primary" type="submit">
                            {formData.BankId && formData.SampleBookId ? 'Update' : 'Add'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ContentBankPage;
