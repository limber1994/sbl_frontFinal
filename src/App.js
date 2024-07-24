import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Books from './components/Books';
import Banco from './components/Banco';
import SampleBooks from './components/SampleBooks';
import BankbookTable from './components/BankbookTable';
import ContentBankPage from './components/ContentBankPage'; // Importa el nuevo componente
import AssignmentBankStudent from './components/AssignmentBankStudent'; // Importa el nuevo componente
import AssignmentBankTeachers from './components/AssignmentBankTeachers'; // Importa el nuevo componente

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/banco" element={<Banco />} /> 
          <Route path="/samplebooks" element={<SampleBooks />} /> 
          <Route path="/bankbooktable" element={<BankbookTable />} />
          <Route path="/contentbankpage" element={<ContentBankPage />} />
          <Route path="/assignmentbankstudent" element={<AssignmentBankStudent />} />
          <Route path="/assignmentbankteachers" element={<AssignmentBankTeachers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
