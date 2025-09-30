document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector('form')
    const perfilSelecionado = localStorage.getItem('perfilSelecionado')
    const tituloLogin = document.querySelector('h1')

    if (perfilSelecionado) {
        tituloLogin.textContent = `Login de ${perfilSelecionado.charAt(0).toUpperCase() + perfilSelecionado.slice(1)}`
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault()

        const matriculaInput = document.getElementById('matricula').value
        const senhaInput = document.getElementById('senha').value

        try {
            const snapshot = await database.ref('usuarios').once('value')
            const usuarios = snapshot.val()
            let usuarioEncontrado = null
            let emailDoUsuario = null

            for (const uid in usuarios) {
                if (usuarios[uid].matricula === matriculaInput && usuarios[uid].tipo === perfilSelecionado) {
                    usuarioEncontrado = usuarios[uid]
                    emailDoUsuario = usuarios[uid].email
                    break
                }
            }
            
            if (!usuarioEncontrado) {
                alert("Matrícula não encontrada ou perfil inválido!")
                return
            }

            const userCredential = await auth.signInWithEmailAndPassword(emailDoUsuario, senhaInput)
            const user = userCredential.user

            localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado))
            localStorage.removeItem('perfilSelecionado')
            window.location.href = '/html/inicio.html'
            
        } catch (error) {
            console.error("Erro no login:", error)
            if (error.code === 'auth/wrong-password') {
                alert("Senha incorreta.")
            } else {
                alert("Erro ao fazer login: " + error.message)
            }
        }
    })
})