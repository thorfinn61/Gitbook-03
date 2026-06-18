// Theme toggle — défaut sombre
const themeBtn = document.getElementById('themeBtn');
const themeLabel = document.getElementById('themeLabel');
const iconSun = document.getElementById('iconSun');
const iconMoon = document.getElementById('iconMoon');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const isDark = theme === 'dark';
  themeLabel.textContent = isDark ? 'Sombre' : 'Clair';
  iconSun.style.display = isDark ? 'none' : 'block';
  iconMoon.style.display = isDark ? 'block' : 'none';
  localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

themeBtn.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// Exam switcher (Rank 03 / Rank 04)
const examScopes = document.querySelectorAll('[data-exam]');
const examButtons = document.querySelectorAll('.exam-switch-btn');

function applyExam(exam) {
  examScopes.forEach(el => el.classList.toggle('is-inactive', el.dataset.exam !== exam));
  examButtons.forEach(b => b.classList.toggle('active', b.dataset.examTarget === exam));
  localStorage.setItem('exam', exam);
}

const savedExam = localStorage.getItem('exam') || '03';
applyExam(savedExam);

examButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    applyExam(btn.dataset.examTarget);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// Sidebar mobile toggle
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
menuToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
document.querySelectorAll('.nav-link, .card').forEach(link => {
  link.addEventListener('click', () => sidebar.classList.remove('open'));
});

// Active nav link on scroll
const sections = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-link');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
    }
  });
}, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });
sections.forEach(s => observer.observe(s));

// Edit modal (video easter egg)
const editFab = document.getElementById('editFab');
const editModal = document.getElementById('editModal');
const editVideo = document.getElementById('editVideo');

function openEditModal() {
  editModal.classList.add('open');
  editModal.setAttribute('aria-hidden', 'false');
  editVideo.currentTime = 0;
  editVideo.play().catch(() => {});
}
function closeEditModal() {
  editModal.classList.remove('open');
  editModal.setAttribute('aria-hidden', 'true');
  editVideo.pause();
}

editFab.addEventListener('click', openEditModal);
editModal.querySelectorAll('[data-close]').forEach(el => {
  el.addEventListener('click', closeEditModal);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && editModal.classList.contains('open')) closeEditModal();
});

// Syntax highlighting
if (window.hljs) {
  document.querySelectorAll('pre code').forEach(block => {
    hljs.highlightElement(block);
  });
}
