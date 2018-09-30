class perguntaService {

    constructor() { }

    validarDados(data) {

        if (!data.pergunta) {
            return { status: false, message: "pergunta Obrigatória" };
        }

        if (!this.valideExistenciaDeApenasUmasRespostaCorreta(data)) {
            return {
                status: false, message: "Deve Existir apenas uma " +
                    "condição verdadeira entre as respostas"
            };
        }

        if (data.respostas.length > 5) {
            return {
                status: false, message: "A quantidade " +
                    "maxima de respostas cadastradas pra a pergunta de ser de apenas 5(cinco)"
            };
        }

        if (data.respostas.length < 5) {
            return {
                status: false, message: "A quantidade " +
                    "minima de respostas cadastradas pra a pergunta de ser de apenas 5(cinco)"
            };
        }

        if (!data.categoria) {
            return { status: false, message: "categoria Obrigatório" };
        }

        return { status: true };
    }

    valideExistenciaDeApenasUmasRespostaCorreta(resposta) {

        var cont = 0;
        var respostas = resposta.respostas;

        respostas.forEach(resp => {

            var cond = resp.condicao;

            if (cond == "true") {
                cont = cont + 1;
            }
        });

        if (cont == 1) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = function () {
    return perguntaService;
}