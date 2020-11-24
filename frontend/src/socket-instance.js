// --- file: socket-instance.js --- //
import io from 'socket.io-client';
import mongoose from 'mongoose';

var idUser = mongoose.Types.ObjectId()
    //var socket = io('http://localhost:3000', { query: `idClient=${idUser}` })

//export default io('http://localhost:3000');
export default io('http://localhost:3000', { query: `idClient=${idUser}` })