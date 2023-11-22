const e = [ '3', 'Noa,blue', 'Euge,red', 'Ki Na Ma,red' ]
main(e)
function main(arreglo) {
    let colors =[]
    let names = []
    let showNames = []
    adios =arreglo.filter((word => word.length > 2))


        for (let i = 0; i < adios.length; i++) {
            let L=adios[i].indexOf(',')
            let word = adios[i].slice(L+1)
            let wordTwo = adios[i].slice(0,L)
            names.push(wordTwo.toLowerCase())
            colors.push(word.toLowerCase())   

            showNames = names.map((palabra, index) => palabra.includes('na') ? index : -1)
            .filter(index => index !== -1);
            console.log(showNames.length)

            if(colors[i] === "red" ){
                console.log("Lo hicimos")
            }


        }
        console.log(names)

        showNames.forEach(element => {
            if(colors[element]=== "red"){
                console.log(names[element])
            }
        });
        

    console.log(showNames)


}



