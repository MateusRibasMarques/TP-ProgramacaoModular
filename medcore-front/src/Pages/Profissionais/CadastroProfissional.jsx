import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import styles from "./CadastroProfissional.module.css";

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

const conselhos = ["CRM", "COREN", "CRO", "CREFITO", "CRP"];
const ufs = ["MG", "SP", "RJ", "ES", "BA", "GO", "DF", "PR", "RS", "SC"];

const vazio = {
  nome: "",
  cpf: "",
  dataNascimento: "",
  telefone: "",
  email: "",
  conselho: "CRM",
  uf: "MG",
  numero: "",
  especialidade: "",
  situacao: "Ativo",
};

function carregar() {
  const bruto = localStorage.getItem(KEY);
  if (bruto) return JSON.parse(bruto);
  localStorage.setItem(KEY, JSON.stringify(seed));
  return seed;
}

function maskCpf(v) {
  const n = v.replace(/\D/g, "").slice(0, 11);
  return n
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function maskTelefone(v) {
  const n = v.replace(/\D/g, "").slice(0, 11);
  if (n.length <= 2) return n;
  if (n.length <= 6) return `(${n.slice(0, 2)}) ${n.slice(2)}`;
  if (n.length <= 10) return `(${n.slice(0, 2)}) ${n.slice(2, 6)}-${n.slice(6)}`;
  return `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`;
}

function Campo({ label, erro, children }) {
  return (
    <label className={styles.campo}>
      <span className={styles.label}>{label}</span>
      {children}
      {erro && <span className={styles.erro}>{erro}</span>}
    </label>
  );
}

export default function CadastroProfissional() {
  const navigate = useNavigate();
  const { id } = useParams();
  const editando = Boolean(id);

  const [form, setForm] = useState(() => {
    if (!editando) return vazio;
    const achado = carregar().find((p) => String(p.id) === String(id));
    return achado ? { ...achado } : vazio;
  });
  const [erros, setErros] = useState({});

  function alterar(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }));
    setErros((e) => ({ ...e, [campo]: "" }));
  }

  function validar() {
    const e = {};
    if (form.nome.trim().length < 5) e.nome = "Informe o nome completo";
    if (form.cpf.length !== 14) e.cpf = "CPF inválido";
    if (!form.dataNascimento) e.dataNascimento = "Informe a data";
    if (form.telefone.length < 14) e.telefone = "Telefone inválido";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "E-mail inválido";
    if (!form.numero.trim()) e.numero = "Informe o número";
    if (!form.especialidade) e.especialidade = "Selecione a especialidade";
    setErros(e);
    return Object.keys(e).length === 0;
  }

  function salvar(ev) {
    ev.preventDefault();
    if (!validar()) return;
    const lista = carregar();
    let nova;
    if (editando) {
      nova = lista.map((p) => (String(p.id) === String(id) ? { ...form, id: p.id } : p));
    } else {
      const proximo = Math.max(0, ...lista.map((p) => p.id)) + 1;
      nova = [...lista, { ...form, id: proximo }];
    }
    localStorage.setItem(KEY, JSON.stringify(nova));
    navigate("/profissionais");
  }

  return (
    <Layout>
      <div className={styles.page}>
        <div className={styles.crumb}>
          <Link to="/">Início</Link> / <Link to="/profissionais">Profissionais</Link> /{" "}
          <strong>{editando ? "Editar" : "Cadastro"}</strong>
        </div>

        <div className={styles.head}>
          <div>
            <h1 className={styles.title}>
              {editando ? "Editar profissional" : "Cadastro de profissional"}
            </h1>
            <p className={styles.sub}>
              Preencha os dados do profissional da saúde.
            </p>
          </div>
          <button
            type="button"
            className={styles.btnOutline}
            onClick={() => navigate("/profissionais")}
          >
            ‹ Voltar
          </button>
        </div>

        <form className={styles.card} onSubmit={salvar} noValidate>
          <div className={styles.cardHead}>Dados pessoais</div>
          <div className={styles.grid}>
            <div className={styles.full}>
              <Campo label="Nome completo" erro={erros.nome}>
                <input
                  className={styles.input}
                  value={form.nome}
                  onChange={(e) => alterar("nome", e.target.value)}
                  placeholder="Ex.: Dra. Maria Souza"
                />
              </Campo>
            </div>
            <Campo label="CPF" erro={erros.cpf}>
              <input
                className={styles.input}
                value={form.cpf}
                onChange={(e) => alterar("cpf", maskCpf(e.target.value))}
                placeholder="000.000.000-00"
              />
            </Campo>
            <Campo label="Data de nascimento" erro={erros.dataNascimento}>
              <input
                type="date"
                className={styles.input}
                value={form.dataNascimento}
                onChange={(e) => alterar("dataNascimento", e.target.value)}
              />
            </Campo>
            <Campo label="Telefone" erro={erros.telefone}>
              <input
                className={styles.input}
                value={form.telefone}
                onChange={(e) => alterar("telefone", maskTelefone(e.target.value))}
                placeholder="(00) 00000-0000"
              />
            </Campo>
            <Campo label="E-mail" erro={erros.email}>
              <input
                className={styles.input}
                value={form.email}
                onChange={(e) => alterar("email", e.target.value)}
                placeholder="nome@clinicavida.com"
              />
            </Campo>
          </div>

          <div className={styles.cardHead}>Dados profissionais</div>
          <div className={styles.grid}>
            <Campo label="Conselho">
              <select
                className={styles.input}
                value={form.conselho}
                onChange={(e) => alterar("conselho", e.target.value)}
              >
                {conselhos.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Campo>
            <Campo label="UF">
              <select
                className={styles.input}
                value={form.uf}
                onChange={(e) => alterar("uf", e.target.value)}
              >
                {ufs.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </Campo>
            <Campo label="Número do registro" erro={erros.numero}>
              <input
                className={styles.input}
                value={form.numero}
                onChange={(e) => alterar("numero", e.target.value.replace(/\D/g, ""))}
                placeholder="Ex.: 48213"
              />
            </Campo>
            <Campo label="Especialidade" erro={erros.especialidade}>
              <select
                className={styles.input}
                value={form.especialidade}
                onChange={(e) => alterar("especialidade", e.target.value)}
              >
                <option value="">Selecione</option>
                {especialidades.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </Campo>
            <Campo label="Situação">
              <select
                className={styles.input}
                value={form.situacao}
                onChange={(e) => alterar("situacao", e.target.value)}
              >
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </select>
            </Campo>
          </div>

          <div className={styles.rodape}>
            <button
              type="button"
              className={styles.btnOutline}
              onClick={() => navigate("/profissionais")}
            >
              Cancelar
            </button>
            <button type="submit" className={styles.btnPrimary}>
              {editando ? "Salvar alterações" : "Cadastrar profissional"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}