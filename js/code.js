//Script para calcular amortizaciones

//Declaración de variables con prompt
// let montosim = 0 //parseFloat(prompt("Ingresa tu monto total a prestar"))
// let interessim = 0 //parseFloat(prompt("Ingresa la tasa de interés acordada"))
// let periodossin = 0 //parseInt(prompt("Ingresa la cantidad de periodos acordados"))
//alert(monto) Validación de monto en vacio

//Recolectar datos desde formulario
function ingresoDatos(){
    let montosim = document.getElementById("monto").value
    let interessim = document.getElementById("int").value
    let periodossin = document.getElementById("per").value

    //Validación o comprobación de vacios en el prompt
//Val para monto
if (Number.isNaN(montosim)){
    montosim = 12000000
    //alert(monto) prueba para verificar ciclo
}
//Val para intereses
if(Number.isNaN(interessim)){
    interessim=0.02
}
//Val para periodos
if(Number.isNaN(periodossin)){
    periodossin=12
}

//Creando el objeto
let simu = {monto: montosim, interes: interessim, periodo:periodossin};

//Funciones base
let interesper = (int,val) => val*int
let valamort = (val,per) => val/per
    //El periodo lo calcularemos con el ciclo

//Cálculos y resultados
    //datos iniciales
    let monto0 = simu.monto
    let interesperiodo = 0
    let valoramortizado = 0
    let cuotaactual = 0
    let interesestotales = []
    //let per = 0
    alert("Datos iniciales \nMonto inicial: "+simu.monto+"\nTasa de interés: "+simu.interes+"\nCantidad de periodos: "+simu.periodo);
    console.log("Periodo\tIntereses\tAmortización\tCuota\tRestante")
    console.log(0+"\t"+interesperiodo+"\t"+valoramortizado+"\t"+cuotaactual+"\t"+simu.monto)
    valoramortizado = valamort(simu.monto,simu.periodo)
    for (let i = 1; i <= simu.periodo; i++) {
        //const element = array[i];
        interesperiodo = interesper(monto0,simu.interes)
        cuotaactual = valoramortizado + interesperiodo
        monto0 = monto0 - valoramortizado
        interesestotales.push(interesperiodo)
        //console.log("Periodo\tIntereses\tAmortización\tCuota\tRestante\n"+
        console.log(i+"\t"+interesperiodo+"\t"+valoramortizado+"\t"+cuotaactual+"\t"+monto0);
        
    }
    console.log("Se va a pagar en intereses: "+interesestotales.reduce((partialsum, a) => partialsum + a, 0))

};

// //Validación o comprobación de vacios en el prompt
// //Val para monto
// if (Number.isNaN(montosim)){
//     montosim = 12000000
//     //alert(monto) prueba para verificar ciclo
// }
// //Val para intereses
// if(Number.isNaN(interessim)){
//     interessim=0.02
// }
// //Val para periodos
// if(Number.isNaN(periodossin)){
//     periodossin=12
// }

// //Creando el objeto
// let simu = {monto: montosim, interes: interessim, periodo:periodossin};
// console.log(simu)

// //Funciones base
// let interesper = (int,val) => val*int
// let valamort = (val,per) => val/per
//     //El periodo lo calcularemos con el ciclo

// //Cálculos y resultados
//     //datos iniciales
//     //let monto0 = monto
//     let interesperiodo = 0
//     let valoramortizado = 0
//     let cuotaactual = 0
//     let interesestotales = []
//     //let per = 0
//     alert("Datos iniciales \nMonto inicial: "+simu.monto+"\nTasa de interés: "+simu.interes+"\nCantidad de periodos: "+simu.periodo);
//     console.log("Periodo\tIntereses\tAmortización\tCuota\tRestante")
//     console.log(0+"\t"+interesperiodo+"\t"+valoramortizado+"\t"+cuotaactual+"\t"+monto)
//     valoramortizado = valamort(monto,periodos)
//     for (let i = 1; i <= periodos; i++) {
//         //const element = array[i];
//         interesperiodo = interesper(monto,interes)
//         cuotaactual = valoramortizado + interesperiodo
//         monto = monto - valoramortizado
//         interesestotales.push(interesperiodo)
//         //console.log("Periodo\tIntereses\tAmortización\tCuota\tRestante\n"+
//         console.log(i+"\t"+interesperiodo+"\t"+valoramortizado+"\t"+cuotaactual+"\t"+monto);
        
//     }
//     console.log("Se va a pagar en intereses: "+interesestotales.reduce((partialsum, a) => partialsum + a, 0))
