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

    const modal = document.getElementById('add-modal')
    const modalForm = document.getElementById('modal-form')
    const modalTitle = document.getElementById('modal-title')
    const modalFields = document.getElementById('modal-fields')
    const cancelBtn = document.getElementById('cancel-btn')
    let currentItemType = ''

    const showModal = (itemType) => {
        currentItemType = itemType
        modal.style.display = 'flex'
        modalTitle.textContent = `Adicionar ${itemType.charAt(0).toUpperCase() + itemType.slice(1)}`
        modalFields.innerHTML = ''
        let fieldsHTML = ''
        if (itemType === 'treino' || itemType === 'jogo') {
            fieldsHTML = `
                <label for="time">Time:</label>
                <input type="text" id="time" required>
                <label for="data">Data:</label>
                <input type="text" id="data" required>
                <label for="local">Local e Horário:</label>
                <input type="text" id="local" required>
            `
        } else if (itemType === 'jogador') {
            fieldsHTML = `
                <label for="nome">Nome:</label>
                <input type="text" id="nome" required>
                <label for="posicao">Posição:</label>
                <input type="text" id="posicao" required>
            `
        }
        modalFields.innerHTML = fieldsHTML
    }

    const hideModal = () => {
        modal.style.display = 'none'
        modalForm.reset()
    }

    cancelBtn.addEventListener('click', hideModal)

    modalForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        
        let newData = {}
        let databaseRef = ''

        if (currentItemType === 'treino' || currentItemType === 'jogo') {
            const time = document.getElementById('time').value
            const data = document.getElementById('data').value
            const local = document.getElementById('local').value
            newData = { time, data, local }
            databaseRef = (currentItemType === 'treino') ? 'treinos' : 'jogos'
        } else if (currentItemType === 'jogador') {
            const nome = document.getElementById('nome').value
            const posicao = document.getElementById('posicao').value
            newData = { nome, posicao }
            databaseRef = 'jogadores'
        }

        try {
            await database.ref(databaseRef).push(newData)
            alert("Item adicionado com sucesso!")
            hideModal()
            carregarDados()
        } catch (error) {
            console.error("Erro ao adicionar item:", error)
            alert("Erro ao adicionar item.")
        }
    })

    const carregarDados = () => {
        const treinosList = document.querySelector('.treinos-section .list-container')
        const jogadoresList = document.querySelector('.jogadores-section .player-list-container')
        const jogosList = document.querySelector('.jogos-section .list-container')
    
        if (treinosList) treinosList.innerHTML = ''
        if (jogadoresList) jogadoresList.innerHTML = ''
        if (jogosList) jogosList.innerHTML = ''

        database.ref('treinos').on('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                const treino = childSnapshot.val()
                const treinoElement = document.createElement('div')
                treinoElement.classList.add('list-item')
                treinoElement.setAttribute('data-id', childSnapshot.key)
                treinoElement.innerHTML = `
                    <span class="bullet"></span>
                    <div class="item-content">
                        <h3>${treino.time}</h3>
                        <p>${treino.data}</p>
                        <p>${treino.local}</p>
                    </div>
                `
                if (usuario.tipo === "professor") {
                    treinoElement.innerHTML += `
                        <div class="item-actions">
                            <button onclick="editarItem('treinos', '${childSnapshot.key}')" class="btn-editar">Editar</button>
                            <button onclick="excluirItem('treinos', '${childSnapshot.key}')" class="btn-excluir">Excluir</button>
                        </div>
                    `
                }
                if (treinosList) treinosList.appendChild(treinoElement)
            })
        })
        
        database.ref('jogadores').on('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                const jogador = childSnapshot.val()
                const jogadorElement = document.createElement('div')
                jogadorElement.classList.add('player-item')
                jogadorElement.setAttribute('data-id', childSnapshot.key)
                jogadorElement.innerHTML = `
                    <div class="player-photo"></div>
                    <div class="player-info">
                        <h3>${jogador.nome}</h3>
                        <p>${jogador.posicao}</p>
                        <hr>
                    </div>
                `
                if (usuario.tipo === "professor") {
                    jogadorElement.innerHTML += `
                        <div class="item-actions">
                            <button onclick="editarItem('jogadores', '${childSnapshot.key}')" class="btn-editar">Editar</button>
                            <button onclick="excluirItem('jogadores', '${childSnapshot.key}')" class="btn-excluir">Excluir</button>
                        </div>
                    `
                }
                if (jogadoresList) jogadoresList.appendChild(jogadorElement)
            })
        })

        database.ref('jogos').on('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                const jogo = childSnapshot.val()
                const jogoElement = document.createElement('div')
                jogoElement.classList.add('list-item')
                jogoElement.setAttribute('data-id', childSnapshot.key)
                jogoElement.innerHTML = `
                    <span class="bullet"></span>
                    <div class="item-content">
                        <h3>${jogo.time}</h3>
                        <p>${jogo.data}</p>
                        <p>${jogo.local}</p>
                    </div>
                `
                if (usuario.tipo === "professor") {
                    jogoElement.innerHTML += `
                        <div class="item-actions">
                            <button onclick="editarItem('jogos', '${childSnapshot.key}')" class="btn-editar">Editar</button>
                            <button onclick="excluirItem('jogos', '${childSnapshot.key}')" class="btn-excluir">Excluir</button>
                        </div>
                    `
                }
                if (jogosList) jogosList.appendChild(jogoElement)
            })
        })
    }

    carregarDados()

    if (usuario.tipo === "professor") {
        document.querySelector(".btn-adicionar").addEventListener("click", () => showModal('treino'))
        document.querySelector(".btn-adicionar-jogador").addEventListener("click", () => showModal('jogador'))
        document.querySelector(".jogos-section .btn-adicionar").addEventListener("click", () => showModal('jogo'))
    } else {
        document.querySelectorAll(".btn-adicionar, .btn-adicionar-jogador").forEach(btn => {
            btn.style.display = 'none'
        })
    }

    function editarItem(secao, itemId) {
        let ref
        let newValues = {}
    
        if (secao === 'jogadores') {
            const nome = prompt("Novo nome do jogador:")
            const posicao = prompt("Nova posição do jogador:")
            if (nome) newValues.nome = nome
            if (posicao) newValues.posicao = posicao
            ref = database.ref(`jogadores/${itemId}`)
        } else if (secao === 'jogos') {
            const time = prompt("Novo time (ex: Masculino):")
            const data = prompt("Nova data (ex: 25/10):")
            const local = prompt("Novo local e horário:")
            if (time) newValues.time = time
            if (data) newValues.data = data
            if (local) newValues.local = local
            ref = database.ref(`jogos/${itemId}`)
        } else if (secao === 'treinos') {
            const time = prompt("Novo time (ex: Masculino):")
            const data = prompt("Nova data (ex: 25/10):")
            const local = prompt("Novo local e horário:")
            if (time) newValues.time = time
            if (data) newValues.data = data
            if (local) newValues.local = local
            ref = database.ref(`treinos/${itemId}`)
        }
    
        if (Object.keys(newValues).length > 0) {
            ref.update(newValues)
                .then(() => alert("Item editado com sucesso!"))
                .catch(error => console.error("Erro ao editar item:", error))
        }
    }

    function excluirItem(secao, itemId) {
        if (confirm("Tem certeza que deseja excluir este item?")) {
            let ref
            if (secao === 'jogadores') {
                ref = database.ref(`jogadores/${itemId}`)
            } else if (secao === 'jogos') {
                ref = database.ref(`jogos/${itemId}`)
            } else if (secao === 'treinos') {
                ref = database.ref(`treinos/${itemId}`)
            }

            ref.remove()
                .then(() => alert("Item excluído com sucesso!"))
                .catch(error => console.error("Erro ao excluir item:", error))
        }
    }

    function logout() {
        auth.signOut().then(() => {
            localStorage.removeItem("usuarioLogado")
            window.location.href = "/html/login.html"
        }).catch((error) => {
            console.error("Erro ao fazer logout:", error)
        })
    }
})