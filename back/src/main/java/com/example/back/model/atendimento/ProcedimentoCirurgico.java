package com.example.back.model.atendimento;

import com.example.back.enums.StatusProcedimento;
import com.example.back.model.paciente.Paciente;
import com.example.back.model.profissional.Profissional;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;

@Entity
public class ProcedimentoCirurgico extends Atendimento {

    private String descricao;
    private String tipoCirurgia;
    private String observacoesPreOperatorias;
    private String observacoesPosOperatorias;

    private LocalDateTime dataHoraInicioReal;
    private LocalDateTime dataHoraFimReal;

    @Enumerated(EnumType.STRING)
    private StatusProcedimento situacao = StatusProcedimento.AGENDADO;

    public ProcedimentoCirurgico() {
    }

    public ProcedimentoCirurgico(LocalDate data, LocalTime horario, Paciente paciente,
                                 Profissional profissionalResponsavel, String observacoes,
                                 String descricao, String tipoCirurgia,
                                 String observacoesPreOperatorias) {
        super(data, horario, paciente, profissionalResponsavel, observacoes);
        this.descricao = descricao;
        this.tipoCirurgia = tipoCirurgia;
        this.observacoesPreOperatorias = observacoesPreOperatorias;
    }

    public void iniciarProcedimento() {
        if (situacao != StatusProcedimento.AGENDADO) {
            throw new IllegalStateException("Procedimento não está agendado.");
        }

        situacao = StatusProcedimento.EM_ANDAMENTO;
        dataHoraInicioReal = LocalDateTime.now();
    }

    public void concluirProcedimento(String observacoesPosOperatorias) {
        if (situacao != StatusProcedimento.EM_ANDAMENTO) {
            throw new IllegalStateException("Procedimento não foi iniciado.");
        }

        situacao = StatusProcedimento.CONCLUIDO;
        dataHoraFimReal = LocalDateTime.now();
        this.observacoesPosOperatorias = observacoesPosOperatorias;
    }

    public void cancelarProcedimento() {
        if (situacao == StatusProcedimento.CONCLUIDO ||
                situacao == StatusProcedimento.CANCELADO) {
            throw new IllegalStateException("Não é possível cancelar.");
        }

        situacao = StatusProcedimento.CANCELADO;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getTipoCirurgia() {
        return tipoCirurgia;
    }

    public void setTipoCirurgia(String tipoCirurgia) {
        this.tipoCirurgia = tipoCirurgia;
    }

    public String getObservacoesPreOperatorias() {
        return observacoesPreOperatorias;
    }

    public void setObservacoesPreOperatorias(String observacoesPreOperatorias) {
        this.observacoesPreOperatorias = observacoesPreOperatorias;
    }

    public String getObservacoesPosOperatorias() {
        return observacoesPosOperatorias;
    }

    public void setObservacoesPosOperatorias(String observacoesPosOperatorias) {
        this.observacoesPosOperatorias = observacoesPosOperatorias;
    }

    public LocalDateTime getDataHoraInicioReal() {
        return dataHoraInicioReal;
    }

    public LocalDateTime getDataHoraFimReal() {
        return dataHoraFimReal;
    }

    public StatusProcedimento getSituacao() {
        return situacao;
    }
}