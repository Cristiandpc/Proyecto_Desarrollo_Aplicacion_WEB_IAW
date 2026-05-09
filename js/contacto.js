/* =========================================================
   JAVASCRIPT DEL FORMULARIO DE CONTACTO (contacto.html)
   - Validación de todos los campos al pulsar "Enviar"
   - Comprueba que los campos obligatorios no estén vacíos
   - Muestra mensajes de error específicos para cada campo
   - Usa document.getElementById para acceder al DOM
   ========================================================= */

// Esperamos a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {

    var formulario = document.getElementById("formulario-contacto");
    var botonLimpiar = document.getElementById("boton-limpiar");

    // Cuando el usuario envía el formulario...
    formulario.addEventListener("submit", function (evento) {
        // Evitamos que el formulario se envíe automáticamente
        evento.preventDefault();

        // Limpiamos los errores anteriores antes de revalidar
        limpiarTodosLosErrores();

        // Si todos los campos son válidos, mostramos el éxito
        if (validarFormulario() === true) {
            mostrarMensajeGlobal(
                "¡Gracias por escribirnos! Hemos recibido tu mensaje y te responderemos en menos de 24 horas.",
                "exito"
            );
            formulario.reset();
        } else {
            mostrarMensajeGlobal(
                "Revisa los campos marcados en rojo antes de enviar el formulario.",
                "error"
            );
        }
    });

    // El botón "Limpiar" también borra los errores y mensajes
    botonLimpiar.addEventListener("click", function () {
        limpiarTodosLosErrores();
        mostrarMensajeGlobal("", "");
    });

});


/**
 * Recorre todos los campos del formulario y los valida.
 * Devuelve true si todos son correctos, false si alguno falla.
 */
function validarFormulario() {
    // Cogemos los campos uno a uno usando getElementById
    var campoNombre   = document.getElementById("campo-nombre");
    var campoEmail    = document.getElementById("campo-email");
    var campoTelefono = document.getElementById("campo-telefono");
    var campoAsunto   = document.getElementById("campo-asunto");
    var campoMensaje  = document.getElementById("campo-mensaje");
    var campoPolitica = document.getElementById("campo-politica");

    // Variable que indica si el formulario en general es válido
    var esValido = true;

    // ----- Validación del nombre -----
    if (campoNombre.value.trim() === "") {
        marcarError(campoNombre, "error-nombre", "El nombre es obligatorio.");
        esValido = false;
    } else if (campoNombre.value.trim().length < 3) {
        marcarError(campoNombre, "error-nombre", "El nombre debe tener al menos 3 caracteres.");
        esValido = false;
    }

    // ----- Validación del correo electrónico -----
    if (campoEmail.value.trim() === "") {
        marcarError(campoEmail, "error-email", "El correo electrónico es obligatorio.");
        esValido = false;
    } else if (esEmailValido(campoEmail.value.trim()) === false) {
        marcarError(campoEmail, "error-email", "Introduce un correo electrónico con formato válido.");
        esValido = false;
    }

    // ----- Validación del teléfono (opcional) -----
    // Solo se valida si el usuario ha escrito algo
    if (campoTelefono.value.trim() !== "") {
        if (esTelefonoValido(campoTelefono.value.trim()) === false) {
            marcarError(campoTelefono, "error-telefono", "Introduce un teléfono válido (mínimo 9 dígitos).");
            esValido = false;
        }
    }

    // ----- Validación del asunto -----
    if (campoAsunto.value === "") {
        marcarError(campoAsunto, "error-asunto", "Selecciona un motivo de contacto.");
        esValido = false;
    }

    // ----- Validación del mensaje -----
    if (campoMensaje.value.trim() === "") {
        marcarError(campoMensaje, "error-mensaje", "El mensaje es obligatorio.");
        esValido = false;
    } else if (campoMensaje.value.trim().length < 10) {
        marcarError(campoMensaje, "error-mensaje", "El mensaje debe tener al menos 10 caracteres.");
        esValido = false;
    }

    // ----- Validación de la política de privacidad -----
    if (campoPolitica.checked === false) {
        var errorPolitica = document.getElementById("error-politica");
        errorPolitica.textContent = "Debes aceptar la política de privacidad para continuar.";
        esValido = false;
    }

    return esValido;
}


/**
 * Marca un campo como inválido y muestra su mensaje de error.
 * @param {HTMLElement} campo - el input/select/textarea con el error
 * @param {string} idDelError - el id del span donde mostrar el texto
 * @param {string} mensaje - el texto del error
 */
function marcarError(campo, idDelError, mensaje) {
    campo.classList.add("invalido");
    var elementoError = document.getElementById(idDelError);
    elementoError.textContent = mensaje;
}


/**
 * Limpia todos los errores del formulario para empezar de cero.
 */
function limpiarTodosLosErrores() {
    // Lista con los identificadores de cada campo y su error asociado
    var campos = [
        { idCampo: "campo-nombre",   idError: "error-nombre" },
        { idCampo: "campo-email",    idError: "error-email" },
        { idCampo: "campo-telefono", idError: "error-telefono" },
        { idCampo: "campo-asunto",   idError: "error-asunto" },
        { idCampo: "campo-mensaje",  idError: "error-mensaje" },
        { idCampo: "campo-politica", idError: "error-politica" }
    ];

    for (var i = 0; i < campos.length; i++) {
        var campo = document.getElementById(campos[i].idCampo);
        var error = document.getElementById(campos[i].idError);

        if (campo !== null) {
            campo.classList.remove("invalido");
        }
        if (error !== null) {
            error.textContent = "";
        }
    }
}


/**
 * Muestra un mensaje global (en la parte inferior del formulario).
 * @param {string} texto - el mensaje a mostrar
 * @param {string} tipo - "exito", "error" o "" para limpiar
 */
function mostrarMensajeGlobal(texto, tipo) {
    var elementoMensaje = document.getElementById("mensaje-global");
    elementoMensaje.textContent = texto;
    elementoMensaje.className = "mensaje-global";

    if (tipo === "exito") {
        elementoMensaje.classList.add("exito-global");
    } else if (tipo === "error") {
        elementoMensaje.classList.add("error-global");
    }
}


/**
 * Comprueba si una cadena tiene formato de correo electrónico
 * mediante una expresión regular sencilla.
 * @param {string} email
 * @returns {boolean}
 */
function esEmailValido(email) {
    // Patrón básico: texto@texto.dominio
    var patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return patron.test(email);
}


/**
 * Comprueba si una cadena parece un número de teléfono válido.
 * Acepta dígitos, espacios, guiones y un símbolo "+" inicial.
 * @param {string} telefono
 * @returns {boolean}
 */
function esTelefonoValido(telefono) {
    // Quitamos los caracteres permitidos pero no útiles
    var soloNumeros = telefono.replace(/[\s\-+]/g, "");
    // Tras quitarlos solo deben quedar dígitos y al menos 9
    var patron = /^[0-9]{9,15}$/;
    return patron.test(soloNumeros);
}
