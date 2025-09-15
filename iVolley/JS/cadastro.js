document.addEventListener("DOMContentLoaded", () => {
    const cadastroForm = document.querySelector('form')
    const perfilSelecionado = localStorage.getItem('perfilSelecionado')

    if (!perfilSelecionado) {
        alert("Nenhum perfil selecionado. Retornando à página inicial.")
        window.location.href = '/html/index.html'
        return
    }

    cadastroForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const nome = document.getElementById('nome').value
        const email = document.getElementById('email').value
        const matricula = document.getElementById('matricula').value
        const senha = document.getElementById('senha').value
        const confirmarSenha = document.getElementById('confirmar').value

        if (!nome || !email || !matricula || !senha || !confirmarSenha) {
            alert("Por favor, preencha todos os campos.")
            return
        }

        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem.")
            return
        }

        const usuariosCadastrados = JSON.parse(localStorage.getItem('usuariosCadastrados')) || []

        const matriculaExistente = usuariosCadastrados.some(user => user.matricula === matricula)
        if (matriculaExistente) {
            alert("Esta matrícula já está cadastrada.")
            return
        }

        const novoUsuario = {
            nome: nome,
            email: email,
            matricula: matricula,
            senha: senha,
            tipo: perfilSelecionado
        }

        usuariosCadastrados.push(novoUsuario)

        localStorage.setItem('usuariosCadastrados', JSON.stringify(usuariosCadastrados))

        alert("Cadastro realizado com sucesso!")
        localStorage.removeItem('perfilSelecionado')
        window.location.href = '/html/login.html'
    })
})