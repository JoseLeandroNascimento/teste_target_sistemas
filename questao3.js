/**
* 3) Dado um vetor que guarda o valor de faturamento diário de uma distribuidora, faça um programa, na linguagem que desejar, que calcule e retorne:
• O menor valor de faturamento ocorrido em um dia do mês;
• O maior valor de faturamento ocorrido em um dia do mês;
• Número de dias no mês em que o valor de faturamento diário foi superior à média mensal.
* IMPORTANTE:
* a) Usar o json ou xml disponível como fonte dos dados do faturamento mensal;
* b) Podem existir dias sem faturamento, como nos finais de semana e feriados. Estes dias devem ser ignorados no cálculo da média;
* 
*/

const fs = require('fs');


function getDadosFaturamento() {
    const caminho = "./dados.json"
    return new Promise((resolve, reject) => {
        fs.readFile(caminho, 'utf8', (err, data) => {
            if (err) {
                reject(`Erro ao ler o arquivo: ${err}`);
                return;
            }
            try {
                const jsonData = JSON.parse(data);
                resolve(jsonData);
            } catch (parseError) {
                reject(`Erro ao parsear o JSON: ${parseError}`);
            }
        });
    });
}

function menorFaturamento(faturamento) {

    const menor = Math.min(...faturamento.filter(f => f.valor > 0).map(f => f.valor));


    return faturamento.find(f => f.valor === menor);
}

function maiorFaturamento(faturamento) {

    const maior = Math.max(...faturamento.filter(f => f.valor > 0).map(f => f.valor));


    return faturamento.find(f => f.valor === maior);
}

function calcularMedia(faturamento) {
    const total = faturamento.filter(f => f.valor > 0).reduce((acc, cur) => acc + cur.valor, 0);
    const diasComFaturamento = faturamento.filter(f => f.valor > 0).length;

    return total / diasComFaturamento;
}

function diasAcimaDaMedia(faturamento, media) {
    return faturamento.filter(f => f.valor > media).length;
}


getDadosFaturamento()
    .then(dados => {
        const faturamentoValores = dados

        const mediaMensal = calcularMedia(faturamentoValores);
        const menor = menorFaturamento(faturamentoValores);
        const maior = maiorFaturamento(faturamentoValores);
        const acimaDaMedia = diasAcimaDaMedia(faturamentoValores, mediaMensal);

        console.log(`Menor faturamento: Dia ${menor.dia}, Valor: R$ ${menor.valor}`);
        console.log(`Maior faturamento: Dia ${maior.dia}, Valor: R$ ${maior.valor}`);
        console.log(`Número de dias acima da média mensal: ${acimaDaMedia}`);

    })
    .catch((erro) => {
        console.error(erro);
    });