// Empiezo creando un arreglo de objetos donde almacenare las tareas por hacer.
// La informacion de cada objeto sera: name y status, Finalizada y Eliminar.
//Todos son Strings aunque en un futuro Finalizada y Eliminar se convertiran en botones.
var data = [
    { Tarea: "", Status: "", Finalizada: "", Eliminar: "" }
];


//Funcion que crea la tabla con la informacion que existe en data.
//Como tal esta funcion no dibuja una tabla solo crea los elementos HTML para poder ser dibujada.
function buildTable(data) {
    //Vamos a crear un elemento html "table" y lo almacenaramos en una funcion table.
    var table = document.createElement("table");
    //En la variable fields vamos a almacenar los Keys de data (Tarea, Status, Finalizada, Eliminar).
    var fields = Object.keys(data[0]);
    //Creamos una variable headRow donde le asignaremos un elemento HTML tr
    var headRow = document.createElement("tr");
    //Vamos a recorrer en un ciclo todos los elementos que esten en fields y los almacenaremos en una variable field.
    fields.forEach(function (field) {
        //Vamos a crear una celda TH en la variable headCell
        var headCell = document.createElement("th");
        //A la celda le asisgnaremos un textNode con la informacion que tenga field (Tarea, Status, Finalizada, Eliminar);
        headCell.appendChild(document.createTextNode(field));
        //A headRow le asignaremos un nodo hijo con la informacion de headCell
        headRow.appendChild(headCell);
    });

    
    //Finalmente a table le asignaremos un nodo hijo que sera headRow y con esto crearemos la primer parte de la tabla.
    //La parte donde vienen los nombres de las variables (Tarea, Status, Finalizada, Eliminar)
    table.appendChild(headRow);

    //Recorreremos cada elemento que hay dentro de data que son objetos en este caso y le pondremos un index
    //para saber en que elemento estamos.
    data.forEach(function (object, index) {
        //Crearemos una variable row que sea igual a un elemento HTML tr
        var row = document.createElement("tr");
        //En la variable fields vamos a almacenar los Keys de data (Tarea, Status, Finalizada, Eliminar).
        fields.forEach(function (field) {
            if (field == undefined) {
                field = "vacio";
            }
            //Crearemos una variable cell que sea igual a un elemento HTML td
            var cell = document.createElement("td");
            //Vamos a verificar que si el valor de alguna celda es igual a "En Progreso" entonces reemplazaremos
            //Ese String y lo convertiremos a un boton
            if (object[field] === "En Progreso" && object[field] !== undefined) {
                //Creamos una variable completeButton que sea igual a un nodoHijo de cell que contenga un elemento
                //HTML de tipo Input
                //Con esto sustituimos en cell el texto que tenia por un Input.
                var completeButton = cell.appendChild(document.createElement("input"));
                //A completeButton le asiganmos los atributos type = submit para el formato como boton y el value
                //= a Completar.
                completeButton.type = "submit", completeButton.value = "Completar";
                //Ponemos el boton dentro de la celda.
                row.appendChild(cell);
                //Le agregamos un eventListener que se active al click del boton y que llame a la funcion updateRegister
                //y le envie el nombre de la tarea que tenga ese boton asignado.
                completeButton.addEventListener("click", function () {
                    updateRegister(object[fields[0]]);
                });
                //Vamos a verificar que si el valor de alguna celda es igual a "Eliminar" entonces reemplazaremos
                //Ese String y lo convertiremos a un boton
            } else if (object[field] === "Eliminar" && object[field] != undefined) {
                //Creamos una variable completeButton que sea igual a un nodoHijo de cell que contenga un elemento
                //HTML de tipo Input
                //Con esto sustituimos en cell el texto que tenia por un Input.
                var completeButton = cell.appendChild(document.createElement("input"));
                //A completeButton le asiganmos los atributos type = submit para el formato como boton y el value
                //= a Completar.
                completeButton.type = "submit", completeButton.value = "Eliminar";
                //Ponemos el boton dentro de la celda.
                row.appendChild(cell);
                //Le agregamos un eventListener que se active al click del boton y que llame a la funcion deleteRegister
                //y le envie el nombre de la tarea que tenga ese boton asignado.
                completeButton.addEventListener("click", function () {
                    console.log(object[fields[0]]);
                    deleteRegister(object[fields[0]], "Finalizada");
                });
            } else if (object[field] != undefined) {
                //Si no se cumple ninguna condicion anterior unicamente insertaremos el texto con la informacion.
                //No se crearan ningun boton.
                cell.appendChild(document.createTextNode(object[field]));
                row.appendChild(cell);
            }
        });
        //Finalmente a tabla le asiganeremos otro nodoHijo que contenga toda la informacion de row.
        table.appendChild(row);
    });
    //Retornamos la tabla creada.
    return table;
}

//En esta funcion  creamos los nuevos registros.
//Se crea un objeto con la informacion que tienen los objetos de data.
//Tarea va a tener el valor que contenga el textArea, el Status lo pondremos como
//Pendiente, Finalizada sera igual a "En Progreso" y Eliminar sera igual a "Eliminar"
//Los elementos Finalizada y Eliminar seran botones en un futuro las Strings asignadas son solo para control.
function newRegister() {
    var newRegister = {
        Tarea: textArea.value,
        Status: "Pendiente",
        Finalizada: "En Progreso",
        Eliminar: "Eliminar",
    };
    //Enviaremos a data un nuevo objeto que es el creado newRegister.
    data.push(newRegister);
    //Llamamos a la funcion para dibujar la tabla.
    drawTable(data);
    //Una vez ingresado el registro, limpiamos el textArea.
    textArea.value = "";
}

//Funcion para crear el input para poner el nombre de la tarea
function toDoText() {
    var textArea = document.createElement("input");
    textArea.placeholder = "Tarea";
    return textArea;
}

//Funcion para crear el boton para ingresar la nueva tarea
function toDoButton() {
    var submitButton = document.createElement("input");
    submitButton.type = "submit", submitButton.value = "Subir Tarea";
    return submitButton;
}

//Creamos un nodo llamado app que es el div que tenemos en el HTML.
var app = document.getElementById("app");
//Creamos un hijo al nodo app para dibujar el textArea para ingresar una tarea.
var textArea = app.appendChild(toDoText());
//Creamos un hijo al nodo app para dibujar un boton para ingresar una tarea.
var toDoButton = app.appendChild(toDoButton());

//Registro de tareas;
toDoButton.addEventListener("click", () => {
    if (textArea.value === "") {
        alert("Debes ingresar nombre de la tarea")
    } else {
        newRegister();
    }
});


//Cuando abre la pagina dibuja la tabla.
window.onload = function () {
    app.appendChild(buildTable(data))
}
