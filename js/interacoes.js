const brilho = document.querySelector(".cursor-glow");
document.addEventListener("mousemove", (e) => {
  if (brilho !== null) {
    brilho.style.left = `${e.clientX}px`;
    brilho.style.top = `${e.clientY}px`;
  }
});

document.querySelectorAll(".btn").forEach((botao) => {
  botao.addEventListener("mousemove", (e) => {
    const r = botao.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    botao.style.setProperty("--mx", `${x}px`);
    botao.style.setProperty("--my", `${y}px`);
    if (botao.classList.contains("btn-magnetico")) {
      const dx = (x - r.width / 2) * 0.25;
      const dy = (y - r.height / 2) * 0.35;
      botao.style.transform = `translate(${dx}px, ${dy}px)`;
    }
  });
  botao.addEventListener("mouseleave", () => {
    botao.style.transform = "";
  });
  botao.addEventListener("click", (e) => {
    const r = botao.getBoundingClientRect();
    const onda = document.createElement("span");
    const tamanho = Math.max(r.width, r.height);
    onda.classList.add("ripple");
    onda.style.width = onda.style.height = `${tamanho}px`;
    onda.style.left = `${e.clientX - r.left - tamanho / 2}px`;
    onda.style.top = `${e.clientY - r.top - tamanho / 2}px`;
    botao.append(onda);
    setTimeout(() => onda.remove(), 600);
  });
});

document.querySelectorAll(".inclinar").forEach((cartao) => {
  cartao.addEventListener("mousemove", (e) => {
    const r = cartao.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -14;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 14;
    cartao.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.04)`;
  });
  cartao.addEventListener("mouseleave", () => {
    cartao.style.transform = "";
  });
});

const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add("visivel");
      observador.unobserve(entrada.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".revelar").forEach((s) => observador.observe(s));