import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ListagemPacientes.module.css';

// Mocks temporários para Sprint 1
const mockPacientes = [
  { id: '00231', nome: 'Ana Beatriz Souza', cpf: '123.456.789-00', tel: '(31) 99876-5432', email: 'ana.souza@email.com', status: 'Ativo' },
  { id: '00232', nome: 'Carlos Eduardo Lima', cpf: '234.567.890-11', tel: '(31) 98765-4321', email: 'carlos.lima@email.com', status: 'Internado' },
  { id: '00233', nome: 'Mariana Oliveira', cpf: '345.678.901-22', tel: '(31) 97654-3210', email: 'mariana.o@email.com', status: 'Em atendimento' },
  { id: '00234', nome: 'João Pedro Almeida', cpf: '456.789.012-33', tel: '(31) 96543-2109', email: 'joao.almeida@email.com', status: 'Inativo' },
  { id: '00235', nome: 'Fernanda Costa', cpf: '567.890.123-44', tel: '(31) 95432-1098', email: 'fernanda.costa@email.com', status: 'Ativo' },
  { id: '00236', nome: 'Rafael Nogueira', cpf: '678.901.234-55', tel: '(31) 94321-0987', email: 'rafael.n@email.com', status: 'Internado' },
];

export default function ListagemPacientes() {
  const navigate = useNavigate();

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div className={styles.breadcrumb}>Início / <strong>Pacientes</strong></div>
        <div className={styles.titleRow}>
          <div>
            <h1>Pacientes</h1>
            <p>Gerencie os cadastros e acesse o histórico de cada paciente.</p>
          </div>
          <button className={styles.btnPrimary} onClick={() => navigate('/cadastro')}>+ Novo paciente</button>
        </div>
      </header>

      <section className={styles.cardsRow}>
        <div className={styles.card}>
          <span>Total de pacientes</span>
          <h2>1.284</h2>
          <small className={styles.positive}>+18 este mês</small>
        </div>
        <div className={styles.card}>
          <span>Consultas hoje</span>
          <h2>42</h2>
          <small>7 em andamento</small>
        </div>
        <div className={styles.card}>
          <span>Internados</span>
          <h2>16</h2>
          <small>3 altas previstas</small>
        </div>
        <div className={styles.card}>
          <span>Novos cadastros (semana)</span>
          <h2>23</h2>
          <small className={styles.positive}>+12% vs. anterior</small>
        </div>
      </section>

      <section className={styles.tableSection}>
        <div className={styles.tableHeader}>
          <h3>Lista de pacientes</h3>
          <div className={styles.filters}>
            <input type="text" placeholder="Buscar por nome ou CPF" className={styles.inputSearch} />
            <select className={styles.selectFilter}>
              <option>Em atendimento</option>
              <option>Todos</option>
            </select>
            <button className={styles.btnOutline}>Filtrar</button>
          </div>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Paciente</th>
              <th>CPF</th>
              <th>Telefone</th>
              <th>E-mail</th>
              <th>Situação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {mockPacientes.map((pac) => (
              <tr key={pac.id}>
                <td>
                  <div className={styles.pacienteInfo}>
                    <div className={styles.avatar}>{pac.nome.substring(0,2).toUpperCase()}</div>
                    <div>
                      <strong>{pac.nome}</strong>
                      <br/><small>Prontuário #{pac.id}</small>
                    </div>
                  </div>
                </td>
                <td>{pac.cpf}</td>
                <td>{pac.tel}</td>
                <td>{pac.email}</td>
                <td>
                  <span className={`${styles.badge} ${styles[pac.status.replace(' ', '')]}`}>
                    {pac.status}
                  </span>
                </td>
                <td className={styles.acoes}>
                  <button onClick={() => navigate(`/historico/${pac.id}`)}>Visualizar</button>
                  <button>Editar</button>
                  <button className={styles.delete}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}