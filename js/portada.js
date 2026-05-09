/* =========================================================
   JAVASCRIPT DE LA PORTADA (index.html)
   - Saludo dinámico según la hora del día
   - Animación de los contadores cuando son visibles
   ========================================================= */

// Esperamos a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {

    // ----- 1. Saludo dinámico según la hora -----
    mostrarSaludoSegunHora();

    // ----- 2. Animación de los contadores -----
    iniciarAnimacionContadores();
});


/**
 * Cambia el texto del saludo según la hora del día.
 * Usa getElementById para acceder al elemento del DOM.
 */
function mostrarSaludoSegunHora() {
    var elementoSaludo = document.getElementById("saludo-dinamico");

    // Si no se encuentra el elemento, salimos de la función
    if (elementoSaludo === null) {
        return;
    }

    var horaActual = new Date().getHours();
    var mensaje = "";

    if (horaActual >= 6 && horaActual < 13) {
        mensaje = "¡Buenos días, aficionado!";
    } else if (horaActual >= 13 && horaActual < 21) {
        mensaje = "¡Buenas tardes, aficionado!";
    } else {
        mensaje = "¡Buenas noches, aficionado!";
    }

    elementoSaludo.textContent = mensaje;
}


/**
 * Recoge todos los elementos con clase "numero-contador" y
 * anima el número desde 0 hasta el valor indicado en data-objetivo.
 */
function iniciarAnimacionContadores() {
    var contadores = document.querySelectorAll(".numero-contador");

    // Recorremos cada contador y lanzamos su animación
    for (var i = 0; i < contadores.length; i++) {
        animarContador(contadores[i]);
    }
}


/**
 * Anima un contador concreto desde 0 hasta el objetivo indicado
 * en su atributo "data-objetivo".
 *
 * @param {HTMLElement} elemento - el span del contador a animar
 */
function animarContador(elemento) {
    var valorObjetivo = parseInt(elemento.getAttribute("data-objetivo"), 10);
    var duracionTotal = 2000; // 2 segundos
    var pasos = 60;
    var incremento = valorObjetivo / pasos;
    var valorActual = 0;
    var tiempoEntrePasos = duracionTotal / pasos;

    var intervalo = setInterval(function () {
        valorActual = valorActual + incremento;

        if (valorActual >= valorObjetivo) {
            valorActual = valorObjetivo;
            clearInterval(intervalo);
        }

        // Mostramos el número formateado con separador de miles
        elemento.textContent = Math.floor(valorActual).toLocaleString("es-ES");
    }, tiempoEntrePasos);
}
