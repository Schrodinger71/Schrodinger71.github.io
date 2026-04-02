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
    
  async function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  // Обновление последней строки (для спиннеров и прогресса)
  async function updateLine(text) {
    if (!terminalOutput) return;
    const lines = terminalOutput.children;
    if (lines.length === 0) await printLine(text, false);
    else lines[lines.length - 1].textContent = text;
  }

  // Один прогресс-бар только при загрузке
  async function singleProgressBar(label, duration = 1800) {
    const steps = 30;
    await printLine(`${label} [ ] 0%`, false);
    for (let i = 0; i <= steps; i++) {
      const percent = Math.floor((i / steps) * 100);
      const bar = "█".repeat(i) + "░".repeat(steps - i);
      await updateLine(`${label} [${bar}] ${percent}%`);
      await sleep(duration / steps);
    }
  }

  // Печать команды с эффектом ввода (промпт мгновенно, затем команда по буквам)
  async function typeCommand(prompt, command, responseLines = [], delayPerChar = 100, delayAfter = 300) {
    // выводим промпт (без перевода строки)
    await printLine(prompt, false, 0);
    // сохраняем ссылку на последнюю строку
    let currentLine = prompt;
    // печатаем команду посимвольно, обновляя последнюю строку
    for (let char of command) {
      currentLine += char;
      await updateLine(currentLine);
      await sleep(delayPerChar);
    }
    // добавляем перевод строки после команды (завершаем строку)
    await printLine("", true, 0);
    await sleep(delayAfter);
    // выводим ответные строки
    for (let line of responseLines) {
      await printLine(line, true, 15);
      await sleep(50);
    }
  }

  async function startDemo() {
    if (demoRunning) return;
    demoRunning = true;

    if (!isTerminalOpen) openTerminal();
    await sleep(400);
    clearTerminal();

    // ========== ЗАГРУЗКА ОС (один прогресс-бар) ==========
    await printLine("Schrödinger's Hell Terminal v2.0", true, 100);
    await sleep(300);
    await singleProgressBar("Booting system", 1800);
    await printLine("[✓] Kernel 5.15.0-hell loaded", true, 20);
    await sleep(150);
    await printLine("[✓] Security modules (firewall, ids, crypto)", true, 20);
    await sleep(150);
    await printLine("[✓] Neural interface handshake (TLS 1.3)", true, 20);
    await sleep(300);
    await printLine("", false);
    await printLine("> System ready. Starting attack sequence...", true, 30);
    await sleep(800);
    clearTerminal();

    // ========== METASPLOIT ==========
    await printLine("$ msfconsole", true, 30);
    await sleep(400);
    await printLine("       =[ metasploit v6.3.0-dev", true, 15);
    await printLine("+ -- --=[ 2377 exploits - 1222 auxiliary", true, 15);
    await printLine("+ -- --=[ 1380 payloads - 45 encoders", true, 15);
    await sleep(600);
    await printLine("", false);

    // use exploit/multi/handler
    await typeCommand("msf6 > ", "use exploit/multi/handler", [], 100, 300);
    
    // set PAYLOAD
    await typeCommand("msf6 exploit(multi/handler) > ", "set PAYLOAD linux/x64/meterpreter/reverse_tcp", 
      ["PAYLOAD => linux/x64/meterpreter/reverse_tcp"], 100, 300);
    
    // set LHOST
    await typeCommand("msf6 exploit(multi/handler) > ", "set LHOST 10.0.0.42", 
      ["LHOST => 10.0.0.42"], 100, 300);
    
    // set LPORT
    await typeCommand("msf6 exploit(multi/handler) > ", "set LPORT 4444", 
      ["LPORT => 4444"], 100, 300);
    
    // exploit (запуск)
    await typeCommand("msf6 exploit(multi/handler) > ", "exploit", 
      ["[*] Started reverse TCP handler on 10.0.0.42:4444"], 100, 500);

    // ========== NMAP ==========
    await printLine("", false);
    await typeCommand("msf6 exploit(multi/handler) > ", "db_nmap -sS 10.0.0.0/24", [], 100, 300);
    
    await printLine("Starting Nmap 7.94 at 2025-04-02 13:37 UTC", true, 15);
    const spinFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    for (let i = 0; i < 20; i++) {
      await updateLine(`\r${spinFrames[i % spinFrames.length]} Scanning 256 hosts ...`);
      await sleep(60);
    }
    await updateLine("\r✓ Scan complete. 1 host up.\n");
    await sleep(300);
    await printLine("Nmap scan report for 10.0.0.42", true, 15);
    await printLine("PORT     STATE SERVICE    VERSION", true, 10);
    await printLine("22/tcp   open  ssh        OpenSSH 8.9p1", true, 10);
    await printLine("3306/tcp open  mysql      MySQL 8.0", true, 10);
    await printLine("6669/tcp open  hell-port  Schrödinger's Hell daemon 2.0", true, 10);
    await sleep(800);

    // ========== ЭКСПЛУАТАЦИЯ ==========
    await printLine("", false);
    await typeCommand("msf6 exploit(multi/handler) > ", "set RHOST 10.0.0.42", 
      ["RHOST => 10.0.0.42"], 100, 300);
    await typeCommand("msf6 exploit(multi/handler) > ", "set RPORT 6669", 
      ["RPORT => 6669"], 100, 300);
    await typeCommand("msf6 exploit(multi/handler) > ", "run", [], 100, 500);
    
    await printLine("[*] Trying CVE-2024-HELL (Schrödinger's RCE)", true, 20);
    await printLine("[*] Sending stage (304 bytes)...", true, 20);
    for (let i = 0; i <= 100; i += 20) {
      await updateLine(`\r[>] Payload injection: ${i}%`);
      await sleep(100);
    }
    await updateLine("\r[>] Payload injection: 100% done.\n");
    await sleep(400);
    await printLine("[+] Meterpreter session 1 opened (10.0.0.42:4444 -> 10.0.0.42:54321)", true, 30);
    await sleep(500);

    // ========== METERPRETER ==========
    await typeCommand("meterpreter > ", "sysinfo", [
      "Computer    : HELL-CORE-01",
      "OS          : Linux hell 5.15.0-hell",
      "Arch        : x64",
      "Meterpreter : x64/linux"
    ], 100, 400);

    await typeCommand("meterpreter > ", "cat /etc/hell_token", 
      ["SCHRODINGER_714_ACCESS_GRANTED"], 100, 400);

    await typeCommand("meterpreter > ", "download /var/db/hell_core.db", 
      ["[*] Downloading: 1.37 MB ...", "[+] Saved to: /root/hell_core.db"], 100, 600);

    await typeCommand("meterpreter > ", "flag", 
      ["flag{th3_d3m0n_1s_1n_th3_m4ch1n3}"], 100, 500);

    await typeCommand("meterpreter > ", "exit", 
      ["[*] Session closed"], 100, 400);

    await typeCommand("msf6 > ", "exit", [], 100, 400);

    // ========== ФИНАЛ ==========
    await printLine("", false);
    await printLine("> hacking finished. type 'help' for commands.", true, 30);
    await printLine("> you are now inside schrödinger's hell.", true, 25);

    terminalInput && terminalInput.focus();
    demoRunning = false;
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
