/*const clearTerminal = () => {
    process.stdout.write('\x1Bc'); 
};


clearTerminal();*/

let lista = ['Caio', 'Caze', 'preto']
let conclusao = []


let nome = lista.splice(1,1)
conclusao.push(nome)

console.log(nome)
console.log(lista)
console.log(conclusao)