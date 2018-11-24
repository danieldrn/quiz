class categoriaService {

    constructor() { }

    validarDados(data) {

        if (!data.nome) {
            return { status: false, message: "Nome é  Obrigatório" };
        }
        return { status: true };
    }

}

module.exports = function () {
    return categoriaService;
}