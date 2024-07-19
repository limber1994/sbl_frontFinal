import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Books from './components/Books';
import Banco from './components/Banco';
import SampleBooks from './components/SampleBooks';
import BankbookTable from './components/BankbookTable';
import ContentBankPage from './components/ContentBankPage'; // Importa el nuevo componente

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
          <Route path="/contentbankpage" element={<ContentBankPage />} /> {/* Nueva ruta */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
