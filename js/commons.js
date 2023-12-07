
let data;
const url = 'https://resultados.mininterior.gob.ar/api/'
let selectFecha = document.getElementById('filtro-year');
let selectCargo = document.getElementById('filtro-cargo');
let selectDistrito = document.getElementById('filtro-distrito');
let selectSeccion = document.getElementById('filtro-seccion');

let anioEleccion;
let tipoRecuento = "1";
let tipoEleccion = "1";
let cargoEleccion;
let distritoEleccion;
let seccionEleccion;


async function periodos() {
    try {
        let response = await fetch(`${url}menu/periodos`);
        data = await response.json();
        let optionFecha;
        for (let i = 0; i < data.length; i++) {
            optionFecha = document.createElement('option');
            optionFecha.textContent = data[i];
            selectFecha.appendChild(optionFecha);
        }
    } catch (error) {
        console.error('Error en respuesta: ' + error);
    }
}
let c = false;
let z;
let x;
periodos();
let anioSeleccionado = false;

selectFecha.addEventListener('change', function() {
    // Borra las opciones anteriores de selectCargo y selectDistrito
    selectCargo.innerHTML = '<option disable selected hidden>Cargo</option>';
    selectDistrito.innerHTML = '<option disable selected hidden>Distrito</option><option>Seleccione un cargo</option>';
    selectSeccion.innerHTML = '<option disable selected hidden>Seccion</option><option>Seleccione un distrito</option>';
    z = true;
    
    
    anioEleccion = selectFecha.value;
    anioSeleccionado = true;

    // 1 PASO - 2 Generales - 3 Ballotage
    cargarOpciones(anioEleccion, 2);
});

selectCargo.addEventListener('change', function() {
    // Borra las opciones anteriores de selectDistrito
    selectDistrito.innerHTML = '<option disable selected hidden>Distrito</option>';
    selectSeccion.innerHTML = '<option disable selected hidden>Seccion</option><option>Seleccione un distrito</option>';
    x = true;
    z = false;
    anioEleccion = selectFecha.value;
    cargoEleccion = selectCargo.value;
    cargarOpciones(anioEleccion, 2, cargoEleccion);
    
    // 1 PASO - 2 Generales - 3 Ballotage
});

selectDistrito.addEventListener('change', function() {
    // Borra las opciones anteriores de selectDistrito
    selectSeccion.innerHTML = '<option disable selected hidden>Seccion</option><option>Seleccione un distrito</option>';
    
    x = false;
    anioEleccion = selectFecha.value;
    cargoEleccion = selectCargo.value;
    distritoEleccion = selectDistrito.value;
    
    // 1 PASO - 2 Generales - 3 Ballotage
    cargarOpciones(anioEleccion, 2, cargoEleccion, distritoEleccion);
});

selectSeccion.addEventListener('change', function() {
    
    const anioEleccion = selectFecha.value;
    const cargoEleccion = selectCargo.value;
    const distritoEleccion = selectDistrito.value;
    const seccionEleccion = selectSeccion.value;

    cargarOpciones(anioEleccion, 2, cargoEleccion, distritoEleccion, seccionEleccion)
});


let v = false;
Filtrar();



async function cargarOpciones(anioEleccion, idEleccion, cargoEleccion = null) {
    try {
        let response = await fetch(`${url}menu?año=${anioEleccion}`);
        let data = await response.json();
        for (let i = 0; i < data.length; i++) {

            
            if (data[i].Cargos && data[i].Cargos.length > 0 && data[i].IdEleccion === idEleccion) {
                
                for (let j = 0; j < data[i].Cargos.length; j++) {
                    
                    if(z == true){
                        let optionCargo = document.createElement('option');
                        optionCargo.innerText = data[i].Cargos[j].Cargo;
                        optionCargo.value = data[i].Cargos[j].IdCargo;
                        selectCargo.appendChild(optionCargo);
                    }
                    if (cargoEleccion && data[i].Cargos[j].IdCargo === cargoEleccion) {
                        
                        const distritos = data[i].Cargos[j].Distritos; //JSON
                        
                        for (let k = 0; k < distritos.length; k++) {
                            
                            if(x == true){
                                let optionDistrito = document.createElement('option');
                                optionDistrito.textContent = distritos[k].Distrito;//TOODS LOS DISTRITOS
                                optionDistrito.value = distritos[k].IdDistrito;
                                selectDistrito.appendChild(optionDistrito);
                                distritoEleccion = selectDistrito.value
                            }
                            v = true;
                            
                            if (distritoEleccion && distritos[k].IdDistrito == distritoEleccion){
                                const seccionesProvinciales = distritos[k].SeccionesProvinciales;
                                if (seccionesProvinciales && seccionesProvinciales.length > 0) {
                                    for (let l = 0; l < seccionesProvinciales.length; l++) {
                                        const secciones = seccionesProvinciales[l].Secciones;
                                        if (secciones && secciones.length > 0) {
                                            for (let m = 0; m < secciones.length; m++) {
                                                let optionSeccion = document.createElement('option');
                                                optionSeccion.textContent = secciones[m].Seccion || 'Sin especificar';
                                                optionSeccion.value = secciones[m].IdSeccion || 'sin-id';
                                                selectSeccion.appendChild(optionSeccion);
                                                seccionEleccion = selectSeccion.value
                                            }
                                        }
                                        console.log('CORTA')
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error en respuesta: ' + error);
        if (error instanceof Response) {
            console.error('Código de estado:', error.status);}
    }
}


async function Filtrar() {
    
    let buttonSeccion = document.getElementById('filtro-seccion').value;
    let buttonDistrito = document.getElementById('filtro-distrito').value;
    let buttonCargo = document.getElementById('filtro-cargo').value;
    
    if (!((buttonSeccion == 'Seleccione una Ciudad' || buttonSeccion == 'Seccion') || (buttonDistrito == 'Seleccione un cargo' || buttonDistrito == 'Distrito') || (buttonCargo == 'Seleccione un año' || buttonCargo == 'Cargo'))){
        try {
            if (v == true){
                console.log(anioEleccion);
                console.log(tipoRecuento);
                console.log(tipoEleccion);
                console.log(cargoEleccion);
                console.log(distritoEleccion);
                console.log(seccionEleccion);

                let titulo = document.getElementById('titulo-combo');
                titulo.innerHTML = `Elecciones ${anioEleccion} | Generales`;
                let path = document.getElementById('texto-path');
                path.innerHTML = `${anioEleccion} > GENERALES > ${textCargos[cargoEleccion]} > ${nameProvincias[distritoEleccion - 1].toUpperCase()}`
                
                let response = await fetch(`https://resultados.mininterior.gob.ar/api/resultados/getResultados?anioEleccion=${anioEleccion}&tipoRecuento=${tipoRecuento}&tipoEleccion=${tipoEleccion}&categoriaId=${cargoEleccion}&distritoId=${distritoEleccion}&seccionId=${seccionEleccion}`);
                let resultados = await response.json();

                //Nro Mesas Computadas
                let nroMesas = document.getElementById('mesas-computadas-info');
                nroMesas.innerText = resultados.estadoRecuento.mesasTotalizadas;
                
                //Nro Electores
                let nroElectores = document.getElementById('electores-info');
                nroElectores.innerText = resultados.estadoRecuento.cantidadElectores;

                //Nro Escrutinios
                let nroEscrutinios = document.getElementById('escrutinios-info');
                nroEscrutinios.innerText = resultados.estadoRecuento.participacionPorcentaje + '%';
                

                //Imagen de Cada Mapa
                let mapa = document.getElementById('mapas-img');
            
                let nombreProvincia = document.getElementById('tittle-provincia');
                

                for (let a = 0; a < parseInt(distritoEleccion); a++){

                    nombreProvincia.innerHTML = `<h4>${nameProvincias[a]}</h4>`
                    mapa.innerHTML = `<img src="${mapas[a]}" width="200" height="225">`;


                }

                let grid = document.getElementById('grid');
                let barraLateral = document.getElementById('barra-lateral')
                barraLateral.textContent = ''
                grid.innerHTML = ''
                let contador = 0
                let porsentajeOtros = 0

                // ordenar resultados de mayor a menor
                resultados.valoresTotalizadosPositivos.sort((a, b) => b.votosPorcentaje - a.votosPorcentaje);

                resultados.valoresTotalizadosPositivos.forEach(agrupacion => {
                    const componenteRojo = Math.floor(Math.random() * 256);
                    const componenteVerde = Math.floor(Math.random() * 256);
                    const componenteAzul = Math.floor(Math.random() * 256);
                    const colorHexadecimal = `rgb(${componenteRojo},${componenteVerde},${componenteAzul})`;
                    let elemento = document.createElement('div');
                    elemento.classList.add('bar');
                    elemento.style.backgroundColor = colorHexadecimal
                    elemento.style.setProperty('--bar-value',agrupacion.votosPorcentaje + '%');
                    elemento.dataset.name = agrupacion.nombreAgrupacion;
                    elemento.title = agrupacion.votosPorcentaje + '%';
                    grid.appendChild(elemento)
                    contador += 1
                    let hr = document.createElement('hr')
                    let br = document.createElement('br')
                    let divPadre = document.createElement('div')
                    let pNombreN1 = document.createElement('p')
                    pNombreN1.textContent = agrupacion.nombreAgrupacion
                    divPadre.appendChild(pNombreN1)
                    divPadre.appendChild(hr)

                    if (agrupacion.listas != undefined) {
                        agrupacion.listas.forEach( lista => {
                            
                            let divHijoMayor = document.createElement('div')
                            divHijoMayor.appendChild(br)
                            
                            let divHijoPP = document.createElement('div')
                            divHijoPP.classList.add('partidos-porcentaje')
                            
                            let divPartidos = document.createElement('div')
                            divPartidos.classList.add('partidos')
                            
                            let nombreLista = document.createElement('p')
                            nombreLista.textContent = lista.nombre
                            divPartidos.appendChild(nombreLista)
                            divHijoPP.appendChild(divPartidos)
                            let divPVotos = document.createElement('div')
                            divPVotos.classList.add('porcentaje-votos')
                            
                            let porsentajeLista = document.createElement('p')
                            let p = Number((lista.votos * 100 / agrupacion.votos).toFixed(2))
                            porsentajeLista.textContent = `${p}%`
                            divPVotos.appendChild(porsentajeLista)
                            
                            let votosLista = document.createElement('p')
                            votosLista.textContent = lista.votos
                            divPVotos.appendChild(votosLista)
                            divHijoPP.appendChild(divPVotos)
                            
                            divHijoMayor.appendChild(divHijoPP)
                            
                            let progress = document.createElement('div')
                            progress.classList.add('progress')
                            progress.style.backgroundColor = `rgba(${componenteRojo},${componenteVerde},${componenteAzul},0.500)`
                            
                            let progressBar = document.createElement('div')
                            progressBar.classList.add('progress-bar')
                            progressBar.style.backgroundColor = colorHexadecimal
                            progressBar.style.width = `${p}%`
                            let progressText = document.createElement('span')
                            progressText.classList.add('progress-bar-text')
                            progressText.textContent = `${p}%`
                            
                            progressBar.appendChild(progressText)
                            progress.appendChild(progressBar)
                            
                            divHijoMayor.appendChild(progress)
                            divPadre.appendChild(divHijoMayor)

                        });
                    }else{
                            let divHijoMayor = document.createElement('div')
                            divHijoMayor.appendChild(br)
                            
                            let divHijoPP = document.createElement('div')
                            divHijoPP.classList.add('partidos-porcentaje')
                            
                            let divPartidos = document.createElement('div')
                            divPartidos.classList.add('partidos')
                            
                            let nombreLista = document.createElement('p')
                            nombreLista.textContent = agrupacion.nombre
                            divPartidos.appendChild(nombreLista)
                            divHijoPP.appendChild(divPartidos)
                            let divPVotos = document.createElement('div')
                            divPVotos.classList.add('porcentaje-votos')
                            
                            let porsentajeLista = document.createElement('p')
                            let p = Number((agrupacion.votos * 100 / agrupacion.votos).toFixed(2))
                            porsentajeLista.textContent = `${p}%`
                            divPVotos.appendChild(porsentajeLista)
                            
                            let votosLista = document.createElement('p')
                            votosLista.textContent = agrupacion.votos
                            divPVotos.appendChild(votosLista)
                            divHijoPP.appendChild(divPVotos)
                            
                            divHijoMayor.appendChild(divHijoPP)
                            
                            let progress = document.createElement('div')
                            progress.classList.add('progress')
                            progress.style.backgroundColor = `rgba(${componenteRojo},${componenteVerde},${componenteAzul},0.500)`
                            
                            let progressBar = document.createElement('div')
                            progressBar.classList.add('progress-bar')
                            progressBar.style.backgroundColor = colorHexadecimal
                            progressBar.style.width = `${p}%`
                            let progressText = document.createElement('span')
                            progressText.classList.add('progress-bar-text')
                            progressText.textContent = `${p}%`
                            
                            progressBar.appendChild(progressText)
                            progress.appendChild(progressBar)
                            
                            divHijoMayor.appendChild(progress)
                            divPadre.appendChild(divHijoMayor)
                    }

                    barraLateral.appendChild(divPadre)

                });

                
            }
            
        } catch (error) {
            console.error('Error en respuesta: ' + error);
            if (error instanceof Response) {
                console.error('Código de estado:', error.status);
                console.error('Mensaje de estado:', error.statusText);
            }
        }
    }
    else{
        mostrarCuadros("verde");
    }
    
}

async function mostrarCuadros(color) {
    let mensajeClass;
    switch(color){
        case "rojo":
            mensajeClass = "msj-rojo";
        case "verde":
            mensajeClass = "msj-verde";

        default:
            mensajeClass = "msj-amarillo";

    }
    document.getElementById(mensajeClass).style.display = "block";

    setTimeout(() => {
        document.getElementById(mensajeClass).style.display = "none"}, "4000");
}














const nameProvincias = [
    'c.a.b.a',
    'buenos aires',
    'catamarca',
    'cordoba',
    'corrientes',
    'chaco',
    'chubut',
    'entre-rios',
    'formosa',
    'jujuy',
    'la pampa',
    'la rioja',
    'mendoza',
    'misiones',
    'neuquen',
    'rio negro',
    'salta',
    'san juan',
    'san luis',
    'santa cruz',
    'santa fe',
    'santiago del estero',
    'tucuman',
    'tierra del fuego',
]; 

const mapas = [
    '../img/mapas/caba.svg',
    '../img/mapas/buenos-aires.svg',
    '../img/mapas/catamarca.png',
    '../img/mapas/cordoba.png',
    '../img/mapas/corrientes.png',
    '../img/mapas/chaco.png',
    '../img/mapas/chubut.png',
    '../img/mapas/entre-rios.png',
    '../img/mapas/formosa.png',
    '../img/mapas/jujuy.png',
    '../img/mapas/la-pampa.png',
    '../img/mapas/la-rioja.png',
    '../img/mapas/mendoza.png',
    '../img/mapas/misiones.png',
    '../img/mapas/neuquen.png',
    '../img/mapas/rio-negro.png',
    '../img/mapas/salta.png',
    '../img/mapas/san-juan.png',
    '../img/mapas/san-luis.png',
    '../img/mapas/santa-cruz.png',
    '../img/mapas/santa-fe.png',
    '../img/mapas/santiago-del-estero.png',
    '../img/mapas/tucuman.png',
    '../img/mapas/tierra-del-fuego-antartida.png',
]; 

const textCargos = [
    'CARGOS',
    'PRESIDENTE/A',
    'SENADORES/AS NACIONALES',
    'DIPUTADOS/AS NACIONALES',
    'GOBERNADOR/A - JEFE/A DE GOBIERNO ',
    'SENADORES/AS PROVINCIALES',
    'DIPUTADOS/AS PROVINCIALES - DIPUTADOS/AS DE LA CIUDAD',
    'INTENDENTE/A',
    'PARLAMENTO MERCOSUR NACIONAL',
    'PARLAMENTO MERCOSUR REGIONAL',
    'CONCEJAL/A - MIEMBROS DE LA JUNTA',
]