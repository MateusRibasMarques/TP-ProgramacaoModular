package com.example.back.model.profissional;


import com.example.back.model.atendimento.Atendimento;
import jakarta.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Profissional {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String registroProfissional;
    private String telefone;
    private String email;

    public Profissional() {
    }

    public Profissional(String nome, String registroProfissional, String telefone, String email) {
        this.nome = nome;
        this.registroProfissional = registroProfissional;
        this.telefone = telefone;
        this.email = email;
    }

    public abstract void validarAtendimento(Atendimento atendimento);

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getRegistroProfissional() {
        return registroProfissional;
    }

    public void setRegistroProfissional(String registroProfissional) {
        this.registroProfissional = registroProfissional;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}