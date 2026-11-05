package com.example.back.service;

import com.example.back.enums.StatusConsulta;
import com.example.back.model.atendimento.Atendimento;
import com.example.back.model.atendimento.Consulta;
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
                .orElseThrow(() -> new EntityNotFoundException("Atendimento não encontrado."));
    }

    public Atendimento salvar(Atendimento atendimento) {
        // Regra de Negócio: Um profissional não poderá possuir dois atendimentos agendados para o mesmo horário
        boolean conflitoHorario = atendimentoRepository.existsByProfissionalResponsavelIdAndDataAndHorario(
                atendimento.getProfissionalResponsavel().getId(),
                atendimento.getData(),
                atendimento.getHorario()
        );

        if (conflitoHorario) {
            throw new IllegalStateException("O profissional já possui um atendimento agendado para este horário.");
        }

        // Valida se o profissional possui atribuição compatível com o atendimento (Polimorfismo)
        atendimento.getProfissionalResponsavel().validarAtendimento(atendimento);

        return atendimentoRepository.save(atendimento);
    }

    public Consulta atualizarStatusConsulta(Long id, StatusConsulta novoStatus) {
        Atendimento atendimento = buscarPorId(id);
        
        if (!(atendimento instanceof Consulta consulta)) {
            throw new IllegalArgumentException("O atendimento informado não é uma consulta.");
        }

        StatusConsulta statusAtual = consulta.getSituacao();

        // Regra de Negócio: Impedir alterações incompatíveis com o andamento do atendimento
        if (statusAtual == StatusConsulta.CONCLUIDA || statusAtual == StatusConsulta.CANCELADA) {
            throw new IllegalStateException("Não é possível alterar o status de uma consulta já concluída ou cancelada.");
        }

        if (statusAtual == StatusConsulta.AGENDADA && novoStatus == StatusConsulta.CONCLUIDA) {
            throw new IllegalStateException("Uma consulta cancelada ou agendada não pode ser registrada como concluída sem atendimento prévio.");
        }

        consulta.setSituacao(novoStatus);
        return atendimentoRepository.save(consulta);
    }

    public void excluir(Long id) {
        if (!atendimentoRepository.existsById(id)) {
            throw new EntityNotFoundException("Atendimento não encontrado.");
        }
        atendimentoRepository.deleteById(id);
    }
}