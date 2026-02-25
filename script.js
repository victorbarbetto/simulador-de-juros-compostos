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

// BOTÃO CRIAR ECONOMIA

const btnCriarEconomia = document.querySelector('#btn-criar-economia');
const inputNomeEconomia = document.querySelector('input#nome-economia');
const inputValorEconomia = document.querySelector('input#valor-economia');
const inputPeriodoEconomia = document.querySelector('select#periodo-economia');
const rowCards = document.querySelector('.row-cards');

btnCriarEconomia.addEventListener('click', (e) => {
    
    e.preventDefault();

    console.log(inputNomeEconomia.value);
    console.log(inputValorEconomia.value);
    console.log(inputPeriodoEconomia.value);
    // (FAZER TRATAMENTO DE DADOS ANTES)

    // CRIAR DIV BODY
    const novoCardBody = document.createElement('div');
    novoCardBody.classList.add('card-body', 'd-flex', 'flex-column', 'justify-content-center');
    
    const tituloCardBody = document.createElement('h5');
    tituloCardBody.textContent = inputNomeEconomia.value // .charAt(0).toUpperCase() + inputNomeEconomia.slice(1);
    
    const descricaoCardBody = document.createElement('p');
    let periodo = inputPeriodoEconomia.value === 'mensal' ? 'mês' : 'dia';
    descricaoCardBody.textContent = `Economize R$${inputValorEconomia.value} por ${periodo}.`;
    
    novoCardBody.append(tituloCardBody, descricaoCardBody); // ADD TITULO E DESCRICAO NO BODY

    // CRIAR DIV DATA
    const novoCardData = document.querySelector('div');
    novoCardData.classList.add('card', 'h-100', 'economia-card');
    novoCardData.setAttribute('data-valor', inputValorEconomia.value); // FAZER TRATAMENTO
    novoCardData.setAttribute('data-periodo', inputPeriodoEconomia.value); // FAZER TRATAMENTO

    novoCardData.appendChild(novoCardBody); // ADD CARD BODY NO CARD DATA;

    // CRIAR DIV COL
    const novoCardCol = document.createElement('div');
    novoCardCol.classList.add('col-12', 'col-sm-6', 'col-md-4', 'mb-3');
    
    novoCardCol.appendChild(novoCardData); // insere divData na divCol

    // ADICIONAR CARD COL A ROW
    rowCards.appendChild(novoCardCol);
})
