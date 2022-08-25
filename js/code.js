//Script para calcular amortizaciones

//para esta entrega haré el evento con todo el código
//para la entrega 2 ya lo haré modular y el onclick solo va a tener los llamados de las funciones para ejecutar todo

let subBot = document.getElementById("capturador")
subBot.onclick= () =>{
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
    let interesPeriodo = 0
    let valorAmortizado = 0
    let cuotaActual = 0
    let interesesTotales = []
    let simulacionhtml = []
    //let per = 0
    //alert("<p>Datos iniciales \nMonto inicial: "+simu.monto+"\nTasa de interés: "+simu.interes+"\nCantidad de periodos: "+simu.periodo+"</p>");
    //simulacionhtml.push("<p>Periodo\tIntereses\tAmortización\tCuota\tRestante</p>")
    //simulacionhtml.push("<p>"+0+"\t"+interesperiodo+"\t"+valoramortizado+"\t"+cuotaactual+"\t"+simu.monto+"</p>")
    valorAmortizado = valamort(simu.monto,simu.periodo)
    for (let i = 1; i <= simu.periodo; i++) {
        //const element = array[i];
        interesPeriodo = interesper(monto0,simu.interes)
        cuotaActual = valorAmortizado + interesPeriodo
        monto0 = monto0 - valorAmortizado
        interesesTotales.push(interesPeriodo)
        simulacionhtml.push({itera: i, ip: interesPeriodo, va:valorAmortizado, ca:cuotaActual, m:monto0});
        //simulacionhtml.push("<p>"+i+"\t"+interesperiodo+"\t"+valoramortizado+"\t"+cuotaactual+"\t"+monto0+"</p>");
        //console.log("Periodo\tIntereses\tAmortización\tCuota\tRestante\n"+
        //console.log(i+"\t"+interesperiodo+"\t"+valoramortizado+"\t"+cuotaactual+"\t"+monto0);
        
    }

    // let simutext = document.createElement("div")
    // simutext.className = "tablasimu"
    // simutext.innerHTML = simulacionhtml.join("\n")
    // //alert(simulacionhtml.join("\n"));
    // document.body.appendChild(simutext);

    let formatoPesos = new Intl.NumberFormat('en-US',{
        style:'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    })

    //prueba para el anexo de tabla bonita
    
    let val = document.getElementById("tablaAmortizacion")

    if (val==null){
        let inttotales = document.createElement("div")
        inttotales.innerHTML = "Se va a pagar en intereses: "+formatoPesos.format(interesesTotales.reduce((partialsum, a) => partialsum + a, 0))
        document.body.appendChild(inttotales);

        let tabla = document.createElement("table")
        tabla.setAttribute("id","tablaAmortizacion")
        tabla.className='fl-table'
        let teca = document.createElement("thead")
        teca.innerHTML = "<tr><td>Periodo</td><td>Intereses</td><td>Amortización</td><td>Cuota Período</td><td>CuotaRestante</td></tr>"
        tabla.appendChild(teca)
        let tbody = document.createElement("tbody")
        
        //alert(Object.values(filastr))
        for (let it of simulacionhtml){
            let linea = document.createElement("tr")
            let vec = Object.values(it)
            // alert(vec)
            for (let valor of vec){
                //alert(Object.values(simulacionhtml[it]));
                //let filastr = Object.values(simulacionhtml[0])
                // alert("valor"+valor)
                let textotd = document.createElement("td")
                let valortd = document.createTextNode(valor)
                textotd.appendChild(valortd)
                // alert("texto"+textotd.innerHTML)
                linea.appendChild(textotd)
                // alert("linea"+linea.innerHTML);
            }
            tbody.appendChild(linea);
        }
        tabla.appendChild(tbody)
        document.body.appendChild(tabla);
    }
    

};
