import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ListagemPacientes from "./Pages/Pacientes/ListagemPacientes";
import CadastroPaciente from "./Pages/Pacientes/CadastroPaciente";
import HistoricoPaciente from "./Pages/Pacientes/HistoricoPaciente";
import ListagemProfissionais from "./Pages/Profissionais/ListagemProfissionais";
import CadastroProfissional from "./Pages/Profissionais/CadastroProfissional";
import ListagemConsultas from "./Pages/Consultas/ListagemConsultas";
import AgendamentoConsulta from "./Pages/Consultas/AgendamentoConsulta";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/pacientes" replace />} />

        <Route path="/pacientes" element={<ListagemPacientes />} />
        <Route path="/cadastro" element={<CadastroPaciente />} />
        <Route path="/historico/:id" element={<HistoricoPaciente />} />

        <Route path="/profissionais" element={<ListagemProfissionais />} />
        <Route path="/profissionais/novo" element={<CadastroProfissional key="novo" />} />
        <Route path="/profissionais/editar/:id" element={<CadastroProfissional key="editar" />} />
        <Route path="/consultas/nova" element={<AgendamentoConsulta />} />
        <Route path="/consultas" element={<ListagemConsultas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;