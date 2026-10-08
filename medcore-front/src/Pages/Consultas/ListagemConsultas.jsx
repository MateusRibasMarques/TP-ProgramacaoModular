import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import { carregarConsultas, salvarConsultas } from "./dados";
import styles from "./ListagemConsultas.module.css";

const abas = ["Todas", "Agendada", "Realizada", "Cancelada"];

function formatData(d) {
  return d ? d.split("-").reverse().join("/") : "—";
}

export default function ListagemConsultas() {
  const navigate = useNavigate();
  const [lista, setLista] = useState(carregarConsultas);
  const [aba, setAba] = useState("Todas");
  const [busca, setBusca] = useState("");

  function mudarStatus(id, status) {
    const nova = lista.map((c) => (c.id === id ? { ...c, status } : c));
    salvarConsultas(nova);
    setLista(nova);
  }

  function contar(status) {
    return status === "Todas" ? lista.length : lista.filter((c) => c.status === status).length;
  }

  const termo = busca.trim().toLowerCase();
  const visiveis = lista
    .filter((c) => aba === "Todas" || c.status === aba)
    .filter(
      (c) =>
        !termo ||
        c.pacienteNome.toLowerCase().includes(termo) ||
        c.profissionalNome.toLowerCase().includes(termo) ||
        c.motivo.toLowerCase().includes(termo)
    )
    .sort((a, b) => (b.data + b.hora).localeCompare(a.data + a.hora));

  const classeStatus = {
    Agendada: styles.agendada,
    Realizada: styles.realizada,
    Cancelada: styles.cancelada,
  };

  return (
    <Layout>
      <div className={styles.page}>
        <div className={styles.crumb}>
          <Link to="/">Início</Link> / <strong>Consultas</strong>
        </div>

        <div className={styles.head}>
          <div>
            <h1 className={styles.title}>Consultas</h1>
            <p className={styles.sub}>
              Visão geral e gerenciamento das consultas da clínica.
            </p>
          </div>
          <button
            className={styles.btnPrimary}
            onClick={() => navigate("/consultas/agendar")}
          >
            + Agendar consulta
          </button>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span>Agendadas</span>
            <strong>{contar("Agendada")}</strong>
          </div>
          <div className={styles.stat}>
            <span>Realizadas</span>
            <strong>{contar("Realizada")}</strong>
          </div>
          <div className={styles.stat}>
            <span>Canceladas</span>
            <strong>{contar("Cancelada")}</strong>
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
                  {a === "Todas" ? "Todas" : `${a}s`}
                  <span className={styles.count}>{contar(a)}</span>
                </button>
              ))}
            </div>
            <input
              className={styles.input}
              placeholder="Buscar paciente, profissional ou motivo"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Data e horário</th>
                  <th>Paciente</th>
                  <th>Profissional</th>
                  <th>Especialidade</th>
                  <th>Motivo</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {visiveis.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <div className={styles.nome}>{formatData(c.data)}</div>
                      <div className={styles.meta}>{c.hora}</div>
                    </td>
                    <td>{c.pacienteNome}</td>
                    <td>{c.profissionalNome}</td>
                    <td>{c.especialidade}</td>
                    <td className={styles.motivo}>{c.motivo}</td>
                    <td>
                      <span className={`${styles.badge} ${classeStatus[c.status]}`}>
                        {c.status}
                      </span>
                    </td>
                    <td>
                      <div className={styles.acoes}>
                        {c.status === "Agendada" ? (
                          <>
                            <button
                              className={styles.btnMini}
                              onClick={() => mudarStatus(c.id, "Realizada")}
                            >
                              Realizar
                            </button>
                            <button
                              className={`${styles.btnMini} ${styles.btnDanger}`}
                              onClick={() => mudarStatus(c.id, "Cancelada")}
                            >
                              Cancelar
                            </button>
                          </>
                        ) : (
                          <button
                            className={styles.btnMini}
                            onClick={() => mudarStatus(c.id, "Agendada")}
                          >
                            Reagendar
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {visiveis.length === 0 && (
                  <tr>
                    <td colSpan={7} className={styles.vazio}>
                      Nenhuma consulta encontrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className={styles.footer}>
            Mostrando {visiveis.length} de {lista.length} consultas
          </div>
        </div>
      </div>
    </Layout>
  );
}