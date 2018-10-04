class categoriaService {

    constructor() { }

    validarDados(data) {

        if (!data.nome) {
            return { status: false, message: "Nome é  Obrigatório" };
        }
    }

}

module.exports = function () {
    return categoriaService;
}