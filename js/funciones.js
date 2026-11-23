function saludar() {
    return "¡Hola, bienvenido!";
}

function saludarConNombre(nombre) {
    return "¡Hola, " + nombre + "! Bienvenido.";
}
function sumar(a, b) {
    return a + b;
}
function restar() { 
    console.log("Función de resta");
}

// Fuciones flecha
const saludar = () => {
    return "¡Hola, bienvenido!";
};

const saludarConNombre = (nombre) => {
    return "¡Hola, " + nombre + "! Bienvenido.";
};

const sumar = (a, b) => {
    return a + b;
};

const restar = () => { 
    console.log("Función de resta");
};

// Mas corto aún
const saludar = () => "¡Hola, bienvenido!";
const saludarConNombre = (nombre) => "¡Hola, " + nombre + "! Bienvenido.";
const sumar = (a, b) => a + b;
const restar = () => console.log("Función de resta");