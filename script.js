
const cartoes = document.querySelectorAll(".cartao");
const listas = document.querySelectorAll(".lista");
const formulario = document.getElementById("formulario");
const campoTarefa = document.getElementById("novaTarefa");

let cartaoSelecionado = null;

// Configurar o arraste dos cartões
function configurarCartao(cartao) {

    cartao.addEventListener("dragstart", function(evento) {
        cartaoSelecionado = cartao;

        cartao.classList.add("arrastando");

        evento.dataTransfer.effectAllowed = "move";
        evento.dataTransfer.setData("text/plain", "tarefa");
    });

    cartao.addEventListener("dragend", function() {
        cartao.classList.remove("arrastando");

        listas.forEach(function(lista) {
            lista.classList.remove("destino");
        });

        cartaoSelecionado = null;
    });
}

// Configurar as áreas que recebem os cartões
listas.forEach(function(lista) {

    lista.addEventListener("dragover", function(evento) {
        evento.preventDefault();

        evento.dataTransfer.dropEffect = "move";
        lista.classList.add("destino");
    });

    lista.addEventListener("dragleave", function(evento) {
        if (!lista.contains(evento.relatedTarget)) {
            lista.classList.remove("destino");
        }
    });

    lista.addEventListener("drop", function(evento) {
        evento.preventDefault();

        lista.classList.remove("destino");

        if (cartaoSelecionado) {
            lista.appendChild(cartaoSelecionado);
        }
    });
});

// Ativar o arraste dos cartões iniciais
cartoes.forEach(function(cartao) {
    configurarCartao(cartao);
});

// Adicionar novas tarefas na coluna A Fazer
formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const texto = campoTarefa.value.trim();

    if (texto === "") {
        return;
    }

    const novoCartao = document.createElement("div");

    novoCartao.className = "cartao";
    novoCartao.draggable = true;
    novoCartao.textContent = texto;

    configurarCartao(novoCartao);

    document.getElementById("fazer").appendChild(novoCartao);

    formulario.reset();
});
