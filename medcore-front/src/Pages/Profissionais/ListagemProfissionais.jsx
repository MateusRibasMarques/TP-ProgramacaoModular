import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import styles from "./ListagemProfissionais.module.css";

const KEY = "clinicavida:profissionais";

const seed = [
  { id: 1, nome: "Dr. Ricardo Menezes", cpf: "111.222.333-44", dataNascimento: "1979-04-12", telefone: "(31) 99811-2233", email: "ricardo.menezes@clinicavida.com", conselho: "CRM", uf: "MG", numero: "48213", especialidade: "Cardiologia", situacao: "Ativo" },
  { id: 2, nome: "Dra. Paula Andrade", cpf: "222.333.444-55", dataNascimento: "1983-09-30", telefone: "(31) 99722-3344", email: "paula.andrade@clinicavida.com", conselho: "CRM", uf: "MG", numero: "39871", especialidade: "Clínica geral", situacao: "Ativo" },
  { id: 3, nome: "Dra. Lúcia Prado", cpf: "333.444.555-66", dataNascimento: "1986-01-18", telefone: "(31) 99633-4455", email: "lucia.prado@clinicavida.com", conselho: "CRM", uf: "MG", numero: "52044", especialidade: "Dermatologia", situacao: "Ativo" },
  { id: 4, nome: "Dr. Henrique Tavares", cpf: "444.555.666-77", dataNascimento: "1975-07-05", telefone: "(31) 99544-5566", email: "henrique.tavares@clinicavida.com", conselho: "CRM", uf: "MG", numero: "41567", especialidade: "Cirurgia geral", situacao: "Ativo" },
  { id: 5, nome: "Dra. Camila Rocha", cpf: "555.666.777-88", dataNascimento: "1990-11-22", telefone: "(31) 99455-6677", email: "camila.rocha@clinicavida.com", conselho: "CRM", uf: "MG", numero: "60318", especialidade: "Pediatria", situacao: "Ativo" },
  { id: 6, nome: "Dr. Bruno Teixeira", cpf: "666.777.888-99", dataNascimento: "1981-03-09", telefone: "(31) 99366-7788", email: "bruno.teixeira@clinicavida.com", conselho: "CRM", uf: "MG", numero: "57702", especialidade: "Ortopedia", situacao: "Inativo" },
];

const especialidades = [
  "Cardiologia",
  "Clínica geral",
  "Dermatologia",
  "Cirurgia geral",
  "Pediatria",
  "Ortopedia",
  "Ginecologia",
  "Neurologia",
];

function carregar() {
  const bruto = localStorage.getItem(KEY);
  if (bruto) return JSON.parse(bruto);
  localStorage.setItem(KEY, JSON.stringify(seed));
  return seed;
}

function iniciais(nome) {
  return nome
    .replace(/^(Dr|Dra)\.?\s+/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0])
    .join("")
    .toUpperCase();
}

export default function ListagemProfissionais() {
  const navigate = useNavigate();
  const [lista, setLista] = useState(carregar);
  const [busca, setBusca] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [filtros, setFiltros] = useState({ busca: "", especialidade: "" });

  function excluir(id) {
    if (!window.confirm("Deseja excluir este profissional?")) return;
    const nova = lista.filter((p) => p.id !== id);
    localStorage.setItem(KEY, JSON.stringify(nova));
    setLista(nova);
  }

  const termo = filtros.busca.trim().toLowerCase();
  const visiveis = lista.filter((p) => {
    const registro = `${p.conselho}-${p.uf} ${p.numero}`.toLowerCase();
    const okBusca =
      !termo || p.nome.toLowerCase().includes(termo) || registro.includes(termo);
    const okEsp = !filtros.especialidade || p.especialidade === filtros.especialidade;
    return okBusca && okEsp;
  });

  const ativos = lista.filter((p) => p.situacao === "Ativo").length;
  const totalEsp = new Set(lista.map((p) => p.especialidade)).size;

  return (
    <Layout>
      <div className={styles.page}>
        <div className={styles.crumb}>
          <Link to="/">Início</Link> / <strong>Profissionais</strong>
        </div>

        <div className={styles.head}>
          <div>
            <h1 className={styles.title}>Profissionais da saúde</h1>
            <p className={styles.sub}>
              Gerencie os cadastros e as especialidades dos profissionais.
            </p>
          </div>
          <button
            className={styles.btnPrimary}
            onClick={() => navigate("/profissionais/novo")}
          >
            + Novo profissional
          </button>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <strong>{lista.length}</strong>
            <span>Total de profissionais</span>
          </div>
          <div className={styles.stat}>
            <strong>{ativos}</strong>
            <span>Profissionais ativos</span>
          </div>
          <div className={styles.stat}>
            <strong>{totalEsp}</strong>
            <span>Especialidades</span>
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.panelHead}>
            <h2>Lista de profissionais</h2>
            <div className={styles.filtros}>
              <input
                className={styles.input}
                placeholder="Buscar por nome ou registro"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
              <select
                className={styles.select}
                value={especialidade}
                onChange={(e) => setEspecialidade(e.target.value)}
              >
                <option value="">Todas as especialidades</option>
                {especialidades.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
              <button
                className={styles.btnOutline}
                onClick={() => setFiltros({ busca, especialidade })}
              >
                Filtrar
              </button>
            </div>
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Profissional</th>
                  <th>Registro profissional</th>
                  <th>Especialidade</th>
                  <th>Telefone</th>
                  <th>E-mail</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {visiveis.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div className={styles.pessoa}>
                        <span className={styles.avatar}>{iniciais(p.nome)}</span>
                        <div>
                          <div className={styles.nome}>{p.nome}</div>
                          <div className={styles.meta}>
                            {p.situacao === "Ativo" ? "Ativo" : "Inativo"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{`${p.conselho}-${p.uf} ${p.numero}`}</td>
                    <td>
                      <span className={styles.badge}>{p.especialidade}</span>
                    </td>
                    <td>{p.telefone}</td>
                    <td>{p.email}</td>
                    <td>
                      <div className={styles.acoes}>
                        <button
                          className={styles.btnMini}
                          onClick={() => navigate(`/profissionais/editar/${p.id}`)}
                        >
                          Editar
                        </button>
                        <button
                          className={`${styles.btnMini} ${styles.btnDanger}`}
                          onClick={() => excluir(p.id)}
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {visiveis.length === 0 && (
                  <tr>
                    <td colSpan={6} className={styles.vazio}>
                      Nenhum profissional encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className={styles.footer}>
            Mostrando {visiveis.length} de {lista.length} profissionais
          </div>
        </div>
      </div>
    </Layout>
  );
}