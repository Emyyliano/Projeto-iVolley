const urlParams = new URLSearchParams(window.location.search)
const tipo = urlParams.get("tipo")

const tituloLogin = document.getElementById("tituloLogin")
const tituloCadastro = document.getElementById("tituloCadastro")

if (tipo) {
    const tipoFormatado = tipo.charAt(0).toUpperCase() + tipo.slice(1)

    if (tituloLogin) {
        tituloLogin.textContent = `Login - ${tipoFormatado}`
        document.getElementById("cadastroLink").href = `/html/cadastro.html?tipo=${tipo}`
    }

    if (tituloCadastro) {
        tituloCadastro.textContent = `Cadastro - ${tipoFormatado}`
        document.getElementById("loginLink").href = `/html/index.html?tipo=${tipo}`
    }
}