import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import { carregarConsultas, salvarConsultas } from "./dados";
import { pacientes, carregarProfissionais, proximoId, hoje } from "../Internacoes/dados";
import styles from "./AgendamentoConsulta.module.css";

const vazio = {
    pacienteId: "",
    profissionalId: "",
    data: "",
    hora: "",
    motivo: "",
    observacoes: ""
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

function AgendamentoConsulta() {
    const navigate = useNavigate();
    const [profissionais] = useState(() =>
        carregarProfissionais().filter((p) => p.situacao === "Ativo")
    );
    const [formulario, setFormulario] = useState(vazio);
    const [erros, setErros] = useState({});

    const alterarCampo = (e) => {
        const { name, value } = e.target;
        setFormulario({ ...formulario, [name]: value });
        setErros({ ...erros, [name]: "" });
    };

    const validar = () => {
        const e = {};
        if (!formulario.pacienteId) e.pacienteId = "Selecione o paciente";
        if (!formulario.profissionalId) e.profissionalId = "Selecione o profissional";
        if (!formulario.data) e.data = "Informe a data";
        else if (formulario.data < hoje()) e.data = "A data não pode estar no passado";
        if (!formulario.hora) e.hora = "Informe o horário";
        if (!formulario.motivo.trim()) e.motivo = "Informe o motivo da consulta";
        setErros(e);
        return Object.keys(e).length === 0;
    };

    const agendarConsulta = (e) => {
        e.preventDefault();
        if (!validar()) return;

        const paciente = pacientes.find((p) => String(p.id) === formulario.pacienteId);
        const profissional = profissionais.find((p) => String(p.id) === formulario.profissionalId);
        const lista = carregarConsultas();

        salvarConsultas([
            ...lista,
            {
                id: proximoId(lista),
                pacienteId: paciente.id,
                pacienteNome: paciente.nome,
                profissionalId: profissional.id,
                profissionalNome: profissional.nome,
                especialidade: profissional.especialidade,
                data: formulario.data,
                hora: formulario.hora,
                motivo: formulario.motivo.trim(),
                observacoes: formulario.observacoes,
                status: "Agendada"
            }
        ]);
        navigate("/consultas");
    };

    return (
        <Layout>
            <div className={styles.page}>
                <div className={styles.crumb}>
                    <Link to="/">Início</Link> / <Link to="/consultas">Consultas</Link> /{" "}
                    <strong>Agendamento</strong>
                </div>

                <div className={styles.head}>
                    <div>
                        <h1 className={styles.title}>Agendamento de consulta</h1>
                        <p className={styles.sub}>
                            Preencha os dados abaixo para agendar uma nova consulta.
                        </p>
                    </div>
                    <button
                        type="button"
                        className={styles.btnOutline}
                        onClick={() => navigate("/consultas")}
                    >
                        ‹ Voltar
                    </button>
                </div>

                <form className={styles.card} onSubmit={agendarConsulta} noValidate>
                    <div className={styles.cardHead}>Dados da consulta</div>
                    <div className={styles.grid}>
                        <Campo label="Paciente" erro={erros.pacienteId}>
                            <select
                                name="pacienteId"
                                className={styles.input}
                                value={formulario.pacienteId}
                                onChange={alterarCampo}
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
                                name="profissionalId"
                                className={styles.input}
                                value={formulario.profissionalId}
                                onChange={alterarCampo}
                            >
                                <option value="">Selecione o profissional</option>
                                {profissionais.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.nome} — {p.especialidade}
                                    </option>
                                ))}
                            </select>
                        </Campo>

                        <Campo label="Data" erro={erros.data}>
                            <input
                                type="date"
                                name="data"
                                className={styles.input}
                                value={formulario.data}
                                min={hoje()}
                                onChange={alterarCampo}
                            />
                        </Campo>

                        <Campo label="Horário" erro={erros.hora}>
                            <input
                                type="time"
                                name="hora"
                                className={styles.input}
                                value={formulario.hora}
                                onChange={alterarCampo}
                            />
                        </Campo>

                        <div className={styles.full}>
                            <Campo label="Motivo da consulta" erro={erros.motivo}>
                                <input
                                    name="motivo"
                                    className={styles.input}
                                    value={formulario.motivo}
                                    onChange={alterarCampo}
                                    placeholder="Informe o motivo da consulta"
                                />
                            </Campo>
                        </div>

                        <div className={styles.full}>
                            <Campo label="Observações médicas">
                                <textarea
                                    name="observacoes"
                                    className={`${styles.input} ${styles.textarea}`}
                                    value={formulario.observacoes}
                                    onChange={alterarCampo}
                                    placeholder="Digite alguma observação, se necessário..."
                                    rows={4}
                                />
                            </Campo>
                        </div>
                    </div>

                    <div className={styles.rodape}>
                        <button
                            type="button"
                            className={styles.btnOutline}
                            onClick={() => navigate("/consultas")}
                        >
                            Cancelar
                        </button>
                        <button type="submit" className={styles.btnPrimary}>
                            Agendar consulta
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export default AgendamentoConsulta;
