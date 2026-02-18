import { buscarSelic } from './fetch.js';

// Trocar tema para dark/light
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

// Ir para tela de simulação

const sectionHero = document.querySelector('section.hero');
const btnHero = document.querySelector('.btn-hero');

btnHero.addEventListener('click', (e) => {
    e.preventDefault();

    sectionHero.style.display = 'none';
    sectionSimulacao.style.display = 'flex';
})

// Adicionar e remover classe "ativo" nos cards

const sectionSimulacao = document.querySelector('section.simulacao');
const cardEconomia = document.querySelectorAll('div.economia');

cardEconomia.forEach((card) => {
    card.addEventListener('click', () => {
        card.classList.toggle('ativo');
    })
})

// Abrir popup economia personalizada

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

// Adicionar economia personalizada nos cards

const divListaEconomias = document.querySelector('.lista-economias');

const btnCriarCard = document.querySelector('.btn-criar-card');
const inputNomeCard = document.querySelector('#nome-card');
const inputValorCard = document.querySelector('#valor-card');
const inputFrequenciaCard = document.querySelector('#frequencia');

btnCriarCard.addEventListener('click', (e) => {
    e.preventDefault();

    // Criar nova div card
    const novaDivCard = document.createElement('div');

    // Criar icone do card
    const novoIconeCard = document.createElement('i');
    novoIconeCard.classList.add('fa-solid', 'fa-piggy-bank');
    novaDivCard.appendChild(novoIconeCard);


    // Criar h3 do card
    const novoH3Card = document.createElement('h3');
    novoH3Card.textContent = inputNomeCard.value;
    novaDivCard.appendChild(novoH3Card);


    // Criar descrição do card
    const novoPCard = document.createElement('p');
    let totalEconomiaMes;

    // Se for diario, o valor do card é economia por dia e o total mês é multiplicado por 30
    if (inputFrequenciaCard.value === 'diaria') {
        novoPCard.textContent = `Economizar R$${inputValorCard.value} por dia`;
        totalEconomiaMes = inputValorCard.value * 30;
    } else if (inputFrequenciaCard.value === 'mensal') {
        novoPCard.textContent = `Economizar R$${inputValorCard.value} por mês`;
        totalEconomiaMes = inputValorCard.value;
    }

    novaDivCard.appendChild(novoPCard);

    // Adicionar classes à nova div
    novaDivCard.classList.add('economia', 'card', 'ativo');

    // Adicionar nova div card à lista de economias
    divListaEconomias.appendChild(novaDivCard);

    // Resetar inputs
    inputNomeCard.value = '';
    inputValorCard.value = '';
    inputFrequenciaCard.value = 'diaria';

    // Fechar popup
    popupCriarCard.style.display = 'none';
})

// Mostrando resultado da simulação