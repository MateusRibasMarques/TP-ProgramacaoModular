package com.example.back.controller;

import com.example.back.model.quarto.Quarto;
import com.example.back.service.QuartoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quartos")
public class QuartoController {

    private final QuartoService quartoService;

    public QuartoController(QuartoService quartoService) {
        this.quartoService = quartoService;
    }

    @GetMapping
    public List<Quarto> listarTodos() {
        return quartoService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Quarto> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(quartoService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Quarto> salvar(@RequestBody Quarto quarto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(quartoService.salvar(quarto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Quarto> atualizar(@PathVariable Long id, @RequestBody Quarto quarto) {
        return ResponseEntity.ok(quartoService.atualizar(id, quarto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        quartoService.excluir(id);
        return ResponseEntity.noContent().build();
    }
}