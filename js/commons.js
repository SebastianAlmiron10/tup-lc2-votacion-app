let data;
let selectFecha = document.getElementById('filtro-year');
let selectCargo = document.getElementById('filtro-cargo');
let selectDistrito = document.getElementById('filtro-distrito');

async function periodos() {
    try {
        let response = await fetch('https://resultados.mininterior.gob.ar/api/menu/periodos');
        data = await response.json();
        let optionFecha;
        for (let i = 0; i < data.length; i++) {
            console.log(data[i]);
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
                        const distritos = data[i].Cargos[j].Distritos;
                        for (let k = 0; k < distritos.length; k++) {
                            let optionDistrito = document.createElement('option');
                            optionDistrito.value = distritos[k].Distrito;
                            optionDistrito.textContent = distritos[k].Distrito;
                            selectDistrito.appendChild(optionDistrito);
                        }
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error en respuesta: ' + error);
    }
}
