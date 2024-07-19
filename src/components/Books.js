import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Books = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    Abreviature: '',
    Title: '',
    Grade: 'PRIMERO',
    Category: '',
    Quantity: '',
    Year: '',
    Observation: '',
    State: 'Incompleto',
  });
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await axios.get('http://localhost:8000/api/books');
    setBooks(response.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await axios.put(`http://localhost:8000/api/books/${currentId}`, form);
    } else {
      await axios.post('http://localhost:8000/api/books', form);
    }
    setEditing(false);
    setForm({
      Abreviature: '',
      Title: '',
      Grade: 'PRIMERO',
      Category: '',
      Quantity: '',
      Year: '',
      Observation: '',
      State: 'Incompleto',
    });
    fetchBooks();
  };

  const handleEdit = (book) => {
    setForm(book);
    setEditing(true);
    setCurrentId(book.Id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/api/books/${id}`);
    fetchBooks();
  };

  return (
    
    <div>
      <h1>Libros</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="Abreviature" value={form.Abreviature} onChange={handleChange} placeholder="Abreviatura" required />
        <input type="text" name="Title" value={form.Title} onChange={handleChange} placeholder="Título" required />
        <select name="Grade" value={form.Grade} onChange={handleChange}>
          <option value="PRIMERO">PRIMERO</option>
          <option value="SEGUNDO">SEGUNDO</option>
          <option value="TERCERO">TERCERO</option>
          <option value="CUARTO">CUARTO</option>
          <option value="QUINTO">QUINTO</option>
        </select>
        <input type="text" name="Category" value={form.Category} onChange={handleChange} placeholder="Categoría" required />
        <input type="number" name="Quantity" value={form.Quantity} onChange={handleChange} placeholder="Cantidad" required />
        <input type="number" name="Year" value={form.Year} onChange={handleChange} placeholder="Año" required />
        <input type="text" name="Observation" value={form.Observation} onChange={handleChange} placeholder="Observación" />
        <select name="State" value={form.State} onChange={handleChange}>
          <option value="Completo">Completo</option>
          <option value="Incompleto">Incompleto</option>
        </select>
        <button type="submit">{editing ? 'Actualizar' : 'Agregar'}</button>
      </form>
      <ul>
        {books.map(book => (
          <li key={book.Id}>
            {book.Title} - {book.Grade} - {book.Category}
            <button onClick={() => handleEdit(book)}>Editar</button>
            <button onClick={() => handleDelete(book.Id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Books;
