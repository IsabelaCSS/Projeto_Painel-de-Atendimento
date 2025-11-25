/* -------------------------------------------
   CONFIGURAÇÃO DE GUICHÊS
------------------------------------------- */

// Guichês que atendem senhas comuns
let guichesComum = [1, 3, 5];
let indexComum = 0;

// Guichês preferenciais
let guichesPref = [2, 4];
let indexPref = 0;

// Contadores de senhas
let contadorComum = 0;
let contadorPref = 0;


/* -------------------------------------------
   RELÓGIO EM TEMPO REAL
------------------------------------------- */

function atualizarRelogio() {
    const agora = new Date();

    // Atualiza hora
    document.getElementById("hora").textContent =
        agora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

    // Atualiza data
    document.getElementById("data").textContent =
        agora.toLocaleDateString("pt-BR");
}

// Atualiza a cada 1 segundo
setInterval(atualizarRelogio, 1000);
atualizarRelogio();


/* -------------------------------------------
   GERAR SENHA SEQUENCIAL
------------------------------------------- */

function gerarSenhaSequencial(tipo) {

    // Senha comum: 0001, 0002...
    if (tipo === "comum") {
        contadorComum++;
        return String(contadorComum).padStart(4, "0");
    }

    // Senha preferencial: P001, P002...
    if (tipo === "preferencial") {
        contadorPref++;
        return "P" + String(contadorPref).padStart(3, "0");
    }
}


/* -------------------------------------------
   CHAMAR SENHA PARA O GUICHÊ
------------------------------------------- */

function chamarSenhaGuiche(tipo) {
    const senha = gerarSenhaSequencial(tipo);

    if (tipo === "comum") {

        // Alterna guichê automaticamente
        const guiche = guichesComum[indexComum];
        indexComum = (indexComum + 1) % guichesComum.length;

        // Atualiza painel
        document.getElementById("senha-guiche-1").textContent = senha;
        document.querySelector(".cinza .guiche").textContent =
            `Guichê ${guiche}`;

        adicionarUltimaChamada(senha, `Guichê ${guiche}`, "comum");
    }

    if (tipo === "preferencial") {

        const guiche = guichesPref[indexPref];
        indexPref = (indexPref + 1) % guichesPref.length;

        document.getElementById("senha-guiche-4").textContent = senha;
        document.querySelector(".vermelho .guiche").textContent =
            `Guichê ${guiche}`;

        adicionarUltimaChamada(senha, `Guichê ${guiche}`, "preferencial");
    }
}


/* -------------------------------------------
   ÚLTIMAS CHAMADAS
------------------------------------------- */

function adicionarUltimaChamada(senha, guiche, tipo) {
    const lista = document.getElementById("lista-ultimas");

    const li = document.createElement("li");
    li.classList.add("item-chamada");

    // Preferencial sempre inserido por cima
    if (tipo === "preferencial") {
        li.classList.add("preferencial-item");
        lista.prepend(li);
    } else {
        li.classList.add("comum-item");
        lista.appendChild(li);
    }

    // Conteúdo do item da lista
    li.innerHTML = `
        <span>${senha}</span>
        <span>${guiche}</span>
        <button class="btn-atendido">Atendido</button>
    `;

    // Ao clicar em ATENDIDO → vai para consultas
    li.querySelector(".btn-atendido").addEventListener("click", () => {
        adicionarConsultaAleatoria(senha, guiche);
        li.remove();
    });
}


/* -------------------------------------------
   CONSULTAS GERADAS
------------------------------------------- */

const pacientes = [
    { nome: "Ana Beatriz Mendes", sala: "SALA 7 - Dermatologia" },
    { nome: "Carlos Henrique Lima", sala: "SALA 3 - Pediatria" },
    { nome: "Juliana Pereira", sala: "SALA 12 - Neurologia" },
    { nome: "Rafael Matos", sala: "SALA 1 - Clínica Geral" },
    { nome: "Fernanda Carvalho", sala: "SALA 6 - Psicologia" },
    { nome: "Gabriel Santos", sala: "SALA 8 - Otorrinolaringologia" },
    { nome: "Patrícia Almeida", sala: "SALA 5 - Endocrinologia" },
    { nome: "Lucas Ferreira", sala: "SALA 11 - Reumatologia" },
    { nome: "Bruna Castro", sala: "SALA 13 - Gastroenterologia" },
    { nome: "Rodrigo Teixeira", sala: "SALA 14 - Urologia" },
    { nome: "João da Silva", sala: "SALA 2 - Oftalmologista" },
    { nome: "Maria Souza", sala: "SALA 4 - Cardiologista" },
    { nome: "Pedro Rocha", sala: "SALA 10 - Ortopedia" }
];

function adicionarConsultaAleatoria() {
    const area = document.getElementById("consultas");

    // Escolhe paciente aleatório
    const p = pacientes[Math.floor(Math.random() * pacientes.length)];

    const box = document.createElement("div");
    box.classList.add("consulta-card");

    box.innerHTML = `
        <strong>${p.nome}</strong>
        <div>${p.sala}</div>
        <button class="btn-concluir">Atendimento Concluído</button>
    `;

    area.appendChild(box);

    // Excluir consulta após clicar
    box.querySelector(".btn-concluir").addEventListener("click", () => {
        box.remove();
    });
}
