//Variables de entrada
let datosSimulacion=[];
let contador = 0

//definición de formatos
const formatoPesos = new Intl.NumberFormat('en-ES',{maximumSignificantDigits : 1});
const formatoUnidad = new Intl.NumberFormat();

//Validar entrada desde inputs y agregar al SesionStorage
const validarEntrada = () =>{
    let montoSim = document.getElementById("monto").value;
    let interesSim = document.getElementById("int").value;
    let periodosSin = document.getElementById("per").value;
    contador++

    montoSim = parseFloat(montoSim)
    interesSim = parseFloat(interesSim)
    periodosSin = parseFloat(periodosSin)

    montoSim = Number.isNaN(montoSim) ? 12000000 : montoSim;
    interesSim = Number.isNaN(interesSim) ? 0.02 : interesSim;
    periodosSin = Number.isNaN(periodosSin) ? 12 : periodosSin;//eliminadorCartEsp(periodosSin);

    sessionStorage.setItem(contador,JSON.stringify({contador, montoSim, interesSim, periodosSin}))
    //alert(JSON.stringify({contador, montoSim, interesSim, periodosSin}))

    // return {
    //     montoSim,
    //     interesSim,
    //     periodosSin
    // };
};

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

//Tabla anexo donde encontramos el resultado de la simulación
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
            //alert(valor +" " + vec[0])
            //valor = valor==vec[0] ? valor : formatoPesos.format(valor);
            let valortd = document.createTextNode(formatoUnidad.format(valor));
            textotd.appendChild(valortd);
            linea.appendChild(textotd);
        }
        tbody.appendChild(linea);
    }
    tabla.appendChild(tbody);
    document.body.appendChild(tabla);
    
};

//Mostramos interés total de la simulación y ejecutamos tablaBonita
const resultado = (vecInteres, vecSimulacion) =>{
    const intTotales = document.createElement("div");
    intTotales.setAttribute("id","intereses")
    const TotalInteres = vecInteres.reduce((partialsum, a) => partialsum + a, 0);
    intTotales.innerHTML = "Se va a pagar en intereses: "+formatoUnidad.format(TotalInteres);
    document.body.appendChild(intTotales);

    tablaBonita(vecSimulacion)
};

//Validación para no repetir código HTML desde el DOM
const noTablaDoble = (valor1, valor2) =>{
    const val = document.getElementById("tablaAmortizacion");
    const val2 = document.getElementById("intereses");


    if (val==null){
        resultado(valor1, valor2);
    }else{
        val.remove();
        val2.remove();
        resultado(valor1, valor2);
    };
};

//Ejecuta todo el programa para la simulación
const ejecutador = () =>{
    const {montoSim, interesSim, periodosSin } = pruebaGetSelect();
    const { interesesTotales, simulacionHtml } = simulacion(montoSim, periodosSin, interesSim);
    noTablaDoble(interesesTotales, simulacionHtml);
} ;

//La idea es que con estas simulaciones, el usuario pueda escoger cuál simulación quiere y hacer la simulación desde eso.
const traerSimulaciones = ()=>{
    // validarEntrada();
    let validacionFormSimu = document.getElementById("opcionesSimulaciones");
    const listadoSimulaciones = document.getElementById("listadoSimulaciones");
    const selectForm = document.createElement("select");
    selectForm.setAttribute("id","opcionesSimulaciones");
    
    for (let i =0;i<contador; i++){
         let simu = sessionStorage.getItem(i+1);
         let simuObj = JSON.parse(simu);
         simuObj = `Monto: ${simuObj.montoSim} <-> Interés: ${simuObj.interesSim} <-> Periodos: ${simuObj.periodosSin}`;
         const opcion = document.createElement("option");
         const texto = document.createTextNode(simuObj);
         opcion.appendChild(texto);
         selectForm.appendChild(opcion);
    };
    if (validacionFormSimu==null){
        listadoSimulaciones.appendChild(selectForm);
    }else{
        validacionFormSimu.remove();
        listadoSimulaciones.appendChild(selectForm);
    };
    
};

//Saca el nuevo objeto con el que trabajará la simulación
const pruebaGetSelect = () => {
    const val = document.getElementById("opcionesSimulaciones").selectedIndex;
    let simuSelect = sessionStorage.getItem(val+1);
    simuSelect = JSON.parse(simuSelect);
    const {montoSim, interesSim, periodosSin} = simuSelect;
    return {
        montoSim,
        interesSim,
        periodosSin
    };
};

//Guarda las simulaciones para que el usuario luego pueda elegir cuál quiere usuar
const guardarParamSimu = () => {
    validarEntrada();
    traerSimulaciones();
};

const subVal = document.getElementById("capturador");
subVal.addEventListener("click", guardarParamSimu);

const subBot = document.getElementById("validador");
subBot.addEventListener("click", ejecutador);



// const subPrueba = document.getElementById("getSelect");
// subPrueba.addEventListener("click", pruebaGetSelect);



    


