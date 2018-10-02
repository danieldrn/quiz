class perguntaService {

    constructor() { }

    validarDados(data) {

        if (!data.pergunta) {
            return { status: false, message: "pergunta Obrigatória" };
        }

        if (data.respostas.length > 5) {
            return {
                status: false, message: "A quantidade " +
                    "maxima de respostas cadastradas pra a pergunta de ser de apenas 5(cinco)"
            };
        }

        var valideConsistenciaDasCondicoes = this.valideConsistenciaDasCondicoes(data);

        if(valideConsistenciaDasCondicoes){
            return {
                status: false, message: valideConsistenciaDasCondicoes
            }; 
        }

        var validacaoDeCondicoes = this.valideExistenciaDeApenasUmaRespostaCorreta(data);

        if(validacaoDeCondicoes){
            return {
                status: false, message: validacaoDeCondicoes
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

    valideExistenciaDeApenasUmaRespostaCorreta(resposta) {

        var contTrue = 0;
        var contFalse = 0;

        var respostas = resposta.respostas;

        respostas.forEach(resp => {

            var cond = resp.condicao;

            if (cond == "true") {
                contTrue = contTrue + 1;
            } else {
                contFalse = contFalse + 1;
            }
        });

        if (contTrue > 1) {

            return {
                message: "Deve Existir apenas uma " +
                    "condição verdadeira entre as respostas para a Pergunta: " + resposta.pergunta
            };

        } else if (contFalse == 5) {

            return {
                message: "Deve Existir uma " +
                    "condição verdadeira entre as respostas para a Pergunta: " + resposta.pergunta
            };
        }
    }

    valideConsistenciaDasCondicoes(data){

        var contador = 1;

        for (const resp of data.respostas) {

            if(!resp.label){
                return {
                    message: "Deve ser informada a label para a alternativa " + contador
                };
            }

            if(!resp.descricao){
                return {
                    message: "Deve ser informada a descricao para a alternativa " + contador
                };
            }

            if(!resp.condicao){
                return {
                    message: "Deve ser informada a condicao para a alternativa " + contador
                };
            }

            contador++;
        }     
    }

}

module.exports = function () {
    return perguntaService;
}