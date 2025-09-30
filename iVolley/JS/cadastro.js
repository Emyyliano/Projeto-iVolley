document.addEventListener("DOMContentLoaded", () => {
    const cadastroForm = document.querySelector('form')
    const perfilSelecionado = localStorage.getItem('perfilSelecionado')

    if (perfilSelecionado === 'aluno') {
        alert("Apenas professores podem cadastrar novos usuários.")
        localStorage.removeItem('perfilSelecionado')
        window.location.href = '/html/login.html'
        return
    }
    
    if (!perfilSelecionado) {
        alert("Nenhum perfil selecionado. Retornando à página inicial.")
        window.location.href = '/html/index.html'
        return
    }

    cadastroForm.addEventListener('submit', async (e) => {
        e.preventDefault()

        const nome = document.getElementById('nome').value
        const email = document.getElementById('email').value
        const matricula = document.getElementById('matricula').value
        const senha = document.getElementById('senha').value
        const confirmarSenha = document.getElementById('confirmar').value
        const tipoUsuario = document.getElementById('tipo').value

        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem.")
            return
        }

        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, senha)
            const user = userCredential.user

            await database.ref('usuarios/' + user.uid).set({
                nome: nome,
                email: email,
                matricula: matricula,
                tipo: tipoUsuario
            })

            alert("Cadastro realizado com sucesso!")
            localStorage.removeItem('perfilSelecionado')
            window.location.href = '/html/login.html'
        } catch (error) {
            console.error("Erro no cadastro:", error)
            if (error.code === 'auth/email-already-in-use') {
                alert("Este e-mail já está em uso.")
            } else {
                alert("Erro ao cadastrar: " + error.message)
            }
        }
    })
})