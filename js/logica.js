const ANO_ANALISE = 2026;

const clubesFutebol = [
    { nome: "Flamengo",    estado: "RJ", fundacao: 1895 },
    { nome: "Corinthians", estado: "SP", fundacao: 1910 },
    { nome: "Atlético-MG", estado: "MG", fundacao: 1908 },
    { nome: "Sport",       estado: "PE", fundacao: 1905 },
    { nome: "Bahia",       estado: "BA", fundacao: 1931 },
    { nome: "Fortaleza",   estado: "CE", fundacao: 1918 },
    { nome: "Cuiabá",      estado: "MT", fundacao: 2001 }
];

function lerIdadeMinima() {
    const resposta = prompt("Mostrar clubes com pelo menos quantos anos de história? (0 a 200)");

    if (resposta === null) {                 
        alert("Análise cancelada.");
        return null;
    }
    if (resposta.trim() === "") {            
        alert("Você não digitou nada.");
        return null;
    }

    const idadeMinima = Number(resposta.trim().replace(",", "."));
    if (Number.isNaN(idadeMinima)) {     
        alert("Digite apenas números, por exemplo 100");
        return null;
    }
    if (idadeMinima < 0 || idadeMinima > 200) {   
        alert("Digite um valor entre 0 e 200.");
        return null;
    }
    return idadeMinima;
}

function classificarTradicao(idade) {
    if (idade >= 120) {
        return "Histórico";
    } else if (idade >= 100) {
        return "Centenário";
    } else if (idade >= 75) {
        return "Tradicional";
    } else {
        return "Jovem";
    }
}

function descreverRegiao(estado) {
    let regiao;
    switch (estado) {
        case "RJ":
            regiao = "Sudeste";
            break;
        case "SP":
            regiao = "Sudeste";
            break;
        case "MG":
            regiao = "Sudeste";
            break;
        case "PE":
            regiao = "Nordeste";
            break;
        case "BA":
            regiao = "Nordeste";
            break;
        case "CE":
            regiao = "Nordeste";
            break;
        case "MT":
            regiao = "Centro-Oeste";
            break;
        default:
            regiao = "Região não cadastrada";
    }
    return regiao;
}

function analisarClubes(idadeMinima) {
    let contadorAcimaMinimo = 0;           
    let somaIdades = 0;                  
    let maisAntigo = clubesFutebol[0];    
    const relatorio = [];

    for (const clube of clubesFutebol) {
        const idade = ANO_ANALISE - clube.fundacao;
        const faixa = classificarTradicao(idade);
        const regiao = descreverRegiao(clube.estado);

        if (idade >= idadeMinima) {
            contadorAcimaMinimo++;
        }
        somaIdades += idade;
        if (clube.fundacao < maisAntigo.fundacao) {
            maisAntigo = clube;
        }

        relatorio.push({
            "Clube": clube.nome,
            "Estado": clube.estado,
            "Região": regiao,
            "Fundação": clube.fundacao,
            "Idade": idade,
            "Faixa": faixa
        });
    }

    const media = somaIdades / clubesFutebol.length;

    console.log("===== Relatório de clubes =====");
    console.table(relatorio);
    console.log(`Clubes com ${idadeMinima} anos ou mais: ${contadorAcimaMinimo} de ${clubesFutebol.length}`);
    console.log(`Idade média: ${media.toFixed(1)} anos`);
    console.log(`Clube mais antigo: ${maisAntigo.nome} (fundado em ${maisAntigo.fundacao})`);
}

function consultarClubes() {
    let entrada = prompt('Digite o nome de um clube para consultar (ou "sair"):');

    while (entrada !== null && entrada.trim().toLowerCase() !== "sair") {
        const busca = entrada.trim().toLowerCase();
        const encontrado = clubesFutebol.find(function (clube) {
            return clube.nome.toLowerCase() === busca;
        });

        if (encontrado) {
            const idade = ANO_ANALISE - encontrado.fundacao;
            console.log(`${encontrado.nome} (${encontrado.estado}, ${descreverRegiao(encontrado.estado)}): ${idade} anos — ${classificarTradicao(idade)}`);
        } else {
            console.log(`Clube "${entrada}" não encontrado na lista.`);
        }

        entrada = prompt('Outro clube? (ou "sair"):');
    }
    console.log("Consulta encerrada.");
}

function executarAnalise() {
    const idadeMinima = lerIdadeMinima();
    if (idadeMinima === null) {
        return; 
    }
    analisarClubes(idadeMinima);
    consultarClubes();
}

const botaoAnalise = document.querySelector("#btnAnalise");
if (botaoAnalise !== null) {
    botaoAnalise.addEventListener("click", executarAnalise);
}