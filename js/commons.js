let tipoEleccion;
let eleccion;
let pgTexto;

setTimeout(() => {
    let pg = document.querySelector('.botones-paso-generales');

    pgTexto = pg ? (pg.textContent || pg.innerText).trim() : null;
    
    if (pgTexto === 'GENERALES') {
        tipoEleccion = 1;
        eleccion = 'PASOS'
    } else if (pgTexto === 'PASOS') {
        tipoEleccion = 2;
        eleccion = 'GENERALES'
    }
    
},2000);

let data;
const url = 'https://resultados.mininterior.gob.ar/api/'
let selectFecha = document.getElementById('filtro-year');
let selectCargo = document.getElementById('filtro-cargo');
let selectDistrito = document.getElementById('filtro-distrito');
let selectSeccion = document.getElementById('filtro-seccion');
let tapar = document.getElementById('tapar');
let fld = document.getElementById('FLD');
let gif = document.getElementById('gif');
gif.style.display = 'none'

let anioEleccion;
let tipoRecuento = "1";
let cargoEleccion;
let distritoEleccion;
let seccionEleccion;
let textoSeccionEleccion;
let textoDistritoEleccion;
let textoCargoEleccion;

let s;

async function periodos() {
    try {
        let response = await fetch(`${url}menu/periodos`);
        data = await response.json();
        
        // Reemplazar el bucle for con forEach
        data.forEach(item => {
            let optionFecha = document.createElement('option');
            optionFecha.textContent = item;
            selectFecha.appendChild(optionFecha);
        });
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
    selectCargo.innerHTML = '<option disabled selected hidden>Cargo</option>';
    selectDistrito.innerHTML = '<option disabled selected hidden>Distrito</option><option disabled>Seleccione un cargo</option>';
    selectSeccion.innerHTML = '<option disabled selected hidden>Seccion</option>';
    z = true;
    
    
    anioEleccion = selectFecha.value;
    anioSeleccionado = true;
    
    // 1 PASO - 2 Generales - 3 Ballotage
    cargarOpciones(anioEleccion, 2);
});

// Modificar el evento change de selectCargo
selectCargo.addEventListener('change', async function() {
    // Obtener la opción seleccionada
    let selectedOption = selectCargo.options[selectCargo.selectedIndex];
    
    // Obtener el valor (ID) y el texto de la opción seleccionada
    cargoEleccion = selectedOption.value;
    textoCargoEleccion = selectedOption.textContent;
    
    // Utilizar las variables según sea necesario
    console.log('ID del cargo seleccionado:', cargoEleccion);
    console.log('Texto del cargo seleccionado:', textoCargoEleccion);
    
    // Borra las opciones anteriores de selectDistrito y selectSeccion
    selectDistrito.innerHTML = '<option disabled selected hidden>Distrito</option>';
    selectSeccion.innerHTML = '<option disabled selected hidden>Seccion</option>';
    x = true;
    z = false;
    anioEleccion = selectFecha.value;
    
    // Llamar a la función cargarOpciones con las variables actualizadas
    await cargarOpciones(anioEleccion, 2, cargoEleccion);
    
    // Resto del código después de cargarOpciones (si es necesario)
});



selectDistrito.addEventListener('change', async function() {
    // Obtener la opción seleccionada
    let selectedOption = selectDistrito.options[selectDistrito.selectedIndex];
    
    // Obtener el valor (ID) y el texto de la opción seleccionada
    distritoEleccion = selectedOption.value;
    textoDistritoEleccion = selectedOption.textContent;
    
    // Utilizar las variables según sea necesario
    console.log('ID del distrito seleccionado:', distritoEleccion);
    console.log('Texto del distrito seleccionado:', textoDistritoEleccion);
    
    // Limpiar las opciones anteriores de selectSeccion
    selectSeccion.innerHTML = '<option disabled selected hidden>Seccion</option>';
    
    // Llamar a la función cargarOpciones con las variables actualizadas
    const anioEleccion = selectFecha.value;
    const cargoEleccion = selectCargo.value;
    
    seccionEleccion = undefined
    
    // Esperar a que la función cargarOpciones termine antes de continuar
    await cargarOpciones(anioEleccion, 2, cargoEleccion, distritoEleccion);
    
    // Resto del código después de cargarOpciones (si es necesario)
});



selectSeccion.addEventListener('change', function() {
    // Obtener la opción seleccionada
    let selectedOption = selectSeccion.options[selectSeccion.selectedIndex];
    
    // Obtener el valor (ID) y el texto de la opción seleccionada
    seccionEleccion = selectedOption.value;
    textoSeccionEleccion = selectedOption.textContent;
    
    // Utilizar las variables según sea necesario
    console.log('ID de la sección seleccionada:', seccionEleccion);
    console.log('Texto de la sección seleccionada:', textoSeccionEleccion);

    // Llamar a la función cargarOpciones con las variables actualizadas
    const anioEleccion = selectFecha.value;
    const cargoEleccion = selectCargo.value;
    const distritoEleccion = selectDistrito.value;
    
    cargarOpciones(anioEleccion, 2, cargoEleccion, distritoEleccion, seccionEleccion);
});

let v = false;



async function cargarOpciones(anioEleccion, idEleccion, cargoEleccion = null) {
    try {
        
        console.log(pgTexto)
        tapar.style.display = 'flex'
        fld.style.display = 'block'
        gif.style.display = 'none'
        const seccionSeleccionada = selectSeccion.value;
        
        let response = await fetch(`${url}menu?año=${anioEleccion}`);
        let data = await response.json();
        
        selectSeccion.innerHTML = '<option disabled selected hidden>Seccion</option><option disabled>Seleccione un distrito</option>';
        
        
        // Reemplazar el bucle for con forEach
        data.forEach(item => {
            if (item.Cargos && item.Cargos.length > 0 && item.IdEleccion === idEleccion) {
                
                // Reemplazar el bucle for con forEach
                item.Cargos.forEach(cargo => {
                    if (z == true) {
                        let optionCargo = document.createElement('option');
                        optionCargo.innerText = cargo.Cargo;
                        optionCargo.value = cargo.IdCargo;
                        selectCargo.appendChild(optionCargo);
                    }
                    if (cargoEleccion && cargo.IdCargo === cargoEleccion) {

                        const distritos = cargo.Distritos; //JSON

                        // Reemplazar el bucle for con forEach
                        distritos.forEach(distrito => {
                            if (x == true) {
                                let optionDistrito = document.createElement('option');
                                optionDistrito.textContent = distrito.Distrito; //TOODS LOS DISTRITOS
                                optionDistrito.value = distrito.IdDistrito;
                                selectDistrito.appendChild(optionDistrito);
                                distritoEleccion = selectDistrito.value;
                            }
                            v = true;

                            if (distritoEleccion && distrito.IdDistrito == distritoEleccion) {
                                const seccionesProvinciales = distrito.SeccionesProvinciales;
                                if (seccionesProvinciales && seccionesProvinciales.length > 0) {

                                    // Reemplazar el bucle for con forEach
                                    seccionesProvinciales.forEach(seccionProvincial => {
                                        const secciones = seccionProvincial.Secciones;
                                        if (secciones && secciones.length > 0) {
                                            selectSeccion.innerHTML = '<option disabled selected hidden>Seccion</option>'
                                            // Reemplazar el bucle for con forEach
                                            secciones.forEach(seccion => {
                                                let optionSeccion = document.createElement('option');
                                                optionSeccion.textContent = seccion.Seccion || 'Sin especificar';
                                                optionSeccion.value = seccion.IdSeccion || 'sin-id';
                                                selectSeccion.appendChild(optionSeccion);
                                            });
                                        }
                                        console.log('CORTA');
                                    });
                                }
                            }
                        });
                    }
                });
            }
        });
        selectSeccion.value = seccionSeleccionada;
    } catch (error) {
        console.error('Error en respuesta: ' + error);
        if (error instanceof Response) {
            console.error('Código de estado:', error.status);
        }
    }
}


async function Filtrar() {
    
    if (!(anioEleccion == undefined || cargoEleccion == undefined || distritoEleccion == undefined || seccionEleccion == undefined)){
        console.log(    'IF '   )
        gif.style.display = 'block'
        fld.style.display = 'none'
        setTimeout(() => {
            console.log(    'SETTIME'    )
            tapar.style.display = 'none'
        }, 1000)
        try {
            console.log(    'TRY '   )
            if (v == true){
                console.log(anioEleccion);
                console.log(tipoRecuento);
                console.log(tipoEleccion);
                console.log(cargoEleccion);
                console.log(distritoEleccion);
                console.log(seccionEleccion);

                let titulo = document.getElementById('titulo-combo');
                titulo.innerHTML = `Elecciones ${anioEleccion} | ${tipoEleccion == 2 ? eleccion.charAt(0).toUpperCase() + eleccion.slice(1).toLowerCase() : eleccion}`;
                
                let path = document.getElementById('texto-path');
                path.innerHTML = `${anioEleccion} > ${eleccion} > ${textoCargoEleccion} > ${textoDistritoEleccion.toUpperCase()} > ${textoSeccionEleccion.toUpperCase()}`
                
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

                    nombreProvincia.innerHTML = `<h4>${textoDistritoEleccion}</h4>`
                    mapa.innerHTML = `<img src="${mapas[a]}" width="200" height="225">`;


                }

                let grid = document.getElementById('grid');
                let barraLateral = document.getElementById('barra-lateral')
                barraLateral.textContent = ''
                grid.innerHTML = ''
                let contador = 0

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
        console.log(    'ELSE '   )
        mostrarCuadros("verde");
        tapar.style.display = 'flex'
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
        document.getElementById(mensajeClass).style.display = "none"}, "3000");
}





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