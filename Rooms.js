var rooms = []; //arreglo de salas

function Player(id, roomSelected) {
    this.name = `Player_${id}`; //Creamos un nombre para el jugador, lo asociamos a su id
    this.isAlive = true; //definimos que está activo
    this.roomSelected = roomSelected // y le decimos en que sala se encuentra
        //this.board = initBoard(boarSize.x, boarSize.y)
}

var newPlayer = id => new Player(id); //creamos una función que cree el nuevo jugador

//exportación de variables y métodos a otros módulos
module.exports = {
    rooms,
    newPlayer
}