import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000');

export function sendMessage(message: string) {
    socket.emit('messageSend', message)
}

export function subscribeForMessages(cb: any) {
    socket.on('messageReceive', (message: string) => cb(null, message));
}
