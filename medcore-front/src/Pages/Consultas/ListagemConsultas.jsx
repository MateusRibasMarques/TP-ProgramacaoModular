import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import styles from "./ListagemConsultas.module.css";

const KEY = "clinicavida:consultas";

const seed = [
  { id: 1, pacienteId: 1, pacienteNome: "Ana Beatriz Souza", profissionalId: 1, profissionalNome: "Dr. Ricardo Menezes", especialidade: "Cardiologia", data: "2026-10-15", hora: "09:30", motivo: "Retorno cardiológico", observacoes: "", status: "Agendada" },
  { id: 2, pacienteId: 2, pacienteNome: "Carlos Eduardo Lima", profissionalId: 2, profissionalNome: "Dra. Paula Andrade", especialidade: "Clínica geral", data: "2026-10-08", hora: "14:00", motivo: "Avaliação pós-internação", observacoes: "Paciente em recuperação", status: "Agendada" },
  { id: 3, pacienteId: 3, pacienteNome: "Mariana Oliveira", profissionalId: 3, profissionalNome: "Dra. Lúcia Prado", especialidade: "Dermatologia", data: "2026-10-09", hora: "10:30", motivo: "Manchas na pele", observacoes: "", status: "Agendada" },
  { id: 4, pacienteId: 4, pacienteNome: "João Pedro Almeida", profissionalId: 4, profissionalNome: "Dr. Henrique Tavares", especialidade: "Cirurgia geral", data: "2026-10-06", hora: "08:30", motivo: "Revisão pós-operatória", observacoes: "Cicatrização dentro do esperado", status: "Realizada" },
  { id: 5, pacienteId: 5, pacienteNome: "Fernanda Costa", profissionalId: 6, profissionalNome: "Dr. Bruno Teixeira", especialidade: "Ortopedia", data: "2026-10-05", hora: "16:00", motivo: "Dor no joelho", observacoes: "", status: "Realizada" },
  { id: 6, pacienteId: 6, pacienteNome: "Rafael Nogueira", profissionalId: 2, profissionalNome: "Dra. Paula Andrade", especialidade: "Clínica geral", data: "2026-10-02", hora: "11:00", motivo: "Exames de rotina", observacoes: "", status: "Cancelada" },
  { id: 7, pacienteId: 1, pacienteNome: "Ana Beatriz Souza", profissionalId: 1, profissionalNome: "Dr. Ricardo Menezes", especialidade: "Cardiologia", data: "2026-09-12", hora: "09:30", motivo: "Avaliação de rotina", observacoes: "Pressão controlada", status: "Realizada" },
];

const abas = ["Todas", "Agendada", "Realizada", "Cancelada"];

function carregar() {
  const bruto = localStorage.getItem(KEY);
  if (bruto) return JSON.parse(bruto);
  localStorage.setItem(KEY, JSON.stringify(seed));
  return seed;
}

function formatData(d) {
  return d ? d.split("-").reverse().join("/") : "—";
}

export default function ListagemConsultas() {
  const navigate = useNavigate();
  const [lista, setLista] = useState(carregar);
  const [aba, setAba] = useState("Todas");
  const [busca, setBusca] = useState("");

  function mudarStatus(id, status) {
    const nova = lista.map((c) => (c.id === id ? { ...c, status } : c));
    localStorage.setItem(KEY, JSON.stringify(nova));
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