
package com.example.back.exeptions;

public class ProfissionalIncompativelException extends RuntimeException {

    public ProfissionalIncompativelException(String mensagem) {
        super(mensagem);
    }
}
