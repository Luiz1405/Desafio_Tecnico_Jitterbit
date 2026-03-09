function validarContentType(contentType) {
    return contentType && contentType.includes('application/json');
}

function validarBodyVazio(corpo) {
    return corpo && corpo.trim() !== '';
}

function validarJSON(corpo) {
    try {
        return JSON.parse(corpo);
    } catch {
        return null;
    }
}

function isErroValidacao(erro) {
    return erro.message.includes('obrigatório') ||
        erro.message.includes('deve ser') ||
        erro.message.includes('não pode');
}

module.exports = {
    validarContentType,
    validarBodyVazio,
    validarJSON,
    isErroValidacao
};
