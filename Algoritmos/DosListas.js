e = [ '1,2,3/3,2,1' ]
main(e)
function main(arreglo) {
    let Showlist =[]
    let listOne = []
    let listTwo = []
    arreglo = arreglo[0].split(',')
    let newArreglo = arreglo.findIndex(elemento => elemento.includes('/'))
    console.log(newArreglo)

    for (let i = 0; i < arreglo.length; i++) {
        if(i >= newArreglo){
            listOne.push(arreglo[i])
        }else{
            listTwo.push(arreglo[i])
        }
    }
    let NumberOne = listOne[0].slice(2)
    let NumberTwo = listOne[0].slice(2,3)

    listOne[0]=NumberOne
    listTwo.unshift(NumberTwo)
    for (let i = 0; i < listOne.length; i++) {
        Showlist[i] = parseInt(listOne[i]) + parseInt(listTwo[i])
    }
    console.log(Showlist)
    


    
        

}