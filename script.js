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

    if (aporteMensal <= 0) {
        alert('Selecione suas economias.');
        return;
    }

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

    const taxaMensal = Math.pow(1 + taxaAnual / 100, 1 / 12) - 1;

    criarTabela(aporteMensal, taxaMensal);

    // IR PARA TELA RESULTADO

    sectionEconomias.classList.remove('d-flex');
    sectionEconomias.classList.add('d-none');

    sectionResultado.classList.remove('d-none');
    sectionResultado.classList.add('d-flex');
}

// CRIAR TABELA RESULTADO

function criarTabela(aporteMensal, taxaMensal) {

    const acordeao = document.querySelector('#accordionResultado');
    acordeao.innerHTML - '';

    let saldo = 0;
    let totalInvestido = 0;

    for (let ano = 1; ano <= 5; ano++) {

        // ========================
        // ACCORDION ITEM
        // ========================

        const item = document.createElement('div');
        item.classList.add('accordion-item');

        // CRIAR HEADER ACORDEAO
        const header = document.createElement('h2');
        header.classList.add('accordion-header');

        // CRIAR BUTTON ACORDEAO
        const button = document.createElement('button');
        button.classList.add('accordion-button');
        if (ano !== 1) button.classList.add('collapsed');

        button.type = 'button';
        button.setAttribute('data-bs-toggle', 'collapse');
        button.setAttribute('data-bs-target', `#collapse${ano}`)
        button.setAttribute('aria-expanded', ano === 1 ? 'true' : 'false');
        button.setAttribute('aria-controls', `collapse${ano}`);
        button.innerText = `${ano} ano${ano > 1 ? 's' : ''}`;

        header.appendChild(button); // ADD BUTTON NO HEADER
        item.appendChild(header); // ADD HEADER NO ITEM

        // ========================
        // COLLAPSE
        // ========================

        const collapse = document.createElement('div');
        collapse.id = `collapse${ano}`;
        collapse.classList.add('accordion-collapse', 'collapse');
        if (ano === 1) collapse.classList.add('show');
        collapse.setAttribute('data-bs-parent', '#accordionResultado');

        // CRIAR BODY
        const body = document.createElement('div');
        body.classList.add('accordion-body');

        // ========================
        // TABELA
        // ========================

        const table = document.createElement('table');
        table.classList.add('table', 'table-dark', 'table-striped', 'table-sm');

        const thead = document.createElement('thead');
        const trHead = document.createElement('tr');

        ['Mês', 'Total Investido', 'Juros do Mês', 'Total Acumulado']
            .forEach(texto => {
                const th = document.createElement('th');
                th.textContent = texto;
                trHead.appendChild(th);
            })

            thead.appendChild(trHead);
            table.appendChild(thead);

        const tbody = document.createElement('tbody');

        // ========================
        // MESES DO ANO
        // ========================

        for (let mes = 1; mes <= 12; mes++) {
            
            const juros = saldo * taxaMensal;
            saldo += juros + aporteMensal;
            totalInvestido += aporteMensal;

            const tr = document.createElement('tr');

            const colMes = document.createElement('td');
            colMes.textContent = `Mês ${(ano - 1) * 12 + mes}`;

            const colInvestido = document.createElement('td');
            colInvestido.textContent = totalInvestido.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

            const colJuros = document.createElement('td');
            colJuros.textContent = juros.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

            const colSaldo = document.createElement('td');
            colSaldo.textContent = saldo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

            tr.append(colMes, colInvestido, colJuros, colSaldo);
            tbody.appendChild(tr);

        }

        table.appendChild(tbody);
        body.appendChild(table);
        collapse.appendChild(body);
        item.appendChild(collapse);
        acordeao.appendChild(item);
    }
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