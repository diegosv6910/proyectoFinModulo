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