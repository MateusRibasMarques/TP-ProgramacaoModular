package com.example.back.controller;

import com.example.back.model.internacao.Internacao;
import com.example.back.service.InternacaoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/internacoes")
public class InternacaoController {

    private final InternacaoService internacaoService;

    public InternacaoController(InternacaoService internacaoService) {
        this.internacaoService = internacaoService;
    }

    @GetMapping
    public List<Internacao> listarTodas() {
        return internacaoService.listarTodas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Internacao> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(internacaoService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Internacao> registrarInternacao(@RequestBody Internacao internacao) {
        return ResponseEntity.status(HttpStatus.CREATED).body(internacaoService.registrarInternacao(internacao));
    }

    @PutMapping("/{id}/alta")
    public ResponseEntity<Internacao> registrarAlta(@PathVariable Long id, @RequestParam LocalDate dataAlta) {
        return ResponseEntity.ok(internacaoService.registrarAlta(id, dataAlta));
    }
}