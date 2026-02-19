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
        totalEconomiaMes = inputValorCard.value * 21;
    } else if (inputFrequenciaCard.value === 'mensal') {
        novoPCard.textContent = `Economizar R$${inputValorCard.value} por mês`;
        totalEconomiaMes = inputValorCard.value;
    }

    novaDivCard.dataset.value = totalEconomiaMes;

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
const btnVerSimulacao = document.querySelector('.btn-simulacao');

const sectionResultado = document.querySelector('section.resultado');
const pDataSelic = document.querySelector('p.data-selic');
const pValorSelic = document.querySelector('p.selic-atual');
const h3EconomiaMensal = document.querySelector('h3.economia-mensal');

btnVerSimulacao.addEventListener('click', async (e) => {
    e.preventDefault();

    sectionSimulacao.style.display = 'none';
    sectionResultado.style.display = 'flex';

    const divsAtivas = document.querySelectorAll('div.ativo');
    let soma = 0;

    divsAtivas.forEach(div => {
        soma += Number(div.dataset.value);
    })

    try {

        // Buscar selic atual e transformar em anual
        const selic = await buscarSelic();
        const selicAnual = (Math.pow(1 + (selic.valor / 100), 252) - 1) * 100;
        const selicMensal = Math.pow(1 + selicAnual / 100, 1 / 12) - 1;

        // Exibir data e taxa atual da selic
        pDataSelic.textContent = `Atualização: ${selic.data}`;
        pValorSelic.textContent = `Selic: ${selicAnual.toFixed(2)}% a.a`;

        // Formatar economia mensal e exibir como H3
        const somaEmReal = new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL'
        });
        h3EconomiaMensal.textContent = `Economia mensal: ${somaEmReal.format(soma)}`;

        const projecao1 = calcularProjecao(soma, selicMensal, 1);
        const projecao2 = calcularProjecao(soma, selicMensal, 2);
        const projecao3 = calcularProjecao(soma, selicMensal, 3);
        const projecao4 = calcularProjecao(soma, selicMensal, 4);
        const projecao5 = calcularProjecao(soma, selicMensal, 5);

        const ctx = document.querySelector('#grafico-barra');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Ano 1', 'Ano 2', 'Ano 3', 'Ano 4', 'Ano 5'],
                datasets: [
                    {
                        label: 'Total investido',
                        data: [
                            projecao1.totalInvestido,
                            projecao2.totalInvestido,
                            projecao3.totalInvestido,
                            projecao4.totalInvestido,
                            projecao5.totalInvestido
                        ],
                        borderWidth: 1
                    },
                    {
                        label: 'Juros',
                        data: [
                            projecao1.juros,
                            projecao2.juros,
                            projecao3.juros,
                            projecao4.juros,
                            projecao5.juros
                        ],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

    } catch (erro) {
        pDataSelic.textContent = "Erro ao buscar a Selic.";
        console.error(erro);
    }
})

function calcularProjecao(aporteMensal, selicMensal, anos) {
    const meses = anos * 12;

    let montante = 0;
    let totalInvestido = 0;

    for (let i = 1; i <= meses; i++) {
        totalInvestido += aporteMensal;
        montante = (montante + aporteMensal) * (1 + selicMensal);
    }

    const juros = montante - totalInvestido;

    return {
        montante,
        totalInvestido,
        juros
    };
}