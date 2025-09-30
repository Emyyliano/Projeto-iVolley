// Pegar parâmetro da URL
const urlParams = new URLSearchParams(window.location.search);
const tipo = urlParams.get("tipo");

// Ajustar título do login
const tituloLogin = document.getElementById("tituloLogin");
const tituloCadastro = document.getElementById("tituloCadastro");

if (tipo) {
    // Coloca em maiúsculo a primeira letra
    const tipoFormatado = tipo.charAt(0).toUpperCase() + tipo.slice(1);

    if (tituloLogin) {
        tituloLogin.textContent = `Login - ${tipoFormatado}`;
        // ajustar link para cadastro
        document.getElementById("cadastroLink").href = `/html/cadastro.html?tipo=${tipo}`;
    }

    if (tituloCadastro) {
        tituloCadastro.textContent = `Cadastro - ${tipoFormatado}`;
        // ajustar link para login
        document.getElementById("loginLink").href = `/html/index.html?tipo=${tipo}`;
    }
}
