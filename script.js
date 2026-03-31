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

// ========== ЛОГИКА ТЕРМИНАЛА ==========
(function() {
  // Получаем элементы терминала
  const terminalWindow = document.getElementById('terminal-window');
  const terminalToggle = document.getElementById('terminal-toggle');
  const terminalClose = document.querySelector('.terminal-close');
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');
  
  let isTerminalOpen = false;
  let demoRunning = false;   // флаг, чтобы демо запускалось только один раз
  let demoCommands = [];     // очередь команд для демо
  
  // Открыть терминал
  function openTerminal() {
    if (terminalWindow) {
      terminalWindow.classList.add('open');
      isTerminalOpen = true;
      setTimeout(() => terminalInput && terminalInput.focus(), 100);
    }
  }
  
  function closeTerminal() {
    if (terminalWindow) {
      terminalWindow.classList.remove('open');
      isTerminalOpen = false;
    }
  }
  
  // Вывод строки в терминал с анимацией печати (можно с задержкой)
  function printLine(text, withTyping = true, speed = 25) {
    const lineDiv = document.createElement('div');
    lineDiv.className = 'terminal-line';
    terminalOutput.appendChild(lineDiv);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
    
    if (!withTyping) {
      lineDiv.textContent = text;
      return Promise.resolve();
    }
    
    return new Promise((resolve) => {
      let i = 0;
      lineDiv.textContent = '';
      const interval = setInterval(() => {
        if (i < text.length) {
          lineDiv.textContent += text[i];
          i++;
          terminalOutput.scrollTop = terminalOutput.scrollHeight;
        } else {
          clearInterval(interval);
          resolve();
        }
      }, speed);
    });
  }
  
  // Очистка терминала
  function clearTerminal() {
    terminalOutput.innerHTML = '';
  }
  
  // Эмуляция выполнения команды с выводом
  async function executeDemoCommand(cmd, outputLines) {
    // Печатаем строку команды
    await printLine(`schrodinger@hell:~$ ${cmd}`, false);
    // Пауза для реализма
    await new Promise(r => setTimeout(r, 400));
    // Выводим результат (может быть несколько строк)
    for (const line of outputLines) {
      await printLine(line, true, 20);
      await new Promise(r => setTimeout(r, 150));
    }
    await new Promise(r => setTimeout(r, 300));
  }
  
  // Запуск демо-последовательности
  async function startDemo() {
    if (demoRunning) return;
    demoRunning = true;
    
    if (!isTerminalOpen) openTerminal();
    await new Promise(r => setTimeout(r, 500));
    
    clearTerminal();
    await printLine("Welcome to Schrödinger's Hell Terminal v2.0", true, 30);
    await printLine("Initializing secure shell...", true, 25);
    await new Promise(r => setTimeout(r, 800));
    await printLine("", false);
    
    // Серия демо-команд
    await executeDemoCommand("whoami", ["schrodinger"]);
    await executeDemoCommand("date", [new Date().toString()]);
    await executeDemoCommand("ls -la", [
      "total 42",
      "drwxr-xr-x 1 schrodinger hell 4096 Apr  1 12:34 .",
      "drwxr-xr-x 1 root       root 4096 Apr  1 12:00 ..",
      "-rw-r--r-- 1 schrodinger hell  666 Apr  1 12:34 README.md",
      "drwxr-xr-x 2 schrodinger hell 4096 Apr  1 12:34 projects/",
      "drwxr-xr-x 2 schrodinger hell 4096 Apr  1 12:34 hell_core/"
    ]);
    
    await executeDemoCommand("about", [
      "Schrödinger (Luci-fer) — CEO Hell, IT Security Specialist, Bot Architect.",
      "C++, C#, Python, Go · Docker · DevOps · Security",
      "Telegram: @schrodinger714 | GitHub: @Schrodinger71"
    ]);
    
    await executeDemoCommand("skills", [
      "Python        98% ████████████████████",
      "C++ / C#      94% ██████████████████  ",
      "Go + DevOps   92% █████████████████   ",
      "Docker & Sec  95% ██████████████████  ",
      "Bot Arch      97% ███████████████████ "
    ]);
    
    // Крутая команда matrix — отображает "дождь" из символов
    await executeDemoCommand("matrix", [
      "01001110 01101001 01100011 01100101 00100001",
      "00110010 00110000 00110010 00110110 00100000",
      "01101000 01100101 01101100 01101100 00100001"
    ]);
    
    // Шутливая команда hack
    await executeDemoCommand("hack", [
      "> Scanning ports... DONE",
      "> Bypassing firewall... ACCESS GRANTED",
      "> Injecting payload... ██████████ 100%",
      "> Hacking NASA... Just kidding, you are in hell 😈"
    ]);
    
    // sudo с приколом
    await executeDemoCommand("sudo rm -rf /*", [
      "sudo: you are not in the sudoers file. This incident will be reported.",
      "Nice try, mortal. You need hell-admin privileges."
    ]);
    
    await printLine("", false);
    await printLine("Demo finished. Type 'help' for available commands.", true, 20);
    
    // Ставим курсор в поле ввода
    terminalInput && terminalInput.focus();
  }
  
  // Автоматический запуск демо через 2.5 секунды после загрузки страницы
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (!demoRunning) startDemo();
    }, 2500);
  });
  
  // Обработчик кнопки открытия/закрытия
  terminalToggle && terminalToggle.addEventListener('click', () => {
    if (isTerminalOpen) closeTerminal();
    else {
      openTerminal();
      // Если демо ещё не запущено, можно запустить, но чтобы не дублировать, проверим
      if (!demoRunning) startDemo();
    }
  });
  
  terminalClose && terminalClose.addEventListener('click', closeTerminal);
  
  function handleUserCommand(cmd) {
    const args = cmd.trim().split(/\s+/);
    const command = args[0].toLowerCase();
    
    if (command === 'matrix') {
      printLine("01001110 01101001 01100011 01100101 00100001", true);
      printLine("00110010 00110000 00110010 00110110 00100000", true);
      printLine("01101000 01100101 01101100 01101100 00100001", true);
      return;
    }
    if (command === 'hack') {
      printLine("> Scanning ports... DONE", true);
      printLine("> Bypassing firewall... ACCESS GRANTED", true);
      printLine("> Injecting payload... ██████████ 100%", true);
      printLine("> Hacking NASA... Just kidding, you are in hell 😈", true);
      return;
    }
    if (command === 'sudo') {
      if (args[1] === 'rm' && args[2] === '-rf' && args[3] === '/*') {
        printLine("sudo: you are not in the sudoers file. This incident will be reported.", true);
        printLine("Nice try, mortal. You need hell-admin privileges.", true);
      } else {
        printLine(`sudo: ${args.slice(1).join(' ')}: command not found in hell`, true);
      }
      return;
    }
    
    // Остальные команды (help, about, skills, projects, github, clear, echo, date, whoami, ls)
    switch(command) {
      case 'help':
        printLine('Доступные команды:');
        printLine('  about      - информация о Schrödinger');
        printLine('  skills     - список технологий');
        printLine('  projects   - список ключевых проектов');
        printLine('  github     - ссылка на GitHub');
        printLine('  clear      - очистить терминал');
        printLine('  echo [text] - повторить текст');
        printLine('  date       - текущая дата и время');
        printLine('  whoami     - текущий пользователь');
        printLine('  ls         - показать содержимое текущей директории');
        printLine('  help       - эта справка');
        break;
        
      case 'about':
        printLine('Schrödinger (Luci-fer) — CEO Hell, IT Security Specialist, Bot Architect.');
        printLine('Работает с C++, C#, Python, Go. DevOps, Docker, Security.');
        printLine('Telegram: @schrodinger714 | GitHub: @Schrodinger71');
        break;
        
      case 'skills':
        printLine('Основные технологии:');
        printLine('  • Python (98%)');
        printLine('  • C++ / C# (94%)');
        printLine('  • Go + DevOps (92%)');
        printLine('  • Docker & Security (95%)');
        printLine('  • Bot Architecture (97%)');
        break;
        
      case 'projects':
        printLine('🔹 git-sec-monitor — мониторинг безопасности Git');
        printLine('🔹 university-schedule-bot — Discord-бот для расписания');
        printLine('🔹 go-product-api — высокопроизводительный API');
        printLine('🔹 KiberIncidentHub — управление инцидентами');
        printLine('🔹 FaceRecognitionProject — ИИ для распознавания лиц');
        printLine('🔹 devsecops-demo — DevSecOps демонстрация');
        printLine('🔹 Dev-bot, Prismia-bot, AnagiriumBot — Discord-боты для SS14');
        printLine('🔹 config-demon — утилита для обновления билдов');
        printLine('🔹 Minesweeper Arcade — игровой автомат внутри SS14');
        printLine('🔹 Discord Auth System — авторизация через Discord');
        break;
        
      case 'github':
        printLine('Открываю GitHub...');
        window.open('https://github.com/Schrodinger71', '_blank');
        break;
        
      case 'clear':
        clearTerminal();
        break;
        
      case 'echo':
        const message = args.slice(1).join(' ');
        printLine(message || '');
        break;
        
      case 'date':
        printLine(new Date().toString());
        break;
        
      case 'whoami':
        printLine('schrodinger');
        break;
        
      case 'ls':
        printLine('Desktop  Documents  Downloads  Projects  hell_core  secrets');
        break;
        
      default:
        if (cmd.trim() === '') break;
        printLine(`bash: ${command}: command not found`);
        break;
    }
  }
  
  function onTerminalInput(e) {
    if (e.key === 'Enter') {
      const cmd = terminalInput.value;
      if (cmd.trim() === '') {
        terminalInput.value = '';
        return;
      }
      printLine(`schrodinger@hell:~$ ${cmd}`, false);
      handleUserCommand(cmd);
      terminalInput.value = '';
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
  }
  
  terminalInput && terminalInput.addEventListener('keydown', onTerminalInput);
  
  // При клике на окно терминала — фокус на input
  terminalWindow && terminalWindow.addEventListener('click', () => {
    if (isTerminalOpen && terminalInput) terminalInput.focus();
  });
})();


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
