const clubesDividas = [
  { nome: "Corinthians", divida: 2.75, serie: "A" },
  { nome: "Atlético-MG", divida: 2.66, serie: "A" },
  { nome: "São Paulo", divida: 2.45, serie: "A" },
  { nome: "Cruzeiro", divida: 1.10, serie: "A" },
  { nome: "Vasco", divida: 1.90, serie: "A" },
  { nome: "Santos", divida: 0.95, serie: "B" },
  { nome: "Náutico", divida: 0.25, serie: "C" },
  { nome: "Santa Cruz", divida: 0.18, serie: "D" }
];

const saidaLogica = document.querySelector("#saidaLogica");

function mostrarSaida(texto) {
  if (saidaLogica !== null) {
    saidaLogica.textContent = texto;
  }
}

function classificarDivida(divida) {
  if (divida >= 2.5) {
    return "Crítica";
  } else if (divida >= 1.5) {
    return "Alta";
  } else if (divida >= 0.5) {
    return "Moderada";
  } else {
    return "Controlada";
  }
}

function descreverSerie(serie) {
  let mensagem = "";
  switch (serie) {
    case "A":
      mensagem = "Elite do futebol nacional";
      break;
    case "B":
      mensagem = "Briga pelo acesso à Série A";
      break;
    case "C":
      mensagem = "Terceira divisão nacional";
      break;
    case "D":
      mensagem = "Porta de entrada do Brasileirão";
      break;
    default:
      mensagem = "Série desconhecida";
      break;
  }
  return mensagem;
}

function lerMinimo() {
  const resposta = prompt("Dívida mínima para destacar (em bilhões, de 0 a 5):", "1.5");
  if (resposta === null) {
    return null;
  }
  const textoLimpo = resposta.trim().replace(",", ".");
  if (textoLimpo === "") {
    alert("Você não digitou nada. Usando 1.5 como padrão.");
    return 1.5;
  }
  const minimo = Number(textoLimpo);
  if (Number.isNaN(minimo)) {
    alert("Isso não é um número. Usando 1.5 como padrão.");
    return 1.5;
  }
  if (minimo < 0 || minimo > 5) {
    alert("Fora da faixa (0 a 5). Usando 1.5 como padrão.");
    return 1.5;
  }
  return minimo;
}

function analisarDividas(minimo) {
  let acimaDoMinimo = 0;
  let somaDividas = 0;
  let maiorDevedor = clubesDividas[0];
  const relatorio = [];

  for (const clube of clubesDividas) {
    const nivel = classificarDivida(clube.divida);
    somaDividas += clube.divida;
    if (clube.divida >= minimo) {
      acimaDoMinimo++;
    }
    if (clube.divida > maiorDevedor.divida) {
      maiorDevedor = clube;
    }
    relatorio.push({
      clube: clube.nome,
      divida: `R$ ${clube.divida.toFixed(2)} bi`,
      nivel: nivel,
      serie: descreverSerie(clube.serie)
    });
  }

  const media = somaDividas / clubesDividas.length;
  console.table(relatorio);

  const linhas = relatorio.map((r) => `• ${r.clube}: ${r.divida} — ${r.nivel} (${r.serie})`);
  return [
    `Mínimo informado: R$ ${minimo.toFixed(2)} bi`,
    "",
    ...linhas,
    "",
    `Clubes acima do mínimo: ${acimaDoMinimo} de ${clubesDividas.length}`,
    `Dívida total: R$ ${somaDividas.toFixed(2)} bi`,
    `Média: R$ ${media.toFixed(2)} bi`,
    `Maior devedor: ${maiorDevedor.nome} (R$ ${maiorDevedor.divida.toFixed(2)} bi)`
  ].join("\n");
}

function consultarClubes() {
  const consultas = [];
  let comando = prompt('Digite o nome de um clube para consultar (ou "sair"):') ?? "sair";
  while (comando.trim().toLowerCase() !== "sair") {
    const busca = comando.trim().toLowerCase();
    const encontrado = clubesDividas.find((c) => c.nome.toLowerCase() === busca);
    consultas.push(encontrado
      ? `${encontrado.nome}: dívida ${classificarDivida(encontrado.divida)}`
      : `"${comando}" não está na lista`);
    comando = prompt('Outro clube (ou "sair"):') ?? "sair";
  }
  return consultas;
}

function rodarAnalise() {
  const minimo = lerMinimo();
  if (minimo === null) {
    mostrarSaida("Análise cancelada.");
    return;
  }
  const texto = analisarDividas(minimo);
  const consultas = consultarClubes();
  const extra = consultas.length > 0 ? `\n\nConsultas:\n${consultas.join("\n")}` : "";
  mostrarSaida(texto + extra);
  console.log(texto + extra);
}

function menuInterativo() {
  let opcao = "";
  let ultimaSaida = "Menu encerrado.";
  do {
    opcao = prompt("Menu FutBrasil:\n1 — Listar clubes\n2 — Resumir dívidas\n3 — Sair") ?? "3";
    switch (opcao.trim()) {
      case "1":
        ultimaSaida = clubesDividas.map((c) => `${c.nome} (Série ${c.serie})`).join("\n");
        alert(ultimaSaida);
        break;
      case "2":
        ultimaSaida = analisarDividas(0);
        alert(ultimaSaida);
        break;
      case "3":
        break;
      default:
        alert("Opção inválida.");
        break;
    }
  } while (opcao.trim() !== "3");
  mostrarSaida(ultimaSaida);
}

const btnAnalisar = document.querySelector("#btnAnalisar");
const btnMenu = document.querySelector("#btnMenu");
if (btnAnalisar !== null) btnAnalisar.addEventListener("click", rodarAnalise);
if (btnMenu !== null) btnMenu.addEventListener("click", menuInterativo);