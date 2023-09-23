function abrirMenu() {
    var menu = document.getElementById("menu-desplegable");
    
    if (menu.style.display === "flex") {
        menu.style.display = "none";
        console.log('cerrado')
    } else {
        menu.style.display = "flex";
        console.log('abierto')
    }
    }