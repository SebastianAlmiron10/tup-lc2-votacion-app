const url = 'https://resultados.mininterior.gob.ar/api/';

let datosSessionStorage = sessionStorage.getItem("INFORMES");
let datosJSON = JSON.parse(datosSessionStorage);



function agregarHTML(){
    if (!(datosSessionStorage)){
        mostrarCuadros("amarillo");
        document.getElementById("msj-amarillo").innerHTML = '<i class="fa-solid fa-exclamation iconos"></i>No se Encuentran Informes Agregados';
    }else{
        var tablaInforme = document.getElementById("cuerpo-agrupaciones");
        let contAgrupacion = 0;
        datosJSON.forEach(elemento => {
            contAgrupacion += 1;
            let newElement = document.createElement("tr");
            newElement.classList.add("tr-body");
            newElement.id = `agrupacion-${contAgrupacion}`;
    
            
            newElement.innerHTML += `
            <td class="td-eleccion">
                <p class="texto-elecciones-chico">${nameProvincias[elemento[4]]}</p>
                <div>
                <img src="${mapas[elemento[4]]}" width="90" height="120">
                </div>  
            </td>
            <td  class="td-eleccion year-eleccion">
                <p class="texto-elecciones-chico">Elecciones ${elemento[0]} | Generales</p>
                <p class="texto-path-chico">${elemento[0]} > Generales > Provisorio > ${cargosPoliticos[elemento[3] - 1]} > ${nameProvincias[elemento[4]]}</p>
            </td>
            
            <td class="td-eleccion datos-generales">
                <div id="info-mesas-informe">

                    <div class="info-mesas-individual-informe" id="mesas-computadas">
                        <img src="../img/icons/urna.svg" alt="urna" width="50" height="70" class="imagen-informe">
                        <h4 class="h4-informe">Mesas computadas</h4>
                        <p class="p-informe">${elemento[6]}</p>
                    </div>
                    <div class="info-mesas-individual-informe" id="electores">
                        <img src="../img/icons/electores.svg" alt="electores" width="60" height="70" class="imagen-informe">
                        <h4 class="h4-informe">Electores</h4>
                        <p class="p-informe">${elemento[7]}</p>
                    </div>
                    <div class="info-mesas-individual-informe" id="escrutados">
                        <img src="../img/icons/part-escrutado.svg" alt="escrutinios" width="60" height="70" class="imagen-informe">
                        <h4 class="h4-informe">Participacion sobre escrutinios</h4>
                        <p class="p-informe">${elemento[8]}</p>
                    </div>
                </div>
            </td>
            <td class="td-eleccion datos-agrupacion">
                <table class="tabla-agrupacion">
                    <tbody id="agrupaciones-partidos-${contAgrupacion}">
                    </tbody>
                </table>
            </td>
            `;

            tablaInforme.appendChild(newElement);

            elemento[9].valoresTotalizadosPositivos.forEach(agrupacion => {
                var agrupacionHTML = document.getElementById(`agrupaciones-partidos-${contAgrupacion}`);
                agrupacionHTML.innerHTML += `
                    <tr class="tabla-agrupacion">
                        <td class="grupo">
                            <h5>${agrupacion.nombreAgrupacion}</h5>
                        </td>
                        <td class="numeros">
                          <p>${agrupacion.votosPorcentaje}%</p>
                          <p>${agrupacion.votos} votos</p>
                        </td>
                        <hr>
                    </tr>
                    
                    
                `;
                
            });



        });
    }
}







function mostrarCuadros(color) {
    let mensajeClass;
    switch(color){
        case "rojo":
            mensajeClass = "msj-rojo";
            break;
        case "verde":
            mensajeClass = "msj-verde";
            break;
        default:
            mensajeClass = "msj-amarillo";

    }
    document.getElementById(mensajeClass).style.display = "block";
    

    setTimeout(() => {
        document.getElementById(mensajeClass).style.display = "none"}, "5000");
}






const nameProvincias = ['C.A.B.A','Buenos Aires','Catamarca','Cordoba','Corrientes','Chaco','Chubut','Entre-Rios','Formosa','Jujuy','La Pampa','La Rioja','Mendoza','Misiones','Neuquen','Rio-Negro','Salta','San Juan','San Luis','Santa Cruz','Santa Fe','Santiago del Estero','Tucuman','Tierra del Fuego',]; 
const mapas = ['../img/mapas/caba.svg','../img/mapas/buenos-aires.svg','../img/mapas/catamarca.png','../img/mapas/cordoba.png','../img/mapas/corrientes.png','../img/mapas/chaco.png','../img/mapas/chubut.png','../img/mapas/entre-rios.png','../img/mapas/formosa.png','../img/mapas/jujuy.png','../img/mapas/la-pampa.png','../img/mapas/la-rioja.png','../img/mapas/mendoza.png','../img/mapas/misiones.png','../img/mapas/neuquen.png','../img/mapas/rio-negro.png','../img/mapas/salta.png','../img/mapas/san-juan.png','../img/mapas/san-luis.png','../img/mapas/santa-cruz.png','../img/mapas/santa-fe.png','../img/mapas/santiago-del-estero.png','../img/mapas/tucuman.png','../img/mapas/tierra-del-fuego.png',]; 
const cargosPoliticos = ["Presidente/a","Senadores/as Nacionales","Diputados/as Nacionales","Gobernador/a","Senadores/as Provinciales","Diputados/as Provinciales","Intendente/a","Parlamento MercoSur Nacional","Parlamento MercoSur Regional","Concejal/a"];
agregarHTML();
