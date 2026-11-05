package com.example.back.model.atendimento;

import com.example.back.model.paciente.Paciente;
import com.example.back.model.profissional.Profissional;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "tipoAtendimento")
@JsonSubTypes({
        @JsonSubTypes.Type(value = ConsultaRotina.class, name = "CONSULTA_ROTINA"),
        @JsonSubTypes.Type(value = ConsultaEspecializada.class, name = "CONSULTA_ESPECIALIZADA"),
        @JsonSubTypes.Type(value = AtendimentoEmergencia.class, name = "EMERGENCIA"),
        @JsonSubTypes.Type(value = ProcedimentoCirurgico.class, name = "CIRURGIA")
})
public abstract class Atendimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate data;
    private LocalTime horario;
    private String observacoes;

    @ManyToOne
    @JoinColumn(name = "paciente_id")
    private Paciente paciente;

    @ManyToOne
    @JoinColumn(name = "profissional_id")
    private Profissional profissionalResponsavel;

    public Atendimento() {
    }

    public Atendimento(LocalDate data, LocalTime horario, Paciente paciente,
            Profissional profissionalResponsavel, String observacoes) {
        this.data = data;
        this.horario = horario;
        this.paciente = paciente;
        this.observacoes = observacoes;
        this.profissionalResponsavel = profissionalResponsavel;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public LocalTime getHorario() {
        return horario;
    }

    public void setHorario(LocalTime horario) {
        this.horario = horario;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public Profissional getProfissionalResponsavel() {
        return profissionalResponsavel;
    }

    public void setProfissionalResponsavel(Profissional profissionalResponsavel) {
        this.profissionalResponsavel = profissionalResponsavel;
    }
}