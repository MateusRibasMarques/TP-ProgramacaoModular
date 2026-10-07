import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ListagemPacientes from "./pages/Pacientes/ListagemPacientes";
import CadastroPaciente from "./pages/Pacientes/CadastroPaciente";
import HistoricoPaciente from "./pages/Pacientes/HistoricoPaciente";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/pacientes" replace />} />
        
        <Route path="/pacientes" element={<ListagemPacientes />} />
        <Route path="/cadastro" element={<CadastroPaciente />} />
        <Route path="/historico/:id" element={<HistoricoPaciente />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;