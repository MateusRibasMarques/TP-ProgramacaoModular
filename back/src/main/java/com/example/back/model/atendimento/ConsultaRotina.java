package com.example.back.model.atendimento;


import com.example.back.model.paciente.Paciente;
import com.example.back.model.profissional.Profissional;
import jakarta.persistence.Entity;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class ConsultaRotina extends Consulta {

    public ConsultaRotina() {
    }

    public ConsultaRotina(LocalDate data, LocalTime horario, Paciente paciente,
                          Profissional profissionalResponsavel, String observacoes,
                          String motivo) {
        super(data, horario, paciente, profissionalResponsavel, observacoes, motivo);
    }
}