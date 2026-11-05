package com.example.back.controller;

import com.example.back.model.atendimento.Atendimento;
import com.example.back.service.AtendimentoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/consultas")
public class ConsultaController {

    private final AtendimentoService atendimentoService;

    public ConsultaController(AtendimentoService atendimentoService) {
        this.atendimentoService = atendimentoService;
    }

    @GetMapping
    public List<Atendimento> listarTodas() {
        return atendimentoService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Atendimento> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(atendimentoService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Atendimento> agendarConsulta(@RequestBody Atendimento atendimento) {
        return ResponseEntity.status(HttpStatus.CREATED).body(atendimentoService.salvar(atendimento));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Atendimento> atualizarStatus(@PathVariable Long id,
            @RequestParam com.example.back.enums.StatusConsulta status) {
        return ResponseEntity.ok(atendimentoService.atualizarStatusConsulta(id, status));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelarConsulta(@PathVariable Long id) {
        atendimentoService.excluir(id);
        return ResponseEntity.noContent().build();
    }
}