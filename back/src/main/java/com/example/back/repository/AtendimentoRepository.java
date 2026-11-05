package com.example.back.repository;

import com.example.back.model.atendimento.Atendimento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;

@Repository
public interface AtendimentoRepository extends JpaRepository<Atendimento, Long> {

    boolean existsByProfissionalResponsavelIdAndDataAndHorario(Long profissionalId, LocalDate data, LocalTime horario);
}