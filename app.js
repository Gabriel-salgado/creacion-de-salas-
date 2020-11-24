const app = require('express')();
const http = require('http').createServer(app);
const shortid = require('shortid');
var { rooms, newPlayer } = require('./Rooms');
const io = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});

global.messages = new Array();
global.users = new Array();
global.nicknames = ["Ezio", "Kratos", "Iron Man", "Spiderman", "Doctor Who", "Link", "Sonic"];
global.rooms = []

io.on('connection', (socket) => {
    let id = socket.handshake.query['idClient']
    console.log('A user connected: ' + id);
    let nickname = nicknames[Math.floor(Math.random() * nicknames.length)];
    let newUser = {
        id: id,
        nickname,
        isAlive: true,
        roomSelected: ''
    }
    users.push(newUser);

    socket.emit('setUpdateUser', newUser)
    socket.emit('setUsers', users)
    socket.on('getInitRooms', () => { // cargar las salas iniciales activas
        socket.emit('setInitRooms', rooms)
    })

    socket.on('send', (data) => {
        let { text, nickname } = data;
        let message = {
            userId: socket.id,
            text,
            nickname
        }

        messages.push(message);
        io.emit('receive', message);
    });

    socket.on('getMessage', () => {
        socket.emit('setMessage', this.messages);
    });


    socket.on('setPing', (ping_time) => { // se activa en el servidor el evento on con nombre setPing enviado desde el cliente
        socket.emit('setPong', ping_time); // enviamos una respuesta al cliente con un nuevo nombre
    });

    // Rooms
    socket.on('getInitRooms', () => { // cargar las salas iniciales activas
            socket.emit('setInitRooms', rooms)
        })
        //agregarse a una sala
    socket.on('joinRoom', (idRoom) => {
        console.log(`conectado a la sala ${idRoom}`)
            //adicionamos la sala por su id a las salas del socket
        socket.join(idRoom);
        //avisamos a todos los que estan el la sala que hay un usuario nuevo
        io.sockets.in(idRoom).emit('alertNewUser', `Un nuevo usuario se ha conectado: ${socket.id}`);
        //capturamos el indice de la sala en el array de salas para modificar solo esa en el cliente
        var index = rooms.findIndex(room => room.id == idRoom);
        //agregamos el usuario que solicitó agregarse a la sala en el arreglo de jugadores de la sala
        rooms[index].players.push(newPlayer(socket.id, idRoom));
        //informamos al cliente de los cambios
        socket.emit('setRoomActive', { idRoom, rooms, index });
    })
    socket.on('newRoom', () => {
        // se genera un id único
        var newRoomId = shortid.generate();

        rooms.push({
            id: newRoomId, // se agrega la sala al arrglo de salas con el id generado y 
            players: [] // un array vacio para los jugadores de esa sala que se agregaran posteriormente
        });
        // se informan los cambios al cliente con el evento setNewRoom
        socket.emit('setNewRoom', { newRoomId, rooms });
    })

    socket.on('disconnect', () => {
        console.log('A user disconnected: ' + socket.id);
        users = users.filter(u => u.id !== socket.id);
        socket.emit('setUsers', users)
    });
});

app.get('/', (req, res) => {

    res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log("nuevo usuario")
        io.emit('chat message', msg);
    });
});

http.listen(3000, function() {
    console.log('Server started!');
});