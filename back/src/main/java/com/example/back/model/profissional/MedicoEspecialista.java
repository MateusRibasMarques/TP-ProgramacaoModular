package com.example.back.model.profissional;

import com.example.back.model.atendimento.Atendimento;
import com.example.back.model.atendimento.ConsultaEspecializada;
import jakarta.persistence.Entity;

@Entity
public class MedicoEspecialista extends Profissional {

    private String especialidade;

    public MedicoEspecialista() {
    }

    public MedicoEspecialista(String nome, String registroProfissional,
                              String telefone, String email, String especialidade) {
        super(nome, registroProfissional, telefone, email);
        this.especialidade = especialidade;
    }

    @Override
    public void validarAtendimento(Atendimento atendimento) {
        if (!(atendimento instanceof ConsultaEspecializada consulta)) {
            throw new IllegalArgumentException(
                "Médico especialista deve realizar consultas especializadas."
            );
        }

        if (especialidade == null ||
            !especialidade.equalsIgnoreCase(consulta.getEspecialidade())) {
            throw new IllegalArgumentException(
                "Especialidade incompatível com a consulta."
            );
        }
    }

    public String getEspecialidade() {
        return especialidade;
    }

    public void setEspecialidade(String especialidade) {
        this.especialidade = especialidade;
    }
}