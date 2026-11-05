package com.example.back.model.profissional;


import com.example.back.model.atendimento.Atendimento;
import com.example.back.model.atendimento.ConsultaRotina;
import com.example.back.model.atendimento.AtendimentoEmergencia;
import jakarta.persistence.Entity;

@Entity
public class MedicoClinicoGeral extends Profissional {

    public MedicoClinicoGeral() {
    }

    public MedicoClinicoGeral(String nome, String registroProfissional,
                              String telefone, String email) {
        super(nome, registroProfissional, telefone, email);
    }

    @Override
    public void validarAtendimento(Atendimento atendimento) {
        if (!(atendimento instanceof ConsultaRotina) &&
            !(atendimento instanceof AtendimentoEmergencia)) {
            throw new IllegalArgumentException(
                "Médico clínico geral não pode realizar esse atendimento."
            );
        }
    }
}
