const typingText = document.getElementById("typing-text");
const body = document.body;
const symbolCanvas = document.getElementById("symbol-canvas");
const phrases = [
  "shipping backend tools with real-world purpose",
  "building bots, internal services and automations",
  "focused on security-aware engineering",
  "comfortable with Python, Go, C#, Docker and CI/CD"
];
const themeStorageKey = "schrodinger71-theme";
const symbolSet = ["$", "{ }", "</>", "01", "#", "!", "<>"];

const projectDetails = {
  "git-sec-monitor": {
    title: "git-sec-monitor",
    body: [
      "Проект про контроль безопасности Git-репозиториев и мониторинг изменений, которые могут требовать отдельного внимания.",
      "Хорошо показывает интерес к security tooling, автоматическим проверкам и практичным инженерным инструментам."
    ]
  },
  "university-schedule-bot": {
    title: "university-schedule-bot",
    body: [
      "Discord-бот для автоматизации расписания и уведомлений. Решает конкретную повседневную задачу и экономит ручные действия.",
      "Показывает опыт с ботами, интеграциями и сценариями, где важно быстрое и понятное взаимодействие."
    ]
  },
  "go-product-api": {
    title: "go-product-api",
    body: [
      "Backend-сервис на Go для управления товарами. Акцент на структуру API, простую модель данных и предсказуемое поведение сервиса.",
      "Хороший пример интереса к легким, быстрым и ясным серверным приложениям."
    ]
  },
  "devsecops-demo": {
    title: "devsecops-demo",
    body: [
      "Демонстрация подхода, где разработка, проверки безопасности и pipeline работают как единая цепочка.",
      "Проект отражает интерес к DevSecOps-процессам, автоматизации и инженерной дисциплине вокруг кода."
    ]
  },
  KiberIncidentHub: {
    title: "KiberIncidentHub",
    body: [
      "GUI-проект с базой данных для учета и анализа инцидентов. Более прикладная история про интерфейс, структуру данных и сценарии учета.",
      "Подчеркивает, что интерес не ограничивается только ботами или backend, а включает и desktop-направление."
    ]
  },
  "prismia-bot": {
    title: "Prismia-bot",
    body: [
      "Многофункциональный бот для игрового сообщества с привязкой аккаунтов, HTTP-логикой и вспомогательной автоматизацией.",
      "Отражает опыт в построении ботов с более сложным поведением, чем просто набор команд."
    ]
  }
};

const terminalResponses = {
  help: [
    "available commands:",
    "about",
    "stack",
    "projects",
    "contact",
    "github",
    "hack",
    "status",
    "clear",
    "date"
  ],
  about: [
    "schrodinger71",
    "backend / security / devops / automation",
    "focus: practical tools, bots, internal services, infra workflows"
  ],
  stack: [
    "python, go, c#, c++, docker, linux, postgresql, sqlite, github actions"
  ],
  projects: [
    "git-sec-monitor",
    "university-schedule-bot",
    "go-product-api",
    "devsecops-demo",
    "KiberIncidentHub",
    "prismia-bot"
  ],
  contact: [
    "telegram: @schrodinger714",
    "github: github.com/Schrodinger71",
    "discord: schrodinger71"
  ],
  github: ["opening github profile..."],
  status: ["terminal theme active", "portfolio status: online"]
};

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typePhrase() {
  if (!typingText) {
    return;
  }

  const current = phrases[phraseIndex];
  if (isDeleting) {
    charIndex -= 1;
  } else {
    charIndex += 1;
  }

  typingText.textContent = current.slice(0, charIndex);

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    setTimeout(typePhrase, 1600);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }

  setTimeout(typePhrase, isDeleting ? 38 : 64);
}

function initThemeToggle() {
  const button = document.getElementById("theme-toggle");

  if (!button) {
    return;
  }

  const applyTheme = (mode) => {
    const isDemonic = mode === "demonic";
    body.classList.toggle("theme-demonic", isDemonic);
    button.setAttribute("aria-pressed", String(isDemonic));
  };

  const saved = localStorage.getItem(themeStorageKey);
  applyTheme(saved === "demonic" ? "demonic" : "default");

  button.addEventListener("click", () => {
    const nextMode = body.classList.contains("theme-demonic") ? "default" : "demonic";
    localStorage.setItem(themeStorageKey, nextMode);
    applyTheme(nextMode);
  });
}

function initSymbolBackground() {
  if (!symbolCanvas) {
    return;
  }

  const context = symbolCanvas.getContext("2d");

  if (!context) {
    return;
  }

  const particles = [];
  const mobile = window.innerWidth <= 768;
  const particleCount = mobile ? 18 : 40;

  const resize = () => {
    symbolCanvas.width = window.innerWidth;
    symbolCanvas.height = window.innerHeight;
  };

  class SymbolParticle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * symbolCanvas.width;
      this.y = Math.random() * symbolCanvas.height;
      this.speedY = Math.random() * 0.55 + 0.15;
      this.speedX = (Math.random() - 0.5) * 0.35;
      this.size = Math.random() * 14 + 10;
      this.opacity = Math.random() * 0.35 + 0.08;
      this.symbol = symbolSet[Math.floor(Math.random() * symbolSet.length)];
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.y > symbolCanvas.height + 30 || this.x < -60 || this.x > symbolCanvas.width + 60) {
        this.reset();
        this.y = -20;
      }
    }

    draw() {
      context.globalAlpha = this.opacity;
      context.font = `${this.size}px Cascadia Code, Consolas, monospace`;
      context.fillStyle = body.classList.contains("theme-demonic") ? "#ff7c64" : "#7ff7bd";
      context.fillText(this.symbol, this.x, this.y);
    }
  }

  const animate = () => {
    context.clearRect(0, 0, symbolCanvas.width, symbolCanvas.height);

    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });

    requestAnimationFrame(animate);
  };

  resize();

  for (let index = 0; index < particleCount; index += 1) {
    particles.push(new SymbolParticle());
  }

  window.addEventListener("resize", resize);
  animate();
}

function initReveal() {
  const nodes = document.querySelectorAll("[data-reveal]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  nodes.forEach((node) => observer.observe(node));
}

function initNav() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("site-nav");

  if (!toggle || !nav) {
    return;
  }

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initModal() {
  const modal = document.getElementById("project-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalContent = document.getElementById("modal-content");
  const closeButton = document.getElementById("modal-close");

  if (!modal || !modalTitle || !modalContent || !closeButton) {
    return;
  }

  document.querySelectorAll("[data-project]").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.getAttribute("data-project");
      const details = projectDetails[key];

      if (!details) {
        return;
      }

      modalTitle.textContent = details.title;
      modalContent.innerHTML = details.body.map((text) => `<p>${text}</p>`).join("");
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
    });
  });

  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  };

  closeButton.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
}

function initTerminal() {
  const toggle = document.getElementById("terminal-toggle");
  const windowEl = document.getElementById("terminal-window");
  const close = document.getElementById("terminal-close");
  const input = document.getElementById("terminal-input");
  const output = document.getElementById("terminal-output");

  if (!toggle || !windowEl || !close || !input || !output) {
    return;
  }

  let introPlayed = false;

  const print = (line, className = "") => {
    const row = document.createElement("div");
    row.className = "terminal-line";
    if (className) {
      row.classList.add(className);
    }
    row.textContent = line;
    output.appendChild(row);
    output.scrollTop = output.scrollHeight;
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const setOpen = (open) => {
    windowEl.classList.toggle("open", open);
    windowEl.setAttribute("aria-hidden", String(!open));

    if (open) {
      setTimeout(() => input.focus(), 50);
    }
  };

  const playIntro = async () => {
    if (introPlayed) {
      return;
    }

    introPlayed = true;
    output.innerHTML = "";
    setOpen(true);

    const script = [
      ["schrodinger71 terminal v2.1", "is-accent"],
      ["boot sequence started..."],
      ["loading profile://lucifer"],
      ["establishing encrypted channel ... ok"],
      ["guest@portfolio:$ nmap --top-ports 5 portfolio.local"],
      ["22/tcp open ssh"],
      ["80/tcp open http"],
      ["443/tcp open https"],
      ["guest@portfolio:$ exploit --demo --safe-mode"],
      ["payload injected [##########] 100%", "is-accent"],
      ["access granted: visual theatrics only"],
      ["type `help` to continue"]
    ];

    for (const [line, className] of script) {
      print(line, className);
      await delay(line.includes("payload") ? 240 : 140);
    }
  };

  toggle.addEventListener("click", () => {
    const shouldOpen = !windowEl.classList.contains("open");
    setOpen(shouldOpen);

    if (shouldOpen && !introPlayed) {
      playIntro();
    }
  });

  close.addEventListener("click", () => setOpen(false));

  input.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") {
      return;
    }

    const value = input.value.trim();
    print(`guest@portfolio:$ ${value}`);

    if (!value) {
      input.value = "";
      return;
    }

    const command = value.toLowerCase();

    if (command === "clear") {
      output.innerHTML = "";
      input.value = "";
      return;
    }

    if (command === "date") {
      print(new Date().toLocaleString());
      input.value = "";
      return;
    }

    if (command === "github") {
      terminalResponses.github.forEach(print);
      window.open("https://github.com/Schrodinger71", "_blank", "noopener");
      input.value = "";
      return;
    }

    if (command === "hack") {
      [
        "scanning attack surface...",
        "bypassing firewall... demo only",
        "root shell denied by design",
        "style points awarded"
      ].forEach((line, index) => print(line, index === 2 ? "is-accent" : ""));
      input.value = "";
      return;
    }

    const response = terminalResponses[command];

    if (response) {
      response.forEach(print);
    } else {
      print(`command not found: ${command}`);
    }

    input.value = "";
  });

  window.addEventListener("load", () => {
    setTimeout(() => {
      playIntro();
    }, 1200);
  });
}

function initDiscordCopy() {
  const button = document.getElementById("copy-discord");

  if (!button) {
    return;
  }

  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText("schrodinger71");
      const original = button.textContent;
      button.textContent = "Discord copied: schrodinger71";
      setTimeout(() => {
        button.textContent = original;
      }, 1800);
    } catch {
      button.textContent = "Не удалось скопировать Discord";
    }
  });
}

async function loadGithubStats() {
  const followers = document.getElementById("metric-followers");
  const repos = document.getElementById("metric-repos");
  const stars = document.getElementById("metric-stars");
  const status = document.getElementById("metric-status");

  if (!followers || !repos || !stars || !status) {
    return;
  }

  try {
    const [userResponse, reposResponse] = await Promise.all([
      fetch("https://api.github.com/users/Schrodinger71"),
      fetch("https://api.github.com/users/Schrodinger71/repos?per_page=100")
    ]);

    const user = await userResponse.json();
    const reposData = await reposResponse.json();
    const totalStars = Array.isArray(reposData)
      ? reposData.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0)
      : 0;

    followers.textContent = String(user.followers ?? "--");
    repos.textContent = String(user.public_repos ?? "--");
    stars.textContent = String(totalStars);
    status.textContent = "synced";
  } catch {
    followers.textContent = "--";
    repos.textContent = "--";
    stars.textContent = "--";
    status.textContent = "offline";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  initThemeToggle();
  initSymbolBackground();
  typePhrase();
  initReveal();
  initNav();
  initModal();
  initTerminal();
  initDiscordCopy();
  loadGithubStats();
});
