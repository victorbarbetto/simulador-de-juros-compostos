// ESCONDER TELA HERO E MOSTRAR TELA ECONOMIAS

const sectionHero = document.querySelector('#screen-hero');
const btnHero = document.querySelector('#btnHero');
const sectionEconomias = document.querySelector('#screen-economias');

btnHero.addEventListener('click', () => {
    sectionHero.classList.remove('d-flex');
    sectionHero.classList.add('d-none');

    sectionEconomias.classList.remove('d-none');
    sectionEconomias.classList.add('d-flex');

})

// ADICIONAR ACTIVE NOS CARDS

const cards = document.querySelectorAll('.card');

cards.forEach((card) => {

    card.addEventListener('click', () => {
        if (card.id === cardCriarEconomia.id) {
            return;
        }
        card.classList.toggle('active');
    })
})

// CARD CRIAR ECONOMIA

const cardCriarEconomia = document.querySelector('#card-criar-economia');

cardCriarEconomia.addEventListener('mouseenter', () => {
    cardCriarEconomia.classList.remove('opacity-50');
    cardCriarEconomia.classList.add('opacity-100');
})

cardCriarEconomia.addEventListener('mouseleave', () => {
    cardCriarEconomia.classList.remove('opacity-100');
    cardCriarEconomia.classList.add('opacity-50');
})

// EXIBIR POPUP CRIAR ECONOMIA

const popupCriarEconomia = document.querySelector('#popup-criar-economia');

cardCriarEconomia.addEventListener('click', () => {
    popupCriarEconomia.classList.remove('d-none');
    popupCriarEconomia.classList.remove('d-flex');
})