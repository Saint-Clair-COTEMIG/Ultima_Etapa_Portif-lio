const html = document.documentElement;
const temaBtn = document.getElementById('temaBtn');
const temaTexto = document.getElementById('temaTexto');

function aplicarTema(tema) {
  html.setAttribute('data-theme', tema);
  temaTexto.textContent = tema === 'dark' ? 'Escuro' : 'Claro';
  try { localStorage.setItem('tema', tema); } catch (e) {}
}
aplicarTema(html.getAttribute('data-theme') || 'light');
temaBtn.addEventListener('click', () => {
  aplicarTema(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

function fecharMenu() {
  nav.classList.remove('aberto');
  menuBtn.setAttribute('aria-expanded', 'false');
}
menuBtn.addEventListener('click', () => {
  const aberto = nav.classList.toggle('aberto');
  menuBtn.setAttribute('aria-expanded', String(aberto));
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', fecharMenu));

if (window.Typed) {
  new Typed('#digitando', {
    strings: [
      'Estudante de T.I',
      'Hardware e ambientes computacionais',
      'Back-end em formação'
    ],
    typeSpeed: 50,
    backSpeed: 28,
    backDelay: 1800,
    loop: true,
    cursorChar: '_'
  });
}

if (window.AOS) {
  AOS.init({ duration: 450, once: true, offset: 40, easing: 'linear',
    disable: () => matchMedia('(prefers-reduced-motion: reduce)').matches });
}

const hero = document.getElementById('inicio');
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  hero.addEventListener('pointermove', e => {
    const r = hero.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    hero.style.setProperty('--dx', (x * 44).toFixed(1));
    hero.style.setProperty('--dy', (y * 30).toFixed(1));
  });
  hero.addEventListener('pointerleave', () => {
    hero.style.setProperty('--dx', 0);
    hero.style.setProperty('--dy', 0);
  });
}

const modal = document.getElementById('modal');
const modalTitulo = document.getElementById('modalTitulo');
const modalCorpo = document.getElementById('modalCorpo');
const modalTags = document.getElementById('modalTags');
const modalLink = document.getElementById('modalLink');
const modalImg = document.getElementById('modalImg');

function abrirModal({ titulo, paragrafos = [], tags = [], link = '', linkTexto = '', imagem = '', alt = '' }) {
  modalTitulo.textContent = titulo;
  modalCorpo.innerHTML = '';
  paragrafos.forEach(t => {
    const p = document.createElement('p');
    p.textContent = t;
    modalCorpo.appendChild(p);
  });
  modalTags.textContent = tags.join(' · ');
  modalImg.hidden = !imagem;
  if (imagem) { modalImg.src = imagem; modalImg.alt = alt; }
  modal.classList.toggle('largo', !!imagem);
  modalLink.hidden = !link;
  if (link) { modalLink.href = link; modalLink.textContent = linkTexto; }
  modal.showModal();
}
document.getElementById('modalFechar').addEventListener('click', () => modal.close());
modal.addEventListener('click', e => { if (e.target === modal) modal.close(); }); // clique fora fecha

document.getElementById('certBtn').addEventListener('click', () => {
  abrirModal({
    titulo: 'Introdução à IA moderna',
    paragrafos: ['Cisco Networking Academy, oferecido pelo COTEMIG. Concluído em 26 de junho de 2026.'],
    imagem: 'img/certificado-ia.png',
    alt: 'Certificado Introdução à IA moderna, concedido a Saint Clair José Silva Neves',
    link: 'img/certificado-ia.pdf',
    linkTexto: 'Abrir o PDF'
  });
});

const GITHUB = 'https://github.com/Saint-Clair-COTEMIG';
const projetos = {
  analisador: {
    titulo: 'Analisador Matemático',
    paragrafos: [
      'Aplicação em C# com Windows Forms. O usuário digita três valores e escolhe se quer a soma, a média, o maior ou o menor deles.',
      'O resultado aparece na tela, e há botões para limpar os campos e sair. O código foi dividido em métodos, um para cada cálculo.'
    ],
    tags: ['C#', 'Windows Forms', 'Lógica']
  },
  arena: {
    titulo: 'Arena de RPG',
    paragrafos: [
      'Atividade em C# que simula uma arena de RPG com as classes Jogador e Ferreiro.',
      'Explora como o objeto é armazenado na memória, a criação de várias instâncias e a passagem de parâmetros entre métodos.'
    ],
    tags: ['C#', 'Orientação a objetos', 'Windows Forms']
  },
  trilha: {
    titulo: 'Trilha',
    paragrafos: [
      'Conceito de plataforma que orienta a carreira de jovens e conecta estudantes a vagas de estágio com apoio de inteligência artificial.',
      'Cheguei a desenvolver a landing page da ideia.'
    ],
    tags: ['HTML', 'CSS', 'Conceito de produto']
  },
  portfolio: {
    titulo: 'Este portfólio',
    paragrafos: [
      'Começou como mockup no Figma, nas versões web e mobile, com modo claro e escuro. Depois foi transformado em código HTML, CSS e JavaScript.',
      'Usa variáveis de CSS para os temas, layout responsivo com @media, Typed.js, AOS e um formulário com máscaras e validação.'
    ],
    tags: ['Figma', 'HTML', 'CSS', 'JavaScript']
  }
};
document.querySelectorAll('[data-projeto]').forEach(botao => {
  botao.addEventListener('click', () => {
    abrirModal({ ...projetos[botao.dataset.projeto], link: GITHUB, linkTexto: 'Ver no GitHub' });
  });
});


const form = document.getElementById('formContato');
const campos = {
  nome: document.getElementById('nome'),
  telefone: document.getElementById('telefone'),
  email: document.getElementById('email'),
  mensagem: document.getElementById('mensagem')
};
const contador = document.getElementById('contador');

campos.nome.addEventListener('input', () => {
  const v = campos.nome.value.replace(/[^A-Za-zÀ-ÿ'\- ]/g, '').replace(/\s{2,}/g, ' ');
  campos.nome.value = v.replace(/(^|\s)([a-zà-ÿ])/g, (m, a, b) => a + b.toUpperCase());
});

campos.telefone.addEventListener('input', () => {
  const d = campos.telefone.value.replace(/\D/g, '').slice(0, 11);
  let v = d;
  if (d.length > 10)     v = d.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
  else if (d.length > 6) v = d.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
  else if (d.length > 2) v = d.replace(/^(\d{2})(\d{0,5}).*/, '($1) $2');
  else if (d.length > 0) v = '(' + d;
  campos.telefone.value = v;
});

campos.email.addEventListener('input', () => {
  campos.email.value = campos.email.value.replace(/\s/g, '').toLowerCase();
});


campos.mensagem.addEventListener('input', () => {
  contador.textContent = campos.mensagem.value.length + ' / 500';
});

const regras = {
  nome: v => v.trim().split(/\s+/).filter(p => p.length > 1).length >= 2 ? '' : 'Digite nome e sobrenome.',
  telefone: v => { const n = v.replace(/\D/g, '').length; return (n === 10 || n === 11) ? '' : 'Digite o telefone com DDD.'; },
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'Digite um e-mail válido, como nome@exemplo.com.',
  mensagem: v => v.trim().length >= 10 ? '' : 'Escreva pelo menos 10 caracteres.'
};

function validar(nome) {
  const msg = regras[nome](campos[nome].value);
  document.getElementById('erro-' + nome).textContent = msg;
  campos[nome].closest('.campo').classList.toggle('invalido', !!msg);
  campos[nome].setAttribute('aria-invalid', msg ? 'true' : 'false');
  return !msg;
}
Object.keys(campos).forEach(n => campos[n].addEventListener('blur', () => validar(n)));

form.addEventListener('submit', e => {
  e.preventDefault();
  const resultados = Object.keys(campos).map(validar);
  if (resultados.includes(false)) {
    const primeiro = Object.keys(campos).find(n => regras[n](campos[n].value) !== '');
    if (primeiro) campos[primeiro].focus();
    return;
  }

  const nomeCurto = campos.nome.value.trim().split(' ')[0];
  abrirModal({
    titulo: 'Mensagem enviada',
    paragrafos: ['Obrigado, ' + nomeCurto + '. Respondo no e-mail ' + campos.email.value + ' assim que possível.']
  });
  form.reset();
  contador.textContent = '0 / 500';
});