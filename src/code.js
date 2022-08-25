//let montoSim, interesSim, periodosSin;
let datosSimulacion=[];
let contador = 0
const formatoPesos = new Intl.NumberFormat('en-US',{
    style:'currency',
    currency: 'USD',
    maximumFractionDigits: 1
});

const validarEntrada = () =>{
    let montoSim = document.getElementById("monto").value;
    let interesSim = document.getElementById("int").value;
    let periodosSin = document.getElementById("per").value;
    contador++

    montoSim = Number.isNaN(montoSim) ? montoSim : 12000000;
    interesSim = Number.isNaN(interesSim) ? interesSim: 0.02;
    periodosSin = Number.isNaN(periodosSin) ? periodosSin : 12;

    sessionStorage.setItem(contador,JSON.stringify({contador, montoSim, interesSim, periodosSin}))

    return {
        montoSim,
        interesSim,
        periodosSin
    };
};

//Creando el objeto
//let simu = {montoSim, interesSim, periodosSin};

//Funciones base
let interesper = (int,val) => val*int
let valamort = (val,per) => val/per

//funcion de la simulación e intereses totales
const simulacion = (monto, periodo, interes) =>{
    const valorAmortizado = valamort(monto,periodo);
    let interesPeriodo, cuotaActual;

    const interesesTotales = [];
    const simulacionHtml = [];

    for (let i = 1; i<=periodo; i++){
        interesPeriodo = interesper(monto, interes);
        cuotaActual = interesPeriodo + valorAmortizado;
        monto -= valorAmortizado;

        interesesTotales.push(interesPeriodo);
        simulacionHtml.push({intera: i, interesPeriodo, valorAmortizado, cuotaActual, monto});
    };

    return {
        interesesTotales,
        simulacionHtml
    };
};

//prueba para el anexo de tabla bonita
const tablaBonita = (vectorSimulacion) =>{
    const tabla = document.createElement("table");
    tabla.setAttribute("id","tablaAmortizacion");
    tabla.classList.add('fl-table');
    const teca = document.createElement("thead");
    teca.innerHTML =  `<tr>
                        <td>Periodo</td>
                        <td>Intereses</td>
                        <td>Amortización</td>
                        <td>Cuota Período</td>
                        <td>CuotaRestante</td>
                        </tr>`;
    tabla.appendChild(teca);
    const tbody = document.createElement("tbody");
    
    //alert(Object.values(filastr))
    for (it of vectorSimulacion){
        const linea = document.createElement("tr");
        let vec = Object.values(it);
        for (let valor of vec){
            const textotd = document.createElement("td");
            let valortd = document.createTextNode(valor);
            textotd.appendChild(valortd);
            linea.appendChild(textotd);
        }
        tbody.appendChild(linea);
    }
    tabla.appendChild(tbody);
    document.body.appendChild(tabla);
    
};

const resultado = (vecInteres, vecSimulacion) =>{
    const intTotales = document.createElement("div");
    const TotalInteres = vecInteres.reduce((partialsum, a) => partialsum + a, 0);
    intTotales.innerHTML = "Se va a pagar en intereses: "+formatoPesos.format(TotalInteres);
    document.body.appendChild(intTotales);

    tablaBonita(vecSimulacion)
};

const noTablaDoble = (valor1, valor2) =>{
    const val = document.getElementById("tablaAmortizacion");


    if (val==null){
        resultado(valor1, valor2)
    };
};

const ejecutador = () =>{
    const { montoSim, interesSim, periodosSin } = validarEntrada();
    const { interesesTotales, simulacionHtml } = simulacion(montoSim, periodosSin, interesSim);
    noTablaDoble(interesesTotales, simulacionHtml)
} ;

//La idea es que con estas simulaciones, el usuario pueda escoger cuál simulación quiere y hacer la simulación desde eso.
const traerSimulaciones = ()=>{
    validarEntrada();
    let validacionFormSimu = document.getElementById("opcionesSimulaciones");
    const listadoSimulaciones = document.getElementById("listadoSimulaciones");
    const selectForm = document.createElement("select");
    selectForm.setAttribute("id","opcionesSimulaciones")
    
    for (let i =0;i<contador; i++){
         let simu = sessionStorage.getItem(JSON.stringify(i+1));
        //  alert(simu);
         let simuObj = JSON.parse(simu);
        //  alert(simuObj);
         const opcion = document.createElement("option");
         const texto = document.createTextNode(simu);
         opcion.appendChild(texto);
         selectForm.appendChild(opcion);
    }
    if (validacionFormSimu==null){
        listadoSimulaciones.appendChild(selectForm);
    }else{
        validacionFormSimu.remove();
        listadoSimulaciones.appendChild(selectForm);
    }
    
}

const subVal = document.getElementById("capturador");
subVal.addEventListener("click", ()=>{traerSimulaciones()});

const subBot = document.getElementById("validador");
subBot.addEventListener("click", () =>{ejecutador()});




    


