import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import {
  carregarQuartos,
  salvarQuartos,
  carregarInternacoes,
  ocupacao,
} from "../Internacoes/dados";
import styles from "./ListagemQuartos.module.css";

const abas = ["Todos", "Disponível", "Ocupado"];

export default function ListagemQuartos() {
  const navigate = useNavigate();
  const [quartos, setQuartos] = useState(carregarQuartos);
  const [internacoes] = useState(carregarInternacoes);
  const [aba, setAba] = useState("Todos");
  const [andar, setAndar] = useState("Todos");
  const [modo, setModo] = useState("cards");

  const comOcupacao = quartos.map((q) => ({ ...q, ...ocupacao(q, internacoes) }));

  function excluir(q) {
    if (q.ocupados > 0) {
      alert("Não é possível excluir um quarto com pacientes internados.");
      return;
    }
    if (!window.confirm(`Excluir o quarto ${q.numero}?`)) return;
    const nova = quartos.filter((item) => item.id !== q.id);
    salvarQuartos(nova);
    setQuartos(nova);
  }

  function contar(status) {
    return status === "Todos"
      ? comOcupacao.length
      : comOcupacao.filter((q) => q.status === status).length;
  }

  const andares = [...new Set(quartos.map((q) => q.andar))].sort();
  const totalLeitos = comOcupacao.reduce((s, q) => s + q.capacidade, 0);
  const leitosOcupados = comOcupacao.reduce((s, q) => s + q.ocupados, 0);
  const taxa = totalLeitos ? Math.round((leitosOcupados / totalLeitos) * 100) : 0;

  const visiveis = comOcupacao
    .filter((q) => aba === "Todos" || q.status === aba)
    .filter((q) => andar === "Todos" || q.andar === andar)
    .sort((a, b) => a.numero.localeCompare(b.numero, undefined, { numeric: true }));

  return (
    <Layout>
      <div className={styles.page}>
        <div className={styles.crumb}>
          <Link to="/">Início</Link> / <strong>Quartos</strong>
        </div>

        <div className={styles.head}>
          <div>
            <h1 className={styles.title}>Dashboard de leitos</h1>
            <p className={styles.sub}>
              Acompanhe a ocupação dos quartos e leitos da clínica.
            </p>
          </div>
          <button className={styles.btnPrimary} onClick={() => navigate("/quartos/novo")}>
            + Novo quarto
          </button>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span>Quartos cadastrados</span>
            <strong>{quartos.length}</strong>
          </div>
          <div className={styles.stat}>
            <span>Disponíveis</span>
            <strong>{contar("Disponível")}</strong>
          </div>
          <div className={`${styles.stat} ${styles.statOcupado}`}>
            <span>Ocupados</span>
            <strong>{contar("Ocupado")}</strong>
          </div>
          <div className={styles.stat}>
            <span>Leitos ocupados</span>
            <strong>
              {leitosOcupados}/{totalLeitos}
            </strong>
            <div className={styles.barra}>
              <div className={styles.barraFill} style={{ width: `${taxa}%` }} />
            </div>
            <small>{taxa}% de ocupação</small>
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
                  {a === "Todos" ? "Todos" : `${a}s`}
                  <span className={styles.count}>{contar(a)}</span>
                </button>
              ))}
            </div>
            <div className={styles.filtros}>
              <select
                className={styles.input}
                value={andar}
                onChange={(e) => setAndar(e.target.value)}
              >
                <option value="Todos">Todos os andares</option>
                {andares.map((a) => (
                  <option key={a} value={a}>
                    {a}º andar
                  </option>
                ))}
              </select>
              <div className={styles.toggle}>
                <button
                  className={modo === "cards" ? styles.toggleAtivo : ""}
                  onClick={() => setModo("cards")}
                >
                  Cards
                </button>
                <button
                  className={modo === "tabela" ? styles.toggleAtivo : ""}
                  onClick={() => setModo("tabela")}
                >
                  Tabela
                </button>
              </div>
            </div>
          </div>

          {modo === "cards" ? (
            <div className={styles.cards}>
              {visiveis.map((q) => (
                <div
                  key={q.id}
                  className={`${styles.card} ${
                    q.status === "Ocupado" ? styles.cardOcupado : styles.cardDisponivel
                  }`}
                >
                  <div className={styles.cardTopo}>
                    <div>
                      <div className={styles.numero}>Quarto {q.numero}</div>
                      <div className={styles.meta}>
                        {q.andar}º andar · {q.tipo}
                      </div>
                    </div>
                    <span
                      className={`${styles.badge} ${
                        q.status === "Ocupado" ? styles.ocupado : styles.disponivel
                      }`}
                    >
                      {q.status}
                    </span>
                  </div>

                  <div className={styles.leitos}>
                    {Array.from({ length: q.capacidade }, (_, i) => (
                      <span
                        key={i}
                        className={i < q.ocupados ? styles.leitoOcupado : styles.leitoLivre}
                        title={i < q.ocupados ? "Leito ocupado" : "Leito livre"}
                      />
                    ))}
                  </div>
                  <div className={styles.meta}>
                    Capacidade: {q.capacidade} {q.capacidade === 1 ? "leito" : "leitos"} ·{" "}
                    {q.livres} {q.livres === 1 ? "livre" : "livres"}
                  </div>

                  <div className={styles.cardAcoes}>
                    <button
                      className={styles.btnMini}
                      onClick={() => navigate(`/quartos/editar/${q.id}`)}
                    >
                      Editar
                    </button>
                    <button
                      className={`${styles.btnMini} ${styles.btnDanger}`}
                      onClick={() => excluir(q)}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
              {visiveis.length === 0 && (
                <div className={styles.vazio}>Nenhum quarto encontrado.</div>
              )}
            </div>
          ) : (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Quarto</th>
                    <th>Andar</th>
                    <th>Tipo</th>
                    <th>Capacidade</th>
                    <th>Ocupação</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {visiveis.map((q) => (
                    <tr key={q.id}>
                      <td className={styles.numero}>{q.numero}</td>
                      <td>{q.andar}º andar</td>
                      <td>{q.tipo}</td>
                      <td>
                        {q.capacidade} {q.capacidade === 1 ? "leito" : "leitos"}
                      </td>
                      <td>
                        {q.ocupados}/{q.capacidade}
                      </td>
                      <td>
                        <span
                          className={`${styles.badge} ${
                            q.status === "Ocupado" ? styles.ocupado : styles.disponivel
                          }`}
                        >
                          {q.status}
                        </span>
                      </td>
                      <td>
                        <div className={styles.acoes}>
                          <button
                            className={styles.btnMini}
                            onClick={() => navigate(`/quartos/editar/${q.id}`)}
                          >
                            Editar
                          </button>
                          <button
                            className={`${styles.btnMini} ${styles.btnDanger}`}
                            onClick={() => excluir(q)}
                          >
                            Excluir
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {visiveis.length === 0 && (
                    <tr>
                      <td colSpan={7} className={styles.vazio}>
                        Nenhum quarto encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          <div className={styles.footer}>
            Mostrando {visiveis.length} de {quartos.length} quartos
          </div>
        </div>
      </div>
    </Layout>
  );
}
