//Script para calcular amortizaciones

//Declaración de variables con prompt
let monto = parseFloat(prompt("Ingresa tu monto total a prestar"))
let interes = parseFloat(prompt("Ingresa la tasa de interés acordada"))
let periodos = parseInt(prompt("Ingresa la cantidad de periodos acordados"))
//alert(monto) Validación de monto en vacio

//Validación o comprobación de vacios en el prompt
//Val para monto
if (Number.isNaN(monto)){
    monto = 12000000
    //alert(monto) prueba para verificar ciclo
}
//Val para intereses
if(Number.isNaN(interes)){
    interes=0.02
}
//Val para periodos
if(Number.isNaN(periodos)){
    periodos=12
}

//Funciones base
let interesper = (int,val) => val*int
let valamort = (val,per) => val/per
    //El periodo lo calcularemos con el ciclo

//Cálculos y resultados
    //datos iniciales
    //let monto0 = monto
    let interesperiodo = 0
    let valoramortizado = 0
    let cuotaactual = 0
    let interesestotales = []
    //let per = 0
    alert("         Datos iniciales \nMonto inicial: "+monto+"\nTasa de interés: "+interes+"\nCantidad de periodos: "+periodos)
    console.log("Periodo\tIntereses\tAmortización\tCuota\tRestante")
    console.log(0+"\t"+interesperiodo+"\t"+valoramortizado+"\t"+cuotaactual+"\t"+monto)
    valoramortizado = valamort(monto,periodos)
    for (let i = 1; i <= periodos; i++) {
        //const element = array[i];
        interesperiodo = interesper(monto,interes)
        cuotaactual = valoramortizado + interesperiodo
        monto = monto - valoramortizado
        interesestotales.push(interesperiodo)
        //console.log("Periodo\tIntereses\tAmortización\tCuota\tRestante\n"+
        console.log(i+"\t"+interesperiodo+"\t"+valoramortizado+"\t"+cuotaactual+"\t"+monto);
        
    }
    console.log("Se va a pagar en intereses: "+interesestotales.reduce((partialsum, a) => partialsum + a, 0))
