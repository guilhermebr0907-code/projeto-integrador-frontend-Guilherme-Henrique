
const formulario = document.getElementById("formCadastro");

formulario.addEventListener("submit", function(event) {

    // Impede que a página seja recarregada
    event.preventDefault();

    // Captura os dados preenchidos
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const divisao = document.getElementById("divisao").value;
    const time = document.getElementById("time").value;

    // Cria um objeto com os dados do usuário
    const usuario = {
        nome: nome,
        email: email,
        divisao: divisao,
        time: time
    };

    // Recupera os usuários já cadastrados
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Adiciona o novo usuário
    usuarios.push(usuario);

    // Salva a lista atualizada
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Exibe mensagem de confirmação
    document.getElementById("mensagem").textContent =
        "Cadastro realizado com sucesso!";

    document.getElementById("mensagem").style.color = "#4caf50";

    // Limpa os campos
    formulario.reset();

});
