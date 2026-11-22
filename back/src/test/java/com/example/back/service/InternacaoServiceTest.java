
package com.example.back.service;

import com.example.back.enums.StatusInternacao;
import com.example.back.enums.StatusQuarto;
import com.example.back.enums.TipoQuarto;
import com.example.back.exeptions.QuartoSemVagasException;
import com.example.back.model.internacao.Internacao;
import com.example.back.model.paciente.Paciente;
import com.example.back.model.profissional.Profissional;
import com.example.back.model.quarto.Quarto;
import com.example.back.repository.InternacaoRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class InternacaoServiceTest {

    @Mock
    private InternacaoRepository internacaoRepository;

    @Mock
    private QuartoService quartoService;

    @Mock
    private PacienteService pacienteService;

    @Mock
    private ProfissionalService profissionalService;

    @InjectMocks
    private InternacaoService internacaoService;

    private Internacao internacao;
    private Quarto quarto;
    private Paciente paciente;
    private Profissional profissional;

    @BeforeEach
    void preparar() {
        quarto = new Quarto("101", "1", 1, TipoQuarto.ENFERMARIA);
        quarto.setId(1L);

        paciente = mock(Paciente.class);
        profissional = mock(Profissional.class);

        internacao = new Internacao();
        internacao.setPaciente(paciente);
        internacao.setProfissionalResponsavel(profissional);
        internacao.setQuarto(quarto);
    }

    @Test
    void deveRegistrarInternacaoComVagaDisponivel() {
        when(paciente.getId()).thenReturn(1L);
        when(profissional.getId()).thenReturn(1L);
        when(pacienteService.buscarPorId(1L)).thenReturn(paciente);
        when(profissionalService.buscarPorId(1L)).thenReturn(profissional);
        when(quartoService.buscarPorId(1L)).thenReturn(quarto);
        when(internacaoRepository.save(any(Internacao.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        Internacao resultado = internacaoService.registrarInternacao(internacao);

        assertEquals(StatusInternacao.ATIVA, resultado.getStatus());
        assertEquals(1, quarto.getOcupacaoAtual());
        assertEquals(StatusQuarto.OCUPADO, quarto.getSituacao());

        verify(quartoService).salvar(quarto);
        verify(internacaoRepository).save(internacao);
    }

    @Test
    void deveImpedirInternacaoSimultanea() {
        when(paciente.getId()).thenReturn(1L);
        when(profissional.getId()).thenReturn(1L);
        when(pacienteService.buscarPorId(1L)).thenReturn(paciente);
        when(profissionalService.buscarPorId(1L)).thenReturn(profissional);
        when(internacaoRepository.existsByPaciente_IdAndStatus(
                1L, StatusInternacao.ATIVA)).thenReturn(true);

        assertThrows(IllegalStateException.class, () -> {
            internacaoService.registrarInternacao(internacao);
        });

        verify(quartoService, never()).salvar(any());
        verify(internacaoRepository, never()).save(any());
    }

    @Test
    void deveImpedirInternacaoEmQuartoLotado() {
        quarto.adicionarPaciente();

        when(paciente.getId()).thenReturn(1L);
        when(profissional.getId()).thenReturn(1L);
        when(pacienteService.buscarPorId(1L)).thenReturn(paciente);
        when(profissionalService.buscarPorId(1L)).thenReturn(profissional);
        when(quartoService.buscarPorId(1L)).thenReturn(quarto);

        assertThrows(QuartoSemVagasException.class, () -> {
            internacaoService.registrarInternacao(internacao);
        });

        assertEquals(1, quarto.getOcupacaoAtual());

        verify(quartoService, never()).salvar(any());
        verify(internacaoRepository, never()).save(any());
    }

    @Test
    void deveRegistrarAltaELiberarVaga() {
        quarto.adicionarPaciente();

        internacao.setId(1L);
        internacao.setStatus(StatusInternacao.ATIVA);

        LocalDate dataAlta = LocalDate.now();

        when(internacaoRepository.findById(1L))
                .thenReturn(Optional.of(internacao));

        when(internacaoRepository.save(any(Internacao.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        Internacao resultado = internacaoService.registrarAlta(1L, dataAlta);

        assertEquals(StatusInternacao.ALTA_REGISTRADA, resultado.getStatus());
        assertEquals(dataAlta, resultado.getDataEfetivaAlta());
        assertEquals(0, quarto.getOcupacaoAtual());
        assertTrue(quarto.isDisponivel());
        assertEquals(StatusQuarto.DISPONIVEL, quarto.getSituacao());

        verify(quartoService).salvar(quarto);
        verify(internacaoRepository).save(internacao);
    }

    @Test
    void deveImpedirAltaDuplicada() {
        internacao.setId(1L);
        internacao.setStatus(StatusInternacao.ALTA_REGISTRADA);

        when(internacaoRepository.findById(1L))
                .thenReturn(Optional.of(internacao));

        assertThrows(IllegalStateException.class, () -> {
            internacaoService.registrarAlta(1L, LocalDate.now());
        });

        verify(quartoService, never()).salvar(any());
        verify(internacaoRepository, never()).save(any());
    }
}
