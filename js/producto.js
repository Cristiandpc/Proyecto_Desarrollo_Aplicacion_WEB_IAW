/* =========================================================
   JAVASCRIPT DE LA PÁGINA DE PRODUCTO (producto.html)
   - Cambio de imagen al pulsar miniaturas
   - Selección de talla
   - Aumento/disminución de la cantidad
   - Botón "Agregar al carrito" con validación
   ========================================================= */

// Variable para guardar la talla que el usuario ha seleccionado
var tallaSeleccionada = null;

// Cantidad mínima y máxima permitida
var CANTIDAD_MINIMA = 1;
var CANTIDAD_MAXIMA = 10;


// Esperamos a que toda la página esté cargada
document.addEventListener("DOMContentLoaded", function () {

    inicializarMiniaturas();
    inicializarSelectorTallas();
    inicializarSelectorCantidad();
    inicializarBotonCarrito();

});


/**
 * Configura el comportamiento de las miniaturas:
 * al pulsar una, cambia la imagen principal del producto.
 */
function inicializarMiniaturas() {
    var miniaturas = document.getElementsByClassName("miniatura-galeria");
    var imagenPrincipal = document.getElementById("imagen-principal-producto");

    for (var i = 0; i < miniaturas.length; i++) {
        miniaturas[i].addEventListener("click", function () {
            // Quitamos la clase "activa" de todas las miniaturas
            for (var j = 0; j < miniaturas.length; j++) {
                miniaturas[j].classList.remove("activa");
            }
            // Activamos la miniatura pulsada
            this.classList.add("activa");
            // Cambiamos la imagen principal usando el atributo data-imagen
            imagenPrincipal.src = this.getAttribute("data-imagen");
        });
    }
}


/**
 * Configura los botones de talla. Solo se puede tener una talla
 * seleccionada al mismo tiempo.
 */
function inicializarSelectorTallas() {
    var botonesTalla = document.getElementsByClassName("boton-talla");

    for (var i = 0; i < botonesTalla.length; i++) {
        botonesTalla[i].addEventListener("click", function () {
            // Quitamos la selección a todos los botones
            for (var j = 0; j < botonesTalla.length; j++) {
                botonesTalla[j].classList.remove("seleccionada");
            }
            // Marcamos como seleccionado el botón pulsado
            this.classList.add("seleccionada");
            tallaSeleccionada = this.getAttribute("data-talla");

            // Limpiamos el mensaje de error si ya había uno
            limpiarMensaje();
        });
    }
}


/**
 * Configura los botones + y − para cambiar la cantidad
 * de unidades a comprar.
 */
function inicializarSelectorCantidad() {
    var botonSumar = document.getElementById("boton-sumar");
    var botonRestar = document.getElementById("boton-restar");
    var entradaCantidad = document.getElementById("entrada-cantidad");

    botonSumar.addEventListener("click", function () {
        var valorActual = parseInt(entradaCantidad.value, 10);
        if (valorActual < CANTIDAD_MAXIMA) {
            entradaCantidad.value = valorActual + 1;
        }
    });

    botonRestar.addEventListener("click", function () {
        var valorActual = parseInt(entradaCantidad.value, 10);
        if (valorActual > CANTIDAD_MINIMA) {
            entradaCantidad.value = valorActual - 1;
        }
    });
}


/**
 * Configura el botón "Agregar al carrito".
 * Antes de añadir el producto, valida que se haya
 * seleccionado una talla.
 */
function inicializarBotonCarrito() {
    var botonAgregar = document.getElementById("boton-agregar-carrito");

    botonAgregar.addEventListener("click", function () {
        // Validación: el usuario debe elegir una talla
        if (tallaSeleccionada === null) {
            mostrarMensaje("Por favor, selecciona una talla antes de continuar.", "error");
            return;
        }

        // Si todo está correcto, mostramos confirmación
        var cantidad = document.getElementById("entrada-cantidad").value;
        var texto = "¡Producto añadido al carrito! Talla " + tallaSeleccionada
                  + " — " + cantidad + " unidad(es).";
        mostrarMensaje(texto, "exito");
    });
}


/**
 * Muestra un mensaje al usuario en la zona de avisos.
 * @param {string} texto - el mensaje a mostrar
 * @param {string} tipo - "error" o "exito"
 */
function mostrarMensaje(texto, tipo) {
    var elementoAviso = document.getElementById("mensaje-aviso");
    elementoAviso.textContent = texto;
    elementoAviso.className = "mensaje-aviso";

    if (tipo === "error") {
        elementoAviso.classList.add("mensaje-error");
    } else if (tipo === "exito") {
        elementoAviso.classList.add("mensaje-exito");
    }
}


/**
 * Limpia el mensaje de aviso (lo deja en blanco).
 */
function limpiarMensaje() {
    var elementoAviso = document.getElementById("mensaje-aviso");
    elementoAviso.textContent = "";
    elementoAviso.className = "mensaje-aviso";
}
