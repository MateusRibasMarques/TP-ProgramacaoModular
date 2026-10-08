import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import { carregarInternacoes, formatData, hoje } from "./dados";
import styles from "./ListagemInternacoes.module.css";

const abas = ["Todas", "Ativa", "Em andamento", "Alta registrada"];

const rotuloAba = {
  Todas: "Todas",
  Ativa: "Ativas",
  "Em andamento": "Em andamento",
  "Alta registrada": "Com alta",
};

function dias(entrada, saida) {
  const ms = new Date(saida) - new Date(entrada);
  return Math.max(0, Math.round(ms / 86400000));
}

export default function ListagemInternacoes() {
  const navigate = useNavigate();
  const [lista] = useState(carregarInternacoes);
  const [aba, setAba] = useState("Todas");
  const [busca, setBusca] = useState("");

  function contar(status) {
    return status === "Todas" ? lista.length : lista.filter((i) => i.status === status).length;
  }

  const termo = busca.trim().toLowerCase();
  const visiveis = lista
    .filter((i) => aba === "Todas" || i.status === aba)
    .filter(
      (i) =>
        !termo ||
        i.pacienteNome.toLowerCase().includes(termo) ||
        i.profissionalNome.toLowerCase().includes(termo) ||
        i.quartoNumero.includes(termo)
    )
    .sort((a, b) => b.dataEntrada.localeCompare(a.dataEntrada));

  const classeStatus = {
    Ativa: styles.ativa,
    "Em andamento": styles.andamento,
    "Alta registrada": styles.alta,
  };

  const dataHoje = hoje();
  const altasPrevistasHoje = lista.filter(
    (i) => i.status !== "Alta registrada" && i.previsaoAlta === dataHoje
  ).length;

  return (
    <Layout>
      <div className={styles.page}>
        <div className={styles.crumb}>
          <Link to="/">Início</Link> / <strong>Internações</strong>
        </div>

        <div className={styles.head}>
          <div>
            <h1 className={styles.title}>Internações</h1>
            <p className={styles.sub}>
              Acompanhe as internações ativas, em andamento e as altas registradas.
            </p>
          </div>
          <button className={styles.btnPrimary} onClick={() => navigate("/internacoes/nova")}>
            + Registrar internação
          </button>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span>Ativas</span>
            <strong>{contar("Ativa")}</strong>
          </div>
          <div className={styles.stat}>
            <span>Em andamento</span>
            <strong>{contar("Em andamento")}</strong>
          </div>
          <div className={styles.stat}>
            <span>Altas registradas</span>
            <strong>{contar("Alta registrada")}</strong>
          </div>
          <div className={styles.stat}>
            <span>Altas previstas para hoje</span>
            <strong>{altasPrevistasHoje}</strong>
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
              placeholder="Buscar paciente, profissional ou quarto"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Paciente</th>
                  <th>Quarto</th>
                  <th>Profissional responsável</th>
                  <th>Entrada</th>
                  <th>Previsão / Alta</th>
                  <th>Permanência</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {visiveis.map((i) => {
                  const comAlta = i.status === "Alta registrada";
                  const atrasada = !comAlta && i.previsaoAlta && i.previsaoAlta < dataHoje;
                  return (
                    <tr key={i.id}>
                      <td>
                        <div className={styles.nome}>{i.pacienteNome}</div>
                        {i.observacoes && (
                          <div className={`${styles.meta} ${styles.obs}`}>{i.observacoes}</div>
                        )}
                      </td>
                      <td>{i.quartoNumero}</td>
                      <td>{i.profissionalNome}</td>
                      <td>{formatData(i.dataEntrada)}</td>
                      <td>
                        {comAlta ? (
                          <>
                            <div className={styles.nome}>{formatData(i.dataAlta)}</div>
                            <div className={styles.meta}>Alta</div>
                          </>
                        ) : (
                          <>
                            <div className={atrasada ? styles.atrasada : styles.nome}>
                              {formatData(i.previsaoAlta)}
                            </div>
                            <div className={styles.meta}>
                              {atrasada ? "Previsão vencida" : "Previsão"}
                            </div>
                          </>
                        )}
                      </td>
                      <td>
                        {dias(i.dataEntrada, comAlta ? i.dataAlta : dataHoje)} dia(s)
                      </td>
                      <td>
                        <span className={`${styles.badge} ${classeStatus[i.status]}`}>
                          {i.status}
                        </span>
                      </td>
                      <td>
                        <div className={styles.acoes}>
                          <button
                            className={styles.btnMini}
                            onClick={() => navigate(`/internacoes/editar/${i.id}`)}
                          >
                            {comAlta ? "Ver" : "Editar"}
                          </button>
                          {!comAlta && (
                            <button
                              className={`${styles.btnMini} ${styles.btnAlta}`}
                              onClick={() => navigate(`/internacoes/editar/${i.id}?alta=1`)}
                            >
                              Registrar alta
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {visiveis.length === 0 && (
                  <tr>
                    <td colSpan={8} className={styles.vazio}>
                      Nenhuma internação encontrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className={styles.footer}>
            Mostrando {visiveis.length} de {lista.length} internações
          </div>
        </div>
      </div>
    </Layout>
  );
}
