import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ListagemPacientes from "./Pages/Pacientes/ListagemPacientes";
import CadastroPaciente from "./Pages/Pacientes/CadastroPaciente";
import HistoricoPaciente from "./Pages/Pacientes/HistoricoPaciente";
import ListagemProfissionais from "./Pages/Profissionais/ListagemProfissionais";
import CadastroProfissional from "./Pages/Profissionais/CadastroProfissional";
import ListagemConsultas from "./Pages/Consultas/ListagemConsultas";
import AgendamentoConsulta from "./Pages/Consultas/AgendamentoConsulta";
import ListagemQuartos from "./Pages/Quartos/ListagemQuartos";
import CadastroQuarto from "./Pages/Quartos/CadastroQuarto";
import ListagemInternacoes from "./Pages/Internacoes/ListagemInternacoes";
import RegistroInternacao from "./Pages/Internacoes/RegistroInternacao";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/pacientes" replace />} />

        <Route path="/pacientes" element={<ListagemPacientes />} />
        <Route path="/cadastro" element={<CadastroPaciente key="novo" />} />
        <Route path="/pacientes/editar/:id" element={<CadastroPaciente key="editar" />} />
        <Route path="/historico/:id" element={<HistoricoPaciente />} />

        <Route path="/profissionais" element={<ListagemProfissionais />} />
        <Route path="/profissionais/novo" element={<CadastroProfissional key="novo" />} />
        <Route path="/profissionais/editar/:id" element={<CadastroProfissional key="editar" />} />
        <Route path="/consultas/agendar" element={<AgendamentoConsulta />} />
        <Route path="/consultas/nova" element={<Navigate to="/consultas/agendar" replace />} />
        <Route path="/consultas" element={<ListagemConsultas />} />

        <Route path="/quartos" element={<ListagemQuartos />} />
        <Route path="/quartos/novo" element={<CadastroQuarto key="novo" />} />
        <Route path="/quartos/editar/:id" element={<CadastroQuarto key="editar" />} />
        <Route path="/internacoes" element={<ListagemInternacoes />} />
        <Route path="/internacoes/nova" element={<RegistroInternacao key="nova" />} />
        <Route path="/internacoes/editar/:id" element={<RegistroInternacao key="editar" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;