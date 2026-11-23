


//Variables para el DOM
const catalogoProductos = document.getElementById("catalogoProductos");
// En la constante modal se crea un obj de Bootstrap Modal.
const miModal = new bootstrap.Modal(document.getElementById("miModal"));
const elementoModal = document.getElementById("miModal"); //DOM

const tituloModal = document.getElementById("tituloModal");
const imagenModal = document.getElementById("imagenModal");
const descripcionModal = document.getElementById("descripcionModal");

// Iniciar variables para el control de 4 card de pokemon en la vista de html
let inicioSet = 0;
const limite = 4;

// Cargar o traer, o consumir una API, en este caso API de Pokemon
async function obtenerPokemones() {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limite}&offset=${inicioSet}`;
    const respuesta = await fetch(url);
    const data = await respuesta.json();
    console.log(data);
    cargarTarjetas(data.results);
}



// Cargar Tarjetas de Pokemones
async function cargarTarjetas(pokemones) {
    catalogoProductos.innerHTML = "";
    console.log("---------------- ", pokemon);
    for (let pokemon of pokemones) {
        const detalle = await obtenerDetallePokemon(pokemon.url);
        catalogoProductos.innerHTML += `
        <div class="col-12 col-lg-3 col-md-6">
            <div class="card tarjeta">
                <img src="${detalle.sprites.front_default}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${detalle.name}</h5>
                    <p class="card-text">Altura: ${detalle.height} | Peso: ${detalle.weight}</p>
                    <button class="btn btn-primary btn-ver-detalle"
                        data-url="${pokemon.url}">
                        Ver detalle
                    </button>
                </div>
            </div>
        </div>
        `;
    }
}

// Obtener detalle de un Pokémon
async function obtenerDetallePokemon(url) {
    const respuesta = await fetch(url);
    return await respuesta.json();
}


// Mostrar detalle en modal
async function mostrarDetalle(url) {
    const pokemon = await obtenerDetallePokemon(url);

    tituloModal.textContent = pokemon.name;
    imagenModal.src = pokemon.sprites.front_default;

    descripcionModal.textContent = `
        Altura: ${pokemon.height}
        Peso: ${pokemon.weight}
        Experiencia base: ${pokemon.base_experience}
    `;

    miModal.show();
}


// Event delegation (igual que tu clase )
catalogoProductos.addEventListener("click", (e) => {
    const boton = e.target.closest(".btn-ver-detalle");

    if (!boton) return;

    const url = boton.dataset.url;
    mostrarDetalle(url);
});

// Botones de paginación
document.getElementById("btnSiguiente").addEventListener("click", () => {
    inicioSet += limite;
    obtenerPokemones();
});
// Inicial
obtenerPokemones();
