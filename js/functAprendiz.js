/*const saludar = function() {
    return "Hola, bienvenido a la programación en JavaScript!";
};

const saludarA = () => "Hola, bienvenido a la programación en JavaScript!";
console.log(saludar());
console.log(saludarA());

const saludarConNombre = (nombre) => `Hola, ${nombre}, bienvenido a la programación en JavaScript!`;
console.log(saludarConNombre("Jero"));

const sumar = (a, b) => a + b;
console.log(sumar(5, 3));

const
restar = (a, b) => a - b;
console.log(restar(10, 4));*/

const personaje = new Object({
    
})

const aula = {};

aula.nro = 701;

aula.ubicacion = 'Torre Norte piso 7';
aula.estado = true;
aula.capacidad = 25;
//console.log(aula);


const instructor = new Object({
     carnet : 12345,
     nombre : "Edgardo",
     competencia: "BD",
     edad: 80,
     hobbies: ['cantar', 'comer', 'dormir'],
     alimentacion: { desayuno: "pan con agua panela",
                     almuerzo: "Frijoles y arroz",
                     cena: "carimañola con juevos"
     },
     saludar: function() {
         return `Hola, mi nombre es ${this.nombre} y tengo ${this.edad} años y estoy buscando novia.`;
     }
})

//console.log(instructor);
/*console.log(instructor.nombre);
console.log(instructor['edad']);
console.log(instructor.saludar());

let bono = instructor.edad * 2;
console.log(bono);*/


instructor.sexo = "Masculino";
instructor['nacionalidad'] = "Patua";
//cambiar valor de la nacionalidad
instructor.nacionalidad = "Colombiano"; 
delete instructor.sexo;
console.log(instructor.hobbies[1]);
console.log(instructor.alimentacion.cena);
//console.log(instructor);
