document.getElementById('year').textContent = new Date().getFullYear();

// Menu do celular
var toggle = document.querySelector('.nav__toggle');
var menu = document.getElementById('menu');

function setMenu(open) {
  document.body.classList.toggle('menu-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
}

toggle.addEventListener('click', function () {
  setMenu(toggle.getAttribute('aria-expanded') !== 'true');
});

menu.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () { setMenu(false); });
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    toggle.focus();
  }
});

document.addEventListener('click', function (e) {
  if (document.body.classList.contains('menu-open') && !e.target.closest('.nav')) {
    setMenu(false);
  }
});

// Animação de entrada
var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !reduceMotion) {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        setTimeout(function () {
          entry.target.classList.add('is-visible');
        }, i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });
} else {
  document.querySelectorAll('.reveal').forEach(function (el) {
    el.classList.add('is-visible');
  });
}
