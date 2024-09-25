let listadefilmes = [{titulo: 'case', data: 27}, {titulo: 'kaio mourato', data: 27}, {titulo: 'widi', data: 27}]
let filme = prompt('nome: ')
function pesquisarTarefa (filme){
    let presente = false
    for(let i = 0; i < listadefilmes.length; i++){
        if (listadefilmes[i].titulo.includes(filme)){
            presente = true
            break
        }
    }
    if (presente === true){
        return console.log(`Há um filme presente na lista com o nome ${filme}!`)
    }
    else{
        return console.log(`Verifique a ortografia pois não há nenhum filme com o nome ${filme} na lista!`)
    }
}

pesquisarTarefa()
