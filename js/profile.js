// Función para subir la imagen de perfil
function subirImagenPerfil(file) {
    if (file) {
        // Validar tamaño máximo (512 KB = 524288 bytes)
        if (file.size > 524288) {
            alert('La imagen seleccionada supera el tamaño máximo permitido de 512 KB.');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const base64Image = getBase64Image(img);

                // Obtener y actualizar el usuario actual en localStorage
                let currentUser = JSON.parse(localStorage.getItem('currentUser'));
                currentUser.photo = base64Image;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));

                // Mostrar la imagen en la interfaz
                document.getElementById('imagenPerfil').src = 'data:image/png;base64,' + base64Image;
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// Función para convertir imagen a Base64
function getBase64Image(img) {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const dataURL = canvas.toDataURL('image/png'); // Cambia "png" por el formato que necesites

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
}

// Función para eliminar la imagen de perfil
function eliminarImagenPerfil() {
    // Obtener el usuario actual almacenado en localStorage
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Reiniciar la foto a la imagen por defecto
    currentUser.photo = '';
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    // Mostrar la imagen por defecto en la interfaz
    document.getElementById('imagenPerfil').src = '/images/profile.png'; // Cambiar por la ruta de la imagen por defecto
}

// Cargar datos del usuario desde localStorage al cargar la página
window.addEventListener('load', () => {
    // Obtener el usuario actual almacenado en localStorage
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Verificar si hay un usuario actual
    if (currentUser) {
        // Mostrar los datos en los elementos HTML correspondientes
        document.getElementById('fullName').textContent = currentUser.fullName;
        document.getElementById('email').textContent = currentUser.email;
        document.getElementById('career').textContent = currentUser.career;
        document.getElementById('graduationYear').textContent = currentUser.graduationYear;

        // Mostrar los datos adicionales si están disponibles
        if (currentUser.numberID) {
            document.getElementById('dId').value = currentUser.numberID;
        }
        if (currentUser.phoneNumber) {
            document.getElementById('phoneNo').value = currentUser.phoneNumber;
        }
        if (currentUser.age) {
            document.getElementById('age').value = currentUser.age;
        }
        if (currentUser.photo) {
            document.getElementById('imagenPerfil').src = 'data:image/png;base64,' + currentUser.photo;
        }
    }

    // Evento para manejar la subida de la imagen
    document.getElementById('botonSubirImagen').addEventListener('click', function() {
        document.getElementById('inputImagen').click();
    });

    document.getElementById('inputImagen').addEventListener('change', function() {
        const file = this.files[0];
        subirImagenPerfil(file);
    });

    // Evento para eliminar la imagen de perfil
    document.getElementById('eliminarImagen').addEventListener('click', () => {
        eliminarImagenPerfil();
    });

    // Evento para guardar todos los datos del perfil
    document.getElementById('guardarDatos').addEventListener('click', () => {
        // Obtener los valores de los campos
        let numberID = document.getElementById('dId').value.trim();
        let phoneNumber = document.getElementById('phoneNo').value.trim();
        let age = document.getElementById('age').value.trim();

        // Validar los campos
        let isValid = true;

        // Validar número de identidad (debe ser un número de 10 dígitos)
        if (!/^\d{10}$/.test(numberID)) {
            document.getElementById('errorNumberID').textContent = "Ingrese un número válido de 10 dígitos.";
            isValid = false;
        } else {
            document.getElementById('errorNumberID').textContent = "";
        }

        // Validar número de teléfono (debe ser un número y tener al menos 10 dígitos)
        if (!/^\d{10,}$/.test(phoneNumber)) {
            document.getElementById('errorPhoneNumber').textContent = "Ingrese un número de teléfono válido.";
            isValid = false;
        } else {
            document.getElementById('errorPhoneNumber').textContent = "";
        }

        // Validar edad (debe ser un número entre 18 y 65)
        if (isNaN(age) || age < 18 || age > 65) {
            document.getElementById('errorAge').textContent = "Ingrese una edad válida (entre 18 y 65).";
            isValid = false;
        } else {
            document.getElementById('errorAge').textContent = "";
        }

        // Si todos los campos son válidos, guardar los datos en localStorage
        if (isValid) {
            // Obtener el usuario actual almacenado en localStorage
            let currentUser = JSON.parse(localStorage.getItem('currentUser'));

            // Actualizar los datos adicionales
            if (currentUser) {
                currentUser.numberID = numberID;
                currentUser.phoneNumber = phoneNumber;
                currentUser.age = age;

                // Guardar el usuario actualizado en localStorage
                localStorage.setItem('currentUser', JSON.stringify(currentUser));

                // Mostrar los datos actualizados en la interfaz
                document.getElementById('dId').value = currentUser.numberID;
                document.getElementById('phoneNo').value = currentUser.phoneNumber;
                document.getElementById('age').value = currentUser.age;

                // Mostrar mensaje de éxito
                alert('Datos guardados correctamente.');

                // Recargar la página para mostrar los datos actualizados
                location.reload();
            }
        }
    });
});
