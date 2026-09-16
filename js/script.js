const header = document.querySelector(".site-header");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const overlayMenu = document.getElementById("overlayMenu");
const planModal = document.getElementById("planModal");

const plans = {
  auto: {
    title: "PROTEÇÃO AUTO",
    items: ["Roubo e furto", "Colisão", "Perda total", "Assistência Auto 24h", "Reboque"],
  },
  autoMais: {
    title: "PROTEÇÃO AUTO MAIS",
    items: ["Roubo e furto", "Colisão", "Perda total", "Fenômenos da natureza", "Assistência Auto 24h", "Rastreamento 24h", "Proteção para terceiros*"],
  },
  moto: {
    title: "PROTEÇÃO MOTO",
    items: ["Roubo e furto", "Assistência 24h", "Reboque", "Opções de proteção para sua moto"],
  },
};

function closeMenu() {
  navMenu.classList.remove("active");
  menuToggle.classList.remove("active");
  overlayMenu.classList.remove("active");
  menuToggle.setAttribute("aria-expanded", "false");
}

function toggleMenu() {
  const isOpen = navMenu.classList.toggle("active");
  menuToggle.classList.toggle("active", isOpen);
  overlayMenu.classList.toggle("active", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
}

function closePlanModal() {
  planModal.classList.remove("active");
  planModal.setAttribute("aria-hidden", "true");
}

function openPlanModal(planKey) {
  const plan = plans[planKey];
  const content = document.getElementById("modalContent");

  document.getElementById("modalTitle").textContent = plan.title;
  content.innerHTML = `
    <ul>${plan.items.map((item) => `<li>${item}</li>`).join("")}</ul>
    <p class="notice">*Coberturas, benefícios, limites e condições variam conforme o plano contratado e regulamento.</p>
  `;
  planModal.classList.add("active");
  planModal.setAttribute("aria-hidden", "false");
}

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 12);
});

menuToggle.addEventListener("click", toggleMenu);
overlayMenu.addEventListener("click", closeMenu);
document.querySelectorAll("nav a").forEach((link) => link.addEventListener("click", closeMenu));

document.querySelectorAll(".plan-detail").forEach((button) => {
  button.addEventListener("click", () => openPlanModal(button.dataset.plan));
});

document.querySelector(".modal-close").addEventListener("click", closePlanModal);
planModal.addEventListener("click", (event) => {
  if (event.target === planModal) closePlanModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    closePlanModal();
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

document.querySelectorAll(".tracked-whatsapp").forEach((link) => {
  link.addEventListener("click", () => {
    if (typeof gtag === "function") gtag("event", "whatsapp_click");
  });
});
