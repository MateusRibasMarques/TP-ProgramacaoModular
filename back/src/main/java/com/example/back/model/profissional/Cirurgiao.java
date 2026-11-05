package com.example.back.model.profissional;

import com.example.back.model.atendimento.Atendimento;
import com.example.back.model.atendimento.ProcedimentoCirurgico;
import jakarta.persistence.Entity;

@Entity
public class Cirurgiao extends Profissional {

    private String areaAtuacaoCirurgica;

    public Cirurgiao() {
    }

    public Cirurgiao(String nome, String registroProfissional,
                     String telefone, String email, String areaAtuacaoCirurgica) {
        super(nome, registroProfissional, telefone, email);
        this.areaAtuacaoCirurgica = areaAtuacaoCirurgica;
    }

    @Override
    public void validarAtendimento(Atendimento atendimento) {
        if (!(atendimento instanceof ProcedimentoCirurgico)) {
            throw new IllegalArgumentException(
                "Cirurgião deve realizar procedimentos cirúrgicos."
            );
        }
    }

    public String getAreaAtuacaoCirurgica() {
        return areaAtuacaoCirurgica;
    }

    public void setAreaAtuacaoCirurgica(String areaAtuacaoCirurgica) {
        this.areaAtuacaoCirurgica = areaAtuacaoCirurgica;
    }
}