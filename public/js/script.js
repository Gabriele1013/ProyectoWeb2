

// Muestra y oculta el menú
document.getElementById("icon-menu").addEventListener("click", mostrar_menu);
function mostrar_menu() {
    document.getElementById("move-content").classList.toggle('move-container-all');
    document.getElementById("show-menu").classList.toggle('show-lateral');
}

//Buscador de contenido
document.getElementById("icon-search").addEventListener("click", mostrar_buscador);
document.getElementById("cover-ctn-search").addEventListener("click", ocultar_buscador);
let bars_search = document.getElementById("ctn-bars-search");
let cover_ctn_search = document.getElementById("cover-ctn-search");
let inputSearch = document.getElementById("inputSearch");
let box_search = document.getElementById("box-search");

// Function para mostrar el buscador
function mostrar_buscador() {
    bars_search.style.top = '80px';
    cover_ctn_search.style.display = "block";
    inputSearch.focus();
    if (inputSearch.value === "") {
        box_search.style.display = "none";
    }
}

// Function para ocultar el buscador
function ocultar_buscador() {
    bars_search.style.top = "-10px";
    cover_ctn_search.style.display = "none";
    inputSearch.value = "";
    box_search.style.display = "none";
}

// Creando filtrado de búsqueda
document.getElementById("inputSearch").addEventListener("keyup", buscador_interno);
function buscador_interno() {
    let filter = inputSearch.value.toUpperCase();
    let li = box_search.getElementsByTagName("li");
    for (let i = 0; i < li.length; i++) {
        let a = li[i].getElementsByTagName("a")[0];
        let textValue = a.textContent || a.innerText;
        if (textValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
            box_search.style.display = "block";
            if (inputSearch.value === "") {
                box_search.style.display = "none";
            }
        } else {
            li[i].style.display = "none";
        }
    }
}
