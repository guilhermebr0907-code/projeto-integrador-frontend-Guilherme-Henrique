const clubesDesempenho = [
  { nome: "Palmeiras", pontos: 70, jogos: 38, serie: "A" },
  { nome: "Flamengo", pontos: 79, jogos: 38, serie: "A" },
  { nome: "Cruzeiro", pontos: 66, jogos: 38, serie: "A" },
  { nome: "Corinthians", pontos: 52, jogos: 38, serie: "A" },
  { nome: "Coritiba", pontos: 64, jogos: 38, serie: "B" },
  { nome: "Sport", pontos: 30, jogos: 38, serie: "A" },
  { nome: "Náutico", pontos: 40, jogos: 19, serie: "C" }
];

function calcularAproveitamento(clube, pontosPorVitoria = 3) {
  const maximo = clube.jogos * pontosPorVitoria;
  return maximo === 0 ? 0 : Math.round((clube.pontos / maximo) * 100);
}

function classificarAproveitamento(percentual) {
  if (percentual >= 60) {
    return { rotulo: "Alto", classe: "faixa-alto" };
  } else if (percentual >= 45) {
    return { rotulo: "Médio", classe: "faixa-medio" };
  } else {
    return { rotulo: "Baixo", classe: "faixa-baixo" };
  }
}

function criarFiltroMinimo(minimo) {
  return (item) => item.aproveitamento >= minimo;
}

const resultados = clubesDesempenho.map((clube) => {
  const aproveitamento = calcularAproveitamento(clube);
  return { ...clube, aproveitamento, ...classificarAproveitamento(aproveitamento) };
});

const clubesAltos = resultados.filter(criarFiltroMinimo(60));

const mediaAproveitamento = resultados.reduce((soma, r) => soma + r.aproveitamento, 0) / resultados.length;

const ordenados = [...resultados].sort((a, b) => b.aproveitamento - a.aproveitamento);

function criarCardClube(item) {
  const card = document.createElement("article");
  card.classList.add("item-clube", item.classe);
  card.dataset.faixa = item.classe;

  const titulo = document.createElement("h3");
  titulo.textContent = item.nome;
  const info = document.createElement("p");
  info.textContent = `Série ${item.serie} • ${item.pontos} pts em ${item.jogos} jogos`;
  const aprov = document.createElement("p");
  aprov.textContent = `Aproveitamento: ${item.aproveitamento}%`;
  const rotulo = document.createElement("span");
  rotulo.classList.add("rotulo");
  rotulo.textContent = item.rotulo;

  card.append(titulo, info, aprov, rotulo);
  return card;
}

function mostrarResultados() {
  const area = document.querySelector("#resultado");
  const resumo = document.querySelector("#resumo");
  if (area === null || resumo === null) {
    console.error("Área de resultado não encontrada.");
    return;
  }
  ordenados.forEach((item, i) => {
    const card = criarCardClube(item);
    card.style.animationDelay = `${i * 70}ms`;
    area.append(card);
  });

  const porSerie = resultados.reduce((grupos, r) => {
    grupos[r.serie] = (grupos[r.serie] ?? 0) + 1;
    return grupos;
  }, {});
  const textoSeries = Object.entries(porSerie).map(([s, n]) => `Série ${s}: ${n}`).join(" · ");

  resumo.textContent = `Média de aproveitamento: ${mediaAproveitamento.toFixed(1)}% • ${clubesAltos.length} clube(s) com desempenho alto • ${textoSeries}`;
}

function ativarFiltros() {
  const filtros = document.querySelector("#filtros");
  if (filtros === null) return;
  filtros.addEventListener("click", (evento) => {
    const botao = evento.target.closest("button[data-faixa]");
    if (botao === null) return;
    filtros.querySelectorAll("button").forEach((b) => b.classList.remove("ativo"));
    botao.classList.add("ativo");
    const faixa = botao.dataset.faixa;
    document.querySelectorAll(".item-clube").forEach((card) => {
      card.classList.toggle("escondido", faixa !== "todos" && card.dataset.faixa !== faixa);
    });
  });
}

mostrarResultados();
ativarFiltros();

const formulario = document.getElementById("formCadastro");
if (formulario !== null) {
  formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    const usuario = {
      nome: document.getElementById("nome").value.trim(),
      email: document.getElementById("email").value.trim(),
      divisao: document.getElementById("divisao").value,
      time: document.getElementById("time").value.trim()
    };
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    document.getElementById("mensagem").textContent = `Cadastro realizado com sucesso, ${usuario.nome}!`;
    formulario.reset();
  });
}
