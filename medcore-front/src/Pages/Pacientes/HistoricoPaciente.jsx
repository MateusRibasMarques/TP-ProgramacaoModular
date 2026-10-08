import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Layout from '../../Components/Layout/Layout';
import styles from './HistoricoPaciente.module.css';

// Mocks temporários para Sprint 1
const consultas = [
  { data: '12/09/2026 • 09:30', titulo: 'Cardiologia — Dr. Ricardo Menezes', texto: 'Avaliação de rotina. Pressão controlada, mantida a medicação atual.', status: 'Realizada' },
  { data: '02/06/2026 • 14:00', titulo: 'Clínica geral — Dra. Paula Andrade', texto: 'Queixa de cansaço frequente. Solicitados exames de sangue e hemograma.', status: 'Realizada' },
  { data: '18/02/2026 • 10:15', titulo: 'Dermatologia — Dra. Lúcia Prado', texto: 'Tratamento de dermatite de contato. Pomada prescrita por 10 dias.', status: 'Realizada' },
];

const internacoes = [
  { data: '10/03/2025 a 14/03/2025', titulo: 'Quarto 202 — Dr. Ricardo Menezes', texto: 'Crise hipertensiva. Ajuste de medicação e monitoramento contínuo.', status: 'Alta registrada' },
  { data: '22/11/2023 a 24/11/2023', titulo: 'Quarto 101 — Dra. Paula Andrade', texto: 'Desidratação por gastroenterite. Hidratação venosa.', status: 'Alta registrada' },
];

const resumo = [
  ['Tipo sanguíneo', 'O+'],
  ['Convênio', 'Unimed Nacional'],
  ['Médico de referência', 'Dra. Paula Andrade'],
  ['Cadastro', '05/08/2022'],
  ['Endereço', 'Rua das Acácias, 120 — Belo Horizonte - MG'],
];

export default function HistoricoPaciente() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [aba, setAba] = useState('consultas');
  const itens = aba === 'consultas' ? consultas : internacoes;

  return (
    <Layout>
      <div className={styles.page}>
        <div className={styles.crumb}>
          <Link to="/">Início</Link> / <Link to="/pacientes">Pacientes</Link> /{' '}
          <strong>Histórico médico</strong>
        </div>

        <div className={styles.head}>
          <div>
            <h1 className={styles.title}>Histórico médico</h1>
            <p className={styles.sub}>Registro consolidado de consultas e internações.</p>
          </div>
          <div className={styles.headAcoes}>
            <button type="button" className={styles.btnOutline} onClick={() => navigate(-1)}>
              ‹ Voltar
            </button>
            <button
              type="button"
              className={styles.btnPrimary}
              onClick={() => navigate(`/pacientes/editar/${id}`)}
            >
              Editar paciente
            </button>
          </div>
        </div>

        <div className={styles.perfil}>
          <div className={styles.avatar}>AS</div>
          <div className={styles.perfilInfo}>
            <div className={styles.nome}>Ana Beatriz Souza</div>
            <div className={styles.meta}>
              CPF 123.456.789-00 · 37 anos (14/03/1986) · (31) 99876-5432 · ana.souza@email.com
            </div>
          </div>
          <span className={styles.prontuario}>Prontuário #00231</span>
        </div>

        <div className={styles.contentGrid}>
          <aside className={styles.card}>
            <div className={styles.cardHead}>Resumo clínico</div>
            <ul className={styles.resumo}>
              {resumo.map(([rotulo, valor]) => (
                <li key={rotulo}>
                  <span>{rotulo}</span>
                  <strong>{valor}</strong>
                </li>
              ))}
            </ul>
            <div className={styles.alergias}>
              <strong>Alergias:</strong> dipirona e penicilina.
            </div>
          </aside>

          <section>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span>Consultas realizadas</span>
                <strong>8</strong>
              </div>
              <div className={styles.stat}>
                <span>Internações</span>
                <strong>{internacoes.length}</strong>
              </div>
              <div className={styles.stat}>
                <span>Última consulta</span>
                <strong>12/09/2026</strong>
              </div>
            </div>

            <div className={styles.panel}>
              <div className={styles.tabs}>
                <button
                  className={aba === 'consultas' ? `${styles.tab} ${styles.tabAtiva}` : styles.tab}
                  onClick={() => setAba('consultas')}
                >
                  Consultas realizadas <span className={styles.count}>8</span>
                </button>
                <button
                  className={aba === 'internacoes' ? `${styles.tab} ${styles.tabAtiva}` : styles.tab}
                  onClick={() => setAba('internacoes')}
                >
                  Internações <span className={styles.count}>{internacoes.length}</span>
                </button>
              </div>

              <div className={styles.timeline}>
                {itens.map((item) => (
                  <div key={item.data} className={styles.timelineItem}>
                    <div className={styles.timelineDot} />
                    <div className={styles.timelineConteudo}>
                      <div className={styles.meta}>{item.data}</div>
                      <div className={styles.nome}>{item.titulo}</div>
                      <p>{item.texto}</p>
                      <span className={styles.badge}>{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
