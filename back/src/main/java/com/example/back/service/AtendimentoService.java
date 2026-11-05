package com.example.back.service;


import com.example.back.model.atendimento.Atendimento;
import com.example.back.repository.AtendimentoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AtendimentoService {

    private final AtendimentoRepository atendimentoRepository;

    public AtendimentoService(AtendimentoRepository atendimentoRepository) {
        this.atendimentoRepository = atendimentoRepository;
    }

    public List<Atendimento> listarTodos() {
        return atendimentoRepository.findAll();
    }

    public Atendimento buscarPorId(Long id) {
        return atendimentoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Atendimento não encontrado."
                ));
    }

    public Atendimento salvar(Atendimento atendimento) {
        return atendimentoRepository.save(atendimento);
    }

    public void excluir(Long id) {
        if (!atendimentoRepository.existsById(id)) {
            throw new EntityNotFoundException("Atendimento não encontrado.");
        }

        atendimentoRepository.deleteById(id);
    }
}