import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import {
  carregarQuartos,
  salvarQuartos,
  carregarInternacoes,
  ocupacao,
  proximoId,
  tiposQuarto,
} from "../Internacoes/dados";
import styles from "./CadastroQuarto.module.css";

const vazio = {
  numero: "",
  andar: "",
  capacidade: "",
  tipo: "Enfermaria",
  observacoes: "",
};

function Campo({ label, erro, children }) {
  return (
    <label className={styles.campo}>
      <span className={styles.label}>{label}</span>
      {children}
      {erro && <span className={styles.erro}>{erro}</span>}
    </label>
  );
}

export default function CadastroQuarto() {
  const navigate = useNavigate();
  const { id } = useParams();
  const editando = Boolean(id);

  const [form, setForm] = useState(() => {
    if (!editando) return vazio;
    const achado = carregarQuartos().find((q) => String(q.id) === String(id));
    return achado ? { ...achado, capacidade: String(achado.capacidade) } : vazio;
  });
  const [erros, setErros] = useState({});

  const ocupados = editando
    ? ocupacao({ id: Number(id), capacidade: 0 }, carregarInternacoes()).ocupados
    : 0;

  function alterar(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }));
    setErros((e) => ({ ...e, [campo]: "" }));
  }

  function validar() {
    const e = {};
    const numero = form.numero.trim();
    const capacidade = Number(form.capacidade);
    if (!numero) e.numero = "Informe o número do quarto";
    else if (
      carregarQuartos().some(
        (q) => q.numero === numero && String(q.id) !== String(id)
      )
    )
      e.numero = "Já existe um quarto com este número";
    if (form.andar === "") e.andar = "Informe o andar";
    if (!Number.isInteger(capacidade) || capacidade < 1)
      e.capacidade = "Informe ao menos 1 leito";
    else if (capacidade < ocupados)
      e.capacidade = `Há ${ocupados} paciente(s) internado(s) neste quarto`;
    setErros(e);
    return Object.keys(e).length === 0;
  }

  function salvar(ev) {
    ev.preventDefault();
    if (!validar()) return;
    const lista = carregarQuartos();
    const dados = { ...form, numero: form.numero.trim(), capacidade: Number(form.capacidade) };
    let nova;
    if (editando) {
      nova = lista.map((q) => (String(q.id) === String(id) ? { ...dados, id: q.id } : q));
    } else {
      nova = [...lista, { ...dados, id: proximoId(lista) }];
    }
    salvarQuartos(nova);
    navigate("/quartos");
  }

  return (
    <Layout>
      <div className={styles.page}>
        <div className={styles.crumb}>
          <Link to="/">Início</Link> / <Link to="/quartos">Quartos</Link> /{" "}
          <strong>{editando ? "Editar" : "Cadastro"}</strong>
        </div>

        <div className={styles.head}>
          <div>
            <h1 className={styles.title}>
              {editando ? `Editar quarto ${form.numero}` : "Cadastro de quarto"}
            </h1>
            <p className={styles.sub}>Gerencie os dados do quarto e sua capacidade de leitos.</p>
          </div>
          <button
            type="button"
            className={styles.btnOutline}
            onClick={() => navigate("/quartos")}
          >
            ‹ Voltar
          </button>
        </div>

        <form className={styles.card} onSubmit={salvar} noValidate>
          <div className={styles.cardHead}>Dados do quarto</div>
          <div className={styles.grid}>
            <Campo label="Número do quarto" erro={erros.numero}>
              <input
                className={styles.input}
                value={form.numero}
                onChange={(e) => alterar("numero", e.target.value)}
                placeholder="Ex.: 104"
              />
            </Campo>
            <Campo label="Andar" erro={erros.andar}>
              <input
                type="number"
                min="0"
                className={styles.input}
                value={form.andar}
                onChange={(e) => alterar("andar", e.target.value)}
                placeholder="Ex.: 1"
              />
            </Campo>
            <Campo label="Capacidade (leitos)" erro={erros.capacidade}>
              <input
                type="number"
                min="1"
                className={styles.input}
                value={form.capacidade}
                onChange={(e) => alterar("capacidade", e.target.value)}
                placeholder="Ex.: 2"
              />
            </Campo>
            <Campo label="Tipo">
              <select
                className={styles.input}
                value={form.tipo}
                onChange={(e) => alterar("tipo", e.target.value)}
              >
                {tiposQuarto.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Campo>
            <div className={styles.full}>
              <Campo label="Observações">
                <textarea
                  className={`${styles.input} ${styles.textarea}`}
                  value={form.observacoes}
                  onChange={(e) => alterar("observacoes", e.target.value)}
                  placeholder="Equipamentos, acessibilidade, restrições..."
                  rows={4}
                />
              </Campo>
            </div>
          </div>

          {editando && (
            <div className={styles.aviso}>
              Situação atual: {ocupados} {ocupados === 1 ? "leito ocupado" : "leitos ocupados"}.
            </div>
          )}

          <div className={styles.rodape}>
            <button
              type="button"
              className={styles.btnOutline}
              onClick={() => navigate("/quartos")}
            >
              Cancelar
            </button>
            <button type="submit" className={styles.btnPrimary}>
              {editando ? "Salvar alterações" : "Cadastrar quarto"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
