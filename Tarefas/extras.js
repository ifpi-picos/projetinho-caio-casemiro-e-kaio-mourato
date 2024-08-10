const listaConcluido = []
const listaPendente = []



function AdicionarNovaTarefa (){
    let novaTarefa = {
        TITULO: prompt('Insira o título da tarefa: '),
        DESCRIÇÃO: prompt('Insira a descrição da tarefa: '),
        VENCIMENTO: prompt('Insira a data de VENCIMENTO da tarefa: '),
        PRIORIDADE: prompt (`Defina o grau de PRIORIDADE da tarefa 
            URGENTE -- POUCO URGENTE -- PODE ESPERAR
            `),
        CRIAÇÃO: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
    }
    novaTarefa = listaPendente.push(novaTarefa)
}
AdicionarNovaTarefa()
console.table(listaPendente)

function ListarTarefas (){
    while(true){
        var escolha = prompt(`1- Lista de pendentes
2- Lista de concluidas
Qual você deseja ver?`)
            if (escolha == '1' || escolha == '2'){
                break
            } else{console.log('Escolha inválida! Digite uma opção válida')}
}

    while (true){
        var criterio = prompt(`1- Data de VENCIMENTO
2- PRIORIDADE
3- Data de criação
Como você quer ordenar a lista?`)
            if (criterio == '1' || criterio == '2' || criterio == '3'){
                break
            } else{console.log('Escolha inválida! Digite uma opção válida')}
    }

        switch(criterio){
            case '1':
                if (escolha == 1){
                    listaPendente.sort((a, b) => new Date(a.VENCIMENTO) - new Date(b.VENCIMENTO))
                } else {listaConcluido.sort((a, b) => new Date(a.VENCIMENTO) - new Date(b.VENCIMENTO))}
                break

            case '2':
                if (escolha == 1){
                    listaPendente.sort((a, b) => a.PRIORIDADE - b.PRIORIDADE)
                } else {listaConcluido.sort((a, b) => a.PRIORIDADE - b.PRIORIDADE)}
                break

            case '3':
                if (escolha == 1){
                    listaPendente.sort((a, b) => {
                        const dataA = a.CRIAÇÃO.split('/').reverse().join('');
                        const dataB = b.CRIAÇÃO.split('/').reverse().join('');
                        return dataA.localeCompare(dataB);
                    })
                } else {listaConcluido.sort((a, b) => {
                    const dataA = a.CRIAÇÃO.split('/').reverse().join('');
                    const dataB = b.CRIAÇÃO.split('/').reverse().join('');
                    return dataA.localeCompare(dataB);
                })}
                break
        }


        if (escolha == '1'){
            console.table(listaPendente)
        } else if (escolha == '2'){
            console.table(listaConcluido)
            } 
}

