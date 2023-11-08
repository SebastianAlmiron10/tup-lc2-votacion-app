let data;
let selectFecha = document.getElementById('filtro-year');
let selectCargo = document.getElementById('filtro-cargo');
let selectDistrito = document.getElementById('filtro-distrito');

let anioEleccion;
let tipoRecuento;
let tipoEleccion;
let cargoEleccion;
let distritoEleccion;

async function periodos() {
    try {
        let response = await fetch('https://resultados.mininterior.gob.ar/api/menu/periodos');
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

periodos();

let anioSeleccionado = false;

selectFecha.addEventListener('change', function() {
    // Borra las opciones anteriores de selectCargo y selectDistrito
    selectCargo.innerHTML = '';
    selectDistrito.innerHTML = '';
    
    const anioEleccion = selectFecha.value;
    anioSeleccionado = true;

    // 1 PASO - 2 Generales - 3 Ballotage
    cargarOpciones(anioEleccion, 2);
});

selectCargo.addEventListener('change', function() {
    // Borra las opciones anteriores de selectDistrito
    selectDistrito.innerHTML = '';
    
    const anioEleccion = selectFecha.value;
    const cargoEleccion = selectCargo.value;
    
    // 1 PASO - 2 Generales - 3 Ballotage
    cargarOpciones(anioEleccion, 2, cargoEleccion);
});

selectDistrito.addEventListener('change', function() {
    // Borra las opciones anteriores de selectDistrito
    
    const anioEleccion = selectFecha.value;
    const cargoEleccion = selectCargo.value;
    const distritoEleccion = selectDistrito.value;
    
    // 1 PASO - 2 Generales - 3 Ballotage
    cargarOpciones(anioEleccion, 2, cargoEleccion, distritoEleccion);
});


async function cargarOpciones(anioEleccion, idEleccion, cargoEleccion = null) {
    try {
        let response = await fetch(`https://resultados.mininterior.gob.ar/api/menu?año=${anioEleccion}`);
        let data = await response.json();
        
        for (let i = 0; i < data.length; i++) {
            
            if (data[i].Cargos && data[i].Cargos.length > 0 && data[i].IdEleccion === idEleccion) {
                
                for (let j = 0; j < data[i].Cargos.length; j++) {
                    
                    let optionCargo = document.createElement('option');
                    optionCargo.value = data[i].Cargos[j].Cargo;
                    optionCargo.textContent = data[i].Cargos[j].Cargo;
                    selectCargo.appendChild(optionCargo);
                    
                    if (cargoEleccion && data[i].Cargos[j].Cargo === cargoEleccion) {
                        
                        const distritos = data[i].Cargos[j].Distritos; //JSON
                        
                        for (let k = 0; k < distritos.length; k++) {
                            
                            let optionDistrito = document.createElement('option');
                            optionDistrito.value = distritos[k].Distrito;//TOODS LOS DISTRITOS
                            optionDistrito.textContent = distritos[k].Distrito;
                            selectDistrito.appendChild(optionDistrito);
                            distritoEleccion = selectDistrito.value
                            
                        }
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error en respuesta: ' + error);
    }
    Resultados(anioEleccion, tipoRecuento, tipoEleccion, cargoEleccion, distritoEleccion)
}

async function Resultados(anioEleccion, tipoRecuento, tipoEleccion, cargoEleccion, distritoEleccion){
    console.log(anioEleccion)
    console.log(distritoEleccion)
    console.log(cargoEleccion)
    console.log(tipoRecuento)
    console.log(tipoEleccion)
    try{
        const url =`https://resultados.mininterior.gob.ar/api/resultados/getResultados`+`?anioEleccion=${anioEleccion}&tipoRecuento=${tipoRecuento}&tipoEleccion=${tipoEleccion}`+`&categoriaId=${cargoEleccion}&distritoId=${distritoEleccion}`
        
        let response = await fetch(url);
        let resultados = await response.json();


        console.log(resultados)
    }catch (error){
        console.error('Error en respuesta: ' + error);
    }
}
