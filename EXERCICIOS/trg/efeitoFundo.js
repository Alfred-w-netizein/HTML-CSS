// === Fundo Interativo estilo "Cérebro Neural" ===
// Tudo feito em JavaScript puro + Canvas 2D

// Cria o elemento <canvas> que vai cobrir o fundo
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.prepend(canvas); // coloca atrás de tudo
canvas.style.position = "fixed";
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.zIndex = "-1"; // fica por trás do conteúdo
canvas.style.width = "100vw";
canvas.style.height = "100vh";

// Ajusta tamanho real pro desenho
canvas.width = innerWidth;
canvas.height = innerHeight;

// === Criação das partículas flutuantes ===
const particles = [];
const numParticles = 100; // quanto maior, mais partículas

for (let i = 0; i < numParticles; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 1,
    speedX: (Math.random() - 0.5) * 0.5,
    speedY: (Math.random() - 0.5) * 0.5,
  });
}

// === Efeito de “raio” quando o mouse passa ===
let mouse = { x: 0, y: 0 };
document.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

// === Zoom leve no scroll (simula profundidade do fundo) ===
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  ctx.scale(1 + scrollY * 0.00005, 1 + scrollY * 0.00005);
});

// === Função pra desenhar e animar ===
function animate() {
  // Fundo com leve transparência pra deixar rastros (efeito "neural")
  ctx.fillStyle = "rgba(0, 0, 48, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Atualiza e desenha cada partícula
  for (let p of particles) {
    p.x += p.speedX;
    p.y += p.speedY;

    // Rebote nas bordas
    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0, 200, 255, 0.7)";
    ctx.fill();
  }

  // Efeito de “raio” — linhas que ligam partículas próximas ao mouse
  for (let p of particles) {
    const dx = mouse.x - p.x;
    const dy = mouse.y - p.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 100) {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.strokeStyle = `rgba(0, 200, 255, ${(1 - dist / 100).toFixed(2)})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
  }

  requestAnimationFrame(animate);
}

animate();

// === Ajusta o tamanho do canvas quando a janela muda ===
window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});
