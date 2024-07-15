function switchForm(formType) {
    if (formType === 'login') {
        document.getElementById('loginContainer').style.display = 'block';
        document.querySelector('.container').style.display = 'none';
    } else if (formType === 'register') {
        document.getElementById('loginContainer').style.display = 'none';
        document.querySelector('.container').style.display = 'block';
    }
}

function registerUser() {
    let fullName = document.getElementById('fullName').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    let career = document.getElementById('career').value;
    let graduationYear = document.getElementById('graduationYear').value;

    // Eliminar mensajes de aviso anteriores
    document.querySelectorAll('.error-message').forEach(element => element.remove());

    if (fullName.trim() === '') {
        document.getElementById('fullName').insertAdjacentHTML('afterend', '<p class="small error-message">Debe ingresar un nombre.</p>');
    } else if (!fullName.match(/^[a-zA-Z\s]*$/)) {
        document.getElementById('fullName').insertAdjacentHTML('afterend', '<p class="small error-message">Ingrese un nombre válido.</p>');
    } else if (!email.includes('@')) {
        document.getElementById('email').insertAdjacentHTML('afterend', '<p class="small error-message">El correo debe contener "@".</p>');
    } else if (password.length < 8 || password.length > 26 || !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,26}$/)) {
        document.getElementById('password').insertAdjacentHTML('afterend', '<p class="small error-message">La contraseña debe tener entre 8 y 26 caracteres, incluir al menos una letra mayúscula, un número y un carácter especial.</p>');
    } else if (confirmPassword !== password) {
        document.getElementById('confirmPassword').insertAdjacentHTML('afterend', '<p class="small error-message">Las contraseñas no coinciden.</p>');
    } else if (graduationYear < 2010) {
        document.getElementById('graduationYear').insertAdjacentHTML('afterend', '<p class="small error-message">El año de graduación no puede ser anterior a 2010.</p>');
    } else if (career === '') {
        document.getElementById('career').insertAdjacentHTML('afterend', '<p class="small error-message">Por favor, elija una carrera.</p>');
    } else {
        // Simulación de registro exitoso
        alert('¡Usuario registrado exitosamente!');

        // Redirigir a la sección de Logueo
        switchForm('login');

        // Guardar datos en localStorage
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);
    localStorage.setItem('fullName', fullName);
    localStorage.setItem('userCareer', career);
    localStorage.setItem('userGraduationYear', graduationYear);

    }
}

function loginUser() {
    let email = document.getElementById('correo').value;
    let password = document.getElementById('contrasena').value;

    // Recuperar datos del usuario de localStorage
    let storedEmail = localStorage.getItem('userEmail');
    let storedPassword = localStorage.getItem('userPassword');

    if (email === storedEmail && password === storedPassword) {
        // Redirigir a menu.html si las credenciales son correctas
        window.location.href = "menu.html";
    } else {
        // Mostrar mensaje de error si las credenciales son incorrectas
        alert('Correo electrónico o contraseña incorrectos. Por favor, inténtalo de nuevo.');
    }
}

document.getElementById("icon-menu").addEventListener("click", mostrar_menu);

function mostrar_menu(){
    document.getElementById("move-content").classList.toggle('move-container-all')
    document.getElementById("show-menu").classList.toggle('show-lateral')
}

                                                                    //Buscador de contenido

//Ejecutando funciones
document.getElementById("icon-search").addEventListener("click", mostrar_buscador);
document.getElementById("cover-ctn-search").addEventListener("click", ocultar_buscador);

//Declarando variables
bars_search = document.getElementById("ctn-bars-search");
cover_ctn_search = document.getElementById("cover-ctn-search");
inputSearch = document.getElementById("inputSearch");
box_search = document.getElementById("box-search");

//Function para mostrar el buscador
function mostrar_buscador(){
    bars_search.style.top='80px';
    cover_ctn_search.style.display = "block";
    inputSearch.focus();

    if(inputSearch.value === ""){
        box_search.style.display = "none";
    }

}

//Function para ocultar el buscador
function ocultar_buscador(){
    bars_search.style.top = "-10px";
    cover_ctn_search.style.display = "none";
    inputSearch.value = "";
    box_search.style.display = "none";
}

//Creando filtrado de búsqueda
document.getElementById("inputSearch").addEventListener("keyup", buscador_interno);

function buscador_interno(){
    filter = inputSearch.value.toUpperCase();
    li = box_search.getElementsByTagName("li");
    
    //Recorriendo elementos a filtrar mediante los "li"
    for (i = 0; i < li.length; i++){
        a = li[i].getElementsByTagName("a")[0];
        textValue = a.textContent || a.innerText;

        if(textValue.toUpperCase().indexOf(filter) > -1){
            li[i].style.display = "";
            box_search.style.display = "block";
            if(inputSearch.value === ""){
                box_search.style.display = "none";
            }
        } else {
            li[i].style.display = "none";
        }
    }
}


// Obtener el nombre de la carrera o especialidad desde localStorage
let careerName = localStorage.getItem('careerName');

// Verificar si el nombre de la carrera o especialidad existe
if (careerName) {
    // Actualizar el contenido del span con el nombre de la carrera o especialidad
    document.getElementById('careerName').textContent = careerName;
}
