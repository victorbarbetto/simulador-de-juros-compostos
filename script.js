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

    const valor = parseFloat(inputValorEconomia.value);

    if (!inputNomeEconomia.value || isNaN(valor) || valor <= 0) {
        alert('Preencha os campos corretamente!');
        return;
    }

    // CRIAR DIV BODY
    const novoCardBody = document.createElement('div');
    novoCardBody.classList.add('card-body', 'd-flex', 'flex-column', 'justify-content-center');

    const tituloCardBody = document.createElement('h5');
    tituloCardBody.textContent = inputNomeEconomia.value;

    const descricaoCardBody = document.createElement('p');
    let periodo = inputPeriodoEconomia.value === 'mensal' ? 'mês' : 'dia';
    descricaoCardBody.textContent = `Economize R$${inputValorEconomia.value} por ${periodo}.`;

    novoCardBody.append(tituloCardBody, descricaoCardBody); // ADD TITULO E DESCRICAO NO BODY

    // CRIAR DIV DATA
    const novoCardData = document.createElement('div');
    novoCardData.classList.add('card', 'h-100', 'economia-card', 'active');
    novoCardData.setAttribute('data-valor', inputValorEconomia.value); // FAZER TRATAMENTO
    novoCardData.setAttribute('data-periodo', inputPeriodoEconomia.value); // FAZER TRATAMENTO

    novoCardData.appendChild(novoCardBody); // ADD CARD BODY NO CARD DATA;

    // CRIAR DIV COL
    const novoCardCol = document.createElement('div');
    novoCardCol.classList.add('col-12', 'col-sm-6', 'col-md-4', 'mb-3');

    novoCardCol.appendChild(novoCardData); // insere divData na divCol

    // ADICIONAR CARD COL A ROW
    rowCards.appendChild(novoCardCol);

    // FECHAR MODAL
    const modal = bootstrap.Modal.getInstance(document.getElementById('modal-criar-economia'));
    modal.hide();

    // RESETAR INPUTS

    inputNomeEconomia.value = '';
    inputValorEconomia.value = '';
    inputPeriodoEconomia.value = 'diario';
})

// ADICIONAR ACTIVE NOS CARDS

rowCards.addEventListener('click', (e) => {

    const card = e.target.closest('.economia-card');

    if (!card) return;

    card.classList.toggle('active');

})

// MOSTRAR RESULTADO (BOTAO VER RESULTADO)

const btnVerResultado = document.querySelector('#btnVerResultado');

btnVerResultado.addEventListener('click', async () => {

    let aporteMensal = 0;

    const cardsCriados = document.querySelectorAll('.economia-card.active');

    cardsCriados.forEach((card) => {

        let valorCard = Number(card.dataset.valor);
        let periodoCard = card.dataset.periodo;

        if (periodoCard === 'diario') {
            valorCard *= 30;
        }

        aporteMensal += valorCard;
    })

    const selic = await buscarSelic();

    if (!selic) {
        alert('Erro ao buscar SELIC');
        return;
    }

    calcular(aporteMensal, selic.taxaAnual, selic.dataAtualizacao);

})

// ============================
// API - SELIC
// ============================

async function buscarSelic() {

    try {

        const response = await fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json');

        const dados = await response.json();

        const ultimoRegistro = dados[0];

        const taxaAnual = Number(ultimoRegistro.valor.replace(',', '.'));
        const dataAtualizacao = ultimoRegistro.data;

        return {
            taxaAnual,
            dataAtualizacao
        };

    } catch (erro) {
        console.log('Erro ao buscar SELIC', erro);
        return null;
    }

}

// ============================
// CÁLCULO
// ============================

function calcular(aporteMensal, taxaAnual, dataAtualizacao) {

    // SELECIONAR ELEMENTOS TEXTOS
    const textoSelicAtual = document.querySelector('#text-selic-atual');
    const textoUltimaAtualizacao = document.querySelector('#text-ultima-atualizacao');
    const textoEconomiaMensal = document.querySelector('#text-economia-mensal');

    // MODIFICAR TEXTOS
    textoSelicAtual.textContent = `Selic atual: ${taxaAnual.toFixed(2)}% ao ano.`;
    textoUltimaAtualizacao.textContent = `Último dado disponível: ${dataAtualizacao}.`;
    textoEconomiaMensal.textContent = `Economia mensal: ${aporteMensal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}.`;



    // IR PARA TELA RESULTADO

    sectionEconomias.classList.remove('d-flex');
    sectionEconomias.classList.add('d-none');

    sectionResultado.classList.remove('d-none');
    sectionResultado.classList.add('d-flex');
}

const sectionResultado = document.querySelector('#screen-resultado');

// VOLTAR PARA TELA ECONOMIAS

const btnOutroCalculo = document.querySelector('#btnOutroCalculo');

btnOutroCalculo.addEventListener('click', () => {
    sectionResultado.classList.remove('d-flex');
    sectionResultado.classList.add('d-none');

    sectionEconomias.classList.remove('d-none');
    sectionEconomias.classList.add('d-flex');
});