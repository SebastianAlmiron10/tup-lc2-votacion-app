async function periodos() {
    try {
        let response = await fetch('https://resultados.mininterior.gob.ar/api/menu/periodos');
        data = await response.json();
        console.log(data);
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