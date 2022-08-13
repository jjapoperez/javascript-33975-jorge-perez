//Script para calcular amortizaciones

function ingresoDatos(){
    //Recolectar datos desde formulario
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
    let simulacionhtml = []
    //let per = 0
    //alert("<p>Datos iniciales \nMonto inicial: "+simu.monto+"\nTasa de interés: "+simu.interes+"\nCantidad de periodos: "+simu.periodo+"</p>");
    simulacionhtml.push("<p>Periodo\tIntereses\tAmortización\tCuota\tRestante</p>")
    simulacionhtml.push("<p>"+0+"\t"+interesperiodo+"\t"+valoramortizado+"\t"+cuotaactual+"\t"+simu.monto+"</p>")
    valoramortizado = valamort(simu.monto,simu.periodo)
    for (let i = 1; i <= simu.periodo; i++) {
        //const element = array[i];
        interesperiodo = interesper(monto0,simu.interes)
        cuotaactual = valoramortizado + interesperiodo
        monto0 = monto0 - valoramortizado
        interesestotales.push(interesperiodo)
        simulacionhtml.push("<p>"+i+"\t"+interesperiodo+"\t"+valoramortizado+"\t"+cuotaactual+"\t"+monto0+"</p>");
        //console.log("Periodo\tIntereses\tAmortización\tCuota\tRestante\n"+
        //console.log(i+"\t"+interesperiodo+"\t"+valoramortizado+"\t"+cuotaactual+"\t"+monto0);
        
    }

    let simutext = document.createElement("div")
    simutext.className = "tablasimu"
    simutext.innerHTML = simulacionhtml.join("\n")
    //alert(simulacionhtml.join("\n"));
    document.body.appendChild(simutext);

    let inttotales = document.createElement("div")
    inttotales.innerHTML = "Se va a pagar en intereses: "+interesestotales.reduce((partialsum, a) => partialsum + a, 0)
    document.body.appendChild(inttotales);

    //console.log("Se va a pagar en intereses: "+interesestotales.reduce((partialsum, a) => partialsum + a, 0))

};
