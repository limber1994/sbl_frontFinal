import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SampleBooks = () => {
  const [sampleBooks, setSampleBooks] = useState([]);
  const [form, setForm] = useState({
    BookId: '',
    Code: '',
    Observation: '',
    State: 'Normal',
  });
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    fetchSampleBooks();
  }, []);

  const fetchSampleBooks = async () => {
    const response = await axios.get('http://localhost:8000/api/samplebooks');
    setSampleBooks(response.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await axios.put(`http://localhost:8000/api/samplebooks/${currentId}`, form);
    } else {
      await axios.post('http://localhost:8000/api/samplebooks', form);
    }
    setEditing(false);
    setForm({
      BookId: '',
      Code: '',
      Observation: '',
      State: 'Normal',
    });
    fetchSampleBooks();
  };

  const handleEdit = (sampleBook) => {
    setForm(sampleBook);
    setEditing(true);
    setCurrentId(sampleBook.Id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/api/samplebooks/${id}`);
    fetchSampleBooks();
  };

  return (
    <div>
      <h1>Ejemplares de Libros</h1>
      <form onSubmit={handleSubmit}>
        <input type="number" name="BookId" value={form.BookId} onChange={handleChange} placeholder="ID del Libro" required />
        <input type="text" name="Code" value={form.Code} onChange={handleChange} placeholder="Código" required />
        <input type="text" name="Observation" value={form.Observation} onChange={handleChange} placeholder="Observación" required />
        <select name="State" value={form.State} onChange={handleChange}>
          <option value="Normal">Normal</option>
          <option value="Perdido">Perdido</option>
          <option value="Dañado">Dañado</option>
        </select>
        <button type="submit">{editing ? 'Actualizar' : 'Agregar'}</button>
      </form>
      <ul>
        {sampleBooks.map(sampleBook => (
          <li key={sampleBook.Id}>
            {sampleBook.Code} - {sampleBook.Observation} - {sampleBook.State}
            <button onClick={() => handleEdit(sampleBook)}>Editar</button>
            <button onClick={() => handleDelete(sampleBook.Id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SampleBooks;
