
package com.example.back.exeptions;

public class AtendimentoIndisponivelException extends RuntimeException {

    public AtendimentoIndisponivelException(String mensagem) {
        super(mensagem);
    }
}
