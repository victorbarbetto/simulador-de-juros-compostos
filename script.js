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