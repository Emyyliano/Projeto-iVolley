document.addEventListener("DOMContentLoaded", () => {
    const perfilSelecionado = localStorage.getItem('perfilSelecionado')
    const loginForm = document.querySelector('form')
    const tituloLogin = document.querySelector('h1')

    if (perfilSelecionado) {
        tituloLogin.textContent = `Login de ${perfilSelecionado.charAt(0).toUpperCase() + perfilSelecionado.slice(1)}`
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const matricula = document.getElementById('matricula').value
        const senha = document.getElementById('senha').value

        const usuariosCadastrados = JSON.parse(localStorage.getItem('usuariosCadastrados')) || []

        const usuarioAutenticado = usuariosCadastrados.find(user => 
            user.matricula === matricula &&
            user.senha === senha &&
            user.tipo === perfilSelecionado
        )

        if (usuarioAutenticado) {
            localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAutenticado))
            localStorage.removeItem('perfilSelecionado')
            window.location.href = '/html/inicio.html'
        } else {
            alert('Dados de login incorretos ou perfil inválido!')
        }
    })
})