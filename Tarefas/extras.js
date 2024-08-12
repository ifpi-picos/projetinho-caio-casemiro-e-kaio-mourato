const listaConcluido = []
const listaPendente = []



function AdicionarNovaTarefa (){
    let dataVencimentoStr = prompt('Insira a data de VENCIMENTO da tarefa no formato dd/mm/aaaa: ');

    let [dia, mes, ano] = dataVencimentoStr.split('/').map(Number);
    if (isNaN(dia) || isNaN(mes) || isNaN(ano) || dia < 1 || dia > 31 || mes < 1 || mes > 12 || ano < 1900) {
        console.log('Data inválida. Certifique-se de inserir a data no formato dd/mm/aaaa.')
        return;
    }

    let novaTarefa = {
        TITULO: prompt('Insira o título da tarefa: '),
        DESCRIÇÃO: prompt('Insira a descrição da tarefa: '),
        VENCIMENTO: new Date(ano, mes - 1, dia),
        PRIORIDADE: prompt (`Defina o grau de PRIORIDADE da tarefa 
            URGENTE -- POUCO URGENTE -- PODE ESPERAR
            `),
        CRIAÇÃO: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
    }
    novaTarefa = listaPendente.push(novaTarefa)
}

function RemoverTarefaConcluida(){
    console.table(listaConcluido)
    let RemoverTarefa = prompt('Digite o título da tarefa que deseja remover: ')
    let indice = listaConcluido.findIndex(f => f.TITULO === RemoverTarefa)
    let confirme = parseInt(prompt(`Tem certeza que deseja remover ${RemoverTarefa}?
                            1 - SIM         2 - NÃO`))
    if (confirme == 1){
        if (indice !== -1){
            let TarefaRemovida = listaConcluido.splice(indice, 1)
            console.log('Tarefa removida:', TarefaRemovida[0])
        } else {
            console.log('Tarefa não encontrada')
        }
    } else if (confirme == 2){
        console.log('Operação de REMOÇÃO CANCELADA')
    } else {
        console.log('Não conseguimos identificar a sua escolha :(')
    }
    
}
function RemoverTarefaPendente(){
    console.table(listaPendente)
    let RemoverTarefa = prompt('Digite o título da tarefa que deseja remover: ')
    let indice = listaPendente.findIndex(f => f.TITULO === RemoverTarefa)
    let confirme = parseInt(prompt(`Tem certeza que deseja remover ${RemoverTarefa}?
                           1 - SIM         2 - NÃO
                           `))
    if(confirme == 1){
        if (indice !== -1){
            let TarefaRemovida = listaPendente.splice(indice, 1)
            console.log('Tarefa removida:', TarefaRemovida[0])
        } else {
            console.log('Tarefa não encontrada')
        }
    } else if (confirme == 2){
        console.log('Operação de REMOÇÃO CANCELADA')
    } else {
        console.log('Não conseguimos identificar a sua escolha :(')
    }
}


function ListarTarefas() {
    while(true) {
        var escolha = prompt(`1- Lista de pendentes
2- Lista de concluídas
Qual você deseja ver?`);
        if (escolha == '1' || escolha == '2') {
            break;
        } else {
            console.log('Escolha inválida! Digite uma opção válida');
        }
    }

    var lista = escolha == '1' ? listaPendente : listaConcluido;

    while (true) {
        var filtro = prompt(`Deseja filtrar as tarefas?
1- Sim
2- Não`);
        if (filtro == '1' || filtro == '2') {
            break;
        } else {
            console.log('Escolha inválida! Digite uma opção válida');
        }
    }

    if (filtro == '1') {
        var filtroPor = prompt(`1- Filtrar por prioridade
2- Filtrar por data de vencimento
Escolha o filtro desejado:`);
        
        switch(filtroPor) {
            case '1':
                var prioridade = prompt('Digite a prioridade desejada (por exemplo, 1 para alta, 2 para média, 3 para baixa):');
                lista = lista.filter(tarefa => tarefa.PRIORIDADE == prioridade);
                break;

            case '2':
                var dataVencimento = prompt('Digite a data de vencimento desejada no formato AAAA-MM-DD:');
                lista = lista.filter(tarefa => tarefa.VENCIMENTO == dataVencimento);
                break;

            default:
                console.log('Escolha inválida! Filtrando sem aplicar filtros.');
        }
    }

    while (true) {
        var criterio = prompt(`1- Data de VENCIMENTO
2- PRIORIDADE
3- Data de criação
Como você quer ordenar a lista?`);
        if (criterio == '1' || criterio == '2' || criterio == '3') {
            break;
        } else {
            console.log('Escolha inválida! Digite uma opção válida');
        }
    }

    switch(criterio) {
        case '1':
            lista.sort((a, b) => new Date(a.VENCIMENTO) - new Date(b.VENCIMENTO));
            break;

        case '2':
            lista.sort((a, b) => a.PRIORIDADE - b.PRIORIDADE);
            break;

        case '3':
            lista.sort((a, b) => {
                const dataA = a.CRIAÇÃO.split('/').reverse().join('');
                const dataB = b.CRIAÇÃO.split('/').reverse().join('');
                return dataA.localeCompare(dataB);
            });
            break;
    }

    console.table(lista);
}

function ResumoDasTarefas (){
    let TotalDeTarefas = listaConcluido.length + listaPendente.length
    let TotalDePendentes = listaPendente.length
    let TotalDeConcluidos = listaConcluido.length
    function TarefaMaisProximaDeVencer() {
        const agora = new Date();
        
        let tarefaMaisProxima = null;
        let menorDiferenca = Infinity;

        for (const tarefa of listaPendente) {
            const diferenca = tarefa.VENCIMENTO - agora;

            if (diferenca >= 0 && diferenca < menorDiferenca) {
                menorDiferenca = diferenca;
                tarefaMaisProxima = tarefa;
            }
        }
        
        if (tarefaMaisProxima) {
            console.log(`A tarefa mais próxima de vencer é: ${tarefaMaisProxima.TITULO}, com vencimento em ${tarefaMaisProxima.VENCIMENTO.toLocaleDateString('pt-BR')}`);
        } else {
            console.log('Não há tarefas pendentes.');
        }
    }
    console.log(`Existem ${TotalDeTarefas} registradas no gerenciador\n${TotalDePendentes} são tarefas pendentes\n${TotalDeConcluidos} são tarefas concluídas`)
    TarefaMaisProximaDeVencer();
}



function MarcarComoConcluido (){
    console.table(listaPendente)
    while (true){
        var id = parseInt(prompt('Digite o id da tarefa que você quer marcar como concluída:'))
        if (id >= 0 && id < listaPendente.length){
            break
        } else {console.log('Não tem tarefa com esse id, tente novamente!')}
    }
    
    let [tarefa] = listaPendente.splice(id, 1)
        listaConcluido.push(tarefa)
        console.log('Tarefa marcada como concluída!')
}

AdicionarNovaTarefa()
AdicionarNovaTarefa()
MarcarComoConcluido()
MarcarComoConcluido()
RemoverTarefaConcluida()
console.table(listaConcluido)