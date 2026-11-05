package com.example.back.service;

import com.example.back.enums.StatusInternacao;
import com.example.back.model.internacao.Internacao;
import com.example.back.model.quarto.Quarto;
import com.example.back.repository.InternacaoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class InternacaoService {

    private final InternacaoRepository internacaoRepository;
    private final QuartoService quartoService;
    private final PacienteService pacienteService;
    private final ProfissionalService profissionalService;

    public InternacaoService(InternacaoRepository internacaoRepository,
            QuartoService quartoService,
            PacienteService pacienteService,
            ProfissionalService profissionalService) {
        this.internacaoRepository = internacaoRepository;
        this.quartoService = quartoService;
        this.pacienteService = pacienteService;
        this.profissionalService = profissionalService;
    }

    public List<Internacao> listarTodas() {
        return internacaoRepository.findAll();
    }

    public Internacao buscarPorId(Long id) {
        return internacaoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Internação não encontrada."));
    }

    @Transactional
    public Internacao registrarInternacao(Internacao internacao) {
        internacao.setPaciente(pacienteService.buscarPorId(internacao.getPaciente().getId()));
        internacao.setProfissionalResponsavel(
                profissionalService.buscarPorId(internacao.getProfissionalResponsavel().getId()));

        Quarto quarto = quartoService.buscarPorId(internacao.getQuarto().getId());
        quarto.adicionarPaciente();
        quartoService.salvar(quarto);

        internacao.setQuarto(quarto);
        internacao.setStatus(StatusInternacao.ATIVA);

        return internacaoRepository.save(internacao);
    }

    @Transactional
    public Internacao registrarAlta(Long id, LocalDate dataEfetivaAlta) {
        Internacao internacao = buscarPorId(id);

        if (internacao.getStatus() == StatusInternacao.ALTA_REGISTRADA) {
            throw new IllegalStateException("Esta internação já possui alta registrada.");
        }

        internacao.setStatus(StatusInternacao.ALTA_REGISTRADA);
        internacao.setDataEfetivaAlta(dataEfetivaAlta);

        Quarto quarto = internacao.getQuarto();
        quarto.removerPaciente();
        quartoService.salvar(quarto);

        return internacaoRepository.save(internacao);
    }
}