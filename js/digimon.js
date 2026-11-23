const catalogoProductos = document.getElementById("catalogoProductos");
const listaCarrito = document.getElementById("listaCarrito");
const carritoVacio = document.getElementById("carritoVacio");

const miModal = new bootstrap.Modal(document.getElementById("miModal"));

const tituloModal = document.getElementById("tituloModal");
const imagenModal = document.getElementById("imagenModal");
const descripcionModal = document.getElementById("descripcionModal");

// Paginación
let paginaActual = 0;
const limit = 4;

// Obtener lista de Digimon
async function obtenerDigimons() {
    const url = `https://digi-api.com/api/v1/digimon?pageSize=${limit}&page=${paginaActual}`;
    const respuesta = await fetch(url);
    const data = await respuesta.json();

    cargarTarjetas(data.content);
}

// Obtener detalle de un Digimon por ID
async function obtenerDetalleDigimon(id) {
    const respuesta = await fetch(`https://digi-api.com/api/v1/digimon/${id}`);
    return await respuesta.json();
}

// Cargar tarjetas
async function cargarTarjetas(digimons) {
    catalogoProductos.innerHTML = "";

    if (!digimons || digimons.length === 0) {
        catalogoProductos.innerHTML = `<p class="text-center">No hay Digimon disponibles.</p>`;
        return;
    }

    for (let digimon of digimons) {
        console.log("---------------- ", digimon);
        const detalle = await obtenerDetalleDigimon(digimon.id);
        console.log(detalle);

        const imagen = detalle.images?.[0]?.href ?? "";
        const nivel  = detalle.levels?.[0]?.level ?? "Desconocido";
        const tipo   = detalle.types?.[0]?.type   ?? "Desconocido";

        catalogoProductos.innerHTML += `
        <div class="col-12 col-lg-3 col-md-6">
            <div class="card tarjeta">
                <img src="${imagen}" class="card-img-top" alt="${detalle.name}">
                <div class="card-body">
                    <h5 class="card-title">${detalle.name}</h5>
                    <p class="card-text">Nivel: ${nivel} | Tipo: ${tipo}</p>
                    <button class="btn btn-primary btn-ver-detalle"
                        data-id="${detalle.id}">
                        Ver detalle
                    </button>
                    <!-- Boton para agregar al carrito -->
                    <button class="btn btn-success btn-agregar-carrito"
                        data-id="${detalle.id}"
                        data-nombre="${detalle.name}"
                        data-imagen="${imagen}">
                        + Carrito
                   </button>
                </div>
            </div>
        </div>
        `;
    }
}

// Obtener el carrito actual de LocalStorage o crear uno vacío si no existe
function obtenerCarrito() {
    const carrito = localStorage.getItem("carritoDigimons");
    return carrito ? JSON.parse(carrito) : [];
}

// Guardar un Digimon en el carrito
function agregarAlCarrito(nuevoDigimon) {
    let carrito = obtenerCarrito();

    // Evitar duplicados
    const existe = carrito.some(d => d.id === nuevoDigimon.id);
    if (existe) {
        alert("Este Digimon ya está en tu equipo/carrito");
        return;
    }

    carrito.push(nuevoDigimon);
    localStorage.setItem("carritoDigimons", JSON.stringify(carrito));
    alert(`${nuevoDigimon.nombre} añadido al carrito`);
}

// Mostrar detalle en modal
async function mostrarDetalle(id) {
    const digimon = await obtenerDetalleDigimon(id);

    const imagen      = digimon.images?.[0]?.href ?? "";
    const descripcion = digimon.descriptions?.find(d => d.language === "en_us")?.description
                     ?? digimon.descriptions?.[0]?.description
                     ?? "Sin descripción disponible.";
    const nivel       = digimon.levels?.map(l => l.level).join(", ")         ?? "—";
    const tipo        = digimon.types?.map(t => t.type).join(", ")           ?? "—";
    const atributo    = digimon.attributes?.map(a => a.attribute).join(", ") ?? "—";
    const campo       = digimon.fields?.map(f => f.field).join(", ")         ?? "—";

    tituloModal.textContent      = digimon.name;
    imagenModal.src              = imagen;
    descripcionModal.textContent = descripcion;

    document.getElementById("idModal").textContent       = digimon.id;
    document.getElementById("nivelModal").textContent    = nivel;
    document.getElementById("tipoModal").textContent     = tipo;
    document.getElementById("atributoModal").textContent = atributo;
    document.getElementById("campoModal").textContent    = campo;

    miModal.show();
}

// Event delegation (igual que tu clase 👇)
catalogoProductos.addEventListener("click", (e) => {
    // Caso 1: Botón Ver Detalle
    const botonDetalle = e.target.closest(".btn-ver-detalle");
    if (botonDetalle) {
        mostrarDetalle(botonDetalle.dataset.id);
        return;
    }

    // Caso 2: Botón Agregar al Carrito
    const botonCarrito = e.target.closest(".btn-agregar-carrito");
    if (botonCarrito) {
        const digimonParaCarrito = {
            id:     botonCarrito.dataset.id,
            nombre: botonCarrito.dataset.nombre,
            imagen: botonCarrito.dataset.imagen
        };
        console.log("Agregando al carrito:", digimonParaCarrito);
        agregarAlCarrito(digimonParaCarrito);
    }
});

// Función para mostrar los productos en la modal
function renderizarCarrito() {
    const carrito = obtenerCarrito();
    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
        carritoVacio.classList.remove("d-none");
    } else {
        carritoVacio.classList.add("d-none");
        carrito.forEach((digimon) => {
            listaCarrito.innerHTML += `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <img src="${digimon.imagen}" width="50" alt="${digimon.nombre}">
                    <span class="text-capitalize"><strong>${digimon.nombre}</strong></span>
                    <button class="btn btn-sm btn-outline-danger" onclick="eliminarDelCarrito(${digimon.id})">
                        Eliminar
                    </button>
                </li>
            `;
        });
    }
}

// Función para eliminar un Digimon específico
function eliminarDelCarrito(id) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(d => d.id != id);
    localStorage.setItem("carritoDigimons", JSON.stringify(carrito));
    renderizarCarrito();
}

// Función para borrar todo
function vaciarCarrito() {
    if (confirm("¿Seguro que quieres vaciar tu carrito?")) {
        localStorage.removeItem("carritoDigimons");
        renderizarCarrito();
    }
}

// Escuchar cuando se abre la modal para actualizar la lista
document.getElementById('modalCarrito').addEventListener('show.bs.modal', renderizarCarrito);

// Botones de paginación
document.getElementById("btnSiguiente").addEventListener("click", () => {
    paginaActual++;
    obtenerDigimons();
});

document.getElementById("btnAnterior").addEventListener("click", () => {
    if (paginaActual > 0) {
        paginaActual--;
        obtenerDigimons();
    }
});

// Inicial
obtenerDigimons();
