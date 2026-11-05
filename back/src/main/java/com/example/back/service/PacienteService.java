package com.example.back.service;

import com.example.back.model.paciente.Paciente;
import com.example.back.repository.PacienteRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PacienteService {

    private final PacienteRepository pacienteRepository;

    public PacienteService(PacienteRepository pacienteRepository) {
        this.pacienteRepository = pacienteRepository;
    }

    public List<Paciente> listarTodos() {
        return pacienteRepository.findAll();
    }

    public Paciente buscarPorId(Long id) {
        return pacienteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Paciente não encontrado."));
    }

    public Paciente salvar(Paciente paciente) {
        return pacienteRepository.save(paciente);
    }

    public Paciente atualizar(Long id, Paciente pacienteAtualizado) {
        Paciente pacienteExistente = buscarPorId(id);
        pacienteExistente.setNome(pacienteAtualizado.getNome());
        pacienteExistente.setCpf(pacienteAtualizado.getCpf());
        pacienteExistente.setDataNascimento(pacienteAtualizado.getDataNascimento());
        pacienteExistente.setTelefone(pacienteAtualizado.getTelefone());
        pacienteExistente.setEndereco(pacienteAtualizado.getEndereco());
        pacienteExistente.setEmail(pacienteAtualizado.getEmail());
        
        return pacienteRepository.save(pacienteExistente);
    }

    public void excluir(Long id) {
        if (!pacienteRepository.existsById(id)) {
            throw new EntityNotFoundException("Paciente não encontrado.");
        }
        pacienteRepository.deleteById(id);
    }
}