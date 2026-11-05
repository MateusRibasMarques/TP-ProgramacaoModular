package com.example.back.service;

import com.example.back.model.profissional.Profissional;
import com.example.back.repository.ProfissionalRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProfissionalService {

    private final ProfissionalRepository profissionalRepository;

    public ProfissionalService(ProfissionalRepository profissionalRepository) {
        this.profissionalRepository = profissionalRepository;
    }

    public List<Profissional> listarTodos() {
        return profissionalRepository.findAll();
    }

    public Profissional buscarPorId(Long id) {
        return profissionalRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Profissional não encontrado."
                ));
    }

    public Profissional salvar(Profissional profissional) {
        return profissionalRepository.save(profissional);
    }

    public void excluir(Long id) {
        if (!profissionalRepository.existsById(id)) {
            throw new EntityNotFoundException("Profissional não encontrado.");
        }

        profissionalRepository.deleteById(id);
    }
}