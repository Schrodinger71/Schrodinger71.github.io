// ========== ПЕРЕМЕННЫЕ И КОНСТАНТЫ ==========
const typingText = document.getElementById('typing-text');
const phrases = [
  "Midnight Coder (UTC+3) 🌙",
  "IT Security Specialist 🛡️",
  "Technical Administrator 📡",
  "Bot Architect & Operator 🤖",
  "Docker Enthusiast 🐳 • DevOps Builder 🏗️"
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

// Canvas particles
const canvas = document.getElementById('hell-canvas');
const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
let particles = [];
const MAX_PARTICLES = 65;
const symbols = ['🔥', '🖤', '👾', '💢', '♨️', '⚡', '🛡️'];

const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                 window.innerWidth <= 768;

if (isMobile) {
  MAX_PARTICLES = 22;           // сильно уменьшаем на телефонах
  ctx.imageSmoothingEnabled = false;
}

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    resizeCanvas();
  }, 150);
});

// Мобильное меню
const menuToggle = document.getElementById('menuToggle');
const mainMenu = document.getElementById('mainMenu');
const menuItems = document.querySelectorAll('.menu-item');

// ========== АНИМАЦИЯ ПЕЧАТИ ==========
function type() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typingText.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }
  if (!isDeleting && charIndex === current.length) {
    setTimeout(() => isDeleting = true, 2200);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }
  setTimeout(type, isDeleting ? 45 : 75);
}

// ========== ЧАСТИЦЫ НА CANVAS ==========
class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height * 0.7;
    this.size = Math.random() * 22 + 14;
    this.speedY = Math.random() * 1.4 + 0.2;
    this.speedX = (Math.random() - 0.5) * 1;
    this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
    this.alpha = Math.random() * 0.85 + 0.25;
    this.rotation = Math.random() * 360;
    this.rotSpeed = (Math.random() - 0.5) * 3.5; // уменьшил скорость вращения
    this.life = Math.random() * 160 + 100;
    this.font = `${this.size}px system-ui`; // кэшируем шрифт!
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.rotation += this.rotSpeed;
    this.alpha -= 0.0075;
    this.life--;
    if (this.alpha <= 0 || this.life <= 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation * Math.PI / 180);
    ctx.font = this.font;           // используем закешированный шрифт
    ctx.fillText(this.symbol, 0, 0);
    ctx.restore();
  }
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.update();
    p.draw();
  }
  
  // Добавляем частицы с учётом лимита
  while (particles.length < MAX_PARTICLES) {
    particles.push(new Particle());
  }
  
  requestAnimationFrame(animateParticles);
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  if (particles.length < MAX_PARTICLES) particles.push(new Particle());
  requestAnimationFrame(animateParticles);
}

// ========== АНИМАЦИЯ ПРИ СКРОЛЛЕ ==========
function animateOnScroll() {
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  sections.forEach(section => observer.observe(section));

  // Бейджи технологий
  const badges = document.querySelectorAll('.tech-badge');
  badges.forEach((badge, i) => {
    setTimeout(() => badge.classList.add('visible'), 300 + i * 28);
  });

  // Карточки проектов
  const cards = document.querySelectorAll('.repo-card');
  cards.forEach((card, i) => {
    setTimeout(() => card.classList.add('visible'), 800 + i * 140);
  });
}

function animateSkills() {
  document.querySelectorAll('.bar-fill').forEach(bar => {
    const w = bar.getAttribute('data-width');
    setTimeout(() => bar.style.width = w + '%', 900);
  });
}

// ========== МОДАЛЬНЫЕ ОКНА ==========
function showModal(project) {
  const modal = document.getElementById('modal');
  const titleEl = document.getElementById('modal-title');
  const bodyEl = document.getElementById('modal-body');
  
  const projectData = {
    'git-sec-monitor': { title: '🔥 git-sec-monitor', body: '<p>Мониторинг уязвимостей Git-репозиториев. Полная защита кода от демонов.</p><p><strong>Язык:</strong> Python</p>' },
    'university-schedule-bot': { title: '📅 university-schedule-bot', body: '<p>Discord-бот для расписания университета. Автоматизация уведомлений и команд.</p><p><strong>Язык:</strong> Python • Bot Architect</p>' },
    'go-product-api': { title: '🌀 go-product-api', body: '<p>Высокопроизводительный API для управления товарами.</p><p><strong>Язык:</strong> Go • DevOps</p>' },
    'KiberIncidentHub': { title: '💻 KiberIncidentHub', body: '<p>GUI + БД проект для курсовой работы. Управление и анализ инцидентов.</p><p><strong>Язык:</strong> Python • GUI/DB</p>' },
    'FaceRecognitionProject': { title: '🧠 FaceRecognitionProject', body: '<p>Проект по методам ИИ для распознавания лиц.</p><p><strong>Язык:</strong> Python • AI</p>' },
    'devsecops-demo': { title: '🔒 devsecops-demo', body: '<p>Демонстрация DevSecOps процессов: анализ уязвимостей и защита систем.</p><p><strong>Язык:</strong> Python • DevSecOps</p>' },
    'Dev-bot': { title: '🤖 Dev-bot', body: '<p>Discord-бот Adventure Time SS14. Логирование, автоматизация и управление сервером.</p><p><strong>Язык:</strong> Python • Discord Bot</p>' },
    'prismia-bot': { title: '🌸 Prismia-bot', body: '<p>Многофункциональный Discord-бот для Paradox SS14 с привязкой аккаунтов и HTTP-сервером.</p><p><strong>Язык:</strong> Python • Discord Bot</p>' },
    'AnagiriumBot': { title: '💬 AnagiriumBot', body: '<p>Кастомный Discord-бот для проекта Delta RP: управление голосовыми каналами и интеграция с GitHub.</p><p><strong>Язык:</strong> Python • Discord Bot</p>' },
    'config-demon': { title: '⚡ config-demon', body: '<p>Утилита для автоматической очистки реплеев и обновления билдов Paradox SS14.</p><p><strong>Язык:</strong> Python • Dev Tool</p>' },
    'space_station_ADT': { title: '🎰 Minesweeper Arcade', body: '<p>Крупный проект для AdventureTime SS14: аркадный автомат "Сапёр" внутри SS14 с UI, счетчиком мин и логикой игры.</p><p><strong>Язык:</strong> C# • Game / SS14</p>' },
    'discord-auth-system': { title: '🔑 Discord Auth System SS14', body: '<p>Собственная система обязательной авторизации через Discord для игровых серверов. Генерация кодов, привязка аккаунтов и проверка доступа.</p><p><strong>Язык:</strong> C# • Server / Discord / SS14</p>' }
  };
  
  const data = projectData[project] || { title: '🔥 Проект', body: '<p>Информация скоро появится...</p>' };
  titleEl.textContent = data.title;
  bodyEl.innerHTML = data.body;
  
  modal.style.display = 'flex';
  const modalContent = modal.querySelector('.modal-content');
  modalContent.style.animation = 'shakeHell 0.4s';
  setTimeout(() => modalContent.style.animation = '', 500);
}

function hideModal() {
  document.getElementById('modal').style.display = 'none';
}

// ========== HELL MODE (АКТИВАЦИЯ АДА) ==========
function triggerHellMode() {
  if (isMobile) {
      MAX_PARTICLES = 35; // временно чуть больше, но не 140
    }

  const avatar = document.getElementById('avatar');
  avatar.style.transitionDuration = '0.8s';
  avatar.style.transform = 'scale(1.9) rotate(1080deg)';
  
  const flash = document.createElement('div');
  flash.style.cssText = `position:fixed;inset:0;background:rgba(231,76,60,0.75);z-index:99999;pointer-events:none;transition:opacity 1.6s;`;
  document.body.appendChild(flash);
  document.body.style.animation = 'shakeHell 0.6s';
  
  setTimeout(() => { 
    flash.style.opacity = '0'; 
    document.body.style.animation = ''; 
  }, 120);
  setTimeout(() => { 
    flash.remove(); 
    avatar.style.transform = ''; 
  }, 1800);
  
  for (let i = 0; i < 140; i++) {
    const p = new Particle();
    p.alpha = 1; 
    p.speedY = Math.random() * 9 + 4; 
    p.speedX = (Math.random() - 0.5) * 6;
    particles.push(p);
  }
}

// ========== КОПИРОВАНИЕ DISCORD ==========
function discordCopy() {
  navigator.clipboard.writeText('schrodinger71').then(() => {
    const notification = document.createElement('div');
    notification.textContent = '✅ schrodinger71 скопирован!';
    notification.style.cssText = `position:fixed;bottom:40px;left:50%;transform:translateX(-50%);background:#e74c3c;color:#fff;padding:16px 34px;border-radius:50px;box-shadow:0 0 35px #e74c3c;z-index:99999;animation:flameFlicker 1s infinite;`;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2600);
  });
}

// ========== МОБИЛЬНОЕ МЕНЮ (ГАМБУРГЕР + КЛИК ПО ПУНКТАМ) ==========
function initMobileMenu() {
  if (!menuToggle || !mainMenu) return;
  
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    mainMenu.classList.toggle('active');
  });
  
  // Закрываем меню при клике вне его
  document.addEventListener('click', (e) => {
    if (mainMenu.classList.contains('active') && !mainMenu.contains(e.target) && e.target !== menuToggle) {
      mainMenu.classList.remove('active');
    }
  });
  
  // Для мобильных устройств: клик по menu-item открывает/закрывает dropdown
  menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        // Закрываем другие открытые dropdown
        menuItems.forEach(other => {
          if (other !== item) other.classList.remove('active');
        });
        item.classList.toggle('active');
      }
    });
  });
}

fetch("https://api.github.com/users/Schrodinger71/repos?per_page=100")
  .then(res => res.json())
  .then(repos => {
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

    return fetch("https://api.github.com/users/Schrodinger71")
      .then(res => res.json())
      .then(user => {
        document.getElementById("hero-stats").innerText =
          `${user.followers} followers • ${user.following} following • ${user.public_repos}+ repos • ⭐ ${totalStars} stars`;
      });
  })
  .catch(() => {
    document.getElementById("hero-stats").innerText =
      "🔥 Stats unavailable (hell connection lost)";
  });

// ========== ИНИЦИАЛИЗАЦИЯ ==========
window.onload = () => {
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  type();
  animateParticles();
  animateOnScroll();
  animateSkills();
  initMobileMenu();
  
  // Добавляем анимацию для модалки при закрытии по overlay
  const modal = document.getElementById('modal');
  modal.addEventListener('click', (e) => {
    if (e.target === modal) hideModal();
  });
  
  console.log('%c✅ Сайт schrodinger71! Helltaker + JS красота на максимуме 🔥', 'color:#e74c3c;font-size:24px;font-weight:900;');
};
