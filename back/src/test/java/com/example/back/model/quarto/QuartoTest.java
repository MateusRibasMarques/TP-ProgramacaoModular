
package com.example.back.model.quarto;

import com.example.back.enums.StatusQuarto;
import com.example.back.enums.TipoQuarto;
import com.example.back.exeptions.QuartoSemVagasException;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class QuartoTest {

    @Test
    void deveAdicionarPacienteQuandoHaVaga() {
        Quarto quarto = new Quarto("101", "1", 2, TipoQuarto.ENFERMARIA);

        quarto.adicionarPaciente();

        assertEquals(1, quarto.getOcupacaoAtual());
        assertEquals(StatusQuarto.DISPONIVEL, quarto.getSituacao());
    }

    @Test
    void deveMarcarQuartoComoOcupadoQuandoLotar() {
        Quarto quarto = new Quarto("101", "1", 2, TipoQuarto.ENFERMARIA);

        quarto.adicionarPaciente();
        quarto.adicionarPaciente();

        assertEquals(2, quarto.getOcupacaoAtual());
        assertEquals(StatusQuarto.OCUPADO, quarto.getSituacao());
        assertFalse(quarto.isDisponivel());
    }

    @Test
    void deveLancarExcecaoQuandoQuartoEstiverLotado() {
        Quarto quarto = new Quarto("101", "1", 1, TipoQuarto.ENFERMARIA);

        quarto.adicionarPaciente();

        assertThrows(QuartoSemVagasException.class, () -> {
            quarto.adicionarPaciente();
        });

        assertEquals(1, quarto.getOcupacaoAtual());
    }

    @Test
    void deveLiberarVagaAposAlta() {
        Quarto quarto = new Quarto("101", "1", 1, TipoQuarto.ENFERMARIA);

        quarto.adicionarPaciente();
        quarto.removerPaciente();

        assertEquals(0, quarto.getOcupacaoAtual());
        assertTrue(quarto.isDisponivel());
        assertEquals(StatusQuarto.DISPONIVEL, quarto.getSituacao());
    }

    @Test
    void naoDevePermitirOcupacaoNegativa() {
        Quarto quarto = new Quarto("101", "1", 2, TipoQuarto.ENFERMARIA);

        quarto.removerPaciente();

        assertEquals(0, quarto.getOcupacaoAtual());
    }
}
