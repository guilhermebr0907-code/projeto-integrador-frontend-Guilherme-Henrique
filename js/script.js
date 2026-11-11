
const formulario = document.getElementById("formCadastro");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const divisao = document.getElementById("divisao").value;
    const time = document.getElementById("time").value;

    const usuario = {
        nome: nome,
        email: email,
        divisao: divisao,
        time: time
    };

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    usuarios.push(usuario);

  
    localStorage.setItem("usuarios", JSON.stringify(usuarios));


    document.getElementById("mensagem").textContent =
        "Cadastro realizado com sucesso!";

    document.getElementById("mensagem").style.color = "#4caf50";


    formulario.reset();

});

const clubes = [
    { nome: "Flamengo",    estado: "RJ", fundacao: 1895 },
    { nome: "Corinthians", estado: "SP", fundacao: 1910 },
    { nome: "Atlético-MG", estado: "MG", fundacao: 1908 },
    { nome: "Sport",       estado: "PE", fundacao: 1905 },
    { nome: "Bahia",       estado: "BA", fundacao: 1931 },
    { nome: "Fortaleza",   estado: "CE", fundacao: 1918 },
    { nome: "Cuiabá",      estado: "MT", fundacao: 2001 }
];

function calcularIdade(anoFundacao, anoReferencia = 2026) {
    return anoReferencia - anoFundacao;
}

function classificarFaixa(idade) {
    if (idade >= 120) {
        return "historico";
    } else if (idade >= 100) {
        return "centenario";
    } else if (idade >= 75) {
        return "tradicional";
    } else {
        return "jovem";
    }
}

function formatarIdade(idade) {
    return `${idade} anos de história`;
}

function criarCartaoClube(clube) {
    const cartao = document.createElement("article");
    cartao.classList.add("cartao-clube", `faixa-${clube.faixa}`);

    const titulo = document.createElement("h3");
    titulo.textContent = `${clube.nome} (${clube.estado})`;

    const detalhe = document.createElement("p");
    detalhe.textContent = `Fundado em ${clube.fundacao} — ${formatarIdade(clube.idade)}`;

    const rotulo = document.createElement("span");
    rotulo.classList.add("rotulo-faixa");
    rotulo.textContent = clube.faixa;

    cartao.append(titulo, detalhe, rotulo);
    return cartao;
}

function mostrarResultado() {
    const areaResultado = document.querySelector("#resultado");
    if (areaResultado === null) {
        console.error('Elemento "#resultado" não encontrado no HTML.');
        return;
    }

    const clubesProcessados = clubes.map(function (clube) {
        const idade = calcularIdade(clube.fundacao);
        return { ...clube, idade: idade, faixa: classificarFaixa(idade) };
    });

    const ranking = [...clubesProcessados].sort(function (a, b) {
        return b.idade - a.idade;
    });

    const centenarios = clubesProcessados.filter(function (clube) {
        return clube.idade >= 100;
    });

    const somaIdades = clubesProcessados.reduce(function (acumulado, clube) {
        return acumulado + clube.idade;
    }, 0);
    const media = somaIdades / clubesProcessados.length;

    areaResultado.textContent = ""; 
    const titulo = document.createElement("h2");
    titulo.textContent = "Clubes por tradição";
    areaResultado.append(titulo);

    for (const clube of ranking) {
        areaResultado.append(criarCartaoClube(clube));
    }

    const resumo = document.createElement("p");
    resumo.classList.add("resumo-clubes");
    resumo.textContent =
        `${centenarios.length} de ${clubesProcessados.length} clubes têm 100 anos ou mais | ` +
        `idade média: ${media.toFixed(1)} anos`;
    areaResultado.append(resumo);
}

mostrarResultado();