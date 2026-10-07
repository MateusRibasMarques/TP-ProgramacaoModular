import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HistoricoPaciente.module.css';

export default function HistoricoPaciente() {
  const navigate = useNavigate();

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <div>
            <div className={styles.breadcrumb}>Início / Pacientes / <strong>Histórico médico</strong></div>
            <h1>Histórico médico</h1>
            <p>Registro consolidado de consultas e internações.</p>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.btnOutline} onClick={() => navigate(-1)}>&larr; Voltar</button>
            <button className={styles.btnPrimary}>Editar paciente</button>
          </div>
        </div>
      </header>

      <div className={styles.heroCard}>
        <div className={styles.heroAvatar}>AS</div>
        <div className={styles.heroInfo}>
          <h2>Ana Beatriz Souza</h2>
          <p>CPF 123.456.789-00 &nbsp;|&nbsp; 37 anos (14/03/1986) &nbsp;|&nbsp; (31) 99876-5432 &nbsp;|&nbsp; ana.souza@email.com</p>
        </div>
        <div className={styles.prontuario}>Prontuário #00231</div>
      </div>

      <div className={styles.contentGrid}>
        <aside className={styles.sidebarResumo}>
          <h3>Resumo clínico</h3>
          <ul>
            <li><span>Tipo sanguíneo</span> <strong>O+</strong></li>
            <li><span>Convênio</span> <strong>Unimed Nacional</strong></li>
            <li><span>Médico de referência</span> <strong>Dra. Paula Andrade</strong></li>
            <li><span>Cadastro</span> <strong>05/08/2022</strong></li>
            <li><span>Endereço</span> <strong>Rua das Acácias, 120<br/>Belo Horizonte - MG</strong></li>
          </ul>
          <div className={styles.alergias}>
            <strong>Alergias:</strong> dipirona e penicilina.
          </div>
        </aside>

        <section className={styles.mainContent}>
          <div className={styles.statsRow}>
            <div className={styles.statBox}>
              <h2>8</h2>
              <span>Consultas realizadas</span>
            </div>
            <div className={styles.statBox}>
              <h2>2</h2>
              <span>Internações</span>
            </div>
            <div className={styles.statBox}>
              <h2 className={styles.dateDark}>12/09/2026</h2>
              <span>Última consulta</span>
            </div>
          </div>

          <div className={styles.tabs}>
            <button className={styles.tabActive}>Consultas realizadas <span>8</span></button>
            <button className={styles.tab}>Internações <span>2</span></button>
          </div>

          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineContent}>
                <small>12/09/2026 • 09:30</small>
                <h4>Cardiologia — Dr. Ricardo Menezes</h4>
                <p>Avaliação de rotina. Pressão controlada, mantida a medicação atual.</p>
                <span className={styles.statusRealizada}>Realizada</span>
              </div>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineContent}>
                <small>02/06/2026 • 14:00</small>
                <h4>Clínica geral — Dra. Paula Andrade</h4>
                <p>Queixa de cansaço frequente. Solicitados exames de sangue e hemograma.</p>
                <span className={styles.statusRealizada}>Realizada</span>
              </div>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineContent}>
                <small>18/02/2026 • 10:15</small>
                <h4>Dermatologia — Dra. Lúcia Prado</h4>
                <p>Tratamento de dermatite de contato. Pomada prescrita por 10 dias.</p>
                <span className={styles.statusRealizada}>Realizada</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}