let data;
const url = 'https://resultados.mininterior.gob.ar/api/'
let selectFecha = document.getElementById('filtro-year');
let selectCargo = document.getElementById('filtro-cargo');
let selectDistrito = document.getElementById('filtro-distrito');

let anioEleccion;
let tipoRecuento = "1";
let tipoEleccion = "1";
let cargoEleccion;
let distritoEleccion;

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

periodos();
let anioSeleccionado = false;

selectFecha.addEventListener('change', function() {
    // Borra las opciones anteriores de selectCargo y selectDistrito
    selectCargo.innerHTML = '<option disable selected hidden>Cargo</option>';
    selectDistrito.innerHTML = '<option disable selected hidden>Distrito</option><option>Seleccione un cargo</option>';
    
    anioEleccion = selectFecha.value;
    anioSeleccionado = true;

    // 1 PASO - 2 Generales - 3 Ballotage
    cargarOpciones(anioEleccion, 2);
});

selectCargo.addEventListener('change', function() {
    // Borra las opciones anteriores de selectDistrito
    selectDistrito.innerHTML = '<option disable selected hidden>Distrito</option>';
    
    anioEleccion = selectFecha.value;
    cargoEleccion = selectCargo.value;
    
    // 1 PASO - 2 Generales - 3 Ballotage
    cargarOpciones(anioEleccion, 2, cargoEleccion);
});

selectDistrito.addEventListener('change', function() {
    // Borra las opciones anteriores de selectDistrito
    
    anioEleccion = selectFecha.value;
    cargoEleccion = selectCargo.value;
    distritoEleccion = selectDistrito.value;
    
    // 1 PASO - 2 Generales - 3 Ballotage
    cargarOpciones(anioEleccion, 2, cargoEleccion, distritoEleccion);
});

let v = false;
Filtrar()

async function cargarOpciones(anioEleccion, idEleccion, cargoEleccion = null) {
    try {
        let response = await fetch(`${url}menu?año=${anioEleccion}`);
        let data = await response.json();
        
        for (let i = 0; i < data.length; i++) {
            
            if (data[i].Cargos && data[i].Cargos.length > 0 && data[i].IdEleccion === idEleccion) {
                
                for (let j = 0; j < data[i].Cargos.length; j++) {
                    
                    let optionCargo = document.createElement('option');
                    optionCargo.innerText = data[i].Cargos[j].Cargo;
                    optionCargo.value = data[i].Cargos[j].IdCargo;
                    selectCargo.appendChild(optionCargo);
                    
                    if (cargoEleccion && data[i].Cargos[j].IdCargo === cargoEleccion) {
                        
                        const distritos = data[i].Cargos[j].Distritos; //JSON
                        
                        for (let k = 0; k < distritos.length; k++) {
                            
                            let optionDistrito = document.createElement('option');
                            optionDistrito.textContent = distritos[k].Distrito;
                            optionDistrito.value = distritos[k].IdDistrito;//TOODS LOS DISTRITOS
                            selectDistrito.appendChild(optionDistrito);
                            distritoEleccion = selectDistrito.value
                            v = true;
                            
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
    
    try {
        if (v == true){
            console.log(anioEleccion)
            console.log(tipoRecuento)
            console.log(tipoEleccion)
            console.log(cargoEleccion)
            console.log(distritoEleccion)

            const url = 'https://resultados.mininterior.gob.ar/api/resultados/getResultados'
            let response = await fetch(`https://resultados.mininterior.gob.ar/api/resultados/getResultados?anioEleccion=${anioEleccion}&tipoRecuento=${tipoRecuento}&tipoEleccion=${tipoEleccion}&categoriaId=${cargoEleccion}&distritoId=${distritoEleccion}`);
            let resultados = await response.json();
        
            console.log(resultados)
        }

    } catch (error) {
        console.error('Error en respuesta: ' + error);
        if (error instanceof Response) {
            console.error('Código de estado:', error.status);
            console.error('Mensaje de estado:', error.statusText);
        }
    }
}