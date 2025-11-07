let fase = 1;
let posX = 50;

const barco = document.getElementById("barco");
const cenario = document.getElementById("cenario");
const dialogo = document.getElementById("dialogo");

cenario.style.backgroundImage = "url('cenario_mar.png')";

// --- Controles de teclado ---
document.addEventListener("keydown", (event) => {
  if (fase === 1) {
    if (event.key === "ArrowRight") moverDireita();
    if (event.key === "ArrowLeft") moverEsquerda();
  }

  // Enter no PC
  if (fase === 2 && event.key === "Enter") {
    mostrarDialogo();
  }

  // Navegação entre opções (PC)
  if (fase === 3) {
    if (event.key === "ArrowLeft") selecionar("sim");
    if (event.key === "ArrowRight") selecionar("nao");
    if (event.key === "Enter") confirmarEscolha();
  }
});

// --- Controles de toque e clique ---
document.getElementById("direita").addEventListener("touchstart", moverDireita);
document.getElementById("esquerda").addEventListener("touchstart", moverEsquerda);
document.getElementById("direita").addEventListener("mousedown", moverDireita);
document.getElementById("esquerda").addEventListener("mousedown", moverEsquerda);

function moverDireita() {
  if (fase !== 1) return;
  posX += 15;
  barco.style.left = posX + "px";

  if (posX > 600) {
    mudarParaFase2();
  }
}

function moverEsquerda() {
  if (fase !== 1) return;
  posX -= 15;
  if (posX < 0) posX = 0;
  barco.style.left = posX + "px";
}

// --- Mudança de fase ---
function mudarParaFase2() {
  fase = 2;
  cenario.style.backgroundImage = "url('cenario_casa.png')";
  barco.style.display = "none";
  dialogo.classList.remove("hidden");
  dialogo.textContent = "Rafael chega à casa de Alena e a convida para sair amanhã...";

  const continuar = document.createElement("button");
  continuar.textContent = "Continuar";
  continuar.id = "continuarBtn";
  continuar.style.display = "block";
  continuar.style.margin = "15px auto";
  continuar.style.padding = "8px 16px";
  continuar.style.borderRadius = "8px";
  continuar.style.border = "none";
  continuar.style.backgroundColor = "#fff";
  continuar.style.cursor = "pointer";
  dialogo.appendChild(continuar);

  continuar.onclick = () => mostrarDialogo();
}

function mostrarDialogo() {
  fase = 3;
  dialogo.innerHTML = "Alena: Sim ou Não?";

  const botoes = document.createElement("div");
  botoes.classList.add("decisao");
  botoes.innerHTML = `
    <button id="sim">Sim</button>
    <button id="nao">Não</button>
  `;
  dialogo.appendChild(botoes);

  document.getElementById("sim").onclick = () => escolher("sim");
  document.getElementById("nao").onclick = () => escolher("nao");

  selecionar("sim"); // opção inicial
}

let opcaoSelecionada = "sim";

function selecionar(opcao) {
  opcaoSelecionada = opcao;
  document.getElementById("sim").style.background = opcao === "sim" ? "#ffcc00" : "#fff";
  document.getElementById("nao").style.background = opcao === "nao" ? "#ffcc00" : "#fff";
}

function confirmarEscolha() {
  escolher(opcaoSelecionada);
}

function escolher(opcao) {
  if (opcao === "sim") {
    dialogo.innerHTML = "Rafael: Eu saio cedo na sexta, posso vir para Niterói ou podemos nos ver no RJ.";
  } else {
    dialogo.innerHTML = "Rafael: Tudo bem... quem sabe outro dia ❤️";
  }
  fase = 4;
}
