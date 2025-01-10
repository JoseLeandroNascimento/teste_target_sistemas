/**
 * 
 * 2) Dado a sequência de Fibonacci, onde se inicia por 0 e 1 e o próximo valor sempre será a soma dos 2 valores anteriores (exemplo: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34...), escreva um programa na linguagem que desejar onde, informado um número, ele calcule a sequência de Fibonacci e retorne uma mensagem avisando se o número informado pertence ou não a sequência.
 * 
 */


function fibonacciSequence(num) {
    const sequence = [0, 1];
    while (sequence[sequence.length - 1] < num) {
        const nextValue = sequence[sequence.length - 1] + sequence[sequence.length - 2];
        sequence.push(nextValue);
    }
    return sequence;
}

function isFibonacciNumber(num) {
    if (num < 0) {
        return "O número informado não pertence à sequência de Fibonacci.";
    }

    const sequence = fibonacciSequence(num);

    return sequence.includes(num)

}


const numeroInformado = 21;
console.log(`Verificando se o numero ${numeroInformado} pertence a sequencia Fibonacci`);
console.log();

const isFibonacci = isFibonacciNumber(numeroInformado)


if (isFibonacci) {
    console.log(`O número ${numeroInformado} pertence à sequência de Fibonacci.`);
} else {
    console.log(`O número ${numeroInformado} não pertence à sequência de Fibonacci.`);
}