// Splash screen
const splash = document.getElementById('splash');
const mainSite = document.getElementById('mainSite');
const enterBtn = document.getElementById('enterBtn');

function showMain() {
  splash.style.display = 'none';
  mainSite.style.display = 'block';
  mainSite.offsetHeight;
  mainSite.classList.add('visible');
}

// Skip splash if entered this session or returning from another page
if (sessionStorage.getItem('entered') || document.referrer.includes(window.location.hostname)) {
  sessionStorage.setItem('entered', 'true');
  showMain();
  const hash = window.location.hash;
  if (hash) {
    setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }
}

enterBtn.addEventListener('click', () => {
  sessionStorage.setItem('entered', 'true');
  splash.classList.add('hidden');
  mainSite.style.display = 'block';
  mainSite.offsetHeight;
  mainSite.classList.add('visible');
  setTimeout(() => {
    splash.style.display = 'none';
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
  }, 850);
});

// Clicking nav name returns to splash
const navName = document.querySelector('.nav-name');
if (navName) {
  navName.addEventListener('click', e => {
    e.preventDefault();
    sessionStorage.removeItem('entered');
    mainSite.classList.remove('visible');
    mainSite.style.display = 'none';
    splash.style.display = 'flex';
    splash.classList.remove('hidden');
    window.scrollTo(0, 0);
  });
}

// Scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('section').forEach(el => observer.observe(el));

// Smooth active nav highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (active) active.style.color = 'var(--black)';
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));
