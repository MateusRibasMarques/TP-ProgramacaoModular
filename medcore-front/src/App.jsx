import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ListagemPacientes from "./Pages/Pacientes/ListagemPacientes";
import CadastroPaciente from "./Pages/Pacientes/CadastroPaciente";
import HistoricoPaciente from "./Pages/Pacientes/HistoricoPaciente";
import ListagemProfissionais from "./Pages/Profissionais/ListagemProfissionais";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/pacientes" replace />} />

        <Route path="/pacientes" element={<ListagemPacientes />} />
        <Route path="/cadastro" element={<CadastroPaciente />} />
        <Route path="/historico/:id" element={<HistoricoPaciente />} />

        <Route path="/profissionais" element={<ListagemProfissionais />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;