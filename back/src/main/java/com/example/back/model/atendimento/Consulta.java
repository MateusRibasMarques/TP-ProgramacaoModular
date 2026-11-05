package com.example.back.model.atendimento;

import com.example.back.enums.StatusConsulta;
import com.example.back.model.paciente.Paciente;
import com.example.back.model.profissional.Profissional;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public abstract class Consulta extends Atendimento {

    private String motivo;

    @Enumerated(EnumType.STRING)
    private StatusConsulta situacao = StatusConsulta.AGENDADA;

    public Consulta() {
    }

    public Consulta(LocalDate data, LocalTime horario, Paciente paciente,
                    Profissional profissionalResponsavel, String observacoes,
                    String motivo) {
        super(data, horario, paciente, profissionalResponsavel, observacoes);
        this.motivo = motivo;
    }

    public String getMotivo() {
        return motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }

    public StatusConsulta getSituacao() {
        return situacao;
    }

    public void setSituacao(StatusConsulta situacao) {
        this.situacao = situacao;
    }
}