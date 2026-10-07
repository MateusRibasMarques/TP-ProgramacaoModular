import React, { useState } from "react";
import estilos from "./AgendamentoConsulta.module.css";

function AgendamentoConsulta() {
    const [formulario, setFormulario] = useState({
        paciente: "",
        profissional: "",
        data: "",
        horario: "",
        motivo: "",
        observacoes: ""
    });

    const alterarCampo = (e) => {
        const { name, value } = e.target;

        setFormulario({
            ...formulario,
            [name]: value
        });
    };

    const agendarConsulta = (e) => {
        e.preventDefault();

        console.log("Consulta agendada:", formulario);

        alert("Consulta agendada com sucesso!");

        setFormulario({
            paciente: "",
            profissional: "",
            data: "",
            horario: "",
            motivo: "",
            observacoes: ""
        });
    };

    return (
        <div className={estilos.pagina}>
            <div className={estilos.conteudo}>

                <div className={estilos.caminho}>
                    Início / Consultas / <span>Agendamento</span>
                </div>

                <div className={estilos.cabecalho}>
                    <div>
                        <h1>Agendamento de consulta</h1>
                        <p>
                            Preencha os dados abaixo para agendar uma nova consulta.
                        </p>
                    </div>
                </div>

                <form
                    className={estilos.formulario}
                    onSubmit={agendarConsulta}
                >
                    <div className={estilos.secao}>

                        <div className={estilos.tituloSecao}>
                            Dados da consulta
                        </div>

                        <div className={estilos.gradeFormulario}>

                            <div className={estilos.campo}>
                                <label htmlFor="paciente">
                                    Paciente
                                </label>

                                <select
                                    id="paciente"
                                    name="paciente"
                                    value={formulario.paciente}
                                    onChange={alterarCampo}
                                    required
                                >
                                    <option value="">
                                        Selecione o paciente
                                    </option>

                                    <option value="Ana Beatriz Souza">
                                        Ana Beatriz Souza
                                    </option>

                                    <option value="Carlos Eduardo Lima">
                                        Carlos Eduardo Lima
                                    </option>

                                    <option value="Mariana Oliveira">
                                        Mariana Oliveira
                                    </option>

                                    <option value="João Pedro Almeida">
                                        João Pedro Almeida
                                    </option>
                                </select>
                            </div>

                            <div className={estilos.campo}>
                                <label htmlFor="profissional">
                                    Profissional responsável
                                </label>

                                <select
                                    id="profissional"
                                    name="profissional"
                                    value={formulario.profissional}
                                    onChange={alterarCampo}
                                    required
                                >
                                    <option value="">
                                        Selecione o profissional
                                    </option>

                                    <option value="Dra. Paula Andrade">
                                        Dra. Paula Andrade - Clínica Geral
                                    </option>

                                    <option value="Dr. Ricardo Menezes">
                                        Dr. Ricardo Menezes - Cardiologia
                                    </option>

                                    <option value="Dra. Lúcia Prado">
                                        Dra. Lúcia Prado - Dermatologia
                                    </option>

                                    <option value="Dr. Henrique Tavares">
                                        Dr. Henrique Tavares - Cirurgia Geral
                                    </option>
                                </select>
                            </div>

                            <div className={estilos.campo}>
                                <label htmlFor="data">
                                    Data
                                </label>

                                <input
                                    type="date"
                                    id="data"
                                    name="data"
                                    value={formulario.data}
                                    onChange={alterarCampo}
                                    required
                                />
                            </div>

                            <div className={estilos.campo}>
                                <label htmlFor="horario">
                                    Horário
                                </label>

                                <input
                                    type="time"
                                    id="horario"
                                    name="horario"
                                    value={formulario.horario}
                                    onChange={alterarCampo}
                                    required
                                />
                            </div>

                            <div className={`${estilos.campo} ${estilos.larguraCompleta}`}>
                                <label htmlFor="motivo">
                                    Motivo da consulta
                                </label>

                                <input
                                    type="text"
                                    id="motivo"
                                    name="motivo"
                                    value={formulario.motivo}
                                    onChange={alterarCampo}
                                    placeholder="Informe o motivo da consulta"
                                    required
                                />
                            </div>

                            <div className={`${estilos.campo} ${estilos.larguraCompleta}`}>
                                <label htmlFor="observacoes">
                                    Observações médicas
                                </label>

                                <textarea
                                    id="observacoes"
                                    name="observacoes"
                                    value={formulario.observacoes}
                                    onChange={alterarCampo}
                                    placeholder="Digite alguma observação, se necessário..."
                                    rows="5"
                                />
                            </div>

                        </div>
                    </div>

                    <div className={estilos.rodape}>
                        <button
                            type="button"
                            className={estilos.botaoCancelar}
                            onClick={() => window.history.back()}
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className={estilos.botaoAgendar}
                        >
                            Agendar consulta
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AgendamentoConsulta;