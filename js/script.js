// TOGGLE THEME

const btnTheme = document.querySelector('button#toggleTheme');
btnTheme.addEventListener('click', (e) => {
    e.preventDefault();

    document.body.classList.toggle('light-theme');
})


// ABRIR MODAL CRIAR ECONOMIA

const cardCriarEconomia = document.querySelector('div.card-criar-economia');
const modalOverlay = document.querySelector('div.overlay');
const modalCriarEconomia = document.querySelector('div.modal-criar-economia');

cardCriarEconomia.addEventListener("click", () => {
    modalCriarEconomia.classList.remove('hidden');
    modalOverlay.classList.remove('hidden');
});

// CRIAR NOVO CARD

const inputNome = document.querySelector('input#input-nome');
const inputValor = document.querySelector('input#input-valor');
const selectPeriodo = document.querySelector('select#select-periodo');
const btnNovoCard = document.querySelector('button#criar-card-personalizado');
const listaEconomias = document.querySelector('div.lista-economias')

btnNovoCard.addEventListener('click', (e) => {
    e.preventDefault();

    criarCardPersonalizado();
})

function criarCardPersonalizado() {
    if (inputNome.value.trim() === '' || inputValor.value.trim() === '') {
        alert('Preencha os campos vazios!')
        return;
    }

    const novoCard = document.createElement('div');
    novoCard.classList.add('card', 'card-economia');

    const tituloCapitalizado = capitalizar(inputNome.value.trim());
    const aporteMensal = valorMensal(selectPeriodo.value, Number(inputValor.value.trim()))

    novoCard.innerHTML = `
        <i class="fa-solid fa-file-pen"></i>
        <h3>${tituloCapitalizado}</h3>
        <p>Economize R$${String(aporteMensal)}/mês</p>
    `;

    listaEconomias.appendChild(novoCard);
    fecharModal();
}

// FECHAR MODAL CRIAR ECONOMIA BTN

const btnFecharEconomia = document.querySelector('button#btnFecharModal');

btnFecharEconomia.addEventListener('click', fecharModal)

// FUNCAO FECHAR MODAL

function fecharModal() {
    modalCriarEconomia.classList.add('hidden');
    modalOverlay.classList.add('hidden');

    resetarInputs();
}

// TOGGLE ACTIVE CARDS

listaEconomias.addEventListener('click', (e) => {
    const card = e.target.closest('.card-economia');

    if (!card) return;

    card.classList.toggle('active');
})

// FUNCAO RESETAR INPUTS MODAL

function resetarInputs() {
    inputNome.value = '';
    inputValor.value = '';
    selectPeriodo.value = 'mensal';
}

// FUNCAO CAPITALIZAR PALAVRAS

function capitalizar(input) {
    const palavras = input.split(' ');

    const palavrasCapitalizadas = palavras.map(palavra => {
        if (palavra.length === 0) {
            return '';
        }

        return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
    })

    return palavrasCapitalizadas.join(' ');
}

// FUNCAO VALOR MENSAL

function valorMensal(input, valor) {

    let aporteMensal;

    switch (input) {

        case 'diaria':
            aporteMensal = valor * 30;
            break;

        case 'semanal':
            aporteMensal = valor * 4;
            break;

        case 'mensal':
            aporteMensal = valor;
            break;

        default:
            aporteMensal = valor;
            break;
    }

    return aporteMensal;
}

// RESULTADO ECONOMIA

const sectionResultado = document.querySelector('section.resultado')