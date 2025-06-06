// Asignar a una variable, los inputs desde el HTML junto a
// los datos ingresados por el usuario. Se localizan a través de su ID
let inputNombre = document.getElementById("nombre")
let inputPeso = document.getElementById("peso")
let inputAltura = document.getElementById("altura")

// Obtener el formulario y el div de resultado
let formulario = document.getElementById("formulario-imc")
let divResultado = document.getElementById("resultado")

// Función para validar los datos
function validarDatos(nombre, peso, altura) {
    // NOTA: Para AND se usa && y para OR se usa ||


    // Verificar que el nombre no esté vacío y tenga al menos 3 caracteres
    if (nombre === "" || nombre.length < 3) {
        return "El nombre debe tener al menos 3 caracteres"
    }

    // Verificar que el peso sea un número válido
    if (isNaN(peso) || peso === "") {
        return "El peso debe ser un número válido"
    }

    // Verificar que la altura sea un número válido
    if (isNaN(altura) || altura === "") {
        return "La altura debe ser un número válido"
    }

    // Convertir a números para hacer las validaciones numéricas
    let pesoNumero = parseFloat(peso)
    let alturaNumero = parseFloat(altura)

    // Verificar que el peso sea mayor a 20 kg
    if (pesoNumero <= 20) {
        return "El peso debe ser mayor a 20 kg"
    }

    // Verificar que la altura sea mayor a 1 metro
    if (alturaNumero <= 1) {
        return "La altura debe ser mayor a 1 metro"
    }

    // Si todo está bien, retornar null (sin errores)
    return null
}

// Función para calcular el IMC
function calcularIMC(peso, altura) {
    // Convertir a números
    let pesoNumero = parseFloat(peso)
    let alturaNumero = parseFloat(altura)

    // Aplicar la fórmula IMC = Peso / (Altura)^2
    let imc = pesoNumero / (alturaNumero * alturaNumero)

    return imc
}

// Función para determinar la categoría del IMC
function determinarCategoria(imc) {
    // Usar switch con true para evaluar condiciones con AND
    switch (true) {
        case imc < 18.5:
            return "delgadez o bajo peso"
        case imc >= 18.5 && imc <= 24.9:
            return "normal"
        case imc >= 25.0 && imc <= 29.9:
            return "sobrepeso"
        case imc >= 30:
            return "obesidad"
        default:
            return "valor no válido"
    }
}

// Función para mostrar el resultado
function mostrarResultado(nombre, imc, categoria) {
    // Redondear el IMC a 2 decimales para mejor presentación
    let imcRedondeado = imc.toFixed(2)

    // Crear el mensaje del resultado
    let mensaje = `Hola ${nombre}, tu IMC es ${imcRedondeado} y se considera <strong>"${categoria}"</strong>.`

    // Mostrar el resultado en el div
    divResultado.innerHTML = mensaje
    divResultado.className = "alert alert-success" // Cambiar a verde para éxito
}

// Función para mostrar error
function mostrarError(mensajeError) {
    divResultado.innerHTML = mensajeError
    divResultado.className = "alert alert-danger" // Cambiar a rojo para error
}

// Agregar evento al formulario para procesar cuando se envíe
formulario.addEventListener("submit", function(evento) {
    // Prevenir el comportamiento por defecto del formulario (no recargar la página)
    evento.preventDefault()

    // Obtener los valores actuales de los inputs
    let nombre = inputNombre.value.trim() // trim() elimina espacios al inicio y final
    let peso = inputPeso.value
    let altura = inputAltura.value

    // Validar los datos
    let error = validarDatos(nombre, peso, altura)

    if (error) {
        // Si hay error, mostrarlo
        mostrarError(error)
    } else {
        // Si no hay errores, calcular el IMC
        let imc = calcularIMC(peso, altura)
        let categoria = determinarCategoria(imc)

        // Mostrar el resultado
        mostrarResultado(nombre, imc, categoria)
    }
})