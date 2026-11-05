package com.example.back.model.paciente;

import jakarta.persistence.*;

@Entity
public class Paciente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Paciente() {
    }

    public Long getId() {
        return id;
    }
}