package com.example.back.service;

import com.example.back.model.quarto.Quarto;
import com.example.back.repository.QuartoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuartoService {

    private final QuartoRepository quartoRepository;

    public QuartoService(QuartoRepository quartoRepository) {
        this.quartoRepository = quartoRepository;
    }

    public List<Quarto> listarTodos() {
        return quartoRepository.findAll();
    }

    public Quarto buscarPorId(Long id) {
        return quartoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Quarto não encontrado."));
    }

    public Quarto salvar(Quarto quarto) {
        return quartoRepository.save(quarto);
    }

    public Quarto atualizar(Long id, Quarto quartoAtualizado) {
        Quarto quartoExistente = buscarPorId(id);
        quartoExistente.setNumero(quartoAtualizado.getNumero());
        quartoExistente.setAndar(quartoAtualizado.getAndar());
        quartoExistente.setCapacidadeMaxima(quartoAtualizado.getCapacidadeMaxima());
        quartoExistente.setTipo(quartoAtualizado.getTipo());
        // Não atualizamos a ocupação atual ou situação diretamente aqui para proteger a regra de negócio
        
        return quartoRepository.save(quartoExistente);
    }

    public void excluir(Long id) {
        Quarto quarto = buscarPorId(id);
        if (quarto.getOcupacaoAtual() > 0) {
            throw new IllegalStateException("Não é possível excluir um quarto com pacientes internados.");
        }
        quartoRepository.deleteById(id);
    }
}