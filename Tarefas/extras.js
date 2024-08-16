const listaConcluido = []
const listaPendente = []



function AdicionarNovaTarefa (){
    console.clear()
    console.log('>>>> ADICIONAR NOVA TAREFA')
    function datavenc() {
        let dataVencimentoStr
        let dataValida
        let dataVencimento
        while (!dataValida){
            dataVencimentoStr = prompt('Insira a data de VENCIMENTO da tarefa no formato dd/mm/aaaa: ')
            let [dia, mes, ano] = dataVencimentoStr.split('/').map(Number)
            if (isNaN(dia) || isNaN(mes) || isNaN(ano) || dia < 1 || dia > 31 || mes < 1 || mes > 12 || ano < 1900 ) {
                console.log('Data inválida. Certifique-se de inserir a data no formato dd/mm/aaaa.')
        } else{
            dataVencimento = new Date (ano, mes-1, dia)
            dataValida = true
        }
    }

        let diaFormatado = String(dataVencimento.getDate()).padStart(2, '0')
        let mesFormatado = String(dataVencimento.getMonth() + 1).padStart(2, '0')
        let anoFormatado = dataVencimento.getFullYear()
    
        return `${diaFormatado}/${mesFormatado}/${anoFormatado}`
    }  

    let novaTarefa = {
        TITULO: prompt('Insira o título da tarefa: '),  
        DESCRIÇÃO: prompt('Insira a descrição da tarefa: '),  
        VENCIMENTO: datavenc(),  
        PRIORIDADE: (() => {
            let prioridadeNumero = prompt('Insira a prioridade da tarefa (1 = BAIXA, 2 = MÉDIA, 3 = ALTA): ');
            let prioridadeTexto = '';
    
            switch(prioridadeNumero) {
                case '1':
                    prioridadeTexto = 'BAIXA';
                    break;
                case '2':
                    prioridadeTexto = 'MÉDIA';
                    break;
                case '3':
                    prioridadeTexto = 'ALTA';
                    break;
                default:
                    prioridadeTexto = 'Opção inválida. Usando padrão BAIXA'
                    prioridadeTexto = ''
            }
            return prioridadeTexto
        })(),
        CRIAÇÃO: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
    }
    listaPendente.push(novaTarefa)
    console.log('Tarefa adicionada com sucesso!')
    console.table(listaPendente)
}
function RemoverTarefaConcluida(){
    console.clear()
    console.log('>>>> REMOVER TAREFA CONCLUIDA')
    console.table(listaConcluido)
    let RemoverTarefa = prompt('Digite o título da tarefa que deseja remover: ')
    let indice = listaConcluido.findIndex(f => f.TITULO === RemoverTarefa)
    let confirme = parseInt(prompt(`Tem certeza que deseja remover ${RemoverTarefa}?
                            1 - SIM         2 - NÃO`))
    if (confirme == 1){
        if (indice !== -1){
            let TarefaRemovida = listaConcluido.splice(indice, 1)
            console.log('Tarefa removida:', TarefaRemovida[0])
            console.log('Lista atualizada:')
            console.table(listaConcluido)
        } else {
            console.log('Tarefa não encontrada')
        }
    } else if (confirme == 2){
        console.log('Operação de REMOÇÃO CANCELADA')
    } else {
        console.log('Não conseguimos identificar a sua escolha :(')
    }
    console.clear()
}
function RemoverTarefaPendente(){
    console.clear()
    console.log('>>>> REMOVER TAREFA PENDENTE')
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
            console.log('Lista atualizada:')
            console.table(listaPendente)
        } else {
            console.log('Tarefa não encontrada')
        }
    } else if (confirme == 2){
        console.log('Operação de REMOÇÃO CANCELADA')
    } else {
        console.log('Não conseguimos identificar a sua escolha :(')
    }
    console.clear()
}
function PesquisarTarefa() {
    console.clear()
    console.log('>>>> PESQUISAR TAREFA')
    let tarefaPesquisada = prompt('Digite o TITULO ou a DESCRIÇÃO da tarefa que está procurando: ')
    let presenteConcluido = false
    let presentePendente = false
    
    
    for (let i = 0; i < listaConcluido.length; i++) {
        if (listaConcluido[i].TITULO.includes(tarefaPesquisada) || listaConcluido[i].DESCRIÇÃO.includes(tarefaPesquisada)) {
            presenteConcluido = true
            break
        }
    }

    if (!presenteConcluido) {
        for (let k = 0; k < listaPendente.length; k++) {
            if (listaPendente[k].TITULO.includes(tarefaPesquisada) || listaPendente[k].DESCRIÇÃO.includes(tarefaPesquisada)) {
                presentePendente = true
                break
            }
        }
    }

    if (presenteConcluido) {
        console.log(`A tarefa foi encontrada na lista de concluídas!`)
        console.table(listaConcluido)
    } else if (presentePendente) {
        console.log(`A tarefa foi encontrada na lista de pendentes!`)
        console.table(listaPendente)
    } else {
        console.log(`NÃO HÁ TAREFAS COM ESSAS CARACTERÍSTICAS! Verifique a ortografia e tente novamente.`)
    }
    console.clear()
}
function ListarTarefas() {
    console.clear();
    let escolha;
    let filtro;
    let filtroPor;
    let prioridade;
    let dataVencimento;
    let criterio;
    let listaFiltrada;

    while (true) {
        console.log('>>>> LISTAR TAREFAS');
        escolha = parseInt(prompt(`1- Lista de pendentes
2- Lista de concluídas
Qual você deseja ver?`));
        if (escolha === 1 || escolha === 2) {
            break;
        } else {
            console.clear();
            console.log('Escolha inválida! Digite uma opção válida');
        }
    }

    let lista = escolha === 1 ? listaPendente : listaConcluido;

    listaFiltrada = [...lista]

    while (true) {
        console.clear();
        filtro = parseInt(prompt(`1- Sim
2- Não
Deseja filtrar as tarefas?`));
        if (filtro === 1 || filtro === 2) {
            break;
        } else {
            console.clear();
            console.log('Escolha inválida! Digite uma opção válida');
        }
    }

    if (filtro === 1) {
        console.clear();
        filtroPor = prompt(`1- Filtrar por prioridade
2- Filtrar por data de vencimento
Escolha o filtro desejado:`);
        
        switch (filtroPor) {
            case '1':
                console.clear();
                prioridade = prompt('Digite a prioridade desejada (por exemplo, 1 para alta, 2 para média, 3 para baixa):');
                listaFiltrada = listaFiltrada.filter(tarefa => {
                    switch (prioridade) {
                        case '1': return tarefa.PRIORIDADE === 'ALTA';
                        case '2': return tarefa.PRIORIDADE === 'MÉDIA';
                        case '3': return tarefa.PRIORIDADE === 'BAIXA';
                        default: return false;
                    }
                });
                break;

            case '2':
                console.clear();
                dataVencimento = prompt('Digite a data de vencimento desejada no formato AAAA-MM-DD:');
                listaFiltrada = listaFiltrada.filter(tarefa => tarefa.VENCIMENTO === dataVencimento);
                break;

            default:
                console.clear();
                console.log('Escolha inválida! Filtrando sem aplicar filtros.');
        }
    }

    while (true) {
        console.clear();
        criterio = prompt(`1- Data de VENCIMENTO
2- PRIORIDADE
3- Data de criação
Como você quer ordenar a lista?`);
        if (criterio === '1' || criterio === '2' || criterio === '3') {
            break;
        } else {
            console.clear();
            console.log('Escolha inválida! Digite uma opção válida');
        }
    }

    switch (criterio) {
        case '1':
            console.clear();
            listaFiltrada.sort((a, b) => new Date(a.VENCIMENTO) - new Date(b.VENCIMENTO));
            break;

        case '2':
            console.clear();
            listaFiltrada.sort((a, b) => a.PRIORIDADE - b.PRIORIDADE);
            break;

        case '3':
            console.clear();
            listaFiltrada.sort((a, b) => {
                const dataA = a.CRIAÇÃO.split('/').reverse().join('');
                const dataB = b.CRIAÇÃO.split('/').reverse().join('');
                return dataA.localeCompare(dataB);
            });
            break;
    }

    console.clear();
    console.table(listaFiltrada);
}

function ResumoDasTarefas() {
    console.clear();
    console.log('>>>> RESUMO DAS TAREFAS');

    // Correção do cálculo dos totais
    let TotalDeTarefas = listaConcluido.length + listaPendente.length;
    let TotalDePendentes = listaPendente.length;
    let TotalDeConcluidos = listaConcluido.length;

    function TarefaMaisProximaDeVencer() {
        const agora = new Date();
        
        let tarefaMaisProxima = null;
        let menorDiferenca = Infinity;

        for (const tarefa of listaPendente) {
            const dataVencimento = new Date(tarefa.VENCIMENTO);
            const diferenca = dataVencimento - agora;

            if (diferenca >= 0 && diferenca < menorDiferenca) {
                menorDiferenca = diferenca;
                tarefaMaisProxima = tarefa;
            }
        }
        
        if (tarefaMaisProxima) {
            console.log(`A tarefa mais próxima de vencer é: ${tarefaMaisProxima.TITULO}, com vencimento em ${new Date(tarefaMaisProxima.VENCIMENTO).toLocaleDateString('pt-BR')}`);
        } else {
            console.log('Não há tarefas pendentes.');
        }
    }

    console.log(`Existem ${TotalDeTarefas} registradas no gerenciador\n${TotalDePendentes} são tarefas pendentes\n${TotalDeConcluidos} são tarefas concluídas`);
    TarefaMaisProximaDeVencer();
}

function MarcarComoConcluido (){
    console.clear()
    console.log('>>>> MARCAR TAREFA COMO CONLUÍDA')
    console.table(listaPendente)
    let id
    while (true){
        id = parseInt(prompt('Digite o id da tarefa que você quer marcar como concluída:'))
        if (id >= 0 && id < listaPendente.length){
            break
        } else {console.log('Não tem tarefa com esse id, tente novamente!')}
    }
    
    let [tarefa] = listaPendente.splice(id, 1)
        listaConcluido.push(tarefa)
        console.log('Tarefa marcada como concluída!')
    console.clear()
}
function EditarTarefas () {
    console.clear()
    console.log('>>>> EDITAR TAREFA')
    console.table(listaPendente)
    while (true){
    var idtarefaeditar = parseInt(prompt('Qual o ID da tarefa que você quer editar? '))
    if (idtarefaeditar >= 0 && idtarefaeditar <= listaPendente.length-1){
        break
    } else{
        console.log('ID DE TAREFA NÃO ENCONTRADO!\nTENTE NOVAMENTE!')
    }
    }

    let continuareditando = true
    while (continuareditando){
        const propriedade = prompt(`1- Titulo
2- Descrição
3- Data de vencimento
4- Prioridade
Qual propriedade você deseja editar? `)

        switch(propriedade){
            case '1':
                listaPendente[idtarefaeditar].TITULO = prompt('Digite o novo titulo: ')
                break;
            case '2':
                listaPendente[idtarefaeditar].DESCRIÇÃO = prompt('Digite a nova descrição: ')
                break;
            case '3':
                let dataVencimentoStr = prompt('Insira a data de VENCIMENTO da tarefa no formato dd/mm/aaaa: ');

    let [dia, mes, ano] = dataVencimentoStr.split('/').map(Number);
    if (isNaN(dia) || isNaN(mes) || isNaN(ano) || dia < 1 || dia > 31 || mes < 1 || mes > 12 || ano < 1900) {
        console.log('Data inválida. Certifique-se de inserir a data no formato dd/mm/aaaa.')
        return;
    }
                listaPendente[idtarefaeditar].VENCIMENTO = new Date(ano, mes - 1, dia)
                break;
            
            case '4':
                let prioridade = parseInt(prompt('Defina o grau de PRIORIDADE da tarefa (1 = Baixa, 2 = Média, 3 = Alta): '));

                if (prioridade === 1) {
                    listaPendente[idtarefaeditar].PRIORIDADE = 'BAIXA'
                } else if (prioridade === 2) {
                    listaPendente[idtarefaeditar].PRIORIDADE = 'MÉDIA'
                } else if (prioridade === 3) {
                    listaPendente[idtarefaeditar].PRIORIDADE = 'ALTA'
                } else {
                    console.log('Prioridade inválida. Por favor, escolha entre 1, 2 ou 3.')
                    continue;
                }
                break;
                default:
                    console.log('Escolha inválida!')
                    continue;
    }
    while(true){
        let opcao = parseInt(prompt(`1- SIM
2- NÃO
Você deseja continuar editando? `))
            if (opcao == 2 ){
                continuareditando = false
                break
            } else if(opcao == 1) {
                break
            }else if (opcao !== 1 && opcao !== 2){
                console.log('Opção inválida!')
            }
        }
    
}console.clear()
}

export {EditarTarefas, MarcarComoConcluido, ResumoDasTarefas, ListarTarefas, PesquisarTarefa, RemoverTarefaConcluida, RemoverTarefaPendente, AdicionarNovaTarefa};