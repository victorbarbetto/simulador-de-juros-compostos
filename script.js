const toggleTheme = document.querySelector('.toggleTheme');

toggleTheme.addEventListener('click', (e) => {
    e.preventDefault();

    if (toggleTheme.classList.contains('fa-sun')) {
        toggleTheme.classList.remove('fa-sun');
        toggleTheme.classList.add('fa-moon');

        document.body.classList.add('white-mode');
    } else {
        toggleTheme.classList.remove('fa-moon');
        toggleTheme.classList.add('fa-sun');

        document.body.classList.remove('white-mode');
    }
})

const sectionHero = document.querySelector('section.hero');
const btnHero = document.querySelector('.btn-hero');

btnHero.addEventListener('click', (e) => {
    e.preventDefault();

    sectionHero.style.display = 'none';
    sectionSimulacao.style.display = 'flex';
})

const sectionSimulacao = document.querySelector('section.simulacao');
const cardEconomia = document.querySelectorAll('div.economia');

cardEconomia.forEach((card) => {
    card.addEventListener('click', () => {
        card.classList.toggle('ativo');
    })
})

const cardPersonalizado = document.querySelector('div.personalizado');
const popupCriarCard = document.querySelector('div.criar-card');

cardPersonalizado.addEventListener('click', (e) => {
    e.preventDefault();

    popupCriarCard.style.display = 'flex';
})

const fecharCriarCard = document.querySelector('.fechar-criar-card');

fecharCriarCard.addEventListener('click', (e) => {
    e.preventDefault();

    popupCriarCard.style.display = 'none';
})