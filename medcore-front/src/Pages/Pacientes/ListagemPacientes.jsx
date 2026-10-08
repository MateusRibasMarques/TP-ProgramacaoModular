import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../Components/Layout/Layout';
import { carregarPacientes } from './dados';
import styles from './ListagemPacientes.module.css';

const abas = ['Todos', 'Ativo', 'Em atendimento', 'Internado', 'Inativo'];

const rotuloAba = {
  Todos: 'Todos',
  Ativo: 'Ativos',
  'Em atendimento': 'Em atendimento',
  Internado: 'Internados',
  Inativo: 'Inativos',
};

function iniciais(nome) {
  const partes = nome.split(' ');
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
}

export default function ListagemPacientes() {
  const navigate = useNavigate();
  const [lista] = useState(carregarPacientes);
  const [aba, setAba] = useState('Todos');
  const [busca, setBusca] = useState('');

  function contar(status) {
    return status === 'Todos'
      ? lista.length
      : lista.filter((p) => p.status === status).length;
  }

  const termo = busca.trim().toLowerCase();
  const visiveis = lista
    .filter((p) => aba === 'Todos' || p.status === aba)
    .filter(
      (p) =>
        !termo ||
        p.nome.toLowerCase().includes(termo) ||
        p.cpf.includes(termo) ||
        p.id.includes(termo)
    );

  const classeStatus = {
    Ativo: styles.ativo,
    'Em atendimento': styles.atendimento,
    Internado: styles.internado,
    Inativo: styles.inativo,
  };

  return (
    <Layout>
      <div className={styles.page}>
        <div className={styles.crumb}>
          <Link to="/">Início</Link> / <strong>Pacientes</strong>
        </div>

        <div className={styles.head}>
          <div>
            <h1 className={styles.title}>Pacientes</h1>
            <p className={styles.sub}>
              Gerencie os cadastros e acesse o histórico de cada paciente.
            </p>
          </div>
          <button className={styles.btnPrimary} onClick={() => navigate('/cadastro')}>
            + Novo paciente
          </button>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span>Total de pacientes</span>
            <strong>1.284</strong>
            <small className={styles.positivo}>+18 este mês</small>
          </div>
          <div className={styles.stat}>
            <span>Consultas hoje</span>
            <strong>42</strong>
            <small>7 em andamento</small>
          </div>
          <div className={styles.stat}>
            <span>Internados</span>
            <strong>16</strong>
            <small>3 altas previstas</small>
          </div>
          <div className={styles.stat}>
            <span>Novos cadastros (semana)</span>
            <strong>23</strong>
            <small className={styles.positivo}>+12% vs. anterior</small>
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.tabsBar}>
            <div className={styles.tabs}>
              {abas.map((a) => (
                <button
                  key={a}
                  className={aba === a ? `${styles.tab} ${styles.tabAtiva}` : styles.tab}
                  onClick={() => setAba(a)}
                >
                  {rotuloAba[a]}
                  <span className={styles.count}>{contar(a)}</span>
                </button>
              ))}
            </div>
            <input
              className={styles.input}
              placeholder="Buscar por nome, CPF ou prontuário"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          <div className={styles.tableWrap}>
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
                {visiveis.map((pac) => (
                  <tr key={pac.id}>
                    <td>
                      <div className={styles.pacienteInfo}>
                        <div className={styles.avatar}>{iniciais(pac.nome)}</div>
                        <div>
                          <div className={styles.nome}>{pac.nome}</div>
                          <div className={styles.meta}>Prontuário #{pac.id}</div>
                        </div>
                      </div>
                    </td>
                    <td>{pac.cpf}</td>
                    <td>{pac.tel}</td>
                    <td>{pac.email}</td>
                    <td>
                      <span className={`${styles.badge} ${classeStatus[pac.status]}`}>
                        {pac.status}
                      </span>
                    </td>
                    <td>
                      <div className={styles.acoes}>
                        <button
                          className={styles.btnMini}
                          onClick={() => navigate(`/historico/${pac.id}`)}
                        >
                          Visualizar
                        </button>
                        <button
                          className={styles.btnMini}
                          onClick={() => navigate(`/pacientes/editar/${pac.id}`)}
                        >
                          Editar
                        </button>
                        <button className={`${styles.btnMini} ${styles.btnDanger}`}>
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {visiveis.length === 0 && (
                  <tr>
                    <td colSpan={6} className={styles.vazio}>
                      Nenhum paciente encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className={styles.footer}>
            Mostrando {visiveis.length} de {lista.length} pacientes
          </div>
        </div>
      </div>
    </Layout>
  );
}
