document.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"))

    if (!usuario) {
        alert("Nenhum usuário logado!")
        window.location.href = "/html/login.html"
        return
    }

    const navNomeUsuario = document.getElementById("nav-nomeUsuario")
    const mainNomeUsuario = document.getElementById("main-nomeUsuario")

    if (navNomeUsuario) navNomeUsuario.textContent = usuario.nome
    if (mainNomeUsuario) mainNomeUsuario.textContent = usuario.nome

    if (usuario.tipo === "professor") {
        document.querySelectorAll(".list-item").forEach(item => {
            const btnEditar = document.createElement("button")
            btnEditar.textContent = "Editar"
            btnEditar.classList.add("btn-editar")
            item.appendChild(btnEditar)
        })

        document.querySelectorAll(".player-item").forEach(item => {
            const btnEditar = document.createElement("button")
            btnEditar.textContent = "Editar"
            btnEditar.classList.add("btn-editar")
            item.appendChild(btnEditar)
        })

        const treinosSection = document.querySelector(".treinos-section")
        const jogosSection = document.querySelector(".jogos-section")
        const jogadoresSection = document.querySelector(".jogadores-section")

        const btnAdicionarTreino = document.createElement("button")
        btnAdicionarTreino.textContent = "Adicionar treino"
        btnAdicionarTreino.classList.add("btn-adicionar")
        treinosSection.appendChild(btnAdicionarTreino)

        const btnAdicionarJogador = document.createElement("button")
        btnAdicionarJogador.textContent = "Adicionar jogador"
        btnAdicionarJogador.classList.add("btn-adicionar")
        jogadoresSection.appendChild(btnAdicionarJogador)

        const btnAdicionarJogo = document.createElement("button")
        btnAdicionarJogo.textContent = "Adicionar jogo"
        btnAdicionarJogo.classList.add("btn-adicionar")
        jogosSection.appendChild(btnAdicionarJogo)

        function adicionarFuncionalidadeEditar(btn) {
            btn.addEventListener("click", () => {
                const itemParaEditar = btn.closest('li, .list-item, .player-item')
                const secaoPai = btn.closest('section')
                
                if (secaoPai.classList.contains('treinos-section') || secaoPai.classList.contains('jogos-section')) {
                    const nome = itemParaEditar.querySelector('h3')
                    const [data, local] = itemParaEditar.querySelectorAll('p')

                    const novoNome = prompt("Novo nome (ex: Masculino):", nome.textContent)
                    const novaData = prompt("Nova data (ex: 18/09):", data.textContent)
                    const novoLocal = prompt("Novo local (ex: 17:00 Quadra IFCE):", local.textContent)

                    if (novoNome !== null) nome.textContent = novoNome
                    if (novaData !== null) data.textContent = novaData
                    if (novoLocal !== null) local.textContent = novoLocal
                    
                    alert("Informações atualizadas!")

                } else if (secaoPai.classList.contains('jogadores-section')) {
                    const nome = itemParaEditar.querySelector('h3')
                    const posicao = itemParaEditar.querySelector('p')
                    
                    const novoNome = prompt("Novo nome do jogador:", nome.textContent)
                    const novaPosicao = prompt("Nova posição (ex: Levantador):", posicao.textContent)

                    if (novoNome !== null) nome.textContent = novoNome
                    if (novaPosicao !== null) posicao.textContent = novaPosicao
                    
                    alert("Informações atualizadas!")
                }
            })
        }
        
        document.querySelectorAll(".btn-editar").forEach(adicionarFuncionalidadeEditar)

        const adicionarBotoes = document.querySelectorAll(".btn-adicionar")
        adicionarBotoes.forEach(btn => {
            btn.addEventListener("click", () => {
                const secaoPai = btn.closest('section')
                
                if (secaoPai.classList.contains('treinos-section')) {
                    const nome = prompt("Nome do treino (ex: Masculino):")
                    const data = prompt("Data do treino (ex: 25/10):")
                    const local = prompt("Local e horário (ex: 17:00 às 18:30 Quadra IFCE):")

                    if (nome && data && local) {
                        const newTreino = document.createElement('div')
                        newTreino.classList.add('list-item')
                        const btnEditar = document.createElement("button")
                        btnEditar.textContent = "Editar"
                        btnEditar.classList.add("btn-editar")
                        adicionarFuncionalidadeEditar(btnEditar)
                        
                        newTreino.innerHTML = `
                            <span class="bullet"></span>
                            <div class="item-content">
                                <h3>${nome}</h3>
                                <p>${data}</p>
                                <p>${local}</p>
                            </div>
                        `
                        newTreino.appendChild(btnEditar)
                        secaoPai.querySelector('.list-item').insertAdjacentElement('beforebegin', newTreino)
                        alert("Novo treino adicionado!")
                    }
                } else if (secaoPai.classList.contains('jogadores-section')) {
                    const nome = prompt("Nome do jogador:")
                    const posicao = prompt("Posição do jogador:")

                    if (nome && posicao) {
                        const newJogador = document.createElement('div')
                        newJogador.classList.add('player-item')
                        const btnEditar = document.createElement("button")
                        btnEditar.textContent = "Editar"
                        btnEditar.classList.add("btn-editar")
                        adicionarFuncionalidadeEditar(btnEditar)
                        
                        newJogador.innerHTML = `
                            <div class="player-photo"></div>
                            <div class="player-info">
                                <h3>${nome}</h3>
                                <p>${posicao}</p>
                                <hr>
                            </div>
                        `
                        newJogador.appendChild(btnEditar)
                        secaoPai.querySelector('.player-list').appendChild(newJogador)
                        alert("Novo jogador adicionado!")
                    }
                } else if (secaoPai.classList.contains('jogos-section')) {
                    const nome = prompt("Nome do jogo:")
                    const data = prompt("Data do jogo:")
                    const local = prompt("Local e horário:")
                    
                    if (nome && data && local) {
                        const newJogo = document.createElement('div')
                        newJogo.classList.add('list-item')
                        const btnEditar = document.createElement("button")
                        btnEditar.textContent = "Editar"
                        btnEditar.classList.add("btn-editar")
                        adicionarFuncionalidadeEditar(btnEditar) 
                        
                        newJogo.innerHTML = `
                            <span class="bullet"></span>
                            <div class="item-content">
                                <h3>${nome}</h3>
                                <p>${data}</p>
                                <p>${local}</p>
                            </div>
                        `
                        newJogo.appendChild(btnEditar)
                        secaoPai.querySelector('.list-item').insertAdjacentElement('beforebegin', newJogo)
                        alert("Novo jogo adicionado!")
                    }
                }
            })
        })
    }
})

function logout() {
    localStorage.removeItem("usuarioLogado")
    window.location.href = "/html/login.html"
}