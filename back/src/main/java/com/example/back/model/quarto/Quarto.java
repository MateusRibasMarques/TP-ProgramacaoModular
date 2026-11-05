package com.example.back.model.quarto;

import com.example.back.enums.StatusQuarto;
import com.example.back.enums.TipoQuarto;
import jakarta.persistence.*;

@Entity
public class Quarto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String numero;
    private String andar;
    private Integer capacidadeMaxima;
    private Integer ocupacaoAtual = 0;

    @Enumerated(EnumType.STRING)
    private TipoQuarto tipo;

    @Enumerated(EnumType.STRING)
    private StatusQuarto situacao = StatusQuarto.DISPONIVEL;

    public Quarto() {
    }

    public Quarto(String numero, String andar, Integer capacidadeMaxima, TipoQuarto tipo) {
        this.numero = numero;
        this.andar = andar;
        this.capacidadeMaxima = capacidadeMaxima;
        this.tipo = tipo;
    }

    public boolean isDisponivel() {
        return this.ocupacaoAtual < this.capacidadeMaxima;
    }

    public void adicionarPaciente() {
        if (!isDisponivel()) {
            throw new IllegalStateException("O quarto já atingiu sua capacidade máxima.");
        }
        this.ocupacaoAtual++;
        if (this.ocupacaoAtual.equals(this.capacidadeMaxima)) {
            this.situacao = StatusQuarto.OCUPADO;
        }
    }

    public void removerPaciente() {
        if (this.ocupacaoAtual > 0) {
            this.ocupacaoAtual--;
        }
        this.situacao = StatusQuarto.DISPONIVEL;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getAndar() {
        return andar;
    }

    public void setAndar(String andar) {
        this.andar = andar;
    }

    public Integer getCapacidadeMaxima() {
        return capacidadeMaxima;
    }

    public void setCapacidadeMaxima(Integer capacidadeMaxima) {
        this.capacidadeMaxima = capacidadeMaxima;
    }

    public Integer getOcupacaoAtual() {
        return ocupacaoAtual;
    }

    public void setOcupacaoAtual(Integer ocupacaoAtual) {
        this.ocupacaoAtual = ocupacaoAtual;
    }

    public TipoQuarto getTipo() {
        return tipo;
    }

    public void setTipo(TipoQuarto tipo) {
        this.tipo = tipo;
    }

    public StatusQuarto getSituacao() {
        return situacao;
    }

    public void setSituacao(StatusQuarto situacao) {
        this.situacao = situacao;
    }
}