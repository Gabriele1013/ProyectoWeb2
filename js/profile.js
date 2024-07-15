/* Subida de imagen */

document.getElementById("botonSubirImagen").addEventListener("click", function() {
    document.getElementById("inputImagen").click();
  });

  document.getElementById("inputImagen").addEventListener("change", function() {
    var imagenSeleccionada = this.files[0];
    // Aquí puedes realizar la acción que desees con la imagen seleccionada
  });

/* Reemplazar imagen */
document.getElementById("inputImagen").addEventListener("change", function() {
    var imagenSeleccionada = this.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
        document.getElementById("imagenPerfil").src = e.target.result;
    };

    reader.readAsDataURL(imagenSeleccionada);
});

// Obtener elementos del DOM
const botonEliminar = document.getElementById('eliminarImagen');
const imagenPerfil = document.getElementById('imagenPerfil');

// URL de la nueva imagen de perfil
const urlNuevaImagen = '/images/profile.png';

// Agregar evento click al botón de eliminar imagen
botonEliminar.addEventListener('click', () => {
    // Cambiar la imagen de perfil a la nueva imagen
    imagenPerfil.src = urlNuevaImagen;
});
