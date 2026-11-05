package com.example.back.model.internacao;

import com.example.back.enums.StatusInternacao;
import com.example.back.model.paciente.Paciente;
import com.example.back.model.profissional.Profissional;
import com.example.back.model.quarto.Quarto;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Internacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "paciente_id", nullable = false)
    private Paciente paciente;

    @ManyToOne
    @JoinColumn(name = "profissional_id", nullable = false)
    private Profissional profissionalResponsavel;

    @ManyToOne
    @JoinColumn(name = "quarto_id", nullable = false)
    private Quarto quarto;

    private LocalDate dataEntrada;
    private LocalDate dataPrevistaAlta;
    private LocalDate dataEfetivaAlta;
    private String observacoes;

    @Enumerated(EnumType.STRING)
    private StatusInternacao status = StatusInternacao.ATIVA;

    public Internacao() {
    }

    public Internacao(Paciente paciente, Profissional profissionalResponsavel, Quarto quarto, LocalDate dataEntrada, LocalDate dataPrevistaAlta, String observacoes) {
        this.paciente = paciente;
        this.profissionalResponsavel = profissionalResponsavel;
        this.quarto = quarto;
        this.dataEntrada = dataEntrada;
        this.dataPrevistaAlta = dataPrevistaAlta;
        this.observacoes = observacoes;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Quarto getQuarto() {
        return quarto;
    }

    public void setQuarto(Quarto quarto) {
        this.quarto = quarto;
    }

    public LocalDate getDataEntrada() {
        return dataEntrada;
    }

    public void setDataEntrada(LocalDate dataEntrada) {
        this.dataEntrada = dataEntrada;
    }

    public LocalDate getDataPrevistaAlta() {
        return dataPrevistaAlta;
    }

    public void setDataPrevistaAlta(LocalDate dataPrevistaAlta) {
        this.dataPrevistaAlta = dataPrevistaAlta;
    }

    public LocalDate getDataEfetivaAlta() {
        return dataEfetivaAlta;
    }

    public void setDataEfetivaAlta(LocalDate dataEfetivaAlta) {
        this.dataEfetivaAlta = dataEfetivaAlta;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public StatusInternacao getStatus() {
        return status;
    }

    public void setStatus(StatusInternacao status) {
        this.status = status;
    }
}