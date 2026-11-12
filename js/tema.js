(() => {
  const raiz = document.documentElement;
  const preferenciaSistema = window.matchMedia("(prefers-color-scheme: dark)");
  let preferencia = null;
  try {
    preferencia = localStorage.getItem("futbrasil-tema");
  } catch {

  }
  const temaSalvo = preferencia === "escuro" || preferencia === "claro";
  let escolhaManual = temaSalvo;
  function aplicarTema(escuro) {
    raiz.dataset.tema = escuro ? "escuro" : "claro";
    const botao = document.getElementById("alternarTema");
    if (botao === null) return;
    botao.setAttribute("aria-pressed", String(escuro));
    const descricao = escuro ? "Ativar modo claro" : "Ativar modo escuro";
    botao.setAttribute("aria-label", descricao);
    botao.title = descricao;
  }
  aplicarTema(temaSalvo ? preferencia === "escuro" : preferenciaSistema.matches);
  preferenciaSistema.addEventListener("change", (evento) => {
    if (!escolhaManual) aplicarTema(evento.matches);
  });
  document.addEventListener("DOMContentLoaded", () => {
    aplicarTema(raiz.dataset.tema === "escuro");
    const botao = document.getElementById("alternarTema");
    if (botao === null) return;
    botao.addEventListener("click", () => {
      escolhaManual = true;
      aplicarTema(raiz.dataset.tema !== "escuro");
      try {
        localStorage.setItem("futbrasil-tema", raiz.dataset.tema);
      } catch {
      }
    });
  }, { once: true });
})();