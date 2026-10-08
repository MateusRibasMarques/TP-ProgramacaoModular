import React, { useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import {
  carregarInternacoes,
  salvarInternacoes,
  carregarQuartos,
  carregarProfissionais,
  pacientes,
  statusAtivos,
  ocupacao,
  proximoId,
  hoje,
} from "./dados";
import styles from "./RegistroInternacao.module.css";

const vazio = {
  pacienteId: "",
  profissionalId: "",
  quartoId: "",
  dataEntrada: hoje(),
  previsaoAlta: "",
  dataAlta: "",
  observacoes: "",
  status: "Ativa",
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

export default function RegistroInternacao() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [params] = useSearchParams();
  const editando = Boolean(id);

  const [internacoes] = useState(carregarInternacoes);
  const [quartos] = useState(carregarQuartos);
  const [profissionais] = useState(() =>
    carregarProfissionais().filter((p) => p.situacao === "Ativo")
  );

  const original = editando ? internacoes.find((i) => String(i.id) === String(id)) : null;
  const jaTinhaAlta = original?.status === "Alta registrada";

  const [form, setForm] = useState(() => {
    if (!original) return vazio;
    return {
      ...original,
      pacienteId: String(original.pacienteId),
      profissionalId: String(original.profissionalId),
      quartoId: String(original.quartoId),
    };
  });
  const [registrarAlta, setRegistrarAlta] = useState(
    jaTinhaAlta || params.get("alta") === "1"
  );
  const [erros, setErros] = useState({});

  // Ocupação desconsiderando a própria internação, para não contar o leito que ela já usa.
  const outras = internacoes.filter((i) => String(i.id) !== String(id));
  const quartosComVaga = quartos
    .map((q) => ({ ...q, ...ocupacao(q, outras) }))
    .filter((q) => q.livres > 0 || String(q.id) === String(original?.quartoId))
    .sort((a, b) => a.numero.localeCompare(b.numero, undefined, { numeric: true }));

  function alterar(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }));
    setErros((e) => ({ ...e, [campo]: "" }));
  }

  function alternarAlta(marcado) {
    setRegistrarAlta(marcado);
    if (marcado && !form.dataAlta) alterar("dataAlta", hoje());
    setErros((e) => ({ ...e, dataAlta: "", quartoId: "" }));
  }

  function validar() {
    const e = {};
    if (!form.pacienteId) e.pacienteId = "Selecione o paciente";
    else if (
      !registrarAlta &&
      outras.some(
        (i) => String(i.pacienteId) === form.pacienteId && statusAtivos.includes(i.status)
      )
    )
      e.pacienteId = "Este paciente já possui uma internação ativa";
    if (!form.profissionalId) e.profissionalId = "Selecione o profissional";
    if (!form.quartoId) e.quartoId = "Selecione um quarto disponível";
    else if (!registrarAlta) {
      const q = quartos.find((item) => String(item.id) === form.quartoId);
      if (!q || ocupacao(q, outras).livres === 0) e.quartoId = "Quarto sem leitos livres";
    }
    if (!form.dataEntrada) e.dataEntrada = "Informe a data de entrada";
    if (!form.previsaoAlta) e.previsaoAlta = "Informe a previsão de alta";
    else if (form.dataEntrada && form.previsaoAlta < form.dataEntrada)
      e.previsaoAlta = "A previsão deve ser após a entrada";
    if (registrarAlta) {
      if (!form.dataAlta) e.dataAlta = "Informe a data da alta";
      else if (form.dataEntrada && form.dataAlta < form.dataEntrada)
        e.dataAlta = "A alta deve ser após a entrada";
    }
    setErros(e);
    return Object.keys(e).length === 0;
  }

  function salvar(ev) {
    ev.preventDefault();
    if (!validar()) return;

    const paciente = pacientes.find((p) => String(p.id) === form.pacienteId);
    const profissional = carregarProfissionais().find(
      (p) => String(p.id) === form.profissionalId
    );
    const quarto = quartos.find((q) => String(q.id) === form.quartoId);

    const dados = {
      ...form,
      pacienteId: paciente.id,
      pacienteNome: paciente.nome,
      profissionalId: profissional.id,
      profissionalNome: profissional.nome,
      quartoId: quarto.id,
      quartoNumero: quarto.numero,
      dataAlta: registrarAlta ? form.dataAlta : "",
      status: registrarAlta
        ? "Alta registrada"
        : form.status === "Alta registrada"
          ? "Em andamento"
          : form.status,
    };

    const nova = editando
      ? internacoes.map((i) => (String(i.id) === String(id) ? { ...dados, id: i.id } : i))
      : [...internacoes, { ...dados, id: proximoId(internacoes) }];
    salvarInternacoes(nova);
    navigate("/internacoes");
  }

  if (editando && !original) {
    return (
      <Layout>
        <div className={styles.page}>
          <p className={styles.sub}>Internação não encontrada.</p>
          <Link to="/internacoes">‹ Voltar para internações</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.page}>
        <div className={styles.crumb}>
          <Link to="/">Início</Link> / <Link to="/internacoes">Internações</Link> /{" "}
          <strong>{editando ? "Editar" : "Registro"}</strong>
        </div>

        <div className={styles.head}>
          <div>
            <h1 className={styles.title}>
              {editando ? "Internação e alta" : "Registro de internação"}
            </h1>
            <p className={styles.sub}>
              {editando
                ? `Atualize os dados da internação de ${original.pacienteNome} ou registre a alta.`
                : "Preencha os dados para internar um paciente em um quarto disponível."}
            </p>
          </div>
          <button
            type="button"
            className={styles.btnOutline}
            onClick={() => navigate("/internacoes")}
          >
            ‹ Voltar
          </button>
        </div>

        <form className={styles.card} onSubmit={salvar} noValidate>
          <div className={styles.cardHead}>Dados da internação</div>
          <div className={styles.grid}>
            <Campo label="Paciente" erro={erros.pacienteId}>
              <select
                className={styles.input}
                value={form.pacienteId}
                onChange={(e) => alterar("pacienteId", e.target.value)}
              >
                <option value="">Selecione o paciente</option>
                {pacientes.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nome}
                  </option>
                ))}
              </select>
            </Campo>
            <Campo label="Profissional responsável" erro={erros.profissionalId}>
              <select
                className={styles.input}
                value={form.profissionalId}
                onChange={(e) => alterar("profissionalId", e.target.value)}
              >
                <option value="">Selecione o profissional</option>
                {profissionais.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nome} — {p.especialidade}
                  </option>
                ))}
              </select>
            </Campo>
            <div className={styles.full}>
              <Campo label="Quarto disponível" erro={erros.quartoId}>
                <select
                  className={styles.input}
                  value={form.quartoId}
                  onChange={(e) => alterar("quartoId", e.target.value)}
                >
                  <option value="">Selecione o quarto</option>
                  {quartosComVaga.map((q) => (
                    <option key={q.id} value={q.id}>
                      Quarto {q.numero} — {q.andar}º andar · {q.tipo} ({q.livres}{" "}
                      {q.livres === 1 ? "leito livre" : "leitos livres"})
                    </option>
                  ))}
                </select>
              </Campo>
              {quartosComVaga.length === 0 && (
                <span className={styles.erro}>Não há quartos com leitos livres no momento.</span>
              )}
            </div>
            <Campo label="Data de entrada" erro={erros.dataEntrada}>
              <input
                type="date"
                className={styles.input}
                value={form.dataEntrada}
                onChange={(e) => alterar("dataEntrada", e.target.value)}
              />
            </Campo>
            <Campo label="Previsão de alta" erro={erros.previsaoAlta}>
              <input
                type="date"
                className={styles.input}
                value={form.previsaoAlta}
                min={form.dataEntrada}
                onChange={(e) => alterar("previsaoAlta", e.target.value)}
              />
            </Campo>
            {!registrarAlta && (
              <Campo label="Status">
                <select
                  className={styles.input}
                  value={form.status === "Alta registrada" ? "Em andamento" : form.status}
                  onChange={(e) => alterar("status", e.target.value)}
                >
                  {statusAtivos.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Campo>
            )}
            <div className={styles.full}>
              <Campo label="Observações">
                <textarea
                  className={`${styles.input} ${styles.textarea}`}
                  value={form.observacoes}
                  onChange={(e) => alterar("observacoes", e.target.value)}
                  placeholder="Motivo da internação, condutas, cuidados especiais..."
                  rows={4}
                />
              </Campo>
            </div>
          </div>

          <div className={styles.cardHead}>Alta</div>
          <div className={styles.grid}>
            <label className={`${styles.full} ${styles.check}`}>
              <input
                type="checkbox"
                checked={registrarAlta}
                onChange={(e) => alternarAlta(e.target.checked)}
              />
              <span>
                Registrar alta do paciente
                <small>O leito será liberado e a internação ficará como “Alta registrada”.</small>
              </span>
            </label>
            {registrarAlta && (
              <Campo label="Data da alta" erro={erros.dataAlta}>
                <input
                  type="date"
                  className={styles.input}
                  value={form.dataAlta}
                  min={form.dataEntrada}
                  onChange={(e) => alterar("dataAlta", e.target.value)}
                />
              </Campo>
            )}
          </div>

          <div className={styles.rodape}>
            <button
              type="button"
              className={styles.btnOutline}
              onClick={() => navigate("/internacoes")}
            >
              Cancelar
            </button>
            <button type="submit" className={styles.btnPrimary}>
              {!editando
                ? registrarAlta
                  ? "Registrar internação com alta"
                  : "Registrar internação"
                : registrarAlta && !jaTinhaAlta
                  ? "Registrar alta"
                  : "Salvar alterações"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
