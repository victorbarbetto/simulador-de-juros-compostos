export async function buscarSelic() {
    const response = await fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados/ultimos/1?formato=json');

    if (!response.ok) {
        throw new Error('Erro ao buscar a taxa selic.');
    }

    const data = await response.json();
    const item = data[0];
    const selic = parseFloat(item.valor.replace(',', '.'));

    return {
        data: item.data,
        valor: selic
    };
}