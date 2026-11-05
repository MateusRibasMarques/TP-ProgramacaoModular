
package com.example.back.model.atendimento;

import com.example.back.enums.PrioridadeAtendimento;
import com.example.back.enums.StatusAtendimentoEmergencia;
import com.example.back.model.paciente.Paciente;
import com.example.back.model.profissional.Profissional;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class AtendimentoEmergencia extends Atendimento {

    @Enumerated(EnumType.STRING)
    private PrioridadeAtendimento prioridade;

    @Enumerated(EnumType.STRING)
    private StatusAtendimentoEmergencia situacao =
            StatusAtendimentoEmergencia.AGUARDANDO_AVALIACAO;

    public AtendimentoEmergencia() {
    }

    public AtendimentoEmergencia(LocalDate data, LocalTime horario,
                                 Paciente paciente,
                                 Profissional profissionalResponsavel,
                                 String observacoes,
                                 PrioridadeAtendimento prioridade) {
        super(data, horario, paciente, profissionalResponsavel, observacoes);
        this.prioridade = prioridade;
    }

    public void iniciarAtendimento() {
        if (situacao != StatusAtendimentoEmergencia.AGUARDANDO_AVALIACAO) {
            throw new IllegalStateException("Atendimento não está aguardando avaliação.");
        }

        situacao = StatusAtendimentoEmergencia.EM_ATENDIMENTO;
    }

    public void concluirAtendimento() {
        if (situacao != StatusAtendimentoEmergencia.EM_ATENDIMENTO) {
            throw new IllegalStateException("Atendimento não foi iniciado.");
        }

        situacao = StatusAtendimentoEmergencia.CONCLUIDO;
    }

    public PrioridadeAtendimento getPrioridade() {
        return prioridade;
    }

    public void setPrioridade(PrioridadeAtendimento prioridade) {
        this.prioridade = prioridade;
    }

    public StatusAtendimentoEmergencia getSituacao() {
        return situacao;
    }
}
