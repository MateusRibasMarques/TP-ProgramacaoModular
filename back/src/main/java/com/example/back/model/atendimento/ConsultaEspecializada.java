package com.example.back.model.atendimento;



import com.example.back.model.paciente.Paciente;
import com.example.back.model.profissional.Profissional;
import jakarta.persistence.Entity;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class ConsultaEspecializada extends Consulta {

    private String especialidade;

    public ConsultaEspecializada() {
    }

    public ConsultaEspecializada(LocalDate data, LocalTime horario, Paciente paciente,
                                 Profissional profissionalResponsavel, String observacoes,
                                 String motivo, String especialidade) {
        super(data, horario, paciente, profissionalResponsavel, observacoes, motivo);
        this.especialidade = especialidade;
    }

    public String getEspecialidade() {
        return especialidade;
    }

    public void setEspecialidade(String especialidade) {
        this.especialidade = especialidade;
    }
}