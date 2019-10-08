import io from 'socket.io-client'

let socketConnection: any;

export function connect(host: string) {
    socketConnection = io(host);
}

export function isAlive() {
    return socketConnection.connected;
}

export function socket() {
    return socketConnection;
}
